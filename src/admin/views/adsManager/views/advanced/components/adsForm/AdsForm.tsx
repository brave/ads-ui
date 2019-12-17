import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdsForm.style";
import Switch from "react-switch";
import Select from 'react-select';
import BraveLogo from "./assets/brave_logo_icon.png";

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
            selectedAd: 0,
            selectedOption: null
        };
    }

    addAd() {
        let ads = this.props.ads;
        ads.push({
            creative: '',
            adSets: '',
            newCreative: true,
            name: '',
            title: '',
            body: '',
            targetUrl: '',
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

    handleNewCreative(value) {

        let ads = this.props.ads;
        ads[this.state.selectedAd].newCreative = value;

        // Clear existing
        ads[this.state.selectedAd].creative = '';
        ads[this.state.selectedAd].name = '';
        ads[this.state.selectedAd].body = '';
        ads[this.state.selectedAd].title = '';
        ads[this.state.selectedAd].targetUrl = '';

        this.props.setAds(ads);

    }

    handleName(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].name = e.target.value;
        this.props.setAds(ads);
    }

    handleTitle(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].title = e.target.value;
        this.props.setAds(ads);
    }

    handleBody(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].body = e.target.value;
        this.props.setAds(ads);
    }

    handleTargetUrl(e) {
        let ads = this.props.ads;
        ads[this.state.selectedAd].targetUrl = e.target.value;
        this.props.setAds(ads);
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
                    <div style={{ width: "843px", marginLeft: "auto", marginRight: "auto" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.Container>
                                    <S.LeftColumn>
                                        <Text content={"Ads"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Ads are used to define your creative text and messaging"} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                        <S.LeftColumnContainer>

                                        </S.LeftColumnContainer>
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        {/* Ad Set */}
                                        <S.InputContainer>
                                            <Text content={"Choose Ad Sets"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <div style={{ marginTop: "4px" }}>
                                                <Select
                                                    styles={customStyles}
                                                    value={this.props.ads[this.state.selectedAd].adSets}
                                                    onChange={this.handleAdSets}
                                                    isMulti={true}
                                                    options={this.mapAdSets()}
                                                />
                                            </div>
                                        </S.InputContainer>

                                        {/* Nav Buttons */}

                                    </S.RightColumn>



                                </S.Container>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "50%", paddingRight: '28px' }}>

                                        <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                            <input style={{ marginRight: "8px" }} type="radio" checked={this.props.ads[this.state.selectedAd].newCreative} onChange={(e) => this.handleNewCreative(true)} />
                                            <Text content={"New Creative"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>


                                        <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                            <input style={{ marginRight: "8px" }} type="radio" checked={!this.props.ads[this.state.selectedAd].newCreative} onChange={(e) => this.handleNewCreative(false)} />
                                            <Text content={"Use Existing Creative"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>

                                        <div style={{ height: "28px" }}></div>



                                        {
                                            this.props.ads[this.state.selectedAd].newCreative === false ?
                                                < S.InputContainer >
                                                    <Text content={"Choose Creative "} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <div style={{ marginTop: "4px" }}>
                                                        <Select
                                                            styles={customStyles}
                                                            value={this.props.ads[this.state.selectedAd].creative}
                                                            onChange={this.handleCreative}
                                                            options={this.props.creativeOptions}
                                                        />
                                                    </div>
                                                </S.InputContainer>
                                                :
                                                <>
                                                    <S.InputContainer>
                                                        <Text content={"Creative Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <S.Input value={this.props.ads[this.state.selectedAd].name} onChange={(e) => this.handleName(e)} placeholder="Enter a name..." />
                                                    </S.InputContainer>

                                                    <S.InputContainer>
                                                        <Text content={"Creative Title"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <S.Input value={this.props.ads[this.state.selectedAd].title} onChange={(e) => this.handleTitle(e)} placeholder="Enter a title..." />
                                                    </S.InputContainer>

                                                    <S.InputContainer>
                                                        <Text content={"Creative Body"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <S.Input value={this.props.ads[this.state.selectedAd].body} onChange={(e) => this.handleBody(e)} placeholder="Enter a body..." />
                                                    </S.InputContainer>

                                                    <S.InputContainer>
                                                        <Text content={"Creative Target URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <S.Input value={this.props.ads[this.state.selectedAd].targetUrl} onChange={(e) => this.handleTargetUrl(e)} placeholder="Enter a target url..." />
                                                    </S.InputContainer>
                                                </>
                                        }

                                    </div>

                                    <div style={{ width: "50%" }}>
                                        <div className="OSNotificationCreativePreview">
                                            <>
                                                <Text content={"iOS"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <div style={{ backgroundColor: "white", borderRadius: "4px", width: "100%", height: "133px", border: "1px solid #dfdfdf", marginTop: "16px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>

                                                    <div style={{ height: "106px", width: "359px", borderRadius: "13px", backgroundColor: "rgba(248, 248, 248, 0.82)", padding: "8px" }}>
                                                        <div style={{ display: "flex", width: "100%" }}>
                                                            <img src={BraveLogo} style={{ height: "26px", width: "26px" }} />
                                                            <Text content={"BRAVE REWARDS"} color={"rgb(142, 142, 147)"} style={{ paddingTop: "3px", paddingLeft: "3px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                            <Text content={"now"} style={{ marginLeft: "auto", paddingTop: "5px", paddingRight: "4px" }} color={"rgb(142, 142, 147)"} sizes={[16, 16, 15, 15, 11]} fontFamily={"Poppins"} />
                                                        </div>
                                                        <div style={{ display: "flex", width: "100%", marginTop: "12px" }}>
                                                            <Text content={"Creative Title"} style={{ paddingLeft: '5px' }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Muli"} fontWeight={600} />
                                                        </div>
                                                        <div style={{ display: "flex", width: "100%", marginTop: "4px" }}>
                                                            <Text content={"Creative body text goes here......"} style={{ paddingLeft: '5px' }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Muli"} />
                                                        </div>

                                                    </div>

                                                </div>
                                                <Text content={"Android"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                                <div style={{ backgroundColor: "white", borderRadius: "4px", width: "100%", height: "133px", border: "1px solid #dfdfdf", marginTop: "16px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <div style={{ height: "82px", width: "326px", borderRadius: "13px", backgroundColor: "rgb(250, 250, 250)", padding: "8px" }}>
                                                        <div style={{ display: "flex", width: "100%" }}>
                                                            <img src={BraveLogo} style={{ height: "44px", width: "44px" }} />
                                                            <div style={{ display: "flex", width: "100%", marginTop: "4px" }}>
                                                                <Text content={"Creative Title"} style={{ paddingLeft: '5px' }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Muli"} fontWeight={600} />
                                                                <Text content={"now"} style={{ marginLeft: "auto", paddingRight: "4px" }} color={"rgb(142, 142, 147)"} sizes={[16, 16, 15, 15, 11]} fontFamily={"Poppins"} />
                                                            </div>
                                                        </div>
                                                        <Text content={"Creative body text goes here......"} style={{ paddingLeft: '49px', marginTop: "-20px" }} sizes={[16, 16, 15, 15, 12]} fontFamily={"Muli"} />

                                                    </div>
                                                </div>


                                                <Text content={"Mac OS"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <div style={{ backgroundColor: "#fafafa", borderRadius: "4px", width: "100%", height: "133px", border: "1px solid #dfdfdf", marginTop: "16px", marginBottom: "16px" }}></div>
                                                <Text content={"Windows"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <div style={{ backgroundColor: "#fafafa", borderRadius: "4px", width: "100%", height: "133px", border: "1px solid #dfdfdf", marginTop: "16px", marginBottom: "16px" }}></div>
                                                <Text content={"* Please note, we're working on getting the preview just right, this is a close approximation to what OS vendors will display"} sizes={[16, 16, 15, 15, 11]} fontFamily={"Poppins"} />

                                            </>
                                        </div>


                                    </div>







                                </div>
                                <S.Container>
                                    <S.Button onClick={() => { this.props.setForm("reviewForm") }} style={{ marginLeft: "auto" }}>
                                        <Text content={"Next"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.Button>
                                </S.Container>
                            </>
                        </Section>
                    </div>
                    <div style={{ width: "253px", marginLeft: "28px" }}>
                        <S.AdSetsTabs>
                            {this.renderAdSetsTabs()}
                            <S.AdSetsTabButtonContainer>
                                <S.Button onClick={() => { this.addAd() }} style={{ marginLeft: "auto", marginRight: "auto", width: "175px", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                    <Text content={"New Ad"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            </S.AdSetsTabButtonContainer>
                        </S.AdSetsTabs>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default AdsForm;