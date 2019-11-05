import React, { Component } from 'react';

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./ReviewForm.style";

class ReviewForm extends Component<any, any> {

    renderAdSets() {
        let adSets = this.props.adSets.map((adSet, index) => {
            return <div>
                <S.Item>
                    <Text content={`Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                    <Text content={adSet.audiences} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                </S.Item>
            </div>
        });
        return adSets;
    }

    renderAds() {
        let adSets = this.props.ads.map((ad, index) => {
            return <div>
                <S.Item>
                    <Text content={`Ad ${index + 1}`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                    <Text content={ad.creative} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                </S.Item>
                <S.Item>
                    <Text content={`Ad Sets`} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                    <Text content={ad.adSets} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                </S.Item>
            </div>
        });
        return adSets;
    }

    render() {
        return (
            <React.Fragment>
                <S.FlexContainer>
                    <S.LeftColumn>
                        <Section fullWidthChild={true} header="Campaign">
                            <div>
                                <S.Item>
                                    <Text content={"Campaign Name"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${this.props.campaign.name}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                                <S.Item>
                                    <Text content={"Start Time"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${this.props.campaign.startTime}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                                <S.Item>
                                    <Text content={"End Time"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${new Date(this.props.campaign.endTime)}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                                <S.Item>
                                    <Text content={"Daily Budget"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${this.props.campaign.dailyBudget} ${this.props.campaign.currency}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                                <S.Item>
                                    <Text content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${this.props.campaign.totalBudget} ${this.props.campaign.currency}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                                <S.Item>
                                    <Text content={"Status"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                    <Text content={`${this.props.campaign.status}`} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                </S.Item>
                            </div>
                        </Section>
                    </S.LeftColumn>
                    <S.RightColumn>
                        {/* Forecasting, etc. */}
                    </S.RightColumn>
                </S.FlexContainer>
                <S.FlexContainer>
                    <S.LeftColumn>
                        <Section fullWidthChild={true} header="Ad Sets">
                            {this.renderAdSets()}
                        </Section>
                    </S.LeftColumn>
                    <S.RightColumn>
                        {/* Forecasting, etc. */}
                    </S.RightColumn>
                </S.FlexContainer>
                <S.FlexContainer>
                    <S.LeftColumn>
                        <Section fullWidthChild={true} header="Ads">
                            {this.renderAds()}
                        </Section>
                    </S.LeftColumn>
                    <S.RightColumn>
                        {/* Forecasting, etc. */}
                    </S.RightColumn>
                </S.FlexContainer>
                <S.Container>
                    <S.Button onClick={() => { this.props.setForm("completionForm") }} style={{ marginLeft: "auto" }}>
                        <Text content={"Publish Campaign"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                    </S.Button>
                </S.Container>
            </React.Fragment >
        );
    }
}

export default ReviewForm;