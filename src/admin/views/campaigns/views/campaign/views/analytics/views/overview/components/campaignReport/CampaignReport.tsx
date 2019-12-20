import React, { Component } from 'react';
import { Text } from "../../../../../../../../../../../components/Text/Text";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import * as Highcharts from "highcharts";
import * as _ from "lodash";
import * as S from "./CampaignReport.style";
import moment from "moment";
import OutsideAlerter from "../../../../../../../../../../../components/OutsideAlerter/OutSideAlerter";
import axios from "axios";
import Context from "../../../../../../../../../../../state/context";
import TabSelector from '../../../../../../../../../../../components/tabSelector/TabSelector';

import Section from "../../../../../../../../../../../components/section/Section";
import { Icon } from '@material-ui/core';

let iconStyle = { cursor: "pointer", fontSize: "24px" };

enum Colors {
    Primary = "#4C54D2CC",
    Secondary = "#A0A5EBCC",
    Tertiary = "#9370DBCC",
    Quaternary = "#8B008BCC",
    Fifth = "#4C34D2CC",
    Sixth = "#A0A2EBCC"
}

class CampaignReport extends Component<any, any> {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            viewCount: 0,
            clickCount: 0,
            dismissCount: 0,
            landedCount: 0,
            androidCount: 0,
            iosCount: 0,
            macosCount: 0,
            windowsCount: 0,
            linuxCount: 0,
            otherCount: 0,
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
        let [androidCount, iosCount, macosCount, linuxCount, windowsCount, otherCount] = [0, 0, 0, 0, 0, 0];
        data.forEach((record) => {
            androidCount += record.confirmationsAndroid;
            iosCount += record.confirmationsiOS;
            macosCount += record.confirmationsMacOS;
            linuxCount += record.confirmationsLinux;
            windowsCount += record.confirmationsWindows;
            otherCount += record.confirmationsOther;
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
        this.setState({ viewCount, clickCount, dismissCount, landedCount, upvotedCount, downvotedCount, androidCount, iosCount, macosCount, linuxCount, windowsCount, otherCount },
            () => { this.formatChartData(this.props.report.records) })
    }

    formatChartData(data) {

        let processedData = processData(data);

        console.log(processedData);
        switch (this.state.timeInterval) {
            case 'Hourly':
                processedData = _.groupBy(processedData, function (date) {
                    return moment(date.index).startOf('hour').format();
                });
                break;
            case 'Daily':
                processedData = _.groupBy(processedData, function (date) {
                    return moment(date.index).utc().startOf('day').format();
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
            if (!isNaN(new Date(key).getTime())) {
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

        if (!this.state.metricSelected[0]) {
            viewData = [];
        }
        if (!this.state.metricSelected[1]) {
            clickData = [];
        }
        if (!this.state.metricSelected[2]) {
            dismissData = [];
        }
        if (!this.state.metricSelected[3]) {
            landData = [];
        }

        var myChart = Highcharts.chart('container', {
            chart: {
                type: "spline",
                zoomType: "x",
                width: "1118",
                marginTop: 34,
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

        var myChart3 = Highcharts.chart('container3', {
            chart: {
                type: "spline",
                width: "516",
            },
            title: {
                text: "Decision Curve"
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
                tickAmount: 4
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

        var myChart4 = Highcharts.chart('container4', {
            chart: {
                type: 'pie',
                width: "516",
            },
            credits: {
                enabled: false
            },
            title: {
                text: "Avg. Engagement by Platform",
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            series: [{
                colorByPoint: true,
                data: [
                    {
                        name: 'Android',
                        y: this.state.androidCount,
                        color: Colors.Primary,
                    }, {
                        name: 'iOS',
                        y: this.state.iosCount,
                        color: Colors.Secondary,
                    }, {
                        name: 'MacOS',
                        y: this.state.macosCount,
                        color: Colors.Tertiary,
                    }, {
                        name: 'Windows',
                        y: this.state.windowsCount,
                        color: Colors.Quaternary,
                    }, {
                        name: 'Linux',
                        y: this.state.linuxCount,
                        color: Colors.Fifth,
                    }, {
                        name: 'Other',
                        y: this.state.otherCount,
                        colors: Colors.Sixth,
                    }] as any
            }] as any
        });
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
        this.setState({ timeInterval: e.target.value }, () => {
            that.formatChartData(this.props.report.records);
        });
    }

    render() {
        const { match } = this.props;
        const tabConfig = [
            { label: "Overview", selected: true, link: match.url.replace("/overview", "") + "/overview" },
            { label: "Platforms", selected: false, link: match.url.replace("/overview", "") + "/platforms" },
        ]
        const { campaign, report, advertiser } = this.props;
        return (
            <div key={campaign.name}>
                {/* Row 1 */}
                <TabSelector config={tabConfig} />

                {/* Row 2 */}
                <Section header={campaign.name} marginBottom={"28px"}>
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
                    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                        <div onClick={() => { this.downloadCSV(campaign) }} style={{ display: "flex", cursor: "pointer", }}>
                            <Text style={{ marginTop: "2px", marginRight: "8px" }} fontFamily={"Muli"} sizes={[18, 18, 18, 18, 14]}>
                                Download CSV
                            </Text>
                            <Icon style={iconStyle}>
                                vertical_align_bottom
                                    </Icon>
                        </div>
                    </div>
                </Section>
                {/* <div style={{ marginLeft: "auto", marginTop: "auto" }}>
                        <select value={this.state.timeInterval} onChange={(e) => { this.setTimeInterval(e) }}
                            style={{ marginTop: "-5px", backgroundColor: "white", height: "30px" }}
                        >
                            {["Hourly", "Daily", "Weekly", "Monthly"].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div> */}


                {/* Row 3 */}
                <Section marginBottom={"28px"}>
                    <div style={{ position: "relative", marginTop: "-12px" }}>
                        <div style={{ position: "absolute", zIndex: 300, right: "28px" }}>
                            <div style={{ marginLeft: "auto" }}>
                                <select value={this.state.timeInterval} onChange={(e) => { this.setTimeInterval(e) }}
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

                        <div id="container"></div>
                    </div>
                </Section>

                {/* Row 4 */}

                <Section marginBottom={"28px"}>
                    <div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Click-through rate:
                            </Text>
                            {
                                !isNaN((this.state.clickCount / this.state.viewCount)) && isFinite((this.state.clickCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>{
                                        ((this.state.clickCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>
                                        N/A
                                    </Text>
                            }
                        </div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                10s visit rate:
                            </Text>
                            {
                                !isNaN((this.state.landedCount / this.state.viewCount)) && isFinite((this.state.landedCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>{
                                        ((this.state.landedCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>
                                        N/A
                                    </Text>
                            }
                        </div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Dismiss Rate:
                            </Text>
                            {
                                !isNaN((this.state.dismissCount / this.state.viewCount)) && isFinite((this.state.dismissCount / this.state.viewCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>{
                                        ((this.state.dismissCount / this.state.viewCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>
                                        N/A
                                    </Text>
                            }
                        </div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Click to 10s visit rate:
                            </Text>
                            {
                                !isNaN((this.state.landedCount / this.state.clickCount)) && isFinite((this.state.landedCount / this.state.clickCount)) ?
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>{
                                        ((this.state.landedCount / this.state.clickCount) * 100).toFixed(1)}%
                                    </Text>
                                    :
                                    <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 20]}>
                                        N/A
                                    </Text>
                            }
                        </div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Upvotes:
                            </Text>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 20]}>
                                {this.state.upvotedCount}
                            </Text>
                        </div>
                        <div style={{ width: "516px", display: "flex", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 20, 20, 14]}>
                                Downvotes:
                            </Text>
                            <Text style={{ marginLeft: "2px" }} fontFamily={"Poppins"} sizes={[18, 18, 42, 42, 20]}>
                                {this.state.downvotedCount}
                            </Text>
                        </div>
                    </div>
                </Section>
                <Section marginBottom={"28px"}>
                    <div id="container4"></div>
                    <div id="container3"></div>
                </Section>

            </div >
        );
    }
    async downloadCSV(campaign) {
        this.context.setLoading(true);
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
                this.context.setLoading(false);
                link.click();
            })
            .catch(error => {
            });
    }
}

function processData(data) {
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

function renderMetric(value) {
    return
}

export default CampaignReport;