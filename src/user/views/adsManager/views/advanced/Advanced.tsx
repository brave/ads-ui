import React, { Component } from 'react';
import Context from "../../../../../state/context";


import FormProgress from './components/formProgress/FormProgress';
import CampaignForm from './components/campaignForm/CampaignForm';
import AdSetsForm from './components/adSetsForm/AdSetsForm';
import AdsForm from './components/adsForm/AdsForm';
import ReviewForm from './components/reviewForm/ReviewForm';
import CompletionForm from './components/completionForm/CompletionForm';
import AdvancedOrderSidebar from "./components/advancedOrderSidebar/AdvancedOrderSidebar";

import { initializeData, performValidation } from "./lib/Library";
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
        this.setSelectedAdSet = this.setSelectedAdSet.bind(this);
        this.setSelectedAd = this.setSelectedAd.bind(this);
        this.setAds = this.setAds.bind(this);
        this.validate = this.validate.bind(this);
    }
    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        let start = await this.context.setLoading(true);
        this.context.setSidebar("hidden");
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

    public validate(validationRule) {
        performValidation(this, validationRule, this.state.campaign, this.state.adSets, this.state.ads);
    }

    public setForm(form) {
        this.validate("all");
        this.setState({ form })
    }

    public setCampaign(campaign) {
        this.setState({ campaign })
    }

    public setAdSets(adSets) {
        this.setState({ adSets })
    }

    public setSelectedAdSet(selectedAdSet) {
        this.setState({ selectedAdSet }, () => {
            this.validate("all");
        })
    }

    public setSelectedAd(selectedAd) {
        this.setState({ selectedAd }, () => {
            this.validate("all");
        })
    }

    public setAds(ads) {
        this.setState({ ads }, () => {
            this.validate("all");
        })
    }

    public async componentWillUnmount() {
        await this.context.setLoading(undefined);
        await this.context.setSidebar("visible");
    }

    public renderForm() {
        switch (this.state.form) {
            case "campaignForm":
                return <CampaignForm campaign={this.state.campaign} setCampaign={this.setCampaign} setForm={this.setForm} adSets={this.state.adSets} setAdSets={this.setAdSets} geoCodes={this.state.geoCodes} validations={this.state.validations} validate={this.validate} setSelectedAdSet={this.setSelectedAdSet} />
            case "adSetsForm":
                return <AdSetsForm adSets={this.state.adSets} campaign={this.state.campaign} setAdSets={this.setAdSets} setSelectedAdSet={this.setSelectedAdSet} selectedAdSet={this.state.selectedAdSet} setSelectedAd={this.setSelectedAd} setForm={this.setForm} segments={this.state.segments} validations={this.state.validations} validate={this.validate} />
            case "adsForm":
                return <AdsForm setAdSets={this.setAdSets} adSets={this.state.adSets} selectedAdSet={this.state.selectedAdSet} setSelectedAdSet={this.setSelectedAdSet} selectedAd={this.state.selectedAd} setSelectedAd={this.setSelectedAd} setForm={this.setForm} creativeOptions={this.state.creativeOptions} auth={this.props.auth} validations={this.state.validations} validate={this.validate} />
            case "reviewForm":
                return <ReviewForm campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} setForm={this.setForm} auth={this.props.auth} advertiserId={this.state.advertiserId} userId={this.state.userId} setSelectedAdSet={this.setSelectedAdSet} setSelectedAd={this.setSelectedAd} validations={this.state.validations} validate={this.validate} />
            case "completionForm":
                return <CompletionForm />
        }
    }

    render() {
        return (
            this.context.loading === false &&
            <>
                {/* <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "green" }}></div> */}

                {this.state.form !== "completionForm" &&
                    <AdvancedOrderSidebar campaign={this.state.campaign} adSets={this.state.adSets} setAdSets={this.setAdSets} selectedAdSet={this.state.selectedAdSet} setSelectedAdSet={this.setSelectedAdSet} form={this.state.form} setForm={this.setForm} />
                }
                {/* <FormProgress form={this.state.form} setForm={this.setForm} errors={this.state.errors} campaign={this.state.campaign} adSets={this.state.adSets} ads={this.state.ads} /> */}
                {this.renderForm()}
            </>
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