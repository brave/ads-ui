import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdsForm.style";
import Select from 'react-select';
import OSNotificationCreativePreview from '../../../../../../../components/creativePreview/OSNotificationCreativePreview/OSNotificationCreativePreview';
import { fetchCreativeAssets, fetchCreativeType } from "./lib/AdsForm.library";

import Notification from "./assets/notification.png";
import PublisherAd from "./assets/publisher_ad.png";
import { Icon } from '@material-ui/core';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
    }),
}

class AdsForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
    }

    addAd() {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads.push({
            creative: '',
            newCreative: true,
            name: '',
            title: '',
            body: '',
            targetUrl: '',
            creativeUrl: '',
            creativeSize: '',
            channels: '',
            notificationAd: true,
            inPageAd: false,
            previewAssets: {
                title: null,
                body: null,
            }
        })
        this.props.setAdSets(adSets);
    }

    setSelectedAd(selectedAd) {
        this.props.setSelectedAd(selectedAd);
    }

    deleteSelectedAd(e, deletedAd) {
        e.preventDefault();
        let adSets = this.props.adSets;
        if (adSets[this.props.selectedAdSet].ads.length > 1) {
            this.setSelectedAd(0);
            adSets[this.props.selectedAdSet].ads.splice(deletedAd, 1);
            this.props.setAdSets(adSets);

        }
    }

    handleViewPricing(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].viewPricing = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleClickPricing(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].clickPricing = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleConversionPricing(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].conversionPricing = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleViewWebhook(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].viewWebhook = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleClickWebhook(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].clickWebhook = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleConversionWebhook(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].conversionWebhook = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleCreative = async (selectedOption) => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creative = selectedOption;
        let data = await fetchCreativeType(selectedOption.value, this.props.auth.accessToken);


        if (data.creative.type.code === "notification_all_v1") {
            let data2 = await fetchCreativeAssets(selectedOption.value, this.props.auth.accessToken);
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name = data2.creative.name;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].title = data2.creative.payload.title;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].body = data2.creative.payload.body;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl = data2.creative.payload.targetUrl;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body = data2.creative.payload.body;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title = data2.creative.payload.title;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body = data2.creative.payload.body;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = false;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = true;
        }
        else {
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = false;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = true;
        }

        this.props.setAdSets(adSets);
    };

    handleAdSets = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].adSets = selectedOption;
        this.props.setAdSets(adSets);
    };

    handleNewCreative(value) {

        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].newCreative = value;

        // Clear existing
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creative = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].body = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].title = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeUrl = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeSize = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].channels = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body = '';

        if (value) {
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = true;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = false;
        }
        else {
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = false;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = false;
        }

        this.props.setAdSets(adSets);

    }

    handleName(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleTitle(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].title = e.target.value;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleBody(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].body = e.target.value;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleCreativeUrl(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeUrl = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleCreativeSize(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeSize = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleChannels(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].channels = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleTargetUrl(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleCreativeSelection(selection) {
        let adSets = this.props.adSets;

        // Clear existing
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creative = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].body = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].title = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeUrl = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeSize = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].channels = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title = '';
        adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body = '';

        if (selection === "notificationAd") {
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = true;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = false;
        }
        else {
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd = false;
            adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd = true;
        }
        this.props.setAdSets(adSets);
    }

    mapAdSets() {
        let adSetOptions = this.props.adSets.map((adSet, index) => {
            return {
                value: index,
                label: `Ad Set ${index + 1}`
            }
        });
        return adSetOptions;
    }

    handleBack() {
        this.props.setSelectedAd(0);
        this.props.setForm("adSetsForm")
    }

    handleNext() {
        if (this.props.selectedAdSet + 1 < this.props.adSets.length) {
            this.props.setSelectedAd(0);
            this.props.setSelectedAdSet(this.props.selectedAdSet + 1)
            this.props.setForm("adSetsForm")
        }
        else {
            this.props.setForm("reviewForm")
        }
    }

    renderAdSetsTabs() {
        // alert(JSON.stringify(this.props.adSets))
        if (this.props.adSets[this.props.selectedAdSet].ads) {
            let adSetsTabs = this.props.adSets[this.props.selectedAdSet].ads.map((ad, index) => {
                if (index === this.props.selectedAd) {
                    return (
                        <S.Tab selected={true} onContextMenu={(e) => this.deleteSelectedAd(e, index)} key={index}>
                            <Text content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        </S.Tab>
                    )
                }
                else {
                    return (
                        <S.Tab selected={false} onClick={() => this.setSelectedAd(index)} onContextMenu={(e) => this.deleteSelectedAd(e, index)} key={index}>
                            <div style={{ opacity: .5 }}>
                                <Text content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            </div>
                        </S.Tab>
                    );
                }
            });

            return adSetsTabs;
        }
    }

    render() {
        return (
            <React.Fragment>

                {/* <div style={{ width: "280px" }}>
                    <S.AdSetsTabs>
                        {this.renderAdSetsTabs()}
                        <S.AdSetsTabButtonContainer>
                            <S.Button onClick={() => { this.addAd() }} style={{ marginLeft: "auto", marginRight: "auto", width: "175px", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                <Text content={"New Ad"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                            </S.Button>
                        </S.AdSetsTabButtonContainer>
                    </S.AdSetsTabs>
                </div> */}
                <div style={{ display: "flex", position: "relative", marginTop: "28px", width: "100%" }}>
                    <div style={{ width: "720px" }}>
                        <Section fullWidthChild={true}>
                            <>

                                {/* <Text content={"Ads"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Define one or many advertisements that promote your business."} style={{ marginTop: "2px", marginBottom: "14px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "14px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div> */}

                                {/* <div style={{ display: "flex" }}>
                                    <Text content={"Number of Ads"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                </div> */}

                                <S.Container style={{ marginTop: "8px" }}>
                                    {this.renderAdSetsTabs()}
                                    {/* <S.Tab selected={false} onClick={() => { this.addAd() }}> <Text content={`+ Create new ad`} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} /></S.Tab> */}
                                </S.Container>

                                <div style={{ width: "99%", display: "flex", marginTop: "-12px", marginRight: "8px", marginBottom: "12px" }}>
                                    <Text content={"+ Create new ad"} color={"#E0694C"} onClick={() => { this.addAd() }} style={{ marginTop: "2px", marginLeft: "auto", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>

                                {/* <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div> */}

                                <Text content={"Creative"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Define the look and feel of your ads."} style={{ marginTop: "2px", marginBottom: "14px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "14px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>


                                {/* <div style={{ display: "flex", marginBottom: "14px" }}>

                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                        <input style={{ marginRight: "8px" }} type="radio" checked={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].newCreative} onChange={(e) => this.handleNewCreative(true)} />
                                        <Text content={"New Creative"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </div>

                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px", marginLeft: "8px" }}>
                                        <input style={{ marginRight: "8px" }} type="radio" checked={!this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].newCreative} onChange={(e) => this.handleNewCreative(false)} />
                                        <Text content={"Use Existing Creative"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </div>

                                </div> */}

                                <div style={{ display: "flex", marginTop: "8px" }}>
                                    <Text content={"Creative Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                </div>

                                <div style={{ display: "flex", marginBottom: "24px", marginTop: "12px" }}>
                                    <S.CreativeSelection onClick={() => this.handleCreativeSelection("notificationAd")} selected={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd}>
                                        <img style={{ display: "block", height: "60px", marginLeft: "auto", marginRight: "auto" }} src={Notification}></img>
                                        <Text style={{ textAlign: "center" }} content={"Notification Ad"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.CreativeSelection>

                                    {/* <S.CreativeSelection onClick={() => this.handleCreativeSelection("inPageAd")} selected={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd}>
                                        <img style={{ display: "block", height: "60px", marginLeft: "auto", marginRight: "auto" }} src={PublisherAd}></img>
                                        <Text style={{ textAlign: "center" }} content={"In Page Ad"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.CreativeSelection> */}
                                </div>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>


                                <Text content={"Creative Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Define the look and feel of your ads."} style={{ marginTop: "2px", marginBottom: "14px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "14px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>

                                <div>
                                    <div style={{}}>
                                        {
                                            this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].newCreative === false ?
                                                <>
                                                    <div style={{ display: "flex", marginBottom: "24px" }}>
                                                        <S.CreativeSelection selected={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd}>
                                                            <img style={{ display: "block", height: "100px", marginLeft: "auto", marginRight: "auto" }} src={Notification}></img>
                                                            <Text style={{ textAlign: "center" }} content={"Notification Ad"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        </S.CreativeSelection>

                                                        <S.CreativeSelection selected={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd}>
                                                            <img style={{ display: "block", height: "100px", marginLeft: "auto", marginRight: "auto" }} src={PublisherAd}></img>
                                                            <Text style={{ textAlign: "center" }} content={"In Page Ad"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        </S.CreativeSelection>
                                                    </div>
                                                    < S.InputContainer >
                                                        <Text content={"Choose Creative "} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <div>
                                                            <Select
                                                                styles={customStyles}
                                                                value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creative}
                                                                onChange={this.handleCreative}
                                                                options={this.props.creativeOptions}
                                                            />
                                                        </div>
                                                    </S.InputContainer>
                                                </>

                                                :
                                                <>


                                                    {
                                                        this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd &&
                                                        <>
                                                            <S.InputContainer>
                                                                <Text content={"Creative Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name} onChange={(e) => this.handleName(e)} placeholder="Enter a name..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative Title"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].title} onChange={(e) => this.handleTitle(e)} placeholder="Enter a title..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative Body"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.TextArea value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].body} onChange={(e) => this.handleBody(e)} placeholder="Enter a body..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative Target URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl} onChange={(e) => this.handleTargetUrl(e)} placeholder="Enter a target url..." />
                                                            </S.InputContainer>
                                                        </>
                                                    }
                                                    {
                                                        this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd &&
                                                        <>
                                                            <S.InputContainer>
                                                                <Text content={"Creative Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].name} onChange={(e) => this.handleName(e)} placeholder="Enter a name..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeUrl} onChange={(e) => this.handleCreativeUrl(e)} placeholder="Enter a title..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative Size"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].creativeSize} onChange={(e) => this.handleCreativeSize(e)} placeholder="Enter a body..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Channels, (separate by comma)"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].channels} onChange={(e) => this.handleChannels(e)} placeholder="Enter a body..." />
                                                            </S.InputContainer>

                                                            <S.InputContainer>
                                                                <Text content={"Creative Target URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].targetUrl} onChange={(e) => this.handleTargetUrl(e)} placeholder="Enter a target url..." />
                                                            </S.InputContainer>
                                                        </>


                                                    }
                                                </>
                                        }

                                    </div>

                                    {/* <div style={{ width: "50%", marginLeft: "28px", marginTop: "23px" }}>
                                        <div>
                                            {
                                                this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd &&
                                                <OSNotificationCreativePreview title={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title} body={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body} />
                                            }
                                            {
                                                this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd &&
                                                <div>In Page creative preview coming soon!</div>
                                            }
                                        </div>

                                    </div> */}

                                </div>

                                <div style={{ display: "flex" }}>
                                    <S.SecondaryButton onClick={() => this.handleBack()} style={{ marginRight: "auto" }}>
                                        <Text content={"Back"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.SecondaryButton>
                                    <S.Button onClick={() => this.handleNext()} style={{ marginLeft: "auto" }}>
                                        <Text content={"Next"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.Button>
                                </div>

                            </>
                        </Section>
                    </div>
                    <div style={{ width: "350px", height: "700px", position: "relative", marginLeft: "28px", border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px" }}>
                        <Text content={"Creative Preview"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        <div style={{ display: "flex" }}>
                            <Text content={"Preview your creatives as you design them."} style={{ marginTop: "2px", marginBottom: "14px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        </div>
                        <div>
                            {
                                this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].notificationAd &&
                                <OSNotificationCreativePreview title={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.title} body={this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].previewAssets.body} />
                            }
                            {
                                this.props.adSets[this.props.selectedAdSet].ads[this.props.selectedAd].inPageAd &&
                                <div>In Page creative preview coming soon!</div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default AdsForm;