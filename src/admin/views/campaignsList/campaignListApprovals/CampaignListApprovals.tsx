import React, { useContext, useEffect, useState, useRef } from "react";

import * as _ from "lodash";

import Section from "../../../../components/section/Section";

import { Text } from "../../../../components/Text/Text";
import TabSelector from "../../../../components/tabSelector/TabSelector";
import { CAMPAIGN_LIST_APPROVALS, APPROVE_CAMPAIGN, REJECT_CAMPAIGN } from "./lib/CampaignListApprovals.queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

import moment from "moment";
import Table from "../../../../components/Table/TableComponent";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { SecondaryButton, TextArea } from "../../../../components/formElements/formElements";

import Modal from '../../../../components/modal/Modal';
import ReactDOM from "react-dom";
import RadioButton from "../../../../components/radioButton/RadioButton";

const CampaignListApprovals = props => {

    const [showApproveCampaignModal, setShowApproveCampaignModal] = useState(false);
    const [showRejectCampaignModal, setShowRejectCampaignModal] = useState(false);
    const [rejectionOption, setRejectionOption] = useState('prohibited_category');
    const [rejectionMessage, setRejectionMessage] = useState('');

    console.log(rejectionOption);

    const inputEl = useRef(null);
    const modalEl = useRef(null);

    const { match } = props;

    const tabConfig = [
        { label: "Overview", selected: false, link: match.url.replace("/approvals", "/overview") },
        { label: "Pacing", selected: false, link: match.url.replace("/approvals", "/pacing") },
        { label: "Approvals", selected: true, link: match.url },
    ]

    const filterCampaigns = (campaigns) => {
        let temp = campaigns;
        // temp = temp.filter(campaign => moment(campaign.endAt).toDate() >= moment().toDate());
        temp = temp.filter(campaign => campaign.state === 'under_review');
        return temp
    }

    const refresh = () => {
        window.location.reload();
    }

    const removeModal = () => {
        ReactDOM.unmountComponentAtNode(inputEl.current as any);
    }

    const [approveCampaign, { loading: updateNotificationCreativeLoading, error: updateNotificationCreativeError }] =
        useMutation(APPROVE_CAMPAIGN,
            {
                onCompleted: refresh
            });

    const [rejectCampaign, { loading: rejectCampaignLoading, error: rejectCampaignError }] =
        useMutation(REJECT_CAMPAIGN,
            {
                onCompleted: refresh
            });

    const { loading, error, data } = useQuery(CAMPAIGN_LIST_APPROVALS, {});

    const columns = [
        {
            Header: 'Campaign',
            accessor: 'name',
            Cell: (props) => {
                return (
                    <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/users/${props.row.original.advertiser.userAdvertisers[0].userId}/advertiser/${props.row.original.advertiser.id}/campaign/${props.row.original.id}`}>
                        <div title={props.row.original.name}>{props.row.original.name}</div>
                    </Link>)
            }
        },
        {
            Header: 'Advertiser',
            accessor: 'advertiser.name',
        },
        {
            Header: 'Date Added',
            accessor: 'createdAt',
            sortDescFirst: true,
            Cell: (props) => {
                return new Date(props.row.original.createdAt).toLocaleDateString("en-US")
            },
        },
        {
            Header: ' ',
            Cell: (props) => {
                return <div style={{ display: "flex" }}>
                    <SecondaryButton onClick={() => { renderApproveCampaignModal(props.row.original.id, props.row.original.name) }} style={{ marginRight: "12px" }}><Text content={"Approve"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 12]} fontWeight={500} fontFamily={"Poppins"} /></SecondaryButton>
                    <SecondaryButton onClick={() => { renderRejectCampaignModal(props.row.original.id, props.row.original.name) }}><Text content={"Reject"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 12]} fontWeight={500} fontFamily={"Poppins"} /></SecondaryButton>
                </div>
            },
        },

    ];

    const renderApproveCampaignModal = (campaignId, campaignName) => {
        ReactDOM.render(
            <Modal id="modal">
                <div style={{ width: "500px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={`Approve this campaign?`} sizes={[16, 16, 15, 15, 22]} color={"#E0694C"} fontFamily={"Poppins"} />
                        <Icon onClick={(e) => removeModal()} style={{ marginLeft: "auto", color: "grey", cursor: "pointer" }}>clear</Icon>
                    </div>
                    <Text style={{ marginTop: "42px" }} content={`You are attempting to approve ${campaignName}. Approving this campaign will notify the advertiser and add it to the ads catalog.`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
                    <div style={{ display: "flex", width: "100%", marginTop: "42px" }}>
                        <div onClick={(e) => removeModal()} style={{ marginLeft: "auto", marginRight: "28px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Cancel
                    </Text>
                            </span>
                        </div>
                        <div onClick={() => { approveCampaign({ variables: { approveCampaignInput: { campaignId } } }) }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Approve
                        </Text>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>, inputEl.current)
    }

    const renderRejectCampaignModal = (campaignId, campaignName) => {
        ReactDOM.render(
            <Modal id="modal">
                <div style={{ width: "500px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={`Reject this campaign?`} sizes={[16, 16, 15, 15, 22]} color={"#E0694C"} fontFamily={"Poppins"} />
                        <Icon onClick={(e) => removeModal()} style={{ marginLeft: "auto", color: "grey", cursor: "pointer" }}>clear</Icon>
                    </div>
                    <Text style={{ marginTop: "42px" }} content={`You are attempting to reject ${campaignName}. Rejecting this campaign will notify the advertiser and add remove it from the approval queue.`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
                    <Text style={{ marginTop: "42px" }} content={`Reason for rejection: `} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
                    <div style={{ display: "flex", marginTop: "28px" }}>
                        <RadioButton onClick={() => { setRejectionOption("prohibited_category") }} checked={rejectionOption === 'prohibited_category'} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Prohibited category"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <div style={{ display: "flex", marginTop: "28px" }}>
                        <RadioButton onClick={() => { setRejectionOption("invalid_landing_page") }} checked={rejectionOption === 'invalid_landing_page'} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Landing page does not meet Brave standards"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <div style={{ display: "flex", marginTop: "28px" }}>
                        <RadioButton onClick={() => { setRejectionOption("inappropriate_content") }} checked={rejectionOption === 'inappropriate_content'} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Inappropriate content"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <div style={{ display: "flex", marginTop: "28px" }}>
                        <RadioButton onClick={() => { setRejectionOption("other") }} checked={rejectionOption === 'other'} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Other"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <div style={{ marginTop: "28px" }}></div>
                    <Text style={{ marginTop: "28px", marginBottom: "8px" }} content={`Added message`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />

                    <TextArea placeholder="Enter additional text..." />
                    <div style={{ display: "flex", width: "100%", marginTop: "42px" }}>
                        <div onClick={(e) => removeModal()} style={{ marginLeft: "auto", marginRight: "28px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Cancel
                    </Text>
                            </span>
                        </div>
                        <div onClick={() => { rejectCampaign({ variables: { rejectCampaignInput: { campaignId, option: "invalid_landing_page" } } }) }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Reject
                        </Text>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>, inputEl.current)
    }




    if (loading) return <></>;

    console.log(data.campaigns);

    return (
        <div>
            <TabSelector config={tabConfig} />
            <Section fullWidthChild={true}>
                <Table data={filterCampaigns(data.campaigns)} columns={columns} tableWidth={1094} columnCount={4} />
            </Section>
            <div id="hello" ref={inputEl}></div>
        </div>
    );
}


export default CampaignListApprovals;

