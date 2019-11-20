import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import TabSelector from '../../../../../components/tabSelector/TabSelector';
import Section from '../../../../../components/section/Section';
import { Text } from "../../../../../components/Text/Text";
import Context from "../../../../../state/context";
import { initializeData } from './lib/AdvertiserOverviewLibrary';

import * as S from "./style/AdvertiserOverview.style";

class AdvertiserOverview extends Component<any, any> {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            advertiser: { name: "something" }
        };
    }

    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        let start = await this.context.setLoading(true);
        let initializedData = await initializeData(this);
        this.setState(initializedData, () => {
            this.context.setLoading(false);
        });
    }

    render() {

        const { match } = this.props;

        const tabConfig = [
            { label: "Overview", selected: true, link: match.url.replace("/overview", "") + "/overview" },
            { label: "Campaigns", selected: false, link: match.url.replace("/overview", "") + "/campaign" },
            { label: "Creatives", selected: false, link: match.url.replace("/overview", "") + "/creative" },
            { label: "Invoices", selected: false, link: match.url.replace("/overview", "") + "/campaign" },
        ]
        return (
            this.context.loading === false &&
            <React.Fragment>
                {console.log(this.state.advertiser)}
                <TabSelector config={tabConfig} />
                <S.Container>
                    <Section fullWidthChild={true}>
                        <S.InnerContainer>
                            <S.LeftColumn>
                                <Text content={"Advertiser"} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"} />
                                <Text content={"Advertisers can create campaigns, creatives, and perform actions on invoices."} style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            </S.LeftColumn>
                            <S.RightColumn>
                                <S.InputContainer>
                                    <Text content={"Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.name} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Phone Number"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.phone} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"E-Mail"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.billingEmail} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Street Address Line 1"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.street1} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Street Address Line 2"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.street2} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"City"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.city} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"State"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.state} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Country"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.country} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Zip Code"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <S.Input value={this.state.advertiser.mailingAddress.zipcode} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" />
                                </S.InputContainer>
                                <S.InputContainer>
                                    <Text content={"Status"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <div style={{ marginTop: "6px" }}>
                                        <Select
                                            value={'active'}
                                            onChange={() => { }}
                                            options={[{ value: "active", label: "active" }]}
                                        />
                                    </div>
                                </S.InputContainer>
                                <S.Container>
                                    <S.Button onClick={() => { this.props.setForm("adsForm") }} style={{ marginLeft: "auto", marginTop: "24px" }}>
                                        <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                    </S.Button>
                                </S.Container>
                            </S.RightColumn>
                        </S.InnerContainer>
                    </Section>
                </S.Container>
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