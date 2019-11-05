import React, { Component } from 'react';
import Context from "../../../../../state/context";

import FormProgress from './components/formProgress/FormProgress';
import CampaignForm from './components/campaignForm/CampaignForm';
import AdSetsForm from './components/adSetsForm/AdSetsForm';
import AdsForm from './components/adsForm/AdsForm';
import ReviewForm from './components/reviewForm/ReviewForm';
import CompletionForm from './components/completionForm/CompletionForm';

import { processData, validateAdSetsForm } from "./lib/Library";

class Advanced extends Component<any, any> {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            progress: undefined,
            form: undefined,
            campaign: undefined,
            adSets: undefined,
            ads: undefined,
        };
        this.setForm = this.setForm.bind(this);
        this.setCampaign = this.setCampaign.bind(this);
        this.setAdSets = this.setAdSets.bind(this);
        this.setAds = this.setAds.bind(this);
    }
    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        this.context.setLoading(true);
        this.context.setSidebar("hidden");
        this.handleBrowserNav();
        let processedData = processData(undefined);
        this.setState(processedData, () => {
            this.context.setLoading(false);
        });
    }

    handleBrowserNav() {
        window.addEventListener("popstate", e => {
            // Nope, go back to your page
            this.setForm("campaignForm");
            this.props.history.go(1);
        });
    }

    public setForm(form) {
        let result;
        switch (this.state.form) {
            case "campaignForm":
                result = 'valid';
                break;
            case "adSetsForm":
                result = validateAdSetsForm(this.state.adSets);
                break;
            case "adsForm":
                result = 'valid';
                break;
            case "reviewForm":
                result = 'valid';
                break;
        }
        if (result === 'valid') {
            this.setState({ form, errors: undefined })
        }
        else {
            this.setState({ errors: result })
        }
    }

    public setCampaign(campaign) {
        this.setState({ campaign })
    }

    public setAdSets(adSets) {
        this.setState({ adSets })
    }

    public setAds(ads) {
        this.setState({ ads })
    }

    public componentWillUnmount() {
        this.context.setLoading(undefined);
    }

    public renderForm() {
        switch (this.state.form) {
            case "campaignForm":
                return <CampaignForm campaign={this.state.campaign} setCampaign={this.setCampaign} setForm={this.setForm} />
            case "adSetsForm":
                return <AdSetsForm adSets={this.state.adSets} setAdSets={this.setAdSets} setForm={this.setForm} />
            case "adsForm":
                return <AdsForm ads={this.state.ads} setAds={this.setAds} adSets={this.state.adSets} setForm={this.setForm} />
            case "reviewForm":
                return <ReviewForm campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} setForm={this.setForm} />
            case "completionForm":
                return <CompletionForm />
        }
    }

    render() {
        let { location } = this.props;
        return (
            this.context.loading === false &&
            <React.Fragment>
                <FormProgress form={this.state.form} setForm={this.setForm} errors={this.state.errors} campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} />
                {this.renderForm()}
            </React.Fragment>
        );
    }
}

export default Advanced;