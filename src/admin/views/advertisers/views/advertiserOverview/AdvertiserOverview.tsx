import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                {console.log(this.state.advertiser.name)}
                <TabSelector config={tabConfig} />
                <S.Container>
                    <Section>
                        <S.InnerContainer>
                            <S.LeftColumn>
                                <Text sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"}>Advertiser</Text>
                                <Text style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"}>
                                    Advertisers can create campaigns, creatives, and perform actions on invoices.
                            </Text>
                            </S.LeftColumn>

                            <S.RightColumn>
                                <S.InputContainer>
                                    <Text sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"}>Advertiser Name</Text>
                                    {/* <S.Input value={this.state.advertiser.name} onChange={() => { }} placeholder="Enter a campaign name..." type="text" name="name" /> */}
                                </S.InputContainer>
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