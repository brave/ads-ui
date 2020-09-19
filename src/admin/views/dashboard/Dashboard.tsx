import React, { useContext, useEffect, useState } from "react";

import { Text } from "../../../components/Text/Text";
import DASHBOARD_QUERY from "./lib/Dashboard.queries";
import { useQuery } from "@apollo/react-hooks";
import { processCampaignsPerCountryChartOptions, processCampaignsUnderReview } from './lib/Dashboard.library';
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from 'highcharts-react-official';

const Dashboard = props => {

    const { loading, error, data } = useQuery(DASHBOARD_QUERY);

    console.log(data);

    if (loading) return <></>;

    return (
        <React.Fragment>
            <div>
                <div style={{ display: "flex", marginBottom: "28px", marginTop: "14px", width: "75%" }}>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "130px", width: "195px", marginRight: "28px" }}>

                        <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginBottom: "2px" }} content={"Campaigns"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
                        </div>
                        <div style={{ display: "flex", height: "74px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Text content={data.campaignCount} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                        </div>

                    </div>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "130px", width: "195px", marginRight: "28px" }}>

                        <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginBottom: "2px" }} content={"Confirmations"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
                        </div>
                        <div style={{ display: "flex", height: "74px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Text content={"2 Billion + "} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                        </div>

                    </div>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "130px", width: "195px", marginRight: "28px" }}>

                        <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginBottom: "2px" }} content={"Organizations"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
                        </div>
                        <div style={{ display: "flex", height: "74px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Text content={"465"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                        </div>

                    </div>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "130px", width: "195px" }}>

                        <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginBottom: "2px" }} content={"Users"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
                        </div>
                        <div style={{ display: "flex", height: "74px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Text content={data.userCount} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                        </div>
                    </div>
                </div>
                <div style={{ width: "75%", border: "1px solid #ededed", borderRadius: "4px" }}>
                    <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center" }}>
                        <Text style={{ marginLeft: "40px" }} content={"Active Campaigns by Geo"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} />

                    </div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'mapChart'}
                        options={processCampaignsPerCountryChartOptions(data.campaignsPerCountry.data)}
                    />
                </div>
                <div style={{ display: "flex", marginBottom: "28px", marginTop: "14px", width: "75%" }}>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "130px", width: "195px", marginRight: "28px" }}>

                        <div style={{ width: "100%", height: "56px", backgroundColor: "white", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginBottom: "2px" }} content={"Pending Approvals"} fontFamily={"Poppins"} sizes={[14, 14, 14, 14, 14]} />
                        </div>
                        <div style={{ display: "flex", height: "74px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Text content={processCampaignsUnderReview(data.campaigns) as any} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


export default Dashboard;

