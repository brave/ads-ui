import React, { Component } from 'react';
import Card from '../../Card/Card';
import { Text } from "../../Text/Text";
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as Highcharts from "highcharts";
import { Chart } from "react-google-charts";
import testData from "./testdata";
import * as _ from "lodash";
import * as S from "./CampaignReport.style";
import moment from "moment";
import OutsideAlerter from "../../OutsideAlerter/OutSideAlerter";
let iconStyle = { cursor: "pointer", fontSize: "28px" };

import { Table, TableHeader, HeaderRow, HeaderCell, TableRow, RowCell } from "../../Table/Table";
import { Icon } from '@material-ui/core';
import Badge from "../../Badge/Badge";
import { deepStrictEqual } from 'assert';

am4core.useTheme(am4themes_animated);

enum Colors {
    Primary = "#4C54D2CC",
    Secondary = "#A0A5EBCC",
    Tertiary = "#9370DBCC",
    Quaternary = "#8B008BCC"
}

class CampaignReport extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            viewCount: null,
            clickCount: null,
            dismissCount: null,
            landedCount: null,
            upvotedCount: null,
            downvotedCount: null,
            metricSelected: [true, true, true, true]
        }
    }

    componentDidMount() {
        this.sumConfirmationTypes(testData.records);
        this.formatChartData(testData.records);
    }

    sumConfirmationTypes(data) {
        let [viewCount, clickCount, dismissCount, landedCount, upvotedCount, downvotedCount] = [0, 0, 0, 0, 0, 0];
        data.forEach((record) => {
            switch (record.confirmationsType) {
                case "view":
                    viewCount += record.confirmationsCount;
                    break;
                case "click":
                    clickCount += record.confirmationsCount;
                    break;
                case "dismiss":
                    dismissCount += record.confirmationsCount;
                    break;
                case "landed":
                    landedCount += record.confirmationsCount;
                    break;
                case "upvoted":
                    upvotedCount += record.confirmationsCount;
                    break;
                case "downvoted":
                    downvotedCount += record.confirmationsCount;
                    break;
            }
        });
        this.setState({ viewCount, clickCount, dismissCount, landedCount, upvotedCount, downvotedCount })
    }

    formatChartData(data) {
        // [
        //     ["Timestamp", "ViewCount", "ClickCount", "DismissCount", "LandedCount"]
        //      ["9/1", "13", "15", "17", "123"]
        //      ["9/2", "13", "15", "17", "123"]
        // ]


        let tableHeader = [["Timestamp", "ViewCount", "ClickCount", "DismissCount", "LandedCount"]];
        let groups = Object.create(null);
        data.forEach(record => {
            if (!groups[record.confirmationsDate]) {
                groups[record.confirmationsDate] = [];
            }

            groups[record.confirmationsDate].push({
                confirmationsType: record.confirmationsType,
                confirmationsCount: record.confirmationsCount
            });
        });

        let result = Object.entries(groups).map(([k, v]) => ({ [k]: v }));

        // Group by Hour 
        let hourlyData = [] as any
        result.forEach((record) => {
            let index = Object.keys(record)[0] as any;
            let dataPoint = { index, viewCount: 0, clickCount: 0, dismissCount: 0, landCount: 0 }
            //@ts-ignore
            record[index].forEach((datum) => {
                switch (datum.confirmationsType) {
                    case "view":
                        dataPoint.viewCount += datum.confirmationsCount;
                        return;
                    case "click":
                        dataPoint.clickCount += datum.confirmationsCount;
                        return;
                    case "dismiss":
                        dataPoint.dismissCount += datum.confirmationsCount;
                        return;
                    case "landed":
                        dataPoint.landCount += datum.confirmationsCount;
                        return;
                }
            });
            hourlyData.push(dataPoint);

        })

        let seriesData = [] as any;
        let clicksData = [] as any;
        let dismissData = [] as any;
        let landedData = [] as any;
        let categories = [] as any;
        hourlyData.forEach((data) => {
            console.log(data);
            seriesData.push([data.viewCount]);
            clicksData.push([data.clickCount]);
            dismissData.push([data.dismissCount]);
            landedData.push([data.landCount]);

            var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' };
            var today = new Date(data.index);

            categories.push([today.toLocaleDateString("en-US", options)])
        });

        var myChart = Highcharts.chart('container', {
            chart: {
                zoomType: "x",
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
                categories,

                labels: {
                    step: 48,
                    rotation: 45,
                }
            },
            yAxis: {
                opposite: true,
                title: {
                    text: undefined
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Views',
                data: seriesData,
                color: Colors.Primary
            },
            {
                name: "Clicks",
                data: clicksData,
                color: Colors.Secondary
            },
            {
                name: "Dismiss",
                data: dismissData,
                color: Colors.Tertiary
            },
            {
                name: "Lands",
                data: landedData,
                color: Colors.Quaternary
            }] as any
        });

        var myChart2 = Highcharts.chart('container2', {
            chart: {
                type: "column"
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
                categories,
                labels: {
                    step: 23
                }
            },
            yAxis: {
                title: {
                    text: undefined
                },
                opposite: true,
                tickAmount: 1
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'Views',
                data: seriesData.slice(seriesData.length - 24),
                stack: 'Count',
                color: Colors.Primary
            },
            {
                name: "Clicks",
                data: clicksData.slice(seriesData.length - 24),
                stack: 'Count',
                color: Colors.Secondary
            },
            {
                name: "Dismiss",
                data: dismissData.slice(seriesData.length - 24),
                stack: 'Count',
                color: Colors.Tertiary
            },
            {
                name: "Lands",
                data: landedData.slice(seriesData.length - 24),
                stack: 'Count',
                color: Colors.Quaternary
            }] as any
        });

        var myChart3 = Highcharts.chart('container3', {
            chart: {
                type: "spline"
            },
            title: {
                text: undefined
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ["Views", "Clicks", "Lands"]
            },
            yAxis: {
                title: {
                    text: undefined
                },
                opposite: true,
                tickAmount: 5
            },
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Count',
                data: [250000, 100000, 10000],
                color: Colors.Primary
            }] as any
        });


        console.log(hourlyData);
        var test = _.groupBy(hourlyData, function (date) {
            return moment(date.index).startOf('day').format();
        });

        var test2 = _.groupBy(hourlyData, function (date) {
            return moment(date.index).startOf('week').format();
        });

        var test3 = _.groupBy(hourlyData, function (date) {
            return moment(date.index).startOf('month').format();
        });
        console.log(test);
        console.log(test2);
        console.log(test3);
    }

    public toggleMenu = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
        }));
    };

    public closeMenu = () => {
        this.setState({
            menuOpen: false
        });
    };

    public toggleMetric = (index) => {
        let metricSelected = this.state.metricSelected
        metricSelected[index] = !metricSelected[index];
        this.setState({ metricSelected })
    }

    render() {
        const options = {
            hAxis: { gridlines: { count: 2 } },
            vAxis: { gridlines: { count: 2 } },
            focusTarget: 'category',
            legend: "none",
            series: [
                { color: 'blue', visibleInLegend: false }, {}, {},
                { color: 'red', visibleInLegend: false }
            ]
        };
        const data = [
            ["Age", "Weight"],
            [8, 12],
            [4, 5.5],
            [11, 14],
            [4, 5],
            [3, 3.5],
            [6.5, 7]
        ];
        return (
            <Card style={{ width: '100%' }}>
                <div style={{}}>

                    {/* Row 1 */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "30%" }} key='a1'>
                            <div style={{}}>
                                <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
                                    State of the DApps
                                </Text>
                                <Text style={{ marginTop: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                    State of the DApps - Dev Channel
                                </Text>
                            </div>
                            {/* <div style={{ marginTop: "24px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "25%", height: '25%', marginTop: "5px" }}>

                                    <Progress theme={{
                                        active: {
                                            symbol: '',
                                            color: '#F1906D'
                                        }
                                    }} status="active" percent={88} />
                                </div>
                            </div> */}
                        </div>
                        <div>
                            <OutsideAlerter onOutsideClick={this.closeMenu}>
                                <div style={{ position: "relative" }}>
                                    <Icon onClick={this.toggleMenu} style={iconStyle}>
                                        more_vertical
                                    </Icon>
                                    <S.Menu open={this.state.menuOpen}>
                                        <S.MenuItem onClick={this.props.signOut}>
                                            <Text fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                                Download CSV
                                            </Text>
                                        </S.MenuItem>
                                    </S.Menu>
                                </div>
                            </OutsideAlerter>
                        </div>

                    </div>

                    {/* Row 2 */}
                    <div style={{ display: 'flex', marginTop: "72px" }}>

                        <S.Statistic selected={this.state.metricSelected[0]} color={Colors.Primary} onClick={() => { this.toggleMetric(0) }} >
                            <div>
                                <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                    Views
                                </Text>
                                <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                    {this.state.viewCount}
                                </Text>
                            </div>
                        </S.Statistic>
                        <S.Statistic selected={this.state.metricSelected[1]} color={Colors.Secondary} onClick={() => { this.toggleMetric(1) }} >
                            <div>
                                <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                    Clicks
                                </Text>
                                <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                    {this.state.viewCount}
                                </Text>
                            </div>
                        </S.Statistic>
                        <S.Statistic selected={this.state.metricSelected[2]} color={Colors.Tertiary} onClick={() => { this.toggleMetric(2) }} >
                            <div>
                                <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                    Dismissed
                                </Text>
                                <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                    {this.state.viewCount}
                                </Text>
                            </div>
                        </S.Statistic>
                        <S.Statistic selected={this.state.metricSelected[3]} color={Colors.Quaternary} onClick={() => { this.toggleMetric(3) }} >
                            <div>
                                <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                    10s Visits
                                </Text>
                                <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                    {this.state.viewCount}
                                </Text>
                            </div>
                        </S.Statistic>
                        <div style={{ marginLeft: "auto", marginTop: "auto" }}>
                            <select
                                value={"Hourly"}
                                style={{ marginTop: "-5px", backgroundColor: "white", height: "30px" }}
                            >
                                {["Hourly", "Daily", "Weekly", "Monthly"].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    {/* Row 3 */}
                    <div key='b'>
                        <div id="container" style={{ width: "100%", paddingTop: "36px" }}>

                        </div>

                    </div>

                    {/* Row 4 */}
                    <div style={{ display: "flex", marginTop: "36px" }}>
                        <div style={{ width: "50%", marginRight: "14px" }} key='c1'>
                            <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                Calculated Statistics
                                </Text>
                            <Table>
                                <TableRow>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Click-Through Rate</Text>
                                    </RowCell>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>57%</Text>
                                    </RowCell>
                                </TableRow>
                                <TableRow>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Land-Through Rate</Text>
                                    </RowCell>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>27%</Text>
                                    </RowCell>
                                </TableRow>
                                <TableRow>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Dismiss Rate</Text>
                                    </RowCell>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>27%</Text>
                                    </RowCell>
                                </TableRow>
                                <TableRow>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Click-to-Land Rate</Text>
                                    </RowCell>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>27%</Text>
                                    </RowCell>
                                </TableRow>
                                <TableRow>
                                    <RowCell style={{}}>
                                        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Popularity</Text>
                                    </RowCell>
                                    <RowCell style={{}}>
                                        <Progress theme={{
                                            active: {
                                                symbol: '',
                                                color: '#A0A5EB'
                                            }
                                        }} status="active" percent={88} />
                                    </RowCell>
                                </TableRow>
                            </Table>
                        </div>
                        <div style={{ width: "50%", marginLeft: "14px" }} key='d'>
                            <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                Realtime Statistics
                                </Text>
                            <div id="container2" style={{ width: "100%", paddingTop: "36px" }}>
                            </div>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div style={{ display: "flex", marginTop: "36px", marginRight: "14px" }}>
                        <div style={{ width: "50%", height: "100%", display: "flex" }} key='c1'>
                            <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                Platform Statistics
                                </Text>
                            <Badge>
                                <Text fontFamily={"Poppins"} sizes={[18, 18, 15, 15, 15]}>
                                    Coming Soon!
                                </Text>
                            </Badge>
                        </div>
                        <div style={{ width: "50%", marginLeft: "14px" }} key='d'>
                            <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                Decision Curve
                                </Text>
                            <div id="container3" style={{ width: "100%", paddingTop: "36px" }}>
                            </div>
                        </div>
                    </div>
                </div>
            </Card >
        );
    }
}

export default CampaignReport;