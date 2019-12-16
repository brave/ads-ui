import React, { Component } from 'react';
import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./CampaignForm.style";
import Switch from "react-switch";
import Select from 'react-select';
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import MomentUtils from "@date-io/moment";
import './styles/campaignForm.style.css';

const currencies = [
    { value: 'usd', label: 'USD' },
    { value: 'bat', label: 'BAT' },
]

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
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
    }

    handleEndTime(e) {
        let campaign = this.props.campaign;
        campaign.endTime = e.target.value;
        this.props.setCampaign(campaign);
    }

    handleDailyFrequencyCap(e) {
        let campaign = this.props.campaign;
        campaign.dailyFrequencyCap = e.target.value
        this.props.setCampaign(campaign);
    }

    handleBid(e) {
        let campaign = this.props.campaign;
        campaign.bid = e.target.value
        this.props.setCampaign(campaign);
    }

    formatBid(e) {
        let campaign = this.props.campaign;
        let formattedString = e.target.value.replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (campaign.currency.label === "USD") {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        campaign.bid = formattedString;
        this.props.setCampaign(campaign);
    }

    handleGeoTargets = selectedOption => {
        let campaign = this.props.campaign;
        campaign.geoTargets = selectedOption;
        this.props.setCampaign(campaign);
    };

    handleCurrency = selectedOption => {
        let campaign = this.props.campaign;
        campaign.currency = selectedOption;
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
        campaign.dailyBudget = formattedString;
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
        campaign.totalBudget = formattedString;
        this.props.setCampaign(campaign);
    }

    handleStatus(status) {
        let campaign = this.props.campaign;
        campaign.status = status;
        this.props.setCampaign(campaign);
    }

    handlePricingType(e, pricingType) {
        let campaign = this.props.campaign;
        if (pricingType === 'cpm') {
            campaign.cpm = true;
            campaign.cpc = false;
        }
        if (pricingType === 'cpc') {
            campaign.cpm = false;
            campaign.cpc = true;
        }
        this.props.setCampaign(campaign);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "843px", marginLeft: "auto", marginRight: "auto" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"General"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        <S.InputContainer>
                                            <Text content={"Campaign Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.name} onChange={(e) => this.handleCampaignName(e)} placeholder="Enter a campaign name..." type="text" name="name" />
                                        </S.InputContainer>


                                        <S.InputContainer>
                                            <Text content={`Start Time (${(new Date).toString().split('(')[1].slice(0, -1)})`} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input type="datetime-local" defaultValue={this.props.campaign.startTime} onChange={(e) => this.handleStartTime(e)} />
                                            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <DateTimePicker
                                                    style={{ width: "100%", marginTop: "8px" }}
                                                    value={this.props.campaign.startTime}
                                                    onChange={(value) => this.handleStartTime(value)}
                                                />
                                            </MuiPickersUtilsProvider> */}
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text content={`End Time (${(new Date).toString().split('(')[1].slice(0, -1)})`} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input type="datetime-local" defaultValue={this.props.campaign.endTime} onChange={(e) => this.handleEndTime(e)} />
                                            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <DateTimePicker
                                                    style={{ width: "100%", marginTop: "8px" }}
                                                    value={this.props.campaign.endTime}
                                                    onChange={(value) => this.handleEndTime(value)}
                                                />
                                            </MuiPickersUtilsProvider> */}
                                        </S.InputContainer>


                                        <S.InputContainer>
                                            <Text content={"Locations"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <div style={{ marginTop: "4px" }}>
                                                <Select
                                                    styles={customStyles}
                                                    value={this.props.campaign.geoTargets}
                                                    onChange={this.handleGeoTargets}
                                                    isMulti={true}
                                                    options={this.props.geoCodes}
                                                />
                                            </div>
                                        </S.InputContainer>


                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Budget"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        <S.InputContainer>
                                            <Text content={"Currency"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <div style={{ marginTop: "4px" }}>
                                                <Select
                                                    styles={customStyles}
                                                    value={this.props.campaign.currency}
                                                    onChange={this.handleCurrency}
                                                    options={currencies}
                                                />
                                            </div>
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.totalBudget} onChange={(e) => this.handleLifetimeBudget(e)} onBlur={(e) => this.formatLifetimeBudget(e)} placeholder="Enter a lifetime budget..." />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text content={"Daily Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.dailyBudget} onChange={(e) => this.handleDailyBudget(e)} onBlur={(e) => this.formatDailyBudget(e)} placeholder="Enter a daily budget..." />
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Pricing"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        {/* CPM / CPC */}
                                        <S.InputContainer>
                                            <Text content={"Pricing Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "-4px" }}>
                                                <input onClick={(e) => this.handlePricingType(e, "cpm")} checked={this.props.campaign.cpm} type="radio" />
                                                <Text style={{ marginLeft: "7px", marginRight: "7px" }} content={"CPM"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                <input onClick={(e) => this.handlePricingType(e, "cpc")} checked={this.props.campaign.cpc} type="radio" />
                                                <Text style={{ marginLeft: "7px", marginRight: "7px" }} content={"CPC"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text content={"Bid"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.bid} onChange={(e) => this.handleBid(e)} onBlur={(e) => this.formatBid(e)} placeholder="Enter a bid..." />
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Etc."} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        <S.InputContainer>
                                            <Text content={"Daily Frequency Cap"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.campaign.dailyFrequencyCap} onChange={(e) => this.handleDailyFrequencyCap(e)} placeholder="Enter a daily frequency cap..." type="number" name="name" />
                                        </S.InputContainer>
                                        <div onClick={() => { this.props.setForm("adSetsForm") }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#4C54D2", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", marginLeft: "auto", marginTop: "56px" }}>
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
                    {/* <div style={{ width: "253px", marginLeft: "28px" }}><Section fullWidthChild={true}><div></div></Section></div> */}
                </div>
            </React.Fragment>
        );
    }
}

export default CampaignForm;