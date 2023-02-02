import React, { Component } from 'react';
import { Text } from "../../../../../../../components/Text/Text";
import * as S from "./FormProgress.style";

class FormProgress extends Component<any, any> {

    renderCampaignIcon() {
        if (this.props.form === "campaignForm") {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("campaignForm")}>
                        <S.ActiveIcon />
                        <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Campaign
                    </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
        // else if (this.props.form !== "campaignForm" && validateCampaignForm(this.props.campaign) === 'valid') {
        //     return (
        //         <S.NavContainer onClick={() => this.props.setForm("campaignForm")}>
        //             <S.ValidIcon>
        //                 <Icon style={{ color: "white" }}>done</Icon>
        //             </S.ValidIcon>
        //             <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
        //                 Campaign
        //         </Text>
        //             <S.Line />
        //         </S.NavContainer>
        //     )
        // }
        else {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("campaignForm")}>
                        <S.InactiveIcon />
                        <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Campaign
                </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
    }

    renderAdSetsIcon() {
        if (this.props.form === "adSetsForm") {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("adSetsForm")}>
                        <S.ActiveIcon />
                        <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Ad Sets
                    </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
        // else if (this.props.form !== "adSetsForm" && validateAdSetsForm(this.props.adSets) === 'valid') {
        //     return (
        //         <S.NavContainer onClick={() => this.props.setForm("adSetsForm")}>
        //             <S.ValidIcon>
        //                 <Icon style={{ color: "white" }}>done</Icon>
        //             </S.ValidIcon>
        //             <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
        //                 Ad Sets
        //         </Text>
        //             <S.Line />
        //         </S.NavContainer>
        //     )
        // }
        else {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("adSetsForm")}>
                        <S.InactiveIcon />
                        <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Ad Sets
                </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
    }

    renderAdsIcon() {
        if (this.props.form === "adsForm") {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("adsForm")}>
                        <S.ActiveIcon />
                        <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Ads
                    </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
        // else if (this.props.form !== "adsForm" && validateAdsForm(this.props.ads) === 'valid') {
        //     return (
        //         <S.NavContainer onClick={() => this.props.setForm("adsForm")}>
        //             <S.ValidIcon>
        //                 <Icon style={{ color: "white" }}>done</Icon>
        //             </S.ValidIcon>
        //             <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
        //                 Ads
        //         </Text>
        //             <S.Line />
        //         </S.NavContainer>
        //     )
        // }
        else {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("adsForm")}>
                        <S.InactiveIcon />
                        <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Ads
                        </Text>
                        <S.Line />
                    </S.NavContainer>
                </React.Fragment>
            )
        }
    }

    renderReviewIcon() {
        if (this.props.form === "reviewForm") {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("reviewForm")}>
                        <S.ActiveIcon />
                        <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Review
                    </Text>
                    </S.NavContainer>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <S.NavContainer onClick={() => this.props.setForm("reviewForm")}>
                        <S.InactiveIcon />
                        <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Review
                        </Text>
                    </S.NavContainer>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            this.props.form !== 'completionForm' &&
            <React.Fragment>
                <S.Container>
                    {this.renderCampaignIcon()}
                    {this.renderAdSetsIcon()}
                    {this.renderAdsIcon()}
                    {this.renderReviewIcon()}
                </S.Container>
            </React.Fragment>
        );
    }
}

export default FormProgress;
