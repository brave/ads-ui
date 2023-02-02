import React, { Component } from 'react';
import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./CampaignForm.style";
import './styles/campaignForm.style.css';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import moment from 'moment';
import MultiSelect from "../../../../../../../components/Select/Select";

const currencies = [
    { value: 'usd', label: 'USD' },
    { value: 'bat', label: 'BAT' },
]

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#fafafa",
        height: "42px"
    }),
}

class CampaignForm extends Component<any, any> {

    handleCampaignName(e) {
        let campaign = this.props.campaign;
        campaign.name = e.target.value
        this.props.setCampaign(campaign);
    }

    handleStartTime(e) {
        let campaign = this.props.campaign;
        campaign.startTime = e.target.value;
        this.props.setCampaign(campaign);
        this.props.validate("campaignForm");
    }

    handleEndTime(e) {
        let campaign = this.props.campaign;
        campaign.endTime = e.target.value;
        this.props.setCampaign(campaign);
        this.props.validate("campaignForm");
    }

    handleGeoTargets = selectedOption => {
        let campaign = this.props.campaign;
        campaign.geoTargets = selectedOption;
        this.props.setCampaign(campaign);
    };

    handleCurrency = selectedOption => {
        this.clearBids();
        let campaign = this.props.campaign;
        campaign.currency = selectedOption;
        campaign.dailyBudget = '';
        campaign.totalBudget = '';
        campaign.bid = '';
        this.props.setCampaign(campaign);
    };

    handleDailyBudget(e) {
        let campaign = this.props.campaign;
        campaign.dailyBudget = e.target.value
        this.props.setCampaign(campaign);
    }

    formatDailyBudget(e) {
        let campaign = this.props.campaign;
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
        campaign.dailyBudget = formattedString;
        this.props.validate("campaignForm");
        this.props.setCampaign(campaign);
    }

    handleLifetimeBudget(e) {
        let campaign = this.props.campaign;
        campaign.totalBudget = e.target.value
        this.props.setCampaign(campaign);
    }

    formatLifetimeBudget(e) {
        let campaign = this.props.campaign;
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
        campaign.totalBudget = formattedString;
        this.props.validate("campaignForm");
        this.props.setCampaign(campaign);
    }

    handleStatus(status) {
        let campaign = this.props.campaign;
        if (status) {
            campaign.state = 'active';
        } else {
            campaign.state = 'paused';
        }
        this.props.setCampaign(campaign);
    }

    handleObjective(objective) {
        let campaign = this.props.campaign;
        campaign.objective = objective;
        this.props.setCampaign(campaign);
    }

    handleNext() {
        this.props.setSelectedAdSet(0);
        this.props.setForm("adSetsForm");
    }

    addAdSet() {
        let pricingType = '';
        let bid = '';
        if (this.props.campaign.editMode) {
            pricingType = this.props.campaign.globalBillingType;
            bid = this.props.campaign.price;
        }
        let adSets = this.props.adSets;
        adSets.push({
            id: '',
            pricingType,
            newAdSet: true,
            bid,
            lifetimeImpressions: '',
            dailyImpressions: '',
            braveML: true,
            audiences: '',
            platforms: [
                { value: "_Bt5nxrNo", label: "macos" },
                { value: "k80syyzDa", label: "ios" },
                { value: "i1g4cO6Pl", label: "windows" },
                { value: "-Ug5OXisJ", label: "linux" },
                { value: "mbwfZU-4W", label: "android" },
            ],
            conversion: {
                type: 'postview',
                url: '',
                observationWindow: { value: 30, label: "30" },
            },
            ads: [
                {
                    creative: '',
                    newCreative: true,
                    name: '',
                    title: '',
                    body: '',
                    targetUrl: '',
                    creativeUrl: '',
                    size: '',
                    notificationAd: true,
                    inPageAd: false,
                    channels: '',
                    previewAssets: {
                        title: '',
                        body: '',
                        creativeUrl: '',
                    }
                }
            ]
        })
        this.props.setAdSets(adSets);
    }

