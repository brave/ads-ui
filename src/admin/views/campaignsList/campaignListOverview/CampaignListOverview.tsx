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

const CampaignListOverview = props => {

    const [filters, setFilters] = useState(["current"] as any);

    const { match } = props;

    const tabConfig = [
        { label: "Overview", selected: true, link: match.url },
        { label: "Pacing", selected: false, link: match.url.replace("/overview", "/pacing") },
        { label: "Approvals", selected: false, link: match.url.replace("/overview", "/approvals") },
    ]

    const processData = data => {
    }

    const toggleFilter = filter => {
        let temp = filters;
        if (temp.indexOf(filter) > -1) {
            const index = temp.indexOf(filter);
            temp.splice(index, 1);
        }
        else {
            temp.push(filter);
        }
        setFilters([...temp]);
    }

    const filterCampaigns = campaigns => {
        let temp = campaigns;
        filters.forEach((filter) => {
            if (filter === 'current') {
                temp = temp.filter(campaign => moment(campaign.endAt).toDate() >= moment().toDate());
            }
            if (filter === 'active') {
                temp = temp.filter(campaign => campaign.state === 'active');
            }
        })
        return temp
    }

    const { loading, error, data } = useQuery(CAMPAIGN_LIST_OVERVIEW, {
        onCompleted: processData,
    });


    if (loading) return <></>;

    console.log(data.campaigns);


    return (
        <React.Fragment>

            <TabSelector config={tabConfig} />

            <Text content={"Filters:"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
            <div style={{ display: "flex", alignItems: "center", height: "60px" }}>
                <Chip selected={(filters.indexOf("current") > -1)} onClick={() => toggleFilter("current")} marginRight={"12px"} content={"Current"}></Chip>
                <Chip selected={(filters.indexOf("active") > -1)} onClick={() => toggleFilter("active")} marginRight={"12px"} content={"Active"}></Chip>
                {/* <Chip marginRight={"12px"} selected={false} content={"More ▾"}></Chip> */}
            </div>

            <Section>
                {/* {JSON.stringify(data.campaigns)} */}
                {/* Filters / Charts will go here */}
                <CampaignTable match={match} data={filterCampaigns(data.campaigns)} />
            </Section>
        </React.Fragment>
    );
}


export default CampaignListOverview;

