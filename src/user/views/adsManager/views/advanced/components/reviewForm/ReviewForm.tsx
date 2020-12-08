import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./ReviewForm.style";
import { Icon } from '@material-ui/core';

import { submitOrder } from './library/ReviewForm.library';

class ReviewForm extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            saving: false
        }
    }

    handleCampaignEdit() {
        this.props.setForm("campaignForm");
    }

    handleAdSetEdit(adSetIndex) {
        this.props.setSelectedAdSet(adSetIndex);
        this.props.setSelectedAd(0);
        this.props.setForm("adSetsForm");
    }

    handleAdEdit(adSetIndex, adIndex) {
        this.props.setSelectedAdSet(adSetIndex);
        this.props.setSelectedAd(adIndex);
        this.props.setForm("adsForm");
    }

    async handleSubmit() {
        // Improve error finding and handling
        this.setState({ saving: true }, async () => {
            try {
                await submitOrder(this.props.userId, this.props.advertiserId, this.props.campaign, this.props.adSets, this.props.auth.accessToken);
            }
            catch (e) {
                alert("Oops! We apologize for the inconvenience: Something went wrong, please contact Ads Support" + e)
            }
            finally {
                this.props.setForm("completionForm")
            }
        })
    }

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
        console.log(keys);
        if (keys) {
            errors = keys.map((key) => {

                if (key !== 'valid' && key !== 'adSets') {
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
            });
        }

        return errors.reverse();
    }

    renderAdSets() {
        let adSets = this.props.adSets.map((adSet, index) => {
            return <Section fullWidthChild={true} key={index}>
                <>
                    <>
                        <div style={{ display: "flex", width: "100%", marginBottom: "28px" }}>
                            <Text style={{ marginBottom: "" }} content={`Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div onClick={() => { this.handleAdSetEdit(index) }} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", marginLeft: "auto", cursor: "pointer" }}>
                                <span>
                                    <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                        Edit
                                    </Text>
                                </span>
                            </div>
                        </div>

                        <Text style={{ marginTop: "16px" }} color={"grey"} content={"Pricing Type"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        <Text style={{ marginTop: "16px" }} content={adSet.pricingType.label} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        {
                            this.props.validations.adSets[index].pricingType?.valid === false &&
                            <S.ErrorContainer>
                                <S.ErrorIcon>
                                    <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                </S.ErrorIcon>
                                <S.ErrorMessage>
                                    <Text content={this.props.validations.adSets[index].pricingType?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </S.ErrorMessage>
                            </S.ErrorContainer>
                        }

                        <Text style={{ marginTop: "16px" }} color={"grey"} content={"Price"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        <Text style={{ marginTop: "16px" }} content={adSet.bid} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        {
                            this.props.validations.adSets[index].bid?.valid === false &&
                            <S.ErrorContainer>
                                <S.ErrorIcon>
                                    <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                </S.ErrorIcon>
                                <S.ErrorMessage>
                                    <Text content={this.props.validations.adSets[index].bid?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </S.ErrorMessage>
                            </S.ErrorContainer>
                        }

                        {
                            this.props.validations.adSets[index].bidBudget?.valid === false &&
                            <S.ErrorContainer>
                                <S.ErrorIcon>
                                    <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                </S.ErrorIcon>
                                <S.ErrorMessage>
                                    <Text content={this.props.validations.adSets[index].bidBudget?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </S.ErrorMessage>
                            </S.ErrorContainer>
                        }


                        <Text style={{ marginTop: "16px" }} color={"grey"} content={"Audiences"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        {adSet.braveML ?

                            <Text style={{ marginTop: "4px" }} content={"Let Brave determine best audience."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                            :
                            <>
                                {
                                    this.props.validations.adSets[index].audiences?.valid === false ?
                                        <S.ErrorContainer>
                                            <S.ErrorIcon>
                                                <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                            </S.ErrorIcon>
                                            <S.ErrorMessage>
                                                <Text content={this.props.validations.adSets[index].audiences?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </S.ErrorMessage>
                                        </S.ErrorContainer>
                                        :
                                        <Text style={{ marginTop: "4px" }} content={adSet.audiences.map((audience) => { return ` ${audience.label}` })} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                }
                            </>

                        }

                        <Text style={{ marginTop: "16px" }} color={"grey"} content={"Platforms"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        {
                            this.props.validations.adSets[index].platforms?.valid === false ?
                                <S.ErrorContainer>
                                    <S.ErrorIcon>
                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                    </S.ErrorIcon>
                                    <S.ErrorMessage>
                                        <Text content={this.props.validations.adSets[index].platforms?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.ErrorMessage>
                                </S.ErrorContainer>
                                :
                                <Text style={{ marginTop: "4px" }} content={adSet.platforms.map((platform) => { return ` ${platform.label}` })} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        }

                        <Text style={{ marginTop: "16px" }} color={"grey"} content={"Conversion"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                        {adSet.conversion.url === '' ?

                            <Text style={{ marginTop: "4px" }} content={"No conversion measurement set."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                            :
                            <>
                                <Text style={{ marginTop: "4px" }} content={adSet.conversion.type} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <Text style={{ marginTop: "4px" }} content={adSet.conversion.url} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <Text style={{ marginTop: "4px" }} content={adSet.conversion.observationWindow.label + " day observation window"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            </>


                        }

                    </>
                    <div style={{ marginBottom: '8px' }}></div>
                    <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>
                    {this.renderAdSetAds(adSet, index)}
                </>
            </Section>
        });
        return adSets;
    }

    renderAdSetAds(adSet, adSetIndex) {
        let ads;
        if (adSet.ads) {
            ads = adSet.ads.map((ad, index) => {
                return <>
                    <div style={{ display: "flex", width: "100%", marginBottom: "28px" }}>
                        <Text style={{ marginBottom: "" }} content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        <div onClick={() => { this.handleAdEdit(adSetIndex, index) }} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", marginLeft: "auto", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Edit
                                                    </Text>
                            </span>
                        </div>
                    </div>
                    <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative Name"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                    <Text style={{ marginTop: "4px" }} content={ad.name} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                    {
                        this.props.validations.adSets[adSetIndex].ads[index].name?.valid === false &&
                        <S.ErrorContainer>
                            <S.ErrorIcon>
                                <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                            </S.ErrorIcon>
                            <S.ErrorMessage>
                                <Text content={this.props.validations.adSets[adSetIndex].ads[index].name?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </S.ErrorMessage>
                        </S.ErrorContainer>
                    }

                    {
                        ad.notificationAd &&
                        <>
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative Type"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={"Notification Ad"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Title"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.title} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                            {
                                this.props.validations.adSets[adSetIndex].ads[index].title?.valid === false &&
                                <S.ErrorContainer>
                                    <S.ErrorIcon>
                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                    </S.ErrorIcon>
                                    <S.ErrorMessage>
                                        <Text content={this.props.validations.adSets[adSetIndex].ads[index].title?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.ErrorMessage>
                                </S.ErrorContainer>
                            }

                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Body"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.body} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                            {
                                this.props.validations.adSets[adSetIndex].ads[index].body?.valid === false &&
                                <S.ErrorContainer>
                                    <S.ErrorIcon>
                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                    </S.ErrorIcon>
                                    <S.ErrorMessage>
                                        <Text content={this.props.validations.adSets[adSetIndex].ads[index].body?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.ErrorMessage>
                                </S.ErrorContainer>
                            }


                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Target Url"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.targetUrl} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />

                            {
                                this.props.validations.adSets[adSetIndex].ads[index].targetUrl?.valid === false &&
                                <S.ErrorContainer>
                                    <S.ErrorIcon>
                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                    </S.ErrorIcon>
                                    <S.ErrorMessage>
                                        <Text content={this.props.validations.adSets[adSetIndex].ads[index].targetUrl?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </S.ErrorMessage>
                                </S.ErrorContainer>
                            }
                        </>

                    }
                    {
                        ad.inPageAd &&
                        <>
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative Type"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={"In Page Ad"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative Url"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.creativeUrl} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Creative Size"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.creativeSize} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Channels"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.channels} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "16px" }} color={"grey"} content={"Target Url"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            <Text style={{ marginTop: "4px" }} content={ad.targetUrl} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                        </>

                    }

                    {(adSet.ads.length > 1 && index < adSet.ads.length - 1) &&
                        <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "28px" }}></div>
                    }
                </>
            });
        }
        return ads;
    }

    render() {
        return (
            <React.Fragment>

                <div style={{ display: "flex", position: "relative", marginTop: "28px", width: "100%", marginBottom: "220px" }}>
                    <div style={{ width: "720px" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    {/* PUBLISH BUTTONS ARE HERE!!! */}
                                    {/* PUBLISH BUTTONS ARE HERE!!! */}
                                    {/* PUBLISH BUTTONS ARE HERE!!! */}
                                    {/* PUBLISH BUTTONS ARE HERE!!! */}

                                    {/* <S.LeftColumn>
                                        <Text content={"General"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                        <Text content={"Campaigns are used to define your budgets and advertising objectives."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn> */}
                                    <S.RightColumn>
                                        <div style={{ display: "flex", width: "100%", marginBottom: "28px" }}>
                                            <Text style={{ marginBottom: "" }} content={"Campaign"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                            <div onClick={() => { this.handleCampaignEdit() }} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", marginLeft: "auto", cursor: "pointer" }}>
                                                <span>
                                                    <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                                        Edit
                                                    </Text>
                                                </span>
                                            </div>
                                        </div>
                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Name"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.name} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                            {
                                                this.props.validations?.campaignName?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.campaignName?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Start Time"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatDate(this.props.campaign.startTime)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                            {
                                                this.props.validations?.startTime?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.startTime?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"End Time"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatDate(this.props.campaign.endTime)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                            {
                                                this.props.validations?.endTime?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.endTime?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }

                                            {
                                                this.props.validations?.schedule?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.schedule?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }

                                            {
                                                this.props.validations?.endTimeSchedule?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.endTimeSchedule?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.totalBudget} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                            {
                                                this.props.validations?.totalBudget?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.totalBudget?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }

                                            {
                                                this.props.validations?.budgetSpend?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.budgetSpend?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Daily Budget"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.props.campaign.dailyBudget} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                            {
                                                this.props.validations?.dailyBudget?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.dailyBudget?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }

                                            {
                                                this.props.validations?.budget?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.budget?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                        <S.InputContainer>
                                            <Text color={"grey"} content={"Locations"} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                            <Text style={{ marginTop: "4px" }} content={this.formatGeoTargets(this.props.campaign.geoTargets)} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                            {
                                                this.props.validations?.geoTargets?.valid === false &&
                                                <S.ErrorContainer>
                                                    <S.ErrorIcon>
                                                        <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                                                    </S.ErrorIcon>
                                                    <S.ErrorMessage>
                                                        <Text content={this.props.validations?.geoTargets?.errorMessage} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </S.ErrorMessage>
                                                </S.ErrorContainer>
                                            }
                                        </S.InputContainer>

                                    </S.RightColumn>

                                </S.InnerContainer>
                            </>
                        </Section>
                        {this.renderAdSets()}
                        <div>
                            {/* {
                                this.props.validations.valid === false && (
                                    <>
                                        {this.props.campaign.editMode ?
                                            <S.Button style={{ marginLeft: "auto", width: "200px", opacity: .7, cursor: 'default' }}>
                                                <Text content={"Update Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                            </S.Button>
                                            :
                                            <S.Button style={{ marginLeft: "auto", width: "200px", opacity: .7, cursor: 'default' }}>
                                                <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                            </S.Button>
                                        }
                                    </>
                                )
                            } */}
                            {
                                (this.state.saving === false) &&
                                <S.Button onClick={() => { this.handleSubmit() }} style={{ marginLeft: "auto", width: "200px" }}>
                                    {this.props.campaign.editMode ?
                                        <Text content={"Update Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        :
                                        <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    }
                                </S.Button>
                            }
                            {
                                (this.props.validations.valid !== false && this.state.saving === true) &&
                                <S.Button style={{ marginLeft: "auto", width: "200px", opacity: .7, cursor: 'default' }}>
                                    <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                </S.Button>
                            }
                        </div>
                        <div style={{ width: "25%", position: "relative", marginLeft: "28px" }}></div>
                    </div>
                </div>
                <S.Container>



                </S.Container>
            </React.Fragment >
        );
    }
}

export default ReviewForm;