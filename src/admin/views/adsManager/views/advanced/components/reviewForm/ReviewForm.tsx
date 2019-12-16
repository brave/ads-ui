import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./ReviewForm.style";
import { InputContainer } from '../../../../../advertisers/views/advertiserNew/style/AdvertiserNew.style';

class ReviewForm extends Component<any, any> {

    formatDate(date) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    formatGeoTargets(geoTargets) {
        let formattedGeoTargets = '';
        geoTargets.forEach((geoTarget) => {
            formattedGeoTargets += geoTarget.label + ", ";
        });
        return formattedGeoTargets;
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
            </div>
        });
        return adSets;
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

                                    </S.RightColumn>
                                </S.InnerContainer>

                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Ads"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>

                                        <S.InputContainer>
                                            {this.renderAds()}
                                        </S.InputContainer>

                                        <S.Button onClick={() => { this.props.setForm("completionForm") }} style={{ marginLeft: "auto", width: "200px" }}>
                                            <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </S.Button>

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