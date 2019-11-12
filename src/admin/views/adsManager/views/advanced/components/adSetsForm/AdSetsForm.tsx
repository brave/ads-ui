import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdSetsForm.style";
import Switch from "react-switch";
import Select from 'react-select';

const options = [
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
];

class AdSetsForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedAdSet: 0,
            selectedOption: null
        };
    }

    addAdSet() {
        let adSets = this.props.adSets;
        adSets.push({
            lifetimeImpressions: '',
            dailyImpressions: '',
            audiences: '',
            status: '',
        })
        this.props.setAdSets(adSets);
    }

    setSelectedAdSet(selectedAdSet) {
        this.setState({ selectedAdSet })
    }

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
        adSets[this.state.selectedAdSet].lifetimeImpressions = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleDailyImpressions(e) {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].dailyImpressions = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleAudiences = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].audiences = selectedOption;
        this.props.setAdSets(adSets);
    };

    handleStatus(status) {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].status = status;
        this.props.setAdSets(adSets);
    }

    renderAdSetsTabs() {
        // alert(JSON.stringify(this.props.adSets))
        if (this.props.adSets) {
            let adSetsTabs = this.props.adSets.map((adSet, index) => {
                if (index === this.state.selectedAdSet) {
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
                <div style={{ display: "flex" }}>
                    <div style={{ width: "" }}>
                        <S.AdSetsTabs>
                            {this.renderAdSetsTabs()}
                            <S.AdSetsTabButtonContainer>
                                <S.Button onClick={() => { this.addAdSet() }} style={{ marginLeft: "auto", marginRight: "auto", width: "175px", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                    <Text content={"New Ad Set"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            </S.AdSetsTabButtonContainer>
                        </S.AdSetsTabs>
                    </div>
                    <div style={{ width: "856px", marginLeft: "auto", marginRight: "auto" }}>
                        <Section fullWidthChild={true}>
                            <S.Container>
                                <S.LeftColumn>
                                    <Text content={"Ad Sets"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                    <Text content={"Ad Sets are used to define your audience from interests, location, and platform."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    <S.LeftColumnContainer>

                                    </S.LeftColumnContainer>
                                </S.LeftColumn>
                                <S.RightColumn>

                                    {/* Lifetime impressions */}
                                    <S.InputContainer>
                                        <Text content={"Lifetime impressions"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.adSets[this.state.selectedAdSet].lifetimeImpressions} onChange={(e) => this.handleLifetimeImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                    </S.InputContainer>

                                    {/* Daily impressions */}
                                    <S.InputContainer>
                                        <Text content={"Daily impressions"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <S.Input value={this.props.adSets[this.state.selectedAdSet].dailyImpressions} onChange={(e) => this.handleDailyImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                    </S.InputContainer>

                                    {/* Audiences */}
                                    <S.InputContainer>
                                        <Text content={"Audiences"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <div style={{ marginTop: "28px" }}>
                                            <Select
                                                value={this.props.adSets[this.state.selectedAdSet].audiences}
                                                onChange={this.handleAudiences}
                                                isMulti={true}
                                                options={options}
                                            />
                                        </div>
                                    </S.InputContainer>

                                    {/* Status */}
                                    <S.InputContainer>
                                        <Text content={"Status"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />

                                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                                            <Switch checked={this.props.adSets[this.state.selectedAdSet].status} onChange={(status) => { this.handleStatus(status) }} onColor="#FB7959" uncheckedIcon={false} checkedIcon={false} height={23} width={45} />
                                            <Text style={{ marginLeft: "12px", marginBottom: "3px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                                                {this.props.adSets[this.state.selectedAdSet].status ? "Active" : "Paused"}
                                            </Text>
                                        </div>
                                    </S.InputContainer>

                                    {/* Nav Buttons */}
                                    <S.Container>
                                        <S.Button onClick={() => { this.props.setForm("adsForm") }} style={{ marginLeft: "auto" }}>
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

export default AdSetsForm;