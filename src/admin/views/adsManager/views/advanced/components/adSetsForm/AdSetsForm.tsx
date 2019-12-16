import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./AdSetsForm.style";
import Switch from "react-switch";
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
    }),
}

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
            braveML: true,
            audiences: '',
            conversionsCheckbox: true,
            status: '',
            conversion: {
                type: 'post-view',
                url: '',
                observationWindow: { value: 7, label: "7" },
            }
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

    handleBraveML(value) {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].braveML = value;
        if (value) {
            adSets[this.state.selectedAdSet].audiences = '';
        }
        this.props.setAdSets(adSets);
    }

    handleConversionsCheckbox(e) {
        let adSets = this.props.adSets;
        if (e.target.checked) {
            adSets[this.state.selectedAdSet].conversionsCheckbox = true;
        }
        else {
            adSets[this.state.selectedAdSet].conversionsCheckbox = false;
            adSets[this.state.selectedAdSet].conversion = {
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
            adSets[this.state.selectedAdSet].conversion.type = 'post-view';
        }
        if (value === 'post-click') {
            adSets[this.state.selectedAdSet].conversion.type = 'post-click';
        }
        this.props.setAdSets(adSets);
    }

    handleConversionURL(e) {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].conversion.url = e.target.value;
        this.props.setAdSets(adSets);
    }

    handleConversionObservationWindow = selectedOption => {
        let adSets = this.props.adSets;
        adSets[this.state.selectedAdSet].conversion.observationWindow = selectedOption;
        this.props.setAdSets(adSets);
    };

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
                    <div style={{ width: "843px" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Audience"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Ad Sets are used to define your audience from interests, location, and platform."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                        <S.LeftColumnContainer>

                                        </S.LeftColumnContainer>
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        {/* Audiences */}
                                        <S.InputContainer>
                                            <Text content={"Audiences"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                <input style={{ marginRight: "8px" }} type="radio" checked={this.props.adSets[this.state.selectedAdSet].braveML} onChange={(e) => this.handleBraveML(true)} />
                                                <Text content={"Let Brave determine best audience."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>

                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                                <input style={{ marginRight: "8px" }} type="radio" checked={!this.props.adSets[this.state.selectedAdSet].braveML} onChange={(e) => this.handleBraveML(false)} />
                                                <Text content={"Select custom audience."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            {!this.props.adSets[this.state.selectedAdSet].braveML &&
                                                <div style={{ marginTop: "4px" }}>
                                                    <Select
                                                        styles={customStyles}
                                                        value={this.props.adSets[this.state.selectedAdSet].audiences}
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
                                    <S.LeftColumn>
                                        <Text content={"Conversions"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Ad Sets are used to define your audience from interests, location, and platform."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                        <S.LeftColumnContainer>

                                        </S.LeftColumnContainer>
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        <S.InputContainer>
                                            <Text content={"Conversion tracking"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                            <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                <input checked={this.props.adSets[this.state.selectedAdSet].conversionsCheckbox} onClick={(e) => this.handleConversionsCheckbox(e)} style={{ marginRight: "8px" }} type="checkbox" />
                                                <Text content={"Track conversions on this ad set"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>


                                        </S.InputContainer>

                                        {
                                            this.props.adSets[this.state.selectedAdSet].conversionsCheckbox &&
                                            <>
                                                <S.InputContainer>
                                                    <Text content={"Select an event to track conversions."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                                        <input checked={this.props.adSets[this.state.selectedAdSet].conversion.type === 'post-view'} onClick={(e) => this.handleConversionType("post-view")} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                                        <Text content={"Post-View"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </div>

                                                    <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                                        <input checked={this.props.adSets[this.state.selectedAdSet].conversion.type === 'post-click'} onClick={(e) => this.handleConversionType("post-click")} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                                        <Text content={"Post-Click"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </div>

                                                </S.InputContainer>


                                                <S.InputContainer>
                                                    <Text content={"Count conversions when visitors land on the following URL pattern"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"Examples:"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://www.brave.com*"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://www.brave.com/products*"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    <Text content={"https://brave.com/checkout/*/confirmation"} color={"grey"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                                                    <div style={{ display: "flex", alignItems: "center", marginTop: "8px", marginBottom: "8px" }}>
                                                        <S.Input value={this.props.adSets[this.state.selectedAdSet].conversion.url} onChange={(e) => this.handleConversionURL(e)} placeholder="Enter a URL..." />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center", marginTop: "14px", marginBottom: "8px" }}>
                                                        <Text content={"within"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                        <div style={{ marginLeft: "12px", marginRight: "12px", width: "75px" }}>
                                                            <Select
                                                                styles={customStyles}
                                                                value={this.props.adSets[this.state.selectedAdSet].conversion.observationWindow}
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

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Etc."} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Ad Sets are used to define your audience from interests, location, and platform."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                        <S.LeftColumnContainer>

                                        </S.LeftColumnContainer>
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        {/* Lifetime impressions */}
                                        <S.InputContainer>
                                            <Text content={"Impressions per user over lifetime"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.adSets[this.state.selectedAdSet].lifetimeImpressions} onChange={(e) => this.handleLifetimeImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                        </S.InputContainer>

                                        {/* Daily impressions */}
                                        <S.InputContainer>
                                            <Text content={"Impressions per user per day"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.props.adSets[this.state.selectedAdSet].dailyImpressions} onChange={(e) => this.handleDailyImpressions(e)} placeholder="Enter a number of impressions..." type="number" name="name" />
                                        </S.InputContainer>

                                        {/* Nav Buttons */}
                                        <>
                                            <S.Button onClick={() => { this.props.setForm("adsForm") }} style={{ marginLeft: "auto", marginTop: "56px" }}>
                                                <Text content={"Next"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                            </S.Button>
                                        </>
                                    </S.RightColumn>
                                </S.InnerContainer>
                            </>
                        </Section>
                    </div>
                    <div style={{ width: "253px", marginLeft: "28px" }}>
                        <S.AdSetsTabs>
                            {this.renderAdSetsTabs()}
                            <S.AdSetsTabButtonContainer>
                                <S.Button onClick={() => { this.addAdSet() }} style={{ width: "150px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", color: "black", border: "1px solid #d6d6d6" }}>
                                    <Text content={"New Ad Set"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            </S.AdSetsTabButtonContainer>
                        </S.AdSetsTabs>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default AdSetsForm;