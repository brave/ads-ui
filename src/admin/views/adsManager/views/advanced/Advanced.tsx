import React, { Component } from 'react';
import Context from "../../../../../state/context";

import FormProgress from './components/formProgress/FormProgress';
import CampaignForm from './components/campaignForm/CampaignForm';
import AdSetsForm from './components/adSetsForm/AdSetsForm';
import AdsForm from './components/adsForm/AdsForm';
import ReviewForm from './components/reviewForm/ReviewForm';
import CompletionForm from './components/completionForm/CompletionForm';

import { initializeData, validateAdSetsForm, getSearchParameters, validateCampaignForm, performValidation } from "./lib/Library";
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
        this.validate = this.validate.bind(this);
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

    public validate() {
        performValidation(this, this.state.campaign, this.state.adSets, this.state.ads);
    }

    public setForm(form) {
        this.validate();
        this.setState({ form })
    }

    public setCampaign(campaign) {
        this.setState({ campaign }, () => {
            this.validate();
        })
    }

    public setAdSets(adSets) {
        this.setState({ adSets }, () => {
            this.validate();
        })
    }

    public setAds(ads) {
        this.setState({ ads }, () => {
            this.validate();
        })
    }

    public async componentWillUnmount() {
        await this.context.setLoading(undefined);
        await this.context.setSidebar("visible");
    }

    public renderForm() {
        switch (this.state.form) {
            case "campaignForm":
                return <CampaignForm campaign={this.state.campaign} setCampaign={this.setCampaign} setForm={this.setForm} geoCodes={this.state.geoCodes} validations={this.state.validations} validate={this.validate} />
            case "adSetsForm":
                return <AdSetsForm adSets={this.state.adSets} setAdSets={this.setAdSets} setForm={this.setForm} segments={this.state.segments} validations={this.state.validations} validate={this.validate} />
            case "adsForm":
                return <AdsForm ads={this.state.ads} setAds={this.setAds} adSets={this.state.adSets} setForm={this.setForm} creativeOptions={this.state.creativeOptions} auth={this.props.auth} validations={this.state.validations} validate={this.validate} />
            case "reviewForm":
                return <ReviewForm campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} setForm={this.setForm} validations={this.state.validations} validate={this.validate} />
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