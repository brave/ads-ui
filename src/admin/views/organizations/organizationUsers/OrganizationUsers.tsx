import React, { useContext, useEffect, useState } from "react";

import Section from "../../../../components/section/Section";

import { Text } from "../../../../components/Text/Text";
import { ORGANIZATION_USERS } from "./lib/OrganizationUsers.queries";
import { useQuery } from "@apollo/react-hooks";

import { Link } from "react-router-dom";
import Table from "../../../../components/Table/TableComponent";
import { columns } from "./lib/OrganizationUsers.library";
import { Icon } from "@material-ui/core";

import { Button } from "../../../../components/formElements/formElements";

import * as S from "./styles/OrganizationUsers.style";
import TabSelector from "../../../../components/tabSelector/TabSelector";

const OrganizationCampaigns = props => {

    const [searchQuery, setSearchQuery] = useState('');

    const { match } = props;

    const tabConfig = [
        { label: "Overview", selected: false, link: match.url.replace("/users", "") + "/overview" },
        { label: "Users", selected: true, link: match.url.replace("/users", "") + "/users" },
        { label: "Campaigns", selected: false, link: match.url.replace("/users", "") + "/campaigns" },
        { label: "Creatives", selected: false, link: match.url.replace("/users", "") + "/creatives" },
        { label: "Invoices", selected: false, link: match.url.replace("/users", "") + "/invoices" },
    ]

    const { loading, error, data } = useQuery(ORGANIZATION_USERS, {
        variables: { id: match.params.advertiserId }
    });

    if (loading) return <></>;

    console.log(data);

    let newData = [] as any;
    newData.push(data.advertiser.userAdvertisers[0].user);

    return (
        <div style={{ overflow: "hidden" }}>

            <TabSelector config={tabConfig} />

            <Section fullWidthChild={true}>
                <>
                    <div style={{ marginBottom: "56px" }}>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "7px" }}>
                            {/* <div style={{
                                display: "flex", alignItems: "center", border: "1px solid #e2e2e2", height: "36px", width: "1100px", borderRadius: "4px", marginBottom: "7px"
                            }}>
                                <Icon
                                    style={{ color: "#393A46", marginLeft: "8px", opacity: 0.5 }}
                                >
                                    search
                                </Icon>
                                <S.SearchInput onChange={event => setSearchQuery(event.target.value)} type="text" placeholder="Search" />

                            </div> */}

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
                    <Table data={newData} columns={columns} tableWidth={1094} columnCount={4} />
                </>
            </Section>
        </div>
    );
}


export default OrganizationCampaigns;

