import React, { Component } from 'react';
import Context from "../../../../../../../state/context";
import Confetti from 'react-confetti'

import { createAd, createAdSet, createCampaign, prepareCreateCampaignInput, prepareCreateAdInput, prepareCreateAdSetsInput } from "./lib/CompletionFormLibrary";

class CompletionForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            saving: undefined
        }
    }
    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        let createCampaignInput = prepareCreateCampaignInput(this.props.userId, this.props.advertiserId, this.props.campaign);
        let createCampaignResponse = await createCampaign(createCampaignInput, this.props.auth.accessToken);
        let campaignId = createCampaignResponse.createCampaign.id;
        let createAdSetsInput = prepareCreateAdSetsInput(campaignId, this.props.adSets);
        if (createAdSetsInput) {
            createAdSetsInput.forEach(async (createAdSetInput, index) => {
                let createAdSetResponse = await createAdSet(createAdSetInput, this.props.auth.accessToken);
                let adSetId = createAdSetResponse.createAdSet.id;
                // Create ads for each ad set, where that ad is assigned to given ad set. 
                if (this.props.ads) {
                    this.props.ads.forEach((ad) => {
                        if (ad.adSets) {
                            ad.adSets.forEach(async (adSet) => {
                                if (adSet.value === index) {
                                    let createAdInput = prepareCreateAdInput(adSetId, this.props.ads[index])
                                    let createAdResponse = await createAd(createAdInput, this.props.auth.accessToken);
                                }
                            });
                        }
                    });
                }

            });
        }
    }

    render() {
        return (
            this.state.saving === false ?
                (<div>
                    {JSON.stringify(this.props.auth)}
                    hello
                <Confetti colors={["#FB7959", "#4C54D2"]} />
                </div>) :
                (<div>Saving!!</div>)
        );
    }
}

export default CompletionForm;