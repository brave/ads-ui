import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Text } from "../../../../../../../components/Text/Text";

import * as S from "./styles/AdvancedOrderSidebar.style";
import { Icon } from '@material-ui/core';
import Modal from '../../../../../../../components/modal/Modal';


const unselectedStyle = { top: 10, right: 10, position: "absolute" }
const selectedStyle = { top: 10, right: 10, position: "absolute" }

class AdvancedOrderSidebar extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            deleteAdSetModalVisible: false,
            deleteAdSetModalIndex: undefined
        }
    }

    showDeleteAdSetModal(e, visible, index) {
        if (e) {
            e.stopPropagation()
        }
        this.setState({ deleteAdSetModalVisible: visible, deleteAdSetModalIndex: index })
    }

    deleteSelectedAdSet(deletedAdSet) {
        let adSets = this.props.adSets;
        if (adSets.length > 1) {
            this.props.setSelectedAdSet(0);
            adSets.splice(deletedAdSet, 1);
            this.props.setAdSets(adSets);
        }
        this.showDeleteAdSetModal(undefined, false, undefined);
    }

    renderModal(index) {
        if (this.state.deleteAdSetModalVisible && this.state.deleteAdSetModalIndex === index) {
            console.log(index);
            return <Modal>
                <div style={{ width: "500px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={"Delete this Ad Set?"} sizes={[16, 16, 15, 15, 22]} color={"#E0694C"} fontFamily={"Poppins"} />
                        <Icon onClick={(e) => this.showDeleteAdSetModal(e, false, index)} style={{ marginLeft: "auto", color: "grey", cursor: "pointer" }}>clear</Icon>
                    </div>
                    <Text style={{ marginTop: "42px" }} content={`Do you want to delete Ad Set ${index + 1}? This action cannot be undone.`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Muli"} />
                    <div style={{ display: "flex", width: "100%", marginTop: "42px" }}>
                        <div onClick={(e) => this.showDeleteAdSetModal(e, false, index)} style={{ marginLeft: "auto", marginRight: "28px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 20px", width: "100px", border: "1px solid #e2e2e2", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Cancel
            </Text>
                            </span>
                        </div>
                        <div onClick={() => { this.deleteSelectedAdSet(index) }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#F87454", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", cursor: "pointer" }}>
                            <span>
                                <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                    Delete
                        </Text>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        }
    }

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
                        { adSet.newAdSet &&
                            <div onClick={(e) => this.showDeleteAdSetModal(e, true, index)} style={((this.props.form === "adSetsForm" || this.props.form === "adsForm") && this.props.selectedAdSet === index) ? { top: 10, right: 7, position: "absolute" } : { top: 10, right: 10, position: "absolute" }}><Icon style={{ fontSize: "18px" }}>more_vert</Icon></div>
                        }
                        {
                            this.renderModal(index)
                        }

                        <S.NavInnerContainer>
                            <S.NavHeader>
                                <Text content={`Ad Set ${index + 1}`} sizes={[16, 16, 15, 15, 16]} fontFamily={"Poppins"} />
                            </S.NavHeader>
                            <S.NavSubHeader>
                                <S.NavSubItem>
                                    <S.Bracket></S.Bracket>
                                    <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Ad Set Details"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                </S.NavSubItem>
                                <S.NavSubItem>
                                    <S.Bracket></S.Bracket>
                                    <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Audiences"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
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
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Objective"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                    </S.NavSubItem>
                                    <S.NavSubItem>
                                        <S.Bracket></S.Bracket>
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Campaign Details"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                    </S.NavSubItem>
                                    <S.NavSubItem>
                                        <S.Bracket></S.Bracket>
                                        <Text style={{ marginTop: "10px", marginLeft: "8px" }} content={"Budget"} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
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