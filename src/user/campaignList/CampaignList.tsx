import React, { useContext, useEffect, useState, useRef } from "react";

import * as _ from "lodash";

import Section from "../../components/section/Section";

import { Text } from "../../components/Text/Text";
import { CAMPAIGN_LIST_OVERVIEW } from "./lib/CampaignList.queries";
import { useQuery } from "@apollo/react-hooks";

import Table from "../../components/Table/TableComponent";
import { Link } from "react-router-dom";



const CampaignList = props => {


    const { match } = props;

    const { loading, error, data } = useQuery(CAMPAIGN_LIST_OVERVIEW, {});

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
        }
    ];

    if (loading) return <></>;

    // console.log(data.campaigns);

    return (
        <div>
            <Section fullWidthChild={true}>
                Campaign List!
                {/* <Table data={data.campaigns} columns={columns} tableWidth={1094} columnCount={5} /> */}
            </Section>
        </div>
    );
}


export default CampaignList;