    clearBids() {
        let adSets = this.props.adSets;
        if (adSets) {
            adSets.forEach((adSet) => {
                adSet.bid = '';
            });
        }
        this.props.setAdSets(adSets);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex", position: "relative", marginTop: "28px", width: "100%", marginBottom: "220px" }}>
                    <div style={{ width: "720px" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Campaign Objective"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Choose a campaign objective that fits your business goals."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>

                                        <S.InputContainer style={{ width: "100%" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "14px", marginBottom: "-14px" }}>
                                                <S.Objective selected={this.props.campaign.objective === 'awareness'} onClick={() => this.handleObjective("awareness")}>
                                                    <Text content={"Awareness"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <InfoIcon />
                                                </S.Objective>
                                                <S.Objective selected={this.props.campaign.objective === 'engagement'} onClick={() => this.handleObjective("engagement")}>
                                                    <Text content={"Engagement"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <InfoIcon />
                                                </S.Objective>
                                                <S.Objective selected={this.props.campaign.objective === 'conversion'} onClick={() => this.handleObjective("conversion")}>
                                                    <Text content={"Conversion"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <InfoIcon />
                                                </S.Objective>
                                            </div>
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>
                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Campaign Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>
                                        <S.InputContainer>
                                            <Text content={"Campaign Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.name} onChange={(e) => this.handleCampaignName(e)} placeholder="Enter a campaign name..." autoComplete="off" type="text" />
                                        </S.InputContainer>

                                        <div style={{ width: "99%", display: "flex", marginTop: "-12px", marginRight: "8px", marginBottom: "12px" }}>
                                            <Text content={"+ Create new ad set"} onClick={() => this.addAdSet()} color={"#E0694C"} style={{ marginTop: "2px", marginLeft: "auto", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </div>

                                        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                                            {(moment(this.props.campaign.startTime) <= moment() && this.props.campaign.editMode) ?
                                                <S.InputContainer style={{ width: "45%" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <Text content={"Start Date"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                       <InfoIcon />
                                                    </div>
                                                    <S.Input readOnly={true} type="datetime-local" defaultValue={this.props.campaign.startTime} error={this.props.validations?.schedule?.valid === false} />
                                                </S.InputContainer>
                                                :
                                                <S.InputContainer style={{ width: "45%" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <Text content={"Start Date"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                       <InfoIcon />
                                                    </div>
                                                    <S.Input type="datetime-local" defaultValue={this.props.campaign.startTime} onChange={(e) => this.handleStartTime(e)} error={this.props.validations?.schedule?.valid === false} />
                                                </S.InputContainer>
                                            }

                                            <div style={{ width: "10%", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>
                                                <ArrowForwardIcon />
                                            </div>

                                            <S.InputContainer style={{ width: "45%" }}>
                                                <div style={{ display: "flex" }}>
                                                    <Text content={"End Date"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                   <InfoIcon />
                                                </div>
                                                <S.Input type="datetime-local" defaultValue={this.props.campaign.endTime} onChange={(e) => this.handleEndTime(e)} error={this.props.validations?.schedule?.valid === false} />
                                            </S.InputContainer>
                                        </div>
                                        <div style={{ width: "99%", display: "flex", marginTop: "-12px", marginRight: "8px", marginBottom: "8px" }}>
                                            <Text style={{ marginLeft: "auto" }} content={`${(new Date).toString().split('(')[1].slice(0, -1)}`} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                        </div>

                                        {
                                            this.props.validations?.schedule?.valid === false &&
                                            <div style={{ width: "100%", borderRadius: "4px", display: "flex" }}>
                                                <div style={{ backgroundColor: "#e32444", width: "96px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <InfoIcon />
                                                </div>
                                                <div style={{ padding: "28px", borderTop: "1px solid #e2e2e2", borderRight: "1px solid #e2e2e2", borderBottom: "1px solid #e2e2e2", width: "100%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                                    <Text content={"Oops! Campaign Start Date cannot be after End Date."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                </div>
                                            </div>
                                        }

                                        {
                                            this.props.validations?.endTimeSchedule?.valid === false &&
                                            <div style={{ width: "100%", borderRadius: "4px", display: "flex" }}>
                                                <div style={{ backgroundColor: "#e32444", width: "96px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <InfoIcon />
                                                </div>
                                                <div style={{ padding: "28px", borderTop: "1px solid #e2e2e2", borderRight: "1px solid #e2e2e2", borderBottom: "1px solid #e2e2e2", width: "100%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                                    <Text content={"Oops! Campaign End Date can only be moved forward."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                </div>
                                            </div>
                                        }

                                        {this.props.campaign.editMode && this.props.campaign.state !== 'under_review' &&
                                            <div style={{ width: "45%" }}>
                                                <div style={{ display: "flex" }}>
                                                    <Text content={"Campaign State"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                   <InfoIcon />
                                                </div>
                                                <div style={{ display: "flex", marginTop: "12px", marginLeft: "0px", alignItems: "center" }}>
                                                    {/*<Switch checked={this.props.campaign.state === 'active'} onChange={(status) => { this.handleStatus(status) }} onColor="#FB7959" uncheckedIcon={false} checkedIcon={false} height={23} width={45} />*/}
                                                    {/*<Text style={{ marginLeft: "6px" }} content={this.props.campaign.state === 'active' ? "Active" : "Paused"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />*/}
                                                </div>
                                            </div>
                                        }

                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>

                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Budget"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Set a limit on how much your campaign will spend."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />                                        </div>
                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                               <InfoIcon />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <S.Input style={{ marginRight: "12px" }} value={this.props.campaign.totalBudget} onChange={(e) => this.handleLifetimeBudget(e)} onBlur={(e) => this.formatLifetimeBudget(e)} placeholder="Enter a lifetime budget..." error={this.props.validations?.budget?.valid === false} />
                                                <div style={{ marginTop: "4px", width: "160px" }}>
                                                    {/*<Select*/}
                                                    {/*    styles={customStyles}*/}
                                                    {/*    value={this.props.campaign.currency}*/}
                                                    {/*    onChange={this.handleCurrency}*/}
                                                    {/*    options={currencies}*/}
                                                    {/*    isDisabled={this.props.campaign.editMode}*/}
                                                    {/*/>*/}
                                                </div>
                                            </div>
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Daily Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                               <InfoIcon />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <S.Input style={{ marginRight: "12px" }} value={this.props.campaign.dailyBudget} onChange={(e) => this.handleDailyBudget(e)} onBlur={(e) => this.formatDailyBudget(e)} placeholder="Enter a daily budget..." error={this.props.validations?.budget?.valid === false} />
                                                <div style={{ marginTop: "4px", width: "160px" }}>
                                                    {/*<Select*/}
                                                    {/*    styles={customStyles}*/}
                                                    {/*    value={this.props.campaign.currency}*/}
                                                    {/*    onChange={this.handleCurrency}*/}
                                                    {/*    options={currencies}*/}
                                                    {/*    isDisabled={this.props.campaign.editMode}*/}
                                                    {/*/>*/}
                                                </div>
                                            </div>
                                        </S.InputContainer>

                                        {
                                            this.props.validations?.budget?.valid === false &&
                                            <div style={{ width: "100%", borderRadius: "4px", display: "flex" }}>
                                                <div style={{ backgroundColor: "#e32444", width: "96px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <InfoIcon />
                                                </div>
                                                <div style={{ padding: "28px", borderTop: "1px solid #e2e2e2", borderRight: "1px solid #e2e2e2", borderBottom: "1px solid #e2e2e2", width: "100%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                                    <Text content={"Oops! Daily Budget cannot be greater than Lifetime Budget."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                </div>
                                            </div>
                                        }

                                        {
                                            this.props.validations?.budgetSpend?.valid === false &&
                                            <div style={{ width: "100%", borderRadius: "4px", display: "flex" }}>
                                                <div style={{ backgroundColor: "#e32444", width: "96px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <InfoIcon />
                                                </div>
                                                <div style={{ padding: "28px", borderTop: "1px solid #e2e2e2", borderRight: "1px solid #e2e2e2", borderBottom: "1px solid #e2e2e2", width: "100%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                                    <Text content={`Oops! Lifetime Budget cannot be less than Campaign Spend (${this.props.campaign.spend}).`} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                </div>
                                            </div>
                                        }

                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.RightColumn>
                                        <Text content={"Location"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                        <div style={{ display: "flex" }}>
                                            <Text content={"Select the geographic regions where your ads will be shown."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />                                        </div>

                                        <S.InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Locations"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                               <InfoIcon />
                                            </div>
                                            <div style={{ marginTop: "4px" }}>
                                                {/*<Select*/}
                                                {/*    styles={customStyles}*/}
                                                {/*    value={this.props.campaign.geoTargets}*/}
                                                {/*    onChange={this.handleGeoTargets}*/}
                                                {/*    isMulti={true}*/}
                                                {/*    options={this.props.geoCodes}*/}
                                                {/*/>*/}
                                            </div>
                                        </S.InputContainer>

                                        <div onClick={() => this.handleNext()} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", marginLeft: "auto", marginTop: "56px", cursor: "pointer" }}>
                                            <span>
                                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                                    Next
                                                </Text>
                                            </span>
                                        </div>

                                    </S.RightColumn>
                                </S.InnerContainer>
                            </>
                        </Section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CampaignForm;
