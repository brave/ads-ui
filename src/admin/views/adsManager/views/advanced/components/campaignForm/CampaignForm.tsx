import React, { Component } from 'react';
import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./CampaignForm.style";
import Switch from "react-switch";
import Select from 'react-select';
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import MomentUtils from "@date-io/moment";

const options = [
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
];

const currencies = [
    { value: 'usd', label: 'USD' },
    { value: 'bat', label: 'BAT' },
]

class CampaignForm extends Component<any, any> {

    handleCampaignName(e) {
        let campaign = this.props.campaign;
        campaign.name = e.target.value
        this.props.setCampaign(campaign);
    }

    handleStartTime(value) {
        let campaign = this.props.campaign;
        campaign.startTime = value
        this.props.setCampaign(campaign);
    }

    handleEndTime(value) {
        let campaign = this.props.campaign;
        campaign.endTime = value
        this.props.setCampaign(campaign);
    }

    handleDailyFrequencyCap(e) {
        let campaign = this.props.campaign;
        campaign.dailyFrequencyCap = e.target.value
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

    handleLifetimeBudget(e) {
        let campaign = this.props.campaign;
        campaign.lifetimeBudget = e.target.value
        this.props.setCampaign(campaign);
    }

    handleStatus(status) {
        let campaign = this.props.campaign;
        campaign.status = status;
        this.props.setCampaign(campaign);
    }

    render() {
        return (
            <div>
                <Section fullWidthChild={true}>
                    <S.Container>
                        <S.LeftColumn>
                            <Text content={"Campaign"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                            <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        </S.LeftColumn>
                        <S.RightColumn>

                            <S.InputContainer>
                                <Text content={"Campaign Name"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <S.Input value={this.props.campaign.name} onChange={(e) => this.handleCampaignName(e)} placeholder="Enter a campaign name..." type="text" name="name" />
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Start Time"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker
                                        style={{ width: "100%", marginTop: "28px" }}
                                        value={this.props.campaign.startTime}
                                        onChange={(value) => this.handleStartTime(value)}
                                    />
                                </MuiPickersUtilsProvider>
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"End Time"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker
                                        style={{ width: "100%", marginTop: "28px" }}
                                        value={this.props.campaign.endTime}
                                        onChange={(value) => this.handleEndTime(value)}
                                    />
                                </MuiPickersUtilsProvider>
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Daily Frequency Cap"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <S.Input value={this.props.campaign.dailyFrequencyCap} onChange={(e) => this.handleDailyFrequencyCap(e)} placeholder="Enter a daily frequency cap..." type="text" name="name" />
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Geo Targets"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <div style={{ marginTop: "28px" }}>
                                    <Select
                                        value={this.props.campaign.geoTargets}
                                        onChange={this.handleGeoTargets}
                                        isMulti={true}
                                        options={options}
                                    />
                                </div>
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Currency"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <div style={{ marginTop: "28px" }}>
                                    <Select
                                        value={this.props.campaign.currency}
                                        onChange={this.handleCurrency}
                                        options={currencies}
                                    />
                                </div>
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Daily Budget"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <S.Input value={this.props.campaign.dailyBudget} onChange={(e) => this.handleDailyBudget(e)} placeholder="Enter a daily budget..." type="number" name="name" />
                            </S.InputContainer>

                            <S.InputContainer>
                                <Text content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <S.Input value={this.props.campaign.lifetimeBudget} onChange={(e) => this.handleLifetimeBudget(e)} placeholder="Enter a lifetime budget..." type="number" name="name" />
                            </S.InputContainer>
                            <S.InputContainer>
                                <Text content={"Status"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                                    <Switch checked={this.props.campaign.status} onChange={(status) => { this.handleStatus(status) }} onColor="#FB7959" uncheckedIcon={false} checkedIcon={false} height={23} width={45} />
                                    <Text style={{ marginLeft: "12px", marginBottom: "3px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                                        {this.props.campaign.status ? "Active" : "Paused"}
                                    </Text>
                                </div>
                            </S.InputContainer>
                            <div onClick={() => { this.props.setForm("adSetsForm") }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#4C54D2", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", marginLeft: "auto" }}>
                                <span>
                                    <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                        Next
                                    </Text>
                                </span>
                            </div>
                        </S.RightColumn>
                    </S.Container>
                </Section>
            </div>
        );
    }
}

export default CampaignForm;