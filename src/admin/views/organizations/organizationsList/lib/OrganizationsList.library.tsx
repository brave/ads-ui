import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";

const RejectedSymbol = styled("div")`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid #e32444;
  opacity: 0.9;
  margin-right: 3px;
`;

const ActiveSymbol = styled("div")`
  border-radius: 100%;
  height: 9px;
  width: 9px;
  background-color: #07C806;
  opacity: 0.9;
  margin-right: 5px;
  margin-top: 6px;
  margin-bottom: 4px;
`;

const PendingSymbol = styled("div")`
  border-radius: 100%;
  height: 9px;
  width: 9px;
  background-color: #d1d1da;
  opacity: 0.9;
  margin-right: 5px;
  margin-top: 6px;
  margin-bottom: 4px;
`;

const renderState = state => {
    switch (state) {
        case 'active':
            return <ActiveSymbol title={state} />
        default:
            return <PendingSymbol title={state} />
    }
}

export const columns = [
    {
        Header: 'Organization',
        accessor: 'name',
        Cell: (props) => {
            return (
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/organization/${props.row.original.id}/overview`}>
                            <div title={props.row.original.name}>{props.row.original.name}</div>
                        </Link>
                    </div>
                </div>)
        }
    },
    {
        Header: '',
        accessor: 'state',
        Cell: (props) => {
            return (
                <div style={{ marginLeft: "75px" }}>
                    {
                        renderState(props.row.original.state)
                    }
                </div>)
        }
    },
    {
        Header: 'Email',
        accessor: 'billingEmail',
        sortDescFirst: true,
    },
    {
        Header: 'Referrer',
        accessor: 'referrer'
    }
];

