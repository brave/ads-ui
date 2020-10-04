import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";

import Section from "../../../components/section/Section";

import { Text } from "../../../components/Text/Text";
import TabSelector from "../../../components/tabSelector/TabSelector";
import { CAMPAIGN_LIST_OVERVIEW } from "./lib/Pacing.queries";
import { useQuery } from "@apollo/react-hooks";

import Table from "../../../components/Table/TableComponent";
import Chip from "../../../components/chip/Chip";
import moment from "moment";
import * as S from "./styles/Pacing.style";
import { Icon } from "@material-ui/core";

import { columns } from './lib/Pacing.library';

const Pacing = props => {

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

    const tabConfig = [
        { label: "Campaigns", selected: true, link: match.url },
        { label: "Ad Sets", selected: false, link: match.url.replace("/overview", "/pacing") },
        { label: "Ads", selected: false, link: match.url.replace("/overview", "/approvals") },
    ]

    const processData = data => {
    }

    const { loading, error, data } = useQuery(CAMPAIGN_LIST_OVERVIEW, {
        onCompleted: processData,
    });

    if (loading) return <></>;

    console.log(data.campaigns);

    let filteredData = [] as any;

    if (data.campaigns) {
        data.campaigns.forEach((campaign) => {
            if (moment(campaign.startAt) <= moment() && moment(campaign.endAt) > moment() && (campaign.state === 'active' || campaign.state === 'daycomplete') && campaign.type !== 'house') {
                filteredData.push(campaign);
            }
        })
    }


    return (
        <React.Fragment>
            <Section header={"Campaign Pacing"} fullWidthChild={true}>
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
                    </div>
                    <Table data={search(filteredData)} columns={columns} tableWidth={1094} columnCount={8} />
                </>
            </Section>
        </React.Fragment>
    );
}


export default Pacing;

