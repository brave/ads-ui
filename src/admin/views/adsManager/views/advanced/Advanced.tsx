import React, { Component } from 'react';
import Context from "../../../../../state/context";

import FormProgress from './components/formProgress/FormProgress';
import CampaignForm from './components/campaignForm/CampaignForm';
import AdSetsForm from './components/adSetsForm/AdSetsForm';
import AdsForm from './components/adsForm/AdsForm';
import ReviewForm from './components/reviewForm/ReviewForm';
import CompletionForm from './components/completionForm/CompletionForm';

import { initializeData, validateAdSetsForm, getSearchParameters, validateCampaignForm } from "./lib/Library";
import { connect } from 'react-redux';

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
        let start = await this.context.setLoading(true);
        // this.context.setSidebar("hidden");
        this.handleBrowserNav();
        let that = this;
        let initializedData = await initializeData(that);
        this.setState(initializedData, () => {
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
                result = validateCampaignForm(this.state.campaign);
                break;
            case "adSetsForm":
                result = validateAdSetsForm(this.state.adSets);
                break;
            case "adsForm":
                result = validateAdSetsForm(this.state.ads);
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

    public async componentWillUnmount() {
        await this.context.setLoading(undefined);
        await this.context.setSidebar("visible");
    }

    public renderForm() {
        switch (this.state.form) {
            case "campaignForm":
                return <CampaignForm campaign={this.state.campaign} setCampaign={this.setCampaign} setForm={this.setForm} geoCodes={this.state.geoCodes} />
            case "adSetsForm":
                return <AdSetsForm adSets={this.state.adSets} setAdSets={this.setAdSets} setForm={this.setForm} segments={this.state.segments} />
            case "adsForm":
                return <AdsForm ads={this.state.ads} setAds={this.setAds} adSets={this.state.adSets} setForm={this.setForm} creativeOptions={this.state.creativeOptions} auth={this.props.auth} />
            case "reviewForm":
                return <ReviewForm campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} setForm={this.setForm} />
            case "completionForm":
                return <CompletionForm campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} auth={this.props.auth} advertiserId={this.state.advertiserId} userId={this.state.userId} />
        }
    }

    render() {
        return (
            this.context.loading === false &&
            <React.Fragment>
                <FormProgress form={this.state.form} setForm={this.setForm} errors={this.state.errors} campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} />
                {this.renderForm()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Advanced);