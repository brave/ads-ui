// Campaign name
// Budget
// State
// Spend
// CPM / CPC price
// Start At
// End At 
// Recommended Daily Budget
// Views (K) / Clicks
// Pacing (Color Coded)

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as S from '../styles/Pacing.style';

export const columns = [
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
        Header: 'Status',
        accessor: 'state',
        Cell: (props) => {
            return props.row.original.state === "active" ? <div style={{ marginLeft: "16px" }} title="Active"><S.ActiveSymbol /></div> : <div style={{ marginLeft: "16px" }} title={props.row.original.state}><S.PendingSymbol /></div>
        }
    },
    {
        Header: 'Budget',
        accessor: 'budget',
        Cell: (props) => {
            return props.row.original.currency === "USD" ? `$${props.row.original.budget.toFixed(2)}` : `${props.row.original.budget.toFixed(2)} BAT`
        }
    },
    {
        Header: 'Spend',
        accessor: 'spent',
        Cell: (props) => {
            return props.row.original.currency === "USD" ? `$${props.row.original.spent.toFixed(2)}` : `${props.row.original.spent.toFixed(2)} BAT`
        }
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
        Header: 'Daily Pacing',
        accessor: 'dailyPacingIndex',
        Cell: (props) => {
            if (props.row.original.dailyPacingIndex >= 0.8 && props.row.original.dailyPacingIndex < 1.2) {
                return <div style={{ backgroundColor: "#3CCE35", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.dailyPacingIndex ? `${(props.row.original.dailyPacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            } else if ((props.row.original.dailyPacingIndex >= 0.5 && props.row.original.dailyPacingIndex < 0.8) || (props.row.original.dailyPacingIndex >= 1.2 && props.row.original.dailyPacingIndex < 1.5)) {
                return <div style={{ backgroundColor: "#FC775B", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.dailyPacingIndex ? `${(props.row.original.dailyPacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            } else {
                return <div style={{ backgroundColor: "#e32444", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.dailyPacingIndex ? `${(props.row.original.dailyPacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            }
        },
    },
    {
        Header: 'Total Pacing',
        accessor: 'pacingIndex',
        Cell: (props) => {

            if (props.row.original.pacingIndex >= 0.8 && props.row.original.pacingIndex < 1.2) {
                return <div style={{ backgroundColor: "#3CCE35", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.pacingIndex ? `${(props.row.original.pacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            } else if ((props.row.original.pacingIndex >= 0.5 && props.row.original.pacingIndex < 0.8) || (props.row.original.pacingIndex >= 1.2 && props.row.original.pacingIndex < 1.5)) {
                return <div style={{ backgroundColor: "#FC775B", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.pacingIndex ? `${(props.row.original.pacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            } else {
                return <div style={{ backgroundColor: "#e32444", borderRadius: "4px", padding: "6px", fontSize: "15px", color: "white", minWidth: "76px", textAlign: "center", fontWeight: "bold" }}>{props.row.original.pacingIndex ? `${(props.row.original.pacingIndex * 100).toFixed(2)}%` : "N/A"}</div>
            }

        },
    },
];