import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdsForm.style";
import Switch from "react-switch";
import Select from 'react-select';

class AdsForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedAd: 0,
            selectedOption: null
        };
    }

    addAd() {
        let ads = this.props.ads;
        ads.push({
            creative: '',
            viewPricing: '',
            clickPricing: '',
            conversionPricing: '',
            webookURL: '',
            adSets: '',
        })
        this.props.setAds(ads);
    }

    setSelectedAd(selectedAd) {
        this.setState({ selectedAd })
    }

    deleteSelectedAd(e, deletedAd) {
        e.preventDefault();
        let ads = this.props.ads;
        if (ads.length > 1) {
            this.setState({ selectedAd: 0 }, () => {
                ads.splice(deletedAd, 1);
                this.props.setAds(ads);
            })
        }
    }

    handleViewPricing(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].viewPricing = e.target.value;
        this.props.setAds(ads);
    }

    handleClickPricing(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].clickPricing = e.target.value;
        this.props.setAds(ads);
    }

    handleConversionPricing(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].conversionPricing = e.target.value;
        this.props.setAds(ads);
    }

    handleViewWebhook(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].viewWebhook = e.target.value;
        this.props.setAds(ads);
    }

    handleClickWebhook(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].clickWebhook = e.target.value;
        this.props.setAds(ads);
    }

    handleConversionWebhook(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].conversionWebhook = e.target.value;
        this.props.setAds(ads);
    }

    handleCreative = selectedOption => {
        let ads = this.props.ads;
        ads[this.state.selectedAd].creative = selectedOption;
        this.props.setAds(ads);
    };

    handleAdSets = selectedOption => {
        let ads = this.props.ads;
        ads[this.state.selectedAd].adSets = selectedOption;
        this.props.setAds(ads);
    };

    mapAdSets() {
        let adSetOptions = this.props.adSets.map((adSet, index) => {
            return {
                value: index,
                label: `Ad Set ${index + 1}`
            }
        });
        return adSetOptions;
    }

    renderAdSetsTabs() {
        // alert(JSON.stringify(this.props.adSets))
        if (this.props.ads) {
            let adSetsTabs = this.props.ads.map((ad, index) => {
                if (index === this.state.selectedAd) {
                    return (
                        <S.ActiveAdSetsTab onContextMenu={(e) => this.deleteSelectedAd(e, index)} key={index}>
                            <Text content={`Ad #${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                            <Text content={"Audience Reach: 1,000,000"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        </S.ActiveAdSetsTab>
                    )
                }
                else {
                    return (
                        <S.InactiveAdSetsTab onClick={() => this.setSelectedAd(index)} onContextMenu={(e) => this.deleteSelectedAd(e, index)} key={index}>
                            <div style={{ opacity: .5 }}>
                                <Text content={`Ad #${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                                <Text content={"Audience Reach: 1,000,000"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>
                        </S.InactiveAdSetsTab>
                    );
                }
            });

            return adSetsTabs;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex" }}>
                    <div style={{}}>
                        <S.AdSetsTabs>
                            {this.renderAdSetsTabs()}
                            <S.AdSetsTabButtonContainer>
                                <S.Button onClick={() => { this.addAd() }} style={{ marginLeft: "auto", marginRight: "auto", width: "175px", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                    <Text content={"New Ad"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            </S.AdSetsTabButtonContainer>
                        </S.AdSetsTabs>
                    </div>
                    <div style={{ width: "856px", marginLeft: "auto", marginRight: "auto" }}>
                        <Section fullWidthChild={true}>
                            <S.Container>
                                <S.LeftColumn>
                                    <Text content={"Ads"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                    <Text content={"Ads are used to define your creative text and messaging"} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    <S.LeftColumnContainer>

                                    </S.LeftColumnContainer>
                                </S.LeftColumn>
                                <S.RightColumn>

                                    {/* Creative */}
                                    <S.InputContainer>
                                        <Text content={"Choose Creative "} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <div style={{ marginTop: "28px" }}>
                                            <Select
                                                value={this.props.ads[this.state.selectedAd].creative}
                                                onChange={this.handleCreative}
                                                options={this.props.creativeOptions}
                                            />
                                        </div>
                                    </S.InputContainer>

                                    {/* Ad Set */}
                                    <S.InputContainer>
                                        <Text content={"Choose Ad Sets"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <div style={{ marginTop: "28px" }}>
                                            <Select
                                                value={this.props.ads[this.state.selectedAd].adSets}
                                                onChange={this.handleAdSets}
                                                isMulti={true}
                                                options={this.mapAdSets()}
                                            />
                                        </div>
                                    </S.InputContainer>

                                    {/* View Pricing */}
                                    <S.InputContainer>
                                        <Text content={"View Pricing"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].viewPricing} onChange={(e) => this.handleViewPricing(e)} placeholder="Enter a price for views..." type="number" name="name" />
                                    </S.InputContainer>

                                    {/* Click Pricing */}
                                    <S.InputContainer>
                                        <Text content={"Click Pricing"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].clickPricing} onChange={(e) => this.handleClickPricing(e)} placeholder="Enter a price for clicks..." type="number" name="name" />
                                    </S.InputContainer>

                                    {/* Conversion Pricing */}
                                    <S.InputContainer>
                                        <Text content={"Conversion Pricing"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].conversionPricing} onChange={(e) => this.handleConversionPricing(e)} placeholder="Enter a price for conversions..." type="number" name="name" />
                                    </S.InputContainer>

                                    {/* Webhook URL */}
                                    <S.InputContainer>
                                        <Text content={"View Webhook"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].viewWebhook} onChange={(e) => this.handleViewWebhook(e)} placeholder="Enter a webhook URL..." type="text" name="name" />
                                    </S.InputContainer>

                                    {/* Webhook URL */}
                                    <S.InputContainer>
                                        <Text content={"Click Webhook"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].clickWebhook} onChange={(e) => this.handleClickWebhook(e)} placeholder="Enter a webhook URL..." type="text" name="name" />
                                    </S.InputContainer>

                                    {/* Webhook URL */}
                                    <S.InputContainer>
                                        <Text content={"Conversion Webhook"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.ads[this.state.selectedAd].conversionWebhook} onChange={(e) => this.handleConversionWebhook(e)} placeholder="Enter a webhook URL..." type="text" name="name" />
                                    </S.InputContainer>

                                    {/* Nav Buttons */}
                                    <S.Container>
                                        <S.Button onClick={() => { this.props.setForm("reviewForm") }} style={{ marginLeft: "auto" }}>
                                            <Text content={"Next"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </S.Button>
                                    </S.Container>
                                </S.RightColumn>

                            </S.Container>
                        </Section>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default AdsForm;