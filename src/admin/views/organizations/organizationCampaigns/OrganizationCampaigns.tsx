import React, { useContext, useEffect, useState } from "react";

import Section from "../../../../components/section/Section";

import { Text } from "../../../../components/Text/Text";
import { ORGANIZATION_CAMPAIGNS } from "./lib/OrganizationCampaigns.queries";
import { useQuery } from "@apollo/react-hooks";

import { Link } from "react-router-dom";
import Table from "../../../../components/Table/TableComponent";
import { columns } from "./lib/OrganizationCampaigns.library";
import { Icon } from "@material-ui/core";

import { Button } from "../../../../components/formElements/formElements";
import OrganizationImage from "./assets/Organization.png";

import * as S from "./styles/OrganizationCampaigns.style";
import TabSelector from "../../../../components/tabSelector/TabSelector";

const OrganizationCampaigns = props => {

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
        { label: "Overview", selected: false, link: match.url.replace("/campaigns", "") + "/overview" },
        { label: "Campaigns", selected: true, link: match.url.replace("/campaigns", "") + "/campaigns" },
    ]

    const { loading, error, data } = useQuery(ORGANIZATION_CAMPAIGNS, {
        variables: { id: match.params.advertiserId }
    });

    if (loading) return <></>;

    console.log(data);

    let newData = [] as any;

    data.advertiser.campaigns.forEach((campaign) => {
        campaign.userId = data.advertiser.userAdvertisers[0].userId;
        campaign.advertiserId = data.advertiser.id;
        newData.push(campaign);
    })


    return (
        <div style={{ overflow: "hidden" }}>

            <TabSelector config={tabConfig} />

            <Section fullWidthChild={true}>
                <>
                    <div style={{ marginBottom: "56px" }}>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "7px" }}>

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
                    <Table data={search(newData)} columns={columns} tableWidth={1094} columnCount={7} />
                </>
            </Section>
        </div>
    );
}


export default OrganizationCampaigns;

