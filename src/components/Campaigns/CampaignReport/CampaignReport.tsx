import React, { Component } from 'react';
import Card from '../../Card/Card';
import { Text } from "../../Text/Text";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import * as Highcharts from "highcharts";
import testData from "./testdata3";
import * as _ from "lodash";
import * as S from "./CampaignReport.style";
import moment from "moment";
import OutsideAlerter from "../../OutsideAlerter/OutSideAlerter";
import axios from "axios";
let iconStyle = { cursor: "pointer", fontSize: "24px" };

import { Table, TableHeader, HeaderRow, HeaderCell, TableRow, RowCell } from "../../Table/Table";
import { Icon } from '@material-ui/core';
import Badge from "../../Badge/Badge";

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
            viewCount: 0,
            clickCount: 0,
            dismissCount: 0,
            landedCount: 0,
            upvotedCount: null,
            downvotedCount: null,
            metricSelected: [true, true, true, true],
            timeInterval: 'Daily'
        }
    }

    componentDidMount() {
            this.sumConfirmationTypes(this.props.report.records);
            this.formatChartData(this.props.report.records);
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
                case "upvote":
                    upvotedCount += record.confirmationsCount;
                    break;
                case "downvote":
                    downvotedCount += record.confirmationsCount;
                    break;
            }
        });
        this.setState({ viewCount, clickCount, dismissCount, landedCount, upvotedCount, downvotedCount }, 
            () => {this.formatChartData(this.props.report.records)})
    }

    formatChartData(data) {

        let processedData = processData(data);
        switch(this.state.timeInterval){
            case 'Hourly':
            processedData = _.groupBy(processedData, function (date) {
                return moment(date.index).startOf('hour').format();
            });
            break;
            case 'Daily':
            processedData = _.groupBy(processedData, function (date) {
                return moment(date.index).startOf('day').format();
                    });
            break;
            case 'Weekly': 
            processedData = _.groupBy(processedData, function (date) {
                return moment(date.index).startOf('week').format();
            });
            break;
            case 'Monthly':
            processedData = _.groupBy(processedData, function (date) {
                return moment(date.index).startOf('month').format();
            });
            break;
        }

        let viewData = [] as any;
        let clickData = [] as any;
        let dismissData = [] as any;
        let landData = [] as any;
        Object.keys(processedData).forEach((key) => {
            let viewCount = 0; let clickCount = 0; let dismissCount = 0; let landCount = 0;
            processedData[key].forEach((data) => {
                viewCount += data.viewCount;
                clickCount += data.clickCount;
                dismissCount += data.dismissCount;
                landCount += data.landCount;
            });
            if(!isNaN(new Date(key).getTime())){
            viewData.push([new Date(key).getTime(), viewCount])
            clickData.push([new Date(key).getTime(), clickCount])
            dismissData.push([new Date(key).getTime(), dismissCount])
            landData.push([new Date(key).getTime(), landCount])
            }
        });

        viewData = _.sortBy(viewData, (element) => {
            return Object.values(element)[0]
        });
        clickData = _.sortBy(clickData, (element) => {
            return Object.values(element)[0]
        });
        dismissData = _.sortBy(dismissData, (element) => {
            return Object.values(element)[0]
        });
        landData = _.sortBy(landData, (element) => {
            return Object.values(element)[0]
        });

        if(!this.state.metricSelected[0]){
            viewData = [];
        }
        if(!this.state.metricSelected[1]){
            clickData = [];
        }
        if(!this.state.metricSelected[2]){
            dismissData = [];
        }
        if(!this.state.metricSelected[3]){
            landData = [];
        }

        console.log(viewData);

        var myChart = Highcharts.chart('container', {
            chart: {
                type: "spline",
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
                type: 'datetime'
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
            plotOptions: {
                spline: {
                    connectNulls: true
                }
            },
            series: [{
                name: 'Views',
                data: viewData,
                color: Colors.Primary,
                turboThreshold: 1000000,
                connectNulls: true
            },
            {
                name: 'Clicks',
                data: clickData,
                color: Colors.Secondary,
                turboThreshold: 1000000,
                connectNulls: true
            },
            {
                name: 'Dismissed',
                data: dismissData,
                color: Colors.Tertiary,
                turboThreshold: 1000000,
                connectNulls: true
            },
            {
                name: '10s Visits',
                data: landData,
                color: Colors.Quaternary,
                turboThreshold: 1000000,
                connectNulls: true
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
                type: "datetime"
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
                data: viewData.slice(viewData.length - 24),
                stack: 'Count',
                color: Colors.Primary
            },
            {
                name: "Clicks",
                data: clickData.slice(clickData.length - 24),
                stack: 'Count',
                color: Colors.Secondary
            },
            {
                name: "Dismiss",
                data: dismissData.slice(dismissData.length - 24),
                stack: 'Count',
                color: Colors.Tertiary
            },
            {
                name: "Lands",
                data: landData.slice(landData.length - 24),
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
                data: [this.state.viewCount, this.state.clickCount, this.state.landedCount],
                color: Colors.Primary
            }] as any
        });


        // var test = _.groupBy(hourlyData, function (date) {
        //     return moment(date.index).startOf('day').format();
        // });

        // var test2 = _.groupBy(hourlyData, function (date) {
        //     return moment(date.index).startOf('week').format();
        // });

        // var test3 = _.groupBy(hourlyData, function (date) {
        //     return moment(date.index).startOf('month').format();
        // });
        // console.log(test);
        // console.log(test2);
        // console.log(test3);
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
        let that = this;
        let metricSelected = this.state.metricSelected
        metricSelected[index] = !metricSelected[index];
        this.setState({ metricSelected }, () => {
            that.formatChartData(this.props.report.records);
        })
    }

    public setTimeInterval = (e) => {
        let that = this;
        this.setState({timeInterval: e.target.value}, () => {
            that.formatChartData(this.props.report.records);
        });
    }

    render() {
        const { campaign, report, advertiser } = this.props;
        return (
            <div key={campaign.name}>
                {/* Row 1 */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "14px", paddingRight: "14px" }}>
                    <div style={{ width: "30%" }} key='a1'>
                        <div style={{}}>
                            <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
                                {this.props.advertiser.name}
                            </Text>
                            <Text style={{ marginTop: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                                {this.props.campaign.name}
                            </Text>
                        </div>
                    </div>
                    <div>
                        <OutsideAlerter onOutsideClick={this.closeMenu}>
                            <div style={{ position: "relative" }}>
                                <Icon onClick={this.toggleMenu} style={iconStyle}>
                                    more_vertical
                                    </Icon>
                                <S.Menu open={this.state.menuOpen}>
                                    <S.MenuItem onClick={() => { this.downloadCSV(campaign) }}>
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
                <div style={{ display: 'flex', marginTop: "72px", paddingLeft: "14px", paddingRight: "14px" }}>

                    <S.Statistic selected={this.state.metricSelected[0]} color={Colors.Primary} onClick={() => { this.toggleMetric(0) }} >
                        <div>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Views
                                </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                {this.state.viewCount.toLocaleString('en')}
                            </Text>
                        </div>
                    </S.Statistic>
                    <S.Statistic selected={this.state.metricSelected[1]} color={Colors.Secondary} onClick={() => { this.toggleMetric(1) }} >
                        <div>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Clicks
                                </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                {this.state.clickCount.toLocaleString('en')}
                            </Text>
                        </div>
                    </S.Statistic>
                    <S.Statistic selected={this.state.metricSelected[2]} color={Colors.Tertiary} onClick={() => { this.toggleMetric(2) }} >
                        <div>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Dismissed
                                </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                {this.state.dismissCount.toLocaleString('en')}
                            </Text>
                        </div>
                    </S.Statistic>
                    <S.Statistic selected={this.state.metricSelected[3]} color={Colors.Quaternary} onClick={() => { this.toggleMetric(3) }} >
                        <div>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                10s Visits
                                </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 24]}>
                                {this.state.landedCount.toLocaleString('en')}
                            </Text>
                        </div>
                    </S.Statistic>
                    <div style={{ marginLeft: "auto", marginTop: "auto" }}>
                        <select value={this.state.timeInterval} onChange={(e) => {this.setTimeInterval(e)}}
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
                <div style={{ paddingLeft: "14px", paddingRight: "14px" }} key='b'>
                    <div id="container" style={{ width: "100%", paddingTop: "36px" }}>

                    </div>

                </div>

                {/* Row 4 */}
                <div style={{ display: "flex", marginTop: "36px", paddingLeft: "14px", paddingRight: "14px" }}>
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
                                    {
                                        !isNaN((this.state.clickCount / this.state.viewCount)) && isFinite((this.state.clickCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{
                                        ((this.state.clickCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
                                        N/A
                                    </Text>
                                    }
                                </RowCell>
                            </TableRow>
                            <TableRow>
                                <RowCell style={{}}>
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>10s Visit Rate</Text>
                                </RowCell>
                                <RowCell style={{}}>
                                {
                                        !isNaN((this.state.landedCount / this.state.viewCount)) && isFinite((this.state.landedCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{
                                        ((this.state.landedCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
                                        N/A
                                    </Text>
                                    }
                                </RowCell>
                            </TableRow>
                            <TableRow>
                                <RowCell style={{}}>
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Dismiss Rate</Text>
                                </RowCell>
                                <RowCell style={{}}>
                                {
                                        !isNaN((this.state.dismissCount / this.state.viewCount)) && isFinite((this.state.dismissCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{
                                        ((this.state.dismissCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
                                        N/A
                                    </Text>
                                    }
                                </RowCell>
                            </TableRow>
                            <TableRow>
                                <RowCell style={{}}>
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Click to 10s Visit Rate</Text>
                                </RowCell>
                                <RowCell style={{}}>
                                {
                                        !isNaN((this.state.landedCount / this.state.clickCount)) && isFinite((this.state.landedCount / this.state.clickCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{
                                        ((this.state.landedCount / this.state.clickCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
                                        N/A
                                    </Text>
                                    }
                                </RowCell>
                            </TableRow>
                            <TableRow>
                                <RowCell>
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Upvotes</Text>
                                </RowCell>
                                <RowCell>
                                <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{this.state.upvotedCount}</Text>
                                </RowCell>
                            </TableRow>
                            <TableRow>
                                <RowCell style={{}}>
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Downvotes</Text>
                                </RowCell>
                                <RowCell>
                                <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{this.state.downvotedCount}</Text>
                                </RowCell>
                            </TableRow>
                        </Table>
                    </div>
                    <div style={{ width: "50%", marginLeft: "14px" }} key='d'>
                        <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                            Recent Statistics
                                </Text>
                        <div id="container2" style={{ width: "100%", paddingTop: "36px", height: "545px" }}>
                        </div>
                    </div>
                </div>

                {/* Row 5 */}
                <div style={{ display: "flex", marginTop: "36px", paddingLeft: "14px", paddingRight: "14px" }}>
                    <div style={{ width: "50%"}} key='d'>
                        <Text style={{ marginTop: "8px", marginBottom: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 17]}>
                            Decision Curve
                                </Text>
                        <div id="container3" style={{ width: "100%", paddingTop: "36px" }}>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    async downloadCSV(campaign) {

        axios(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/csv/${campaign.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.accessToken}`,
                "-x-user": this.props.auth.id,
                "Content-Type": "text/csv",
            }
        })
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'text/csv', endings: 'transparent' });
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', `${campaign.name}.csv`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
            });
    }
}

function processData(data){
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

    let processedData = [] as any

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
        processedData.push(dataPoint);
    })

    return processedData
}

function renderMetric(value){
    return 
}

export default CampaignReport;