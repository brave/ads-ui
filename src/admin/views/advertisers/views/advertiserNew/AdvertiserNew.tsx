import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import _ from 'lodash';

import TabSelector from '../../../../../components/tabSelector/TabSelector';
import Section from '../../../../../components/section/Section';
import { Text } from "../../../../../components/Text/Text";
import Context from "../../../../../state/context";
import { initializeData, mapState, createAdvertiser, validate } from './lib/AdvertiserNew.library';

import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../../components/formElements/formElements";

import * as S from "./style/AdvertiserNew.style";

class AdvertiserNew extends Component<any, any> {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            advertiser: {
                mailingAddress: {}
            }
        };
    }

    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        let start = await this.context.setLoading(true);
        let initializedData = await initializeData(this);
        this.setState(initializedData, () => {
            validate(this)
            this.context.setLoading(false);
        });
    }

    public componentWillUnmount() {
        this.context.setLoading(undefined);
    }

    public handleName(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.name = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handlePhone(e) {
        let numericOnly = /^[0-9-]*$/;
        if (numericOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.phone = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleReferrer(e) {
        let advertiser = this.state.advertiser
        advertiser.referrer = e.target.value
        this.setState({ advertiser: advertiser }, () => validate(this))
    }

    public handleEmail(e) {
        let advertiser = this.state.advertiser
        advertiser.billingEmail = e.target.value
        // consider not validating until focusOut
        this.setState({ advertiser: advertiser }, () => validate(this))
    }

    public handleStreetOne(e) {
        let alphaNumericOnly = /^[a-zA-Z0-9 ]*$/;
        if (alphaNumericOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.street1 = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleStreetTwo(e) {
        let alphaNumericOnly = /^[a-zA-Z0-9 ]*$/;
        if (alphaNumericOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.street2 = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleCity(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.city = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleState(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.state = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleCountry(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.country = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleZipcode(e) {
        let numericOnly = /^[0-9-]*$/;
        if (numericOnly.test(e.target.value)) {
            let advertiser = this.state.advertiser
            advertiser.mailingAddress.zipcode = e.target.value
            this.setState({ advertiser: advertiser }, () => validate(this))
        }
    }

    public handleStatus = selectedOption => {
        let advertiser = this.state.advertiser
        advertiser.state = selectedOption.value;
        this.setState({ advertiser: advertiser }, () => validate(this))
    };

    public renderValidation(field) {
        let name = this.state.validations[field].name;
        switch (this.state.validations[field].state) {
            case 'pending':
                return (
                    <div style={{ display: "flex" }}>
                        <S.PendingSymbol></S.PendingSymbol>
                        <Text content={name} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>)
            case 'valid':
                return (
                    <div style={{ display: "flex" }}>
                        <S.ActiveSymbol></S.ActiveSymbol>
                        <Text content={name} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>)
            case 'error':
                return (
                    <>
                        <div style={{ display: "flex" }}>
                            <S.ErrorSymbol></S.ErrorSymbol>
                            <Text color={"#D03A46"} content={name} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

                        </div>
                        <Text style={{ marginTop: "2px" }} color={"#D03A46"} content={this.state.validations[field].error} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "4px", marginBottom: "12px" }}></div>
                    </>
                )
        }
    }

    render() {

        const { match } = this.props;

        return (
            this.context.loading === false &&
            <React.Fragment>
                <div style={{ display: "flex", marginTop: "28px", width: "100%" }}>
                    <div style={{ width: "720px" }}>
                        <Section fullWidthChild={true}>
                            <>
                                <Text content={"Advertiser Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Define the look and feel of your Ads."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <InputContainer>
                                    <Text content={"Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.name} onChange={(e) => { this.handleName(e) }} placeholder="Enter a name..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"E-Mail Address"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.billingEmail} onChange={(e) => { this.handleEmail(e) }} placeholder="Enter an e-mail address..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"Phone Number"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.phone} onChange={(e) => { this.handlePhone(e) }} placeholder="Enter a phone number..." type="text" name="name" />
                                </InputContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <Text content={"Sales Representative"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Representative who referred advertiser to Brave Ads"} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <InputContainer>
                                    <Text content={"Sales Rep"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.referrer} onChange={(e) => { this.handleReferrer(e) }} placeholder="Enter a referrer id..." type="text" name="name" />
                                </InputContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <Text content={"Billing Address"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                                <div style={{ display: "flex" }}>
                                    <Text content={"Set the advertiser's billing address, used for invoicing."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>

                                <InputContainer>
                                    <Text content={"Street Address Line 1"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.street1} onChange={(e) => { this.handleStreetOne(e) }} placeholder="Enter a street address..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"Street Address Line 2"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.street2} onChange={(e) => { this.handleStreetTwo(e) }} placeholder="Enter a street address... (Optional)" type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"City"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.city} onChange={(e) => { this.handleCity(e) }} placeholder="Enter a city..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"State"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.state} onChange={(e) => { this.handleState(e) }} placeholder="Enter a state..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"Country"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.country} onChange={(e) => { this.handleCountry(e) }} placeholder="Enter a country..." type="text" name="name" />
                                </InputContainer>
                                <InputContainer>
                                    <Text content={"Zip Code"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Input value={this.state.advertiser.mailingAddress.zipcode} onChange={(e) => { this.handleZipcode(e) }} placeholder="Enter a zip code..." type="text" name="name" />
                                </InputContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <Text content={"Status"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                <Text content={"Set the advertiser name as well as e-mail and phone number."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <InputContainer>
                                    <Text content={"Status"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <div style={{ marginTop: "6px" }}>
                                        <Select
                                            value={{ value: this.state.advertiser.state, label: mapState(this.state.advertiser.state) }}
                                            onChange={this.handleStatus}
                                            options={[{ value: "active", label: "Active" }, { value: "under_review", label: "Under Review" }]}
                                        />
                                    </div>
                                </InputContainer>
                                {this.state.saving !== true ?
                                    this.state.validations.saveButton.state === 'valid' ?
                                        <Button onClick={() => { createAdvertiser(this.props.match.params.userId, this.state.advertiser, this.props.auth.accessToken, this) }} style={{ marginLeft: "auto", marginTop: "24px" }}>
                                            <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button> :
                                        <Button style={{ marginLeft: "auto", marginTop: "24px", backgroundColor: "#e2e2e2", cursor: "not-allowed" }}>
                                            <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                    :
                                    <Button style={{ marginLeft: "auto", marginTop: "24px", cursor: "not-allowed" }}>
                                        <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </Button>
                                }
                            </>
                        </Section>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvertiserNew); 