import React, { Component } from 'react';
import { Text } from "../../../../../../../components/Text/Text";
import { Icon } from '@material-ui/core';
import * as S from "./FormProgress.style";
import { validateAdSetsForm, validateCampaignForm, validateAdsForm } from '../../lib/Library';

class FormProgress extends Component<any, any> {

    renderOrderTypeIcon() {
        return (
            <React.Fragment>
                <S.ValidIcon>
                    <Icon style={{ color: "white" }}>done</Icon>
                </S.ValidIcon>
                <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                    Order Type
                </Text>
                <S.Line />
            </React.Fragment>
        )
    }

    renderCampaignIcon() {
        if (this.props.form === "campaignForm") {
            return (
                <React.Fragment>
                    <S.ActiveIcon />
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Campaign
                    </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
        else if (this.props.form !== "campaignForm" && validateCampaignForm(this.props.campaign) === 'valid') {
            return (
                <S.NavContainer onClick={() => this.props.setForm("campaignForm")}>
                    <S.ValidIcon>
                        <Icon style={{ color: "white" }}>done</Icon>
                    </S.ValidIcon>
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Campaign
                </Text>
                    <S.Line />
                </S.NavContainer>
            )
        }
        else {
            return (
                <React.Fragment>
                    <S.InactiveIcon />
                    <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Campaign
                </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
    }

    renderAdSetsIcon() {
        if (this.props.form === "adSetsForm") {
            return (
                <React.Fragment>
                    <S.ActiveIcon />
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ad Sets
                    </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
        else if (this.props.form !== "adSetsForm" && validateAdSetsForm(this.props.adSets) === 'valid') {
            return (
                <S.NavContainer onClick={() => this.props.setForm("adSetsForm")}>
                    <S.ValidIcon>
                        <Icon style={{ color: "white" }}>done</Icon>
                    </S.ValidIcon>
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ad Sets
                </Text>
                    <S.Line />
                </S.NavContainer>
            )
        }
        else {
            return (
                <React.Fragment>
                    <S.InactiveIcon />
                    <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ad Sets
                </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
    }

    renderAdsIcon() {
        if (this.props.form === "adsForm") {
            return (
                <React.Fragment>
                    <S.ActiveIcon />
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ads
                    </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
        else if (this.props.form !== "adsForm" && validateAdsForm(this.props.ads) === 'valid') {
            return (
                <S.NavContainer onClick={() => this.props.setForm("adSetsForm")}>
                    <S.ValidIcon>
                        <Icon style={{ color: "white" }}>done</Icon>
                    </S.ValidIcon>
                    <Text style={{ marginLeft: "12px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ads
                </Text>
                    <S.Line />
                </S.NavContainer>
            )
        }
        else {
            return (
                <React.Fragment>
                    <S.InactiveIcon />
                    <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                        Ads
                </Text>
                    <S.Line />
                </React.Fragment>
            )
        }
    }

    renderReviewIcon() {
        return (
            <React.Fragment>
                <S.InactiveIcon />
                <Text style={{ marginLeft: "12px", opacity: .5 }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                    Review
                </Text>
            </React.Fragment>
        )
    }

    render() {
        return (
            this.props.form !== 'completionForm' &&
            <React.Fragment>
                <S.Container>
                    {this.renderOrderTypeIcon()}
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