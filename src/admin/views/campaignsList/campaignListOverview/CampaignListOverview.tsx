import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";

import CampaignTable from "./components/campaignTable/CampaignTable";
import Section from "../../../../components/section/Section";

import { Text } from "../../../../components/Text/Text";
import TabSelector from "../../../../components/tabSelector/TabSelector";
import { CAMPAIGN_LIST_OVERVIEW } from "./lib/CampaignListOverview.queries";
import { useQuery } from "@apollo/react-hooks";

import { processData } from "../../dashboard/views/overview/lib/Library";
import Chip from "../../../../components/chip/Chip";
import moment from "moment";
import { Icon } from "@material-ui/core";
import * as S from "./styles/CampaignList.style";

const CampaignListOverview = props => {

    const [filters, setFilters] = useState(["current"] as any);

    const [searchQuery, setSearchQuery] = useState('');

    const { match } = props;

    const search = campaigns => {
        if (searchQuery !== '') {
            return campaigns.filter(campaign =>
                campaign.name.toLowerCase().search(searchQuery.toLowerCase()) > -1
            )
        }
        else {
            return campaigns;
        }
    }

    const processData = data => {
    }

    // const toggleFilter = filter => {
    //     let temp = filters;
    //     if (temp.indexOf(filter) > -1) {
    //         const index = temp.indexOf(filter);
    //         temp.splice(index, 1);
    //     }
    //     else {
    //         temp.push(filter);
    //     }
    //     setFilters([...temp]);
    // }

    // const filterCampaigns = campaigns => {
    //     let temp = campaigns;
    //     filters.forEach((filter) => {
    //         if (filter === 'current') {
    //             temp = temp.filter(campaign => moment(campaign.endAt).toDate() >= moment().toDate());
    //         }
    //         if (filter === 'active') {
    //             temp = temp.filter(campaign => campaign.state === 'active');
    //         }
    //     })
    //     return temp
    // }

    const { loading, error, data } = useQuery(CAMPAIGN_LIST_OVERVIEW, {
        onCompleted: processData,
    });


    if (loading) return <></>;

    console.log(data.campaigns);


    return (
        <React.Fragment>
            <Section fullWidthChild={true}>
                <>
                    <div style={{ marginBottom: "56px", width: "100%" }}>
                        <div style={{
                            display: "flex", alignItems: "center", border: "1px solid #e2e2e2", height: "36px", width: "1100px", borderRadius: "4px", marginBottom: "7px"
                        }}>
                            <Icon
                                style={{ color: "#393A46", marginLeft: "8px", opacity: 0.5 }}
                            >
                                search
                                </Icon>
                            <S.SearchInput onChange={event => setSearchQuery(event.target.value)} type="text" placeholder="Search" />
                        </div>
                        {/* <div style={{ display: "flex" }}>
                            <div style={{ marginLeft: "auto" }}>
                                <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/organization/new`}>
                                    <Button style={{ width: "175px", marginTop: "14px" }}>
                                        <Text content={"New Organization"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </Button>
                                </Link>
                            </div>
                        </div> */}
                    </div>
                    {/* {JSON.stringify(data.campaigns)} */}
                    {/* Filters / Charts will go here */}
                    <CampaignTable match={match} data={search(data.campaigns)} />
                </>
            </Section>
        </React.Fragment>
    );
}


export default CampaignListOverview;

