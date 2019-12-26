import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./ReviewForm.style";
import { Icon } from '@material-ui/core';

class ReviewForm extends Component<any, any> {

    formatDate(date) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    formatGeoTargets(geoTargets) {
        let formattedGeoTargets = '';
        if (geoTargets) {
            geoTargets.forEach((geoTarget) => {
                formattedGeoTargets += geoTarget.label + ", ";
            });
        }
        return formattedGeoTargets;
    }

    renderErrors() {
        let errors;
        let keys = Object.keys(this.props.validations);
        if (keys) {
            errors = keys.map((key) => {

                if (key !== 'valid' && key !== 'adSets' && key !== 'ads') {
                    if (this.props.validations[key].valid === false) {
                        return <Text content={`• ${this.props.validations[key].errorMessage}`} sizes={[16, 16, 15, 15, 15]} style={{ marginTop: "12px" }} fontFamily={"Muli"} />
                    }
                }
                if (key === 'adSets') {
                    if (this.props.validations.adSets) {
                        return this.props.validations.adSets.map((adSet, index) => {
                            if (Object.keys(adSet)) {
                                let counter = 0;
                                return Object.keys(adSet).map((key) => {
                                    if (adSet[key].valid === false && counter < 1) {
                                        counter++;
                                        return <Text content={`• Invalid Ad Set: Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 15]} style={{ marginTop: "12px" }} fontFamily={"Muli"} />
                                    }
                                })
                            }
                        })
                    }
                }
                if (key === 'ads') {
                    if (this.props.validations.ads) {
                        return this.props.validations.ads.map((ad, index) => {
                            if (Object.keys(ad)) {
                                let counter = 0;
                                return Object.keys(ad).map((key) => {
                                    if (ad[key].valid === false && counter < 1) {
                                        counter++;
                                        return <Text content={`• Invalid Ad: Ad ${index + 1}`} sizes={[16, 16, 15, 15, 15]} style={{ marginTop: "12px" }} fontFamily={"Muli"} />
                                    }
                                })
                            }
                        })
                    }
                }

            });
        }

        console.log(errors);
        return errors.reverse();
    }

    renderAdSets() {
        let adSets = this.props.adSets.map((adSet, index) => {
            return <div>
                <>
                    <Text content={`Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />


                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Audiences"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                    {adSet.braveML ?

                        <Text style={{ marginTop: "4px" }} content={"Let Brave determine best audience."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        :
                        <Text style={{ marginTop: "4px" }} content={adSet.audiences.map((audience) => { return ` ${audience.label}` })} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                    }

                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Conversion"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                    {!adSet.conversionsCheckbox ?

                        <Text style={{ marginTop: "4px" }} content={"N/A"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        :
                        <>
                            <Text style={{ marginTop: "4px" }} content={adSet.conversion.type} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={adSet.conversion.url} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={adSet.conversion.observationWindow.label + " day observation window"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        </>


                    }

                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Lifetime Impressions"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "4px" }} content={adSet.lifetimeImpressions} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Daily Impressions"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "4px" }} content={adSet.dailyImpressions} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                </>
                <div style={{ marginBottom: '8px' }}></div>
                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>
                {this.renderAdSetAds(index)}
            </div>
        });
        return adSets;
    }

    renderAdSetAds(adSetIndex) {
        let ads;
        if (this.props.ads) {
            ads = this.props.ads.map((ad, index) => {
                if (ad.adSets) {
                    return ad.adSets.map((adSet) => {
                        if (adSet.value === adSetIndex) {
                            return <>
                                <Text content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                                <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <Text style={{ marginTop: "4px" }} content={ad.creative.label} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>
                            </>
                        }
                    })
                }
            });
        }
        return ads;
    }

    renderAds() {
        let ads = this.props.ads.map((ad, index) => {
            return <div>
                <>
                    <Text content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />

                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "4px" }} content={ad.creative.label} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Ad Sets"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "4px" }} content={ad.adSets.map((adSet, index) => { return ` Ad Set #${index + 1}` })} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                </>
            </div>
        });
        return ads;
    }

    render() {
        return (
            <React.Fragment>
                <S.FlexContainer>
                    <div style={{ width: "843px", marginLeft: "auto", marginRight: "auto" }}>

                        {this.props.validations.valid === false &&
                            <div style={{ width: "100%", borderRadius: "4px", display: "flex", marginBottom: "28px" }}>
                                <div style={{ backgroundColor: "#e32444", width: "96px", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Icon style={{ color: "white", fontSize: "32px" }}>info</Icon>
                                </div>
                                <div style={{ padding: "28px", borderTop: "1px solid #e2e2e2", borderRight: "1px solid #e2e2e2", borderBottom: "1px solid #e2e2e2", width: "100%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                    <Text style={{ marginBottom: "12px" }} content={"Please fix the following errors to continue:"} color={"#e32444"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    {this.renderErrors()}
                                </div>
                            </div>
                        }
                        <Section header={this.props.campaign.name} fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"General"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Campaign Name"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.name} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Locations"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatGeoTargets(this.props.campaign.geoTargets)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Start Time"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatDate(this.props.campaign.startTime)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"End Time"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatDate(this.props.campaign.endTime)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                        {/* <S.InputContainer>
                                            <Text color={"grey"} content={"Daily Frequency Cap"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.dailyFrequencyCap} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer> */}
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
                                            <Text color={"grey"} content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.totalBudget} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Daily Budget"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.dailyBudget} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
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

                                        {this.props.campaign.cpm ?

                                            <S.InputContainer>
                                                <Text color={"grey"} content={"Pricing Type"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                                <Text style={{ marginTop: "4px" }} content={"CPM"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                            </S.InputContainer>

                                            :

                                            <S.InputContainer>
                                                <Text color={"grey"} content={"Pricing Type"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                                <Text style={{ marginTop: "4px" }} content={"CPC"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                            </S.InputContainer>
                                        }

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Bid"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.bid} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>


                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Ad Sets"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        <S.InputContainer>
                                            {this.renderAdSets()}
                                        </S.InputContainer>
                                        {
                                            this.props.validations.valid === false ?
                                                <S.Button style={{ marginLeft: "auto", width: "200px", opacity: .7, cursor: 'default' }}>
                                                    <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                                </S.Button>
                                                :
                                                <S.Button onClick={() => { this.props.setForm("completionForm") }} style={{ marginLeft: "auto", width: "200px" }}>
                                                    <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                                </S.Button>
                                        }
                                    </S.RightColumn>
                                </S.InnerContainer>
                            </>
                        </Section>
                    </div>
                    {/* <div style={{ width: "253px", marginLeft: "28px" }}><Section fullWidthChild={true}></Section></div> */}
                </S.FlexContainer>
                <S.Container>



                </S.Container>
            </React.Fragment >
        );
    }
}

export default ReviewForm;