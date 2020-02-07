import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdSetsForm.style";
import Switch from "react-switch";
import Select from 'react-select';
import { Icon } from '@material-ui/core';
import RadioButton from '../../../../../../../components/radioButton/RadioButton';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
    }),
}

const pricingTypes = [
    { value: 'cpm', label: 'Impressions (cpm)' },
    { value: 'cpc', label: 'Clicks (cpc)' },
    { value: 'cpl', label: 'Landings (cpl)' },
    { value: 'cpx', label: 'Conversions (cpx)' },
]

const platforms = [
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'iOS' },
    { value: 'macos', label: 'Mac OS' },
    { value: 'windows', label: 'Windows' },
    { value: 'linux', label: 'Linux' },
]

class AdSetsForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
    }

    setSelectedAdSet(selectedAdSet) {
        this.props.setSelectedAdSet(selectedAdSet);
    }

    //Fix 
    deleteSelectedAdSet(e, deletedAdSet) {
        e.preventDefault();
        let adSets = this.props.adSets;
        if (adSets.length > 1) {
            this.setState({ selectedAdSet: 0 }, () => {
                adSets.splice(deletedAdSet, 1);
                this.props.setAdSets(adSets);
            })
        }
    }

    handleLifetimeImpressions(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].lifetimeImpressions = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleDailyImpressions(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].dailyImpressions = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleBraveML(value) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].braveML = value;
        if (value) {
            adSets[this.props.selectedAdSet].audiences = '';
        }
        this.props.setAdSets(adSets);
    }

    handleConversionsCheckbox(e) {
        let adSets = this.props.adSets;
        if (e.target.checked) {
            adSets[this.props.selectedAdSet].conversionsCheckbox = true;
        }
        else {
            adSets[this.props.selectedAdSet].conversionsCheckbox = false;
            adSets[this.props.selectedAdSet].conversion = {
                type: 'post-view',
                url: '',
                observationWindow: { value: 7, label: "7" },
            };
        }
        this.props.setAdSets(adSets);
    }

    handleConversionType(value) {
        let adSets = this.props.adSets;
        if (value === 'post-view') {
            adSets[this.props.selectedAdSet].conversion.type = 'post-view';
        }
        if (value === 'post-click') {
            adSets[this.props.selectedAdSet].conversion.type = 'post-click';
        }
        this.props.setAdSets(adSets);
    }

    handleConversionURL(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].conversion.url = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleBid(e) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].bid = e.target.value;
        this.props.setAdSets(adSets);
    }

    formatBid(e) {
        let campaign = this.props.campaign;
        let adSets = this.props.adSets;
        let formattedString = e.target.value.replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (campaign.currency.label === "USD") {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        if (formattedString.includes("NaN")) {
            formattedString = '';
        }
        adSets[this.props.selectedAdSet].bid = formattedString;
        this.props.setAdSets(adSets);
    }

    handleConversionObservationWindow = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].conversion.observationWindow = selectedOption;
        this.props.setAdSets(adSets);
    };

    handleAudiences = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].audiences = selectedOption;
        this.props.setAdSets(adSets);
    };

    handlePlatforms = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].platforms = selectedOption;
        this.props.setAdSets(adSets);
    };

    handlePricingType = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].pricingType = selectedOption;
        this.props.setAdSets(adSets);
    }

    handleStatus(status) {
        let adSets = this.props.adSets;
        adSets[this.props.selectedAdSet].status = status;
        this.props.setAdSets(adSets);
    }

    handleNext() {
        this.props.setSelectedAd(0);
        this.props.setForm("adsForm")
    }

    handleBack() {
        if (this.props.selectedAdSet - 1 >= 0) {
            this.props.setSelectedAd(0);
            this.props.setSelectedAdSet(this.props.selectedAdSet - 1)
            this.props.setForm("adSetsForm")
        }
        else {
            this.props.setForm("campaignForm")
        }
    }

    renderAdSetsTabs() {
        // alert(JSON.stringify(this.props.adSets))
        if (this.props.adSets) {
            let adSetsTabs = this.props.adSets.map((adSet, index) => {
                if (index === this.props.selectedAdSet) {
                    return (
                        <S.ActiveAdSetsTab onContextMenu={(e) => this.deleteSelectedAdSet(e, index)} key={index}>
                            <Text content={`Ad Set #${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                            <Text content={"Audience Reach: 1,000,000"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        </S.ActiveAdSetsTab>
                    )
                }
                else {
                    return (
                        <S.InactiveAdSetsTab onClick={() => this.setSelectedAdSet(index)} onContextMenu={(e) => this.deleteSelectedAdSet(e, index)} key={index}>
                            <div style={{ opacity: .5 }}>
                                <Text content={`Ad Set #${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
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
                <div style={{ display: "flex", position: "relative", marginTop: "28px", width: "100%" }}>
                    <div style={{ width: "720px" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Ad Set Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Ad sets are used to define your audience and how budget is spent."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>
                                        {/* Audiences */}
                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Pricing Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                            </div>
                                            <div style={{ marginTop: "4px" }}>
                                                <Select
                                                    styles={customStyles}
                                                    value={this.props.adSets[this.props.selectedAdSet].pricingType}
                                                    onChange={this.handlePricingType}
                                                    options={pricingTypes}
                                                />
                                            </div>
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Bid"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <S.Input value={this.props.adSets[this.props.selectedAdSet].bid} onChange={(e) => this.handleBid(e)} onBlur={(e) => this.formatBid(e)} style={{ width: "175px" }} placeholder="Enter a bid..." />
                                                {
                                                    this.props.adSets[this.props.selectedAdSet].pricingType.value === 'cpm' &&
                                                    <Text style={{ marginLeft: "14px", marginTop: "2px" }} content={"Per 1000 Impressions."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                }
                                                {
                                                    this.props.adSets[this.props.selectedAdSet].pricingType.value === 'cpc' &&
                                                    <Text style={{ marginLeft: "14px", marginTop: "2px" }} content={"Per Click."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                }
                                                {
                                                    this.props.adSets[this.props.selectedAdSet].pricingType.value === 'cpl' &&
                                                    <Text style={{ marginLeft: "14px", marginTop: "2px" }} content={"Per Landing."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                }
                                                {
                                                    this.props.adSets[this.props.selectedAdSet].pricingType.value === 'cpx' &&
                                                    <Text style={{ marginLeft: "14px", marginTop: "2px" }} content={"Per Conversion."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                }
                                            </div>
                                        </S.InputContainer>
                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Categories"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Select the audience you would like to advertise to by interests."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>
                                        {/* Audiences */}

                                        <S.InputContainer>
                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                <RadioButton checked={this.props.adSets[this.props.selectedAdSet].braveML} onClick={(e) => this.handleBraveML(true)} />
                                                <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Let Brave determine best audience."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>

                                            <div style={{ display: "flex", marginTop: "12px", marginBottom: "12px" }}>
                                                <RadioButton checked={!this.props.adSets[this.props.selectedAdSet].braveML} onClick={(e) => this.handleBraveML(false)} />
                                                <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Select custom audience."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            {!this.props.adSets[this.props.selectedAdSet].braveML &&
                                                <div style={{ marginTop: "4px" }}>
                                                    <Select
                                                        styles={customStyles}
                                                        value={this.props.adSets[this.props.selectedAdSet].audiences}
                                                        onChange={this.handleAudiences}
                                                        isMulti={true}
                                                        options={this.props.segments}
                                                    />
                                                </div>
                                            }
                                        </S.InputContainer>
                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Platforms"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Select the devices and platforms you would like to advertise to."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>
                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Platform"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                            </div>
                                            <div style={{ marginTop: "4px" }}>
                                                <Select
                                                    styles={customStyles}
                                                    value={this.props.adSets[this.props.selectedAdSet].platforms}
                                                    onChange={this.handlePlatforms}
                                                    isMulti={true}
                                                    options={platforms}
                                                />
                                            </div>
                                        </S.InputContainer>
                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>

                                    <S.RightColumn>

                                        <Text content={"Conversion"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Define post-engagement analytics."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>

                                        <S.InputContainer>
                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                <input checked={this.props.adSets[this.props.selectedAdSet].conversionsCheckbox} onClick={(e) => this.handleConversionsCheckbox(e)} style={{ marginRight: "8px" }} type="checkbox" />
                                                <Text content={"Track conversions on this ad set"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>


                                        </S.InputContainer>

                                        {
                                            this.props.adSets[this.props.selectedAdSet].conversionsCheckbox &&
                                            <>
                                                <S.InputContainer>
                                                    <Text content={"Select an event to track conversions."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                        <RadioButton checked={this.props.adSets[this.props.selectedAdSet].conversion.type === 'post-view'} onClick={(e) => this.handleConversionType("post-view")} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Post-View"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </div>

                                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                                        <RadioButton checked={this.props.adSets[this.props.selectedAdSet].conversion.type === 'post-click'} onClick={(e) => this.handleConversionType("post-click")} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                                        <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Post-Click"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </div>

                                                </S.InputContainer>


                                                <S.InputContainer>
                                                    <Text content={"Count conversions when visitors land on the following URL pattern"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"Examples:"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://www.brave.com*"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://www.brave.com/products*"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://brave.com/checkout/*/confirmation"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                                    <div style={{ display: "flex", alignItems: "center", marginTop: "8px", marginBottom: "8px" }}>
                                                        <S.Input value={this.props.adSets[this.props.selectedAdSet].conversion.url} onChange={(e) => this.handleConversionURL(e)} placeholder="Enter a URL..." />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center", marginTop: "14px", marginBottom: "8px" }}>
                                                        <Text content={"within"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <div style={{ marginLeft: "12px", marginRight: "12px", width: "75px" }}>
                                                            <Select
                                                                styles={customStyles}
                                                                value={this.props.adSets[this.props.selectedAdSet].conversion.observationWindow}
                                                                onChange={this.handleConversionObservationWindow}
                                                                multi={false}
                                                                options={[{ value: 1, label: "1" }, { value: 7, label: "7" }, { value: 30, label: "30" }]}
                                                            />
                                                        </div>
                                                        <Text content={"days of an impression."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </div>

                                                </S.InputContainer>
                                            </>
                                        }

                                    </S.RightColumn>
                                </S.InnerContainer>

                                {/* <S.InnerContainer>
                                    <S.RightColumn>

                                        <Text content={"Etc."} style={{ marginBottom: "8px" }} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />

                                        <S.InputContainer>
                                            <Text content={"Impressions per user over lifetime"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.adSets[this.props.selectedAdSet].lifetimeImpressions} onChange={(e) => this.handleLifetimeImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text content={"Impressions per user per day"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.adSets[this.props.selectedAdSet].dailyImpressions} onChange={(e) => this.handleDailyImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer> */}
                                <div style={{ display: "flex" }}>
                                    <S.SecondaryButton onClick={() => this.handleBack()} style={{ marginRight: "auto", marginTop: "56px" }}>
                                        <Text content={"Back"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.SecondaryButton>
                                    <S.Button onClick={() => this.handleNext()} style={{ marginLeft: "auto", marginTop: "56px" }}>
                                        <Text content={"Next"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.Button>
                                </div>
                            </>
                        </Section>
                    </div>
                    <div style={{ width: "30%", position: "relative", marginLeft: "28px" }}>
                        {/* <S.AdSetsTabs>
                            {this.renderAdSetsTabs()}
                            <S.AdSetsTabButtonContainer>
                                <S.Button onClick={() => { this.addAdSet() }} style={{ width: "150px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                    <Text content={"New Ad Set"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            </S.AdSetsTabButtonContainer>
                        </S.AdSetsTabs> */}
                    </div>
                </div>

            </React.Fragment >
        );
    }
}

export default AdSetsForm;