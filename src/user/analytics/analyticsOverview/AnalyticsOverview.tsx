import React, { useContext, useEffect, useState, useRef, useMemo } from "react";

import * as _ from "lodash";

import Section from "../../../components/section/Section";

import { Text } from "../../../components/Text/Text";
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import HighchartsSankey from "highcharts/modules/sankey";
import highcharts3d from 'highcharts/highcharts-3d'

import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

import { useQuery } from "@apollo/react-hooks";
import { ANALYTICS_OVERVIEW } from "./lib/AnalyticsOverview.queries";
import TabSelector from "../../../components/tabSelector/TabSelector";
import { downloadCSV, testing, processData, prepareChart, prepareSankey, formatMetric } from "./lib/AnalyticsOverview.library";
import PopoutExample from "./lib/Popout";

import * as S from "./styles/AnalyticsOverview.style";

HighchartsSankey(Highcharts);
highcharts3d(Highcharts);

const AnalyticsOverview = props => {

    const { auth, match } = props;

    const tabConfig = [
        { label: "Overview", selected: true, link: match.url }
    ]

    const [metric1, setMetric1] = useState("impressions");
    const [metric2, setMetric2] = useState("clicks");
    const [metric3, setMetric3] = useState("landings");
    const [metric4, setMetric4] = useState("conversions");
    const [grouping, setGrouping] = useState("daily")
    const [downloadingCSV, setDownloadingCSV] = useState(false);

    const { loading, error, data } = useQuery(ANALYTICS_OVERVIEW, {
        variables: { id: match.params.campaignId }
    });

    let campaign;
    let processedData;
    let options;
    let options2;

    if (data) {
        campaign = testing.data.campaign;
        processedData = processData(campaign.engagements, metric1, metric2, metric3, metric4, grouping);
        options = prepareChart(metric1, processedData.metric1DataSet, metric2, processedData.metric2DataSet, metric3, processedData.metric3DataSet, metric4, processedData.metric4DataSet);
        options2 = prepareSankey(processedData.impressions, processedData.clicks, processedData.landings, processedData.conversions);
        console.log(JSON.stringify(processedData));
    }

    if (loading) return <></>;
    return (
        <div>

            {/* Top Row */}
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "28px" }}>
                <Text content={campaign.name} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 26]} />
                {
                    downloadingCSV ?
                        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}><Text content={"Downloading Report..."} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} /><Icon style={{ fontSize: "17px", marginLeft: "8px", marginBottom: "4px" }}>save_alt</Icon></div> :
                        <div onClick={() => downloadCSV(campaign.id, campaign.name, auth.accessToken, auth.id, setDownloadingCSV)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}><Text content={"Download Report"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} /><Icon style={{ fontSize: "17px", marginLeft: "8px", marginBottom: "4px" }}>save_alt</Icon></div>
                }
            </div>

            <TabSelector config={tabConfig} />

            <div style={{ display: "flex" }}>

                {/* Left Side (Metrics + Chart) */}
                <div style={{ width: "75%" }}>
                    <div style={{ display: "flex", marginBottom: "28px", marginTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "7px" }}>
                                    <PopoutExample setMetric1={setMetric1} initialValue={{ value: "impressions", label: "Impressions" }} />
                                </div>
                                <div>
                                    <Text content={formatMetric(processedData, metric1)} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <PopoutExample setMetric1={setMetric2} initialValue={{ value: "clicks", label: "Clicks" }} />
                                </div>
                                <div>
                                    <Text content={formatMetric(processedData, metric2)} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <PopoutExample setMetric1={setMetric3} initialValue={{ value: "landings", label: "10s Landings" }} />
                                </div>
                                <div>
                                    <Text content={formatMetric(processedData, metric3)} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <PopoutExample setMetric1={setMetric4} initialValue={{ value: "conversions", label: "Conversions" }} />
                                </div>
                                <div>
                                    <Text content={formatMetric(processedData, metric4)} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "450px", marginBottom: "28px", padding: "28px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <S.Grouping style={{ marginLeft: "auto", color: "grey", cursor: "default" }} selected={grouping === "null"}>Group By:</S.Grouping>
                            <S.Grouping onClick={() => setGrouping("hourly")} selected={grouping === "hourly"}>Hour</S.Grouping>
                            <S.Grouping onClick={() => setGrouping("daily")} selected={grouping === "daily"}>Day</S.Grouping>
                            <S.Grouping onClick={() => setGrouping("weekly")} selected={grouping === "weekly"}>Week</S.Grouping>
                            <S.Grouping onClick={() => setGrouping("monthly")} selected={grouping === "monthly"}>Month</S.Grouping>
                        </div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>

                </div>

                {/* Right Side (Live Feed) */}
                <div style={{ width: "25%" }}>
                    <div style={{ marginTop: "14px", border: "1px solid #ededed", borderRadius: "4px", height: "588px", marginLeft: "28px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "125px", height: "35px", borderRadius: "4px", backgroundColor: "#FB7959", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text content={"Coming Soon!"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", marginBottom: "28px" }}>
                <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "225px", width: "50%", marginRight: "14px", padding: "28px" }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options2}
                    />
                </div>
                <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "225px", width: "50%", marginLeft: "14px", padding: "28px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "125px", height: "35px", borderRadius: "4px", backgroundColor: "#FB7959", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text content={"Coming Soon!"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} />
                    </div>
                </div>
            </div>
        </div >
    );
}


export default AnalyticsOverview;

