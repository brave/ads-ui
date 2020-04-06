import React, { useContext, useEffect, useState, useRef } from "react";

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

HighchartsSankey(Highcharts);
highcharts3d(Highcharts);

const AnalyticsOverview = props => {

    const { match } = props;

    const { loading, error, data } = useQuery(ANALYTICS_OVERVIEW, {
        variables: { id: match.params.campaignId }
    });

    const tabConfig = [
        { label: "Overview", selected: true, link: match.url.replace("/pacing", "/overview") },
        { label: "Audience", selected: false, link: match.url },
        { label: "Engagement", selected: false, link: match.url },
        { label: "Performance", selected: false, link: match.url },
    ]

    if (loading) return <></>;

    console.log(data);
    console.log(match);

    const campaign = data.campaign;

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const options = {
        chart: {
            type: "spline",
            zoomType: "x",
            height: "394",
            spacingTop: 0,
            spacingBottom: 0,
            spacingRight: 0,
            spacingLeft: 0,
        },
        title: {
            text: undefined
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            opposite: true,
            title: {
                text: undefined
            },
            tickAmount: 4
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            spline: {
                connectNulls: true
            }
        },
        series: [{
            name: 'Views',
            data: [[randomDate(new Date(2012, 0, 1), new Date()).getTime(), 123], [new Date().getTime(), 123]],
            connectNulls: true
        },
        {
            name: 'Clicks',
            data: [[new Date().getTime(), 123]],
            connectNulls: true
        },
        {
            name: 'Dismissed',
            data: [[new Date().getTime(), 123]],
            connectNulls: true
        },
        {
            name: '10s Visits',
            data: [[new Date().getTime(), 123]],
            connectNulls: true
        }] as any
    } as any;

    const sankey = {
        chart: {
            height: "169px",
            spacingTop: 0,
            spacingBottom: 0,
            spacingRight: 0,
            spacingLeft: 0,
        },
        title: {
            text: undefined
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: [
                ['Impressions', 'Clicks', 1300],
                ['Clicks', '10s Visit', 325],
                ['Clicks', 'Conversion', 30],
            ],
            type: 'sankey',
            name: 'Sankey demo series'
        }]
    } as any;

    const donut = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 50,
                beta: 0
            },
            height: "169px",
            spacingTop: 0,
            spacingBottom: 0,
            spacingRight: 0,
            spacingLeft: 0,
        },
        title: {
            text: undefined
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]
        }]
    } as any;

    return (
        <div>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "-14px" }}>
                <Text content={campaign.name} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 26]} />
                <div style={{ display: "flex", alignItems: "center" }}><Text content={"Download Report"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 14]} /><Icon style={{ fontSize: "17px", marginLeft: "8px", marginBottom: "4px" }}>save_alt</Icon></div>
            </div>
            <TabSelector config={tabConfig} />
            <div style={{ display: "flex" }}>
                <div style={{ width: "75%" }}>
                    <div style={{ display: "flex", marginBottom: "28px", marginTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <Text content={"Impressions"} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 14]} />
                                </div>
                                <div>
                                    <Text content={"1,000,000"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <Text content={"Clicks"} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 14]} />
                                </div>
                                <div>
                                    <Text content={"1,000"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", marginRight: "28px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <Text content={"Conversions"} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 14]} />
                                </div>
                                <div>
                                    <Text content={"300,000"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "195px", padding: "28px" }}>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", marginBottom: "7px" }}>
                                    <Text content={"10s Visit"} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 14]} />
                                </div>
                                <div>
                                    <Text content={"12,000"} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 22]} />
                                </div>
                            </div>
                        </div>
                        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ededed", borderRadius: "4px", height: "110px", width: "340px", padding: "28px" }}>

                </div> */}
                    </div>
                    <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "450px", marginBottom: "28px", padding: "28px" }}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>

                </div>
                <div style={{ width: "25%" }}>
                    <div style={{ marginTop: "14px", border: "1px solid #ededed", borderRadius: "4px", height: "588px", marginLeft: "28px" }}>

                    </div>
                </div>
            </div>

            <div style={{ display: "flex", marginBottom: "28px" }}>
                <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "225px", width: "50%", marginRight: "14px", padding: "28px" }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={sankey}
                    />
                </div>
                <div style={{ border: "1px solid #ededed", borderRadius: "4px", height: "225px", width: "50%", marginLeft: "14px", padding: "28px" }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={donut}
                    />
                </div>
            </div>
        </div >
    );
}


export default AnalyticsOverview;

