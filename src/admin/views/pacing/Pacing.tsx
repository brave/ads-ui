import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";

import Section from "../../../components/section/Section";

import { Text } from "../../../components/Text/Text";
import TabSelector from "../../../components/tabSelector/TabSelector";
import { CAMPAIGN_LIST_OVERVIEW } from "./lib/Pacing.queries";
import { useQuery } from "@apollo/react-hooks";

import { processData } from "../dashboard/views/overview/lib/Library";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/TableComponent";
import Chip from "../../../components/chip/Chip";
import moment from "moment";

const Pacing = props => {

    const [filters, setFilters] = useState(["current"] as any);

    const { match } = props;

    const tabConfig = [
        { label: "Campaigns", selected: true, link: match.url },
        { label: "Ad Sets", selected: false, link: match.url.replace("/overview", "/pacing") },
        { label: "Ads", selected: false, link: match.url.replace("/overview", "/approvals") },
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
            Header: 'Start Date',
            accessor: 'startAt',
            sortDescFirst: true,
            Cell: (props) => {
                return new Date(props.row.original.startAt).toLocaleDateString("en-US")
            },
        },
        {
            Header: 'End Date',
            accessor: 'endAt',
            sortDescFirst: true,
            Cell: (props) => {
                return new Date(props.row.original.endAt).toLocaleDateString("en-US")
            },
        },
        {
            Header: 'Pacing',
            accessor: 'pacingIndex',
            Cell: (props) => {
                return props.row.original.pacingIndex ? props.row.original.pacingIndex.toFixed(2) : "N/A"
            },
        },
    ];


    if (loading) return <></>;

    console.log(data.campaigns);


    return (
        <React.Fragment>
            <Section header={"Campaign Pacing"} fullWidthChild={true}>
                <Table data={filterCampaigns(data.campaigns)} columns={columns} tableWidth={1094} columnCount={5} />
            </Section>
        </React.Fragment>
    );
}


export default Pacing;

