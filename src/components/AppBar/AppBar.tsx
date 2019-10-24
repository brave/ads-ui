import { Icon, IconButton, withStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import * as S from "./AppBar.style";
import Button from "../Button/Button";
import { H6 } from "../Text/Text";
import BottomNav from "./components/BottomNav/BottomNav";

import { Link, Redirect, Route, Switch } from "react-router-dom";
import "../OutsideAlerter/OutSideAlerter";

import UserMenu from "../UserMenu/UserMenu";

import { SignOut, ToggleDrawer, UserResend } from "../../actions";

import BraveAdsLogo from "../../assets/images/Subdomains_Rewards_Ads_Default.png";

import { styles } from "./AppBar.style";
import OutsideAlerter from "../OutsideAlerter/OutSideAlerter";
import TopBarProgress from "react-topbar-progress-indicator";
import { Text } from "../Text/Text";
import "./lib/AppBar.css"

import Context from "../../state/context";

let iconStyle = { cursor: "pointer", color: "#ff7654", fontSize: "28px" };
const linkStyle = { textDecoration: "none", color: "inherit" };

TopBarProgress.config({
    barColors: {
        "0": "#FB7959"
    },
    shadowBlur: 0,
    shadowColor: undefined,
    barThickness: 2,
});

class AppBar extends React.Component<any, any> {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    public toggleMenu = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
        }));
    };

    public closeMenu = () => {
        this.setState({
            menuOpen: false
        });
    };

    public render() {
        const { classes, toggleDrawer, open, signOut, match } = this.props;
        return (
            <div style={{ position: "fixed", width: "100%", top: "0px", zIndex: 9001 }}>
                <S.Container loading={this.context.loading}>
                    {this.context.loading && <TopBarProgress />}
                    <S.SubContainer>
                        {/* <Link style={linkStyle} to={"/"}> */}
                        <S.Logo src={BraveAdsLogo} />
                        {/* </Link> */}
                    </S.SubContainer>

                    {/* 
          // Search for Campaigns and Creatives

          <S.SubContainer>
            <S.SearchContainer>
              <Icon
                style={{ color: "#393A46", marginLeft: "8px", opacity: 0.5 }}
              >
                search
              </Icon>

              <S.SearchInput type="text" placeholder="Search" name="name" />
            </S.SearchContainer>
          </S.SubContainer> */}
                    <S.SubContainer
                        style={{ justifyContent: "space-between", width: "400px" }}
                    >
                        <S.SubContainer>
                            <Link style={linkStyle} to={"/admin/main/adsmanager/selection"}>
                                <div style={{ padding: "0px 20px", background: "#4C54D2", color: "white", border: "none", borderRadius: "100px 100px 100px 100px" }}>
                                    <span>
                                        <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                            New Campaign
                                    </Text>
                                    </span>
                                </div>
                            </Link>
                        </S.SubContainer>
                        <S.SubContainer>
                            <div style={{ width: "1px", height: "20px", borderLeft: "2px solid #EDEDED" }}></div>
                        </S.SubContainer>
                        <S.SubContainer style={{}}>
                            <Text style={{ marginTop: "6px", marginBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"}>
                                Support
                                    </Text>
                        </S.SubContainer>
                        <S.SubContainer style={{}}>
                            <Text style={{ marginTop: "6px", marginBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"}>
                                Messages
                                    </Text>
                        </S.SubContainer>
                        <OutsideAlerter onOutsideClick={this.closeMenu}>
                            <S.SubContainer style={{ position: "relative" }}>
                                <Text style={{ marginTop: "6px", marginBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"}>
                                    Account
                                    </Text>
                            </S.SubContainer>
                        </OutsideAlerter>
                    </S.SubContainer>
                </S.Container>
                {/* <BottomNav /> */}
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    open: state.drawerReducer.open
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    signOut: () => dispatch(SignOut()),
    toggleDrawer: () => dispatch(ToggleDrawer())
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppBar)
);