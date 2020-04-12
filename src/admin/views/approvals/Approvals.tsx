import React, { useContext, useEffect, useState, useRef } from "react";

import * as _ from "lodash";

import Section from "../../../components/section/Section";

import { Text } from "../../../components/Text/Text";
import { CAMPAIGN_LIST_APPROVALS, APPROVE_CAMPAIGN, REJECT_CAMPAIGN } from "./lib/Approvals.queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

import moment from "moment";
import Table from "../../../components/Table/TableComponent";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { SecondaryButton, TextArea } from "../../../components/formElements/formElements";
import Modal from 'react-modal';
import ReactDOM from "react-dom";
import RadioButton from "../../../components/radioButton/RadioButton";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5000,
        borderRadius: "4px",
        padding: "56px",
        border: "1px solid #e2e2e2"
    }
};

const Approvals = props => {


    // Approve Campaign Modal State
    const [showApproveCampaignModal, setShowApproveCampaignModal] = useState(false);
    const [approveCampaignName, setApproveCampaignName] = useState('');
    const [approveCampaignId, setApproveCampaignId] = useState('');

    // Reject Campaign Modal State
    const [showRejectCampaignModal, setShowRejectCampaignModal] = useState(false);
    const [rejectCampaignName, setRejectCampaignName] = useState('');
    const [rejectCampaignId, setRejectCampaignId] = useState('');
    const [rejectionOption, setRejectionOption] = useState('prohibited_category');
    const [rejectionMessage, setRejectionMessage] = useState('');

    const { match } = props;

    const openApproveCampaignModal = (approveCampaignName, approveCampaignId) => {
        setApproveCampaignName(approveCampaignName);
        setApproveCampaignId(approveCampaignId);
        setShowApproveCampaignModal(true);
    }

    const closeApproveCampaignModal = () => {
        setApproveCampaignName('');
        setApproveCampaignId('');
        setShowApproveCampaignModal(false);
    }

    const openRejectCampaignModal = (rejectCampaignName, rejectCampaignId) => {
        setRejectCampaignName(rejectCampaignName);
        setRejectCampaignId(rejectCampaignId);
        setShowRejectCampaignModal(true);
    }

    const closeRejectCampaignModal = () => {
        setRejectCampaignName('');
        setRejectCampaignId('');
        setShowRejectCampaignModal(false);
        setRejectionOption('prohibited_category');
        setRejectionMessage('');
    }

    const filterCampaigns = (campaigns) => {
        let temp = campaigns;
        // temp = temp.filter(campaign => moment(campaign.endAt).toDate() >= moment().toDate());
        temp = temp.filter(campaign => campaign.state === 'under_review');
        return temp
    }

    const refresh = () => {
        window.location.reload();
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
            Header: 'Start Date',
            accessor: 'startAt',
            sortDescFirst: true,
            Cell: (props) => {
                return new Date(props.row.original.startAt).toLocaleDateString("en-US")
            },
        },
        {
            Header: ' ',
            Cell: (props) => {
                return <div style={{ display: "flex" }}>
                    <SecondaryButton onClick={() => { openApproveCampaignModal(props.row.original.name, props.row.original.id) }} style={{ marginRight: "12px" }}><Text content={"Approve"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 12]} fontWeight={500} fontFamily={"Poppins"} /></SecondaryButton>
                    <SecondaryButton onClick={() => { openRejectCampaignModal(props.row.original.name, props.row.original.id) }}><Text content={"Reject"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 12]} fontWeight={500} fontFamily={"Poppins"} /></SecondaryButton>
                </div>
            },
        },

    ];

    if (loading) return <></>;

    console.log(data.campaigns);

    return (
        <div>
            <Section header={"Campaign Approvals"} fullWidthChild={true}>
                <Table data={filterCampaigns(data.campaigns)} columns={columns} tableWidth={1094} columnCount={5} />
            </Section>
            <Modal
                isOpen={showApproveCampaignModal}
                style={customStyles}
            >
                <div style={{ width: "500px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={`Approve this campaign?`} sizes={[16, 16, 15, 15, 22]} color={"#E0694C"} fontFamily={"Poppins"} />
                        <Icon onClick={(e) => closeApproveCampaignModal()} style={{ marginLeft: "auto", color: "grey", cursor: "pointer" }}>clear</Icon>
                    </div>
                    <Text style={{ marginTop: "42px" }} content={`You are attempting to approve ${approveCampaignName}. Approving this campaign will notify the advertiser and add it to the ads catalog.`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
                    <div style={{ display: "flex", width: "100%", marginTop: "42px" }}>
                        <div onClick={(e) => closeApproveCampaignModal()} style={{ marginLeft: "auto", marginRight: "28px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Cancel
                    </Text>
                            </span>
                        </div>
                        <div onClick={() => { approveCampaign({ variables: { approveCampaignInput: { campaignId: approveCampaignId } } }) }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Approve
                        </Text>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={showRejectCampaignModal}
                style={customStyles}
            >
                <div style={{ width: "500px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={`Reject this campaign?`} sizes={[16, 16, 15, 15, 22]} color={"#E0694C"} fontFamily={"Poppins"} />
                        <Icon onClick={(e) => closeRejectCampaignModal()} style={{ marginLeft: "auto", color: "grey", cursor: "pointer" }}>clear</Icon>
                    </div>
                    <Text style={{ marginTop: "42px" }} content={`You are attempting to reject ${rejectCampaignName}. Rejecting this campaign will notify the advertiser and remove it from the approval queue.`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
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
                        <div onClick={(e) => closeRejectCampaignModal()} style={{ marginLeft: "auto", marginRight: "28px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Cancel
                    </Text>
                            </span>
                        </div>
                        <div onClick={() => { rejectCampaign({ variables: { rejectCampaignInput: { campaignId: rejectCampaignId, option: rejectionOption } } }) }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Reject
                        </Text>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}


export default Approvals;

