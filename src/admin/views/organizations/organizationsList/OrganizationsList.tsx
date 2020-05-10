import React, { useContext, useEffect, useState } from "react";

import Section from "../../../../components/section/Section";

import { Text } from "../../../../components/Text/Text";
import { ORGANIZATIONS_LIST_OVERVIEW } from "./lib/OrganizationsList.queries";
import { useQuery } from "@apollo/react-hooks";

import { Link } from "react-router-dom";
import Table from "../../../../components/Table/TableComponent";
import { columns } from "./lib/OrganizationsList.library";
import { Icon } from "@material-ui/core";
import OrganizationListImage from "./assets/OrganizationList.png";
import { Button } from "../../../../components/formElements/formElements";

import * as S from "./styles/OrganizationList.style";

const OrganizationsList = props => {

    const [searchQuery, setSearchQuery] = useState('');

    const { match } = props;

    const search = advertisers => {
        if (searchQuery !== '') {
            return advertisers.filter(advertiser =>
                advertiser.name.toLowerCase().search(searchQuery.toLowerCase()) > -1
            )
        }
        else {
            return advertisers;
        }
    }

    const { loading, error, data } = useQuery(ORGANIZATIONS_LIST_OVERVIEW, {});

    if (loading) return <></>;

    console.log(data.advertisers);


    return (
        <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex" }}>
                <div>
                    <img style={{ height: "110px" }} src={OrganizationListImage} />
                </div>
                <div style={{ width: "600px", marginLeft: "21px" }}>
                    <div style={{ fontSize: "18px", fontFamily: "Poppins", marginTop: "10px" }}>
                        Organizations
                </div>
                    <div style={{ fontSize: "14px", fontFamily: "Muli", marginLeft: "2px", marginTop: "14px", marginBottom: "42px" }}>
                        Organizations are advertising agencies which can have one or many members. Members of an organization can create campaigns and review delivery analytics.
                </div>
                </div>
            </div>

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
                        <div style={{ display: "flex" }}>
                            <div style={{ marginLeft: "auto" }}>
                                <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/organization/new`}>
                                    <Button style={{ width: "175px", marginTop: "14px" }}>
                                        <Text content={"New Organization"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table data={search(data.advertisers)} columns={columns} tableWidth={1094} columnCount={3} />
                </>
            </Section>
        </div>
    );
}


export default OrganizationsList;

