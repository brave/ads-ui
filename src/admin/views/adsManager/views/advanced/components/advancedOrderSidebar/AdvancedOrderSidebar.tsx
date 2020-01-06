import React, { Component } from 'react';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./styles/AdvancedOrderSidebar.style";

class AdvancedOrderSidebar extends Component<any, any> {

    renderAdSets() {
        let adSets;
        let clickHandler = (index) => {
            this.props.setSelectedAdSet(index);
            this.props.setForm("adSetsForm");
        }
        if (this.props.adSets) {
            adSets = this.props.adSets.map((adSet, index) => {
                return (
                    <S.Nav onClick={() => clickHandler(index)} selected={(this.props.form === "adSetsForm" || this.props.form === "adsForm") && this.props.selectedAdSet === index}>
                        <S.NavInnerContainer>
                            <S.NavHeader>
                                <Text content={`Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                            </S.NavHeader>
                            <S.NavSubHeader>
                                <S.NavSubItem>
                                    <S.Bracket></S.Bracket>
                                    <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Audiences"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                </S.NavSubItem>
                                <S.NavSubItem>
                                    <S.Bracket></S.Bracket>
                                    <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Conversions"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                </S.NavSubItem>
                                <S.NavSubItem>
                                    <S.Bracket></S.Bracket>
                                    <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Ads"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                </S.NavSubItem>
                            </S.NavSubHeader>
                        </S.NavInnerContainer>
                    </S.Nav>
                )
            })
        }
        return adSets;
    }

    render() {
        return (
            <>
                <S.SideBar>
                    <div>
                        <S.Nav onClick={() => this.props.setForm("campaignForm")} selected={this.props.form === 'campaignForm'}>
                            <S.NavInnerContainer>
                                <S.NavHeader>
                                    <Text content={"Campaign"} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                                </S.NavHeader>
                                <S.NavSubHeader>
                                    <S.NavSubItem>
                                        <S.Bracket></S.Bracket>
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Campaign Details"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                    </S.NavSubItem>
                                    <S.NavSubItem>
                                        <S.Bracket></S.Bracket>
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Budget"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                    </S.NavSubItem>
                                    <S.NavSubItem>
                                        <S.Bracket></S.Bracket>
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Location"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                    </S.NavSubItem>
                                </S.NavSubHeader>
                            </S.NavInnerContainer>
                        </S.Nav>

                        {this.renderAdSets()}

                        <S.ReviewNav onClick={() => this.props.setForm("reviewForm")} selected={this.props.form === 'reviewForm'}>
                            <S.NavInnerContainer>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text content={"Review"} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                                </div>
                            </S.NavInnerContainer>
                        </S.ReviewNav>

                    </div>
                </S.SideBar>
            </>
        );
    }
}

export default AdvancedOrderSidebar;