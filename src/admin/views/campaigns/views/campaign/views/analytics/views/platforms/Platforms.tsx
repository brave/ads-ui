import React, { Component } from 'react';
import TabSelector from '../../../../../../../../../components/tabSelector/TabSelector';
import Section from '../../../../../../../../../components/section/Section';
import * as Highcharts from "highcharts";
import { connect } from 'react-redux';
import { createPlatformChart, fetchData, processData } from "./lib/Library";

let colors = ["#4C54D2CC", "#A0A5EBCC", "#9370DBCC", "#8B008BCC"];

class Platforms extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        let data = await fetchData(this.props.auth.accessToken, this.props.match.params.campaignId);
        let processedData = processData(data);
        this.setState(processedData, () => {
            this.createCharts();
        });
    }

    createCharts() {
        createPlatformChart(this.state.androidEngagements, "android")
        createPlatformChart(this.state.macOSEngagements, "macOS")
        createPlatformChart(this.state.windowsEngagements, "windows")
        createPlatformChart(this.state.linuxEngagements, "linux")
        createPlatformChart(this.state.otherEngagements, "other")
    }

    render() {

        const { match, auth } = this.props;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/platforms", "") + "/overview" },
            { label: "Platforms", selected: true, link: match.url.replace("/platforms", "") + "/platforms" },
        ]
        return (
            <div>
                <TabSelector config={tabConfig} />
                <Section header={this.state.campaignName} marginBottom={"28px"}>
                    <div id="macOS" />
                    <div id="windows" />
                    <div id="linux" />
                </Section>
                <Section>
                    <div id="android" />
                    <div id="other" />
                </Section>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
});

export default connect(
    mapStateToProps
)(Platforms);