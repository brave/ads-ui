import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import _ from 'lodash';

import TabSelector from '../../../../../components/tabSelector/TabSelector';
import Section from '../../../../../components/section/Section';
import { Text } from "../../../../../components/Text/Text";
import Context from "../../../../../state/context";
import { initializeData, updateAdvertiser, validate } from './lib/AdvertiserOverviewLibrary';

import * as S from "./style/AdvertiserOverview.style";

class AdvertiserOverview extends Component<any, any> {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            advertiser: {}
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
            let advertiser = this.state.newAdvertiser
            advertiser.name = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handlePhone(e) {
        let numericOnly = /^[0-9-]*$/;
        if (numericOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.phone = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleEmail(e) {
        let advertiser = this.state.newAdvertiser
        advertiser.billingEmail = e.target.value
        // consider not validating until focusOut
        this.setState({ newAdvertiser: advertiser }, () => validate(this))
    }

    public handleStreetOne(e) {
        let alphaNumericOnly = /^[a-zA-Z0-9 ]*$/;
        if (alphaNumericOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.street1 = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleStreetTwo(e) {
        let alphaNumericOnly = /^[a-zA-Z0-9 ]*$/;
        if (alphaNumericOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.street2 = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleCity(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.city = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleState(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.state = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleCountry(e) {
        let alphaOnly = /^[a-zA-Z ]*$/;
        if (alphaOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.country = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleZipcode(e) {
        let numericOnly = /^[0-9-]*$/;
        if (numericOnly.test(e.target.value)) {
            let advertiser = this.state.newAdvertiser
            advertiser.mailingAddress.zipcode = e.target.value
            this.setState({ newAdvertiser: advertiser }, () => validate(this))
        }
    }

    public handleStatus = selectedOption => {
        let advertiser = this.state.newAdvertiser
        advertiser.state = selectedOption.value;
        this.setState({ newAdvertiser: advertiser }, () => validate(this))
    };

    public mapState = (state) => {
        switch (state) {
            case 'active':
                return "Active"
            case "under_review":
                return "Under Review"
        }
    }

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

        const tabConfig = [
            { label: "Overview", selected: true, link: match.url.replace("/overview", "") + "/overview" },
            { label: "Campaigns", selected: false, link: match.url.replace("/overview", "") + "/campaign" },
            { label: "Creatives", selected: false, link: match.url.replace("/overview", "") + "/creative" },
            { label: "Invoices", selected: false, link: match.url.replace("/overview", "") + "/invoice" },
        ]
        return (
            this.context.loading === false &&
            <React.Fragment>
                <TabSelector config={tabConfig} />
                <div style={{ display: "flex", position: "relative" }}>
                    <S.Container>
                        <Section fullWidthChild={true}>
                            <>
                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Profile"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                        <Text content={"Set the advertiser name, e-mail, and phone number."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        <S.InputContainer>
                                            <Text content={"Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.name} onChange={(e) => { this.handleName(e) }} placeholder="Enter a name..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"E-Mail Address"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.billingEmail} onChange={(e) => { this.handleEmail(e) }} placeholder="Enter an e-mail address..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"Phone Number"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.phone} onChange={(e) => { this.handlePhone(e) }} placeholder="Enter a phone number..." type="text" name="name" />
                                        </S.InputContainer>
                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Billing Address"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                        <Text content={"Set the advertiser's billing address, to be used for invoicing."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        <S.InputContainer>
                                            <Text content={"Street Address Line 1"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.street1} onChange={(e) => { this.handleStreetOne(e) }} placeholder="Enter a street address..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"Street Address Line 2"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.street2} onChange={(e) => { this.handleStreetTwo(e) }} placeholder="Enter a street address... (Optional)" type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"City"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.city} onChange={(e) => { this.handleCity(e) }} placeholder="Enter a city..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"State"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.state} onChange={(e) => { this.handleState(e) }} placeholder="Enter a state..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"Country"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.country} onChange={(e) => { this.handleCountry(e) }} placeholder="Enter a country..." type="text" name="name" />
                                        </S.InputContainer>
                                        <S.InputContainer>
                                            <Text content={"Zip Code"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <S.Input value={this.state.newAdvertiser.mailingAddress.zipcode} onChange={(e) => { this.handleZipcode(e) }} placeholder="Enter a zip code..." type="text" name="name" />
                                        </S.InputContainer>
                                    </S.RightColumn>
                                </S.InnerContainer>
                                <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "28px", marginBottom: "56px" }}></div>

                                <S.InnerContainer>
                                    <S.LeftColumn>
                                        <Text content={"Status"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                        <Text content={"Set the advertiser name as well as e-mail and phone number."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                    </S.LeftColumn>
                                    <S.RightColumn>
                                        <S.InputContainer>
                                            <Text content={"Status"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <div style={{ marginTop: "6px" }}>
                                                <Select
                                                    value={{ value: this.state.newAdvertiser.state, label: this.mapState(this.state.newAdvertiser.state) }}
                                                    onChange={this.handleStatus}
                                                    options={[{ value: "active", label: "Active" }, { value: "under_review", label: "Under Review" }]}
                                                />
                                            </div>
                                        </S.InputContainer>

                                    </S.RightColumn>
                                </S.InnerContainer>
                            </>
                        </Section>
                    </S.Container>
                    <div style={{ height: "100%", width: "25%", position: "relative", marginLeft: "28px" }}>
                        <div style={{ position: "fixed", width: "253px" }}>
                            <Section fullWidthChild={true}>
                                <div>
                                    <Text style={{ textAlign: "center" }} content={"Advertiser"} sizes={[16, 16, 15, 15, 20]} fontFamily={"Poppins"} />
                                    <div style={{ width: "100%", borderBottom: "1px solid #e2e2e2", marginTop: "4px", marginBottom: "12px" }}></div>
                                    <Text style={{ marginBottom: "8px" }} content={"Profile"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                    {this.renderValidation("name")}
                                    {this.renderValidation("billingEmail")}
                                    {this.renderValidation("phone")}

                                    <div style={{ marginTop: "16px" }}></div>
                                    <Text style={{ marginBottom: "8px" }} content={"Billing Address"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                    {this.renderValidation("mailingAddress")}

                                    <div style={{ marginTop: "16px" }}></div>
                                    <Text style={{ marginBottom: "8px" }} content={"Status"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />

                                    {this.renderValidation("state")}

                                    <S.Container>
                                        {this.state.saving !== true ?

                                            this.state.validations.saveButton.state === 'valid' ?
                                                <S.Button onClick={() => { updateAdvertiser(this.props.match.params.advertiserId, this.state.newAdvertiser, this.props.auth.accessToken, this) }} style={{ marginLeft: "auto", marginTop: "24px" }}>
                                                    <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                                </S.Button> :
                                                <S.Button style={{ marginLeft: "auto", marginTop: "24px", backgroundColor: "#e2e2e2", cursor: "not-allowed" }}>
                                                    <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                                </S.Button>
                                            :
                                            <S.Button style={{ marginLeft: "auto", marginTop: "24px", cursor: "not-allowed" }}>
                                                <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                            </S.Button>
                                        }
                                    </S.Container>
                                </div>
                            </Section>
                        </div>
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
)(AdvertiserOverview); 