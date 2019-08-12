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

// Create the chart
import "./style.css";

am4core.useTheme(am4themes_animated);

const ResponsiveGridLayout = WidthProvider(Responsive);

class CampaignReport extends Component {
    private chart;
    private chart2;
    private chart3;
    private chart4;
    private myChart;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.renderLineChart();
        this.renderPlatformChart();
        this.renderRealtimeChart();
        this.renderDecisionChart();
        this.renderHighChart();
    }

    renderHighChart() {
        let myChart = Highcharts.chart("chartdiv", {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                type: 'column',
                name: 'Jane',
                data: [1, 0, 4],
            }, {
                type: 'column',
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    }
    renderLineChart() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data: any[] = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.stroke = am4core.color("#F1906D"); // red
        series.strokeWidth = 3;

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        // let scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // chart.scrollbarX = scrollbarX;

        this.chart = chart;
    }

    renderDecisionChart() {
        let chart = am4core.create("chartdivDecision", am4charts.XYChart);

        chart.paddingRight = 20;

        let data: any[] = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.stroke = am4core.color("#F1906D"); // red
        series.strokeWidth = 3;

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        function createTrendLine(data) {
            let trend = chart.series.push(new am4charts.LineSeries());
            trend.dataFields.valueY = "value";
            trend.dataFields.dateX = "date";
            trend.strokeWidth = 2
            trend.stroke = trend.fill = am4core.color("#c00");
            trend.data = data;

            let bullet = trend.bullets.push(new am4charts.CircleBullet());
            bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
            bullet.strokeWidth = 2;
            bullet.stroke = am4core.color("#fff")
            bullet.circle.fill = trend.stroke;

            let hoverState = bullet.states.create("hover");
            hoverState.properties.scale = 1.7;

            return trend;
        };


        this.chart4 = chart;
    }

    renderRealtimeChart() {
        let chart = am4core.create("chartdivRealtime", am4charts.XYChart);

        chart.data = [{
            "year": ".",
            "europe": 2.5,
            "namerica": 2.5,
            "asia": 2.1,
            "lamerica": 1.2,
            "meast": 0.2,
            "africa": 0.1
        }, {
            "year": "..",
            "europe": 2.6,
            "namerica": 2.7,
            "asia": 2.2,
            "lamerica": 1.3,
            "meast": 0.3,
            "africa": 0.1
        }, {
            "year": "...",
            "europe": 2.8,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }, {
            "year": "....",
            "europe": 2.2,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        },
        {
            "year": ".....",
            "europe": 2.5,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }, {
            "year": "......",
            "europe": 1.2,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        },
        {
            "year": ".......",
            "europe": 1.4,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }
            ,
        {
            "year": "-",
            "europe": 2.1,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }
            ,
        {
            "year": "--",
            "europe": 2.8,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }
            ,
        {
            "year": "---",
            "europe": 3.3,
            "namerica": 2.9,
            "asia": 2.4,
            "lamerica": 1.4,
            "meast": 0.3,
            "africa": 0.1
        }];

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        // Create series
        function createSeries(field, name, stacked, color) {
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "year";
            series.name = name;
            series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
            series.stacked = stacked;
            series.columns.template.width = am4core.percent(95);
            series.columns.template.fill = am4core.color(color);
            series.columns.template.stroke = am4core.color("#ededed");
        }

        createSeries("europe", "Europe", true, "#845EC2");
        createSeries("namerica", "North America", true, "#FFC75F");
        createSeries("asia", "Asia", true, "#FF9671");
        createSeries("lamerica", "Latin America", true, "#FF6F91");
        createSeries("meast", "Middle East", true, "#D65DB1");
        createSeries("africa", "Africa", true, "#F9F871");

        this.chart3 = chart;
    }

    renderPlatformChart() {
        let chart = am4core.create("chartDivPlatform", am4charts.PieChart)
        chart.hiddenState.properties.opacity = 0;

        chart.data = [
            {
                country: "iOS",
                value: 401,
            },
            {
                country: "Android",
                value: 300
            },
            {
                country: "MacOS",
                value: 200
            },
            {
                country: "Windows",
                value: 165
            },
            {
                country: "Linux",
                value: 139
            },
            {
                country: "Other",
                value: 128
            }
        ];

        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "country";

        series.slices.template.cornerRadius = 4;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.stroke = am4core.color("#ededed");
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.colors.list = [
            am4core.color("#F9F871"),
            am4core.color("#FFC75F"),
            am4core.color("#FF9671"),
            am4core.color("#FF6F91"),
            am4core.color("#D65DB1"),
            am4core.color("#845EC2"),
        ];

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        series.labels.template.disabled = true;

        this.chart2 = chart;
    }

    render() {
        var layouts = {
            lg: [
                { i: 'a1', x: 0, y: 0, w: 4, h: 1, static: true },
                { i: 'a', x: 4, y: 0, w: 8, h: 1, static: true },
                { i: 'stat1', x: 0, y: 1, w: 3, h: 1, static: true },
                { i: 'stat2', x: 3, y: 1, w: 3, h: 1, static: true },
                { i: 'stat3', x: 6, y: 1, w: 3, h: 1, static: true },
                { i: 'stat4', x: 9, y: 1, w: 3, h: 1, static: true },
                { i: 'b', x: 0, y: 2, w: 12, h: 2, static: true },
                { i: 'c1', x: 0, y: 4, w: 3, h: 1, static: true },
                { i: 'c2', x: 3, y: 4, w: 3, h: 1, static: true },
                { i: 'c3', x: 0, y: 5, w: 3, h: 1, static: true },
                { i: 'c4', x: 3, y: 5, w: 3, h: 1, static: true },
                { i: 'd', x: 6, y: 4, w: 6, h: 2, static: true },
                { i: 'e', x: 6, y: 6, w: 6, h: 2, static: true },
                { i: 'f', x: 0, y: 6, w: 6, h: 2, static: true }]
        };
        return (
            <div style={{ width: '100%', marginBottom: "72px", marginTop: "-36px" }}>
                <div style={{}}>
                    <ResponsiveGridLayout
                        style={{ marginLeft: "-36px", marginRight: "-36px" }}
                        className="layout" layouts={layouts}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                        margin={[36, 36]}>
                        <Card key='a'>
                            <div style={{}}>
                                <Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                                    Schedule
                                </Text>

                            </div>
                            <div style={{ marginTop: "24px" }}>
                                <Text fontFamily={"Muli"} sizes={[18, 18, 16, 16, 16]}>
                                    1/1/2019 - 2/2/2020
                                </Text>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: '100%', marginTop: "5px" }}>

                                    <Progress theme={{
                                        active: {
                                            symbol: '🕓',
                                            color: '#F1906D'
                                        }
                                    }} status="active" percent={88} />
                                </div>
                            </div>
                        </Card>
                        <Card key='a1'>
                            <div style={{}}>
                                <Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                                    State of the Dapps
                                </Text>
                            </div>
                            <div style={{ height: '100%' }}>
                                <div style={{ width: "100%", height: '100%' }}>
                                    <Text style={{ marginTop: '24px', marginLeft: "2px" }} fontFamily={"Muli"} sizes={[18, 18, 16, 16, 16]}>
                                        Select Report
                                </Text>
                                    <select className="custom-select" style={{ width: "100%", marginTop: "5px" }}>
                                        <option value="Creative Set 1">All Creative Sets</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                        <Card key='stat1'>
                            <Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                                Views
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                250,542
                            </Text>
                        </Card>
                        <Card key='stat2'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Clicks
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                170,372
                            </Text></Card>
                        <Card key='stat3'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Dismissed
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                10,521
                            </Text></Card>
                        <Card key='stat4'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            10s Visits
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                100,327
                            </Text></Card>
                        <Card key='b'>
                            <Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                                Daily Performance
                                </Text>
                            <div id="chartdiv" style={{width: "100%", height: "85%"}}></div></Card>
                        <Card key='c1'>
                            <Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                                View-Through Rate
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                27%
                            </Text>
                        </Card>
                        <Card key='c2'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Click-Through Rate
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                23%
                            </Text></Card>
                        <Card key='c3'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Dismiss Rate
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                4%
                            </Text></Card>
                        <Card key='c4'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Click to 10s Visit Rate
                            </Text>
                            <Text style={{ marginTop: "6px" }} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 28]}>
                                17%
                            </Text></Card>
                        <Card key='d'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Realtime Performance
                                </Text><div id="chartdivRealtime" style={{ width: "100%", height: "95%", marginTop: "" }}></div>
                        </Card>
                        <Card key='e'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Platforms
                                </Text><div id="chartDivPlatform" style={{ width: "100%", height: "100%", marginTop: "-30px" }}></div></Card>
                        <Card key='f'><Text fontFamily={"Poppins"} sizes={[18, 18, 20, 20, 20]}>
                            Decision Curve
                                </Text><div id="chartdivDecision" style={{ width: "100%", height: "80%", marginTop: "25px" }}></div></Card>
                    </ResponsiveGridLayout>
                </div>
            </div >
        );
    }
}

export default CampaignReport;