import { Icon, IconButton, withStyles } from "@material-ui/core";

import * as React from "react";
import { connect } from "react-redux";

import * as S from "./style/Navbar.style";

import { Link, Redirect, Route, Switch } from "react-router-dom";

import UserMenu from "./components/UserMenu/UserMenu";

import { SignOut, ToggleDrawer, UserResend } from "../../../actions";

import BraveAdsLogo from "../../../assets/images/Subdomains_Rewards_Ads_Default.png";

import { styles } from "./style/Navbar.style";
import OutsideAlerter from "../../../components/OutsideAlerter/OutSideAlerter";
import TopBarProgress from "react-topbar-progress-indicator";
import { Text } from "../../../components/Text/Text";
import "./style/Navbar.style.css"

import Context from "../../../state/context";

let iconStyle = { cursor: "pointer", color: "#ff7654", fontSize: "28px" };
const linkStyle = { textDecoration: "none", color: "inherit" };
const logoStyle = { textDecoration: "none", color: "inherit", marginTop: "3px" };

TopBarProgress.config({
    barColors: {
        "0": "#FB7959"
    },
    shadowBlur: 0,
    shadowColor: undefined,
    barThickness: 2,
});

const NEW_CAMPAIGN_ADVERTISER_ALLOW_LIST = [
  "8cfac071-75f8-46ab-9c7f-4f8420d914d7",  // bsa
  "8fc27541-4933-447b-93eb-50b4e4714fbb",  // graham's test advertiser (staging)
  "93130af3-2def-4ecb-b836-b3772e73b3c9", // Fung (staging)
];

function shouldShowNewCampaign(advertiserId: string): boolean {
    return NEW_CAMPAIGN_ADVERTISER_ALLOW_LIST.includes(advertiserId);
}

class Navbar extends React.Component<any, any> {
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
                        <Link style={logoStyle} to={"/home"}>
                            <S.Logo src={BraveAdsLogo} />
                        </Link>
                    </S.SubContainer>


                    {/* <S.SubContainer>
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
                        style={{ justifyContent: "flex-end", gap: "16px" }}
                    >
                        {shouldShowNewCampaign(this.props.advertiserId) &&
                        <>
                            <S.SubContainer>
                                <Link style={linkStyle} to={`/user/main/adsmanager/selection?userId=${this.props.userId}&advertiserId=${this.props.advertiserId}`}>
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
                        </>
                        }
                        <OutsideAlerter onOutsideClick={this.closeMenu}>
                            <S.SubContainer style={{ position: "relative" }}>
                                <Text onClick={this.toggleMenu} content={"Account"} style={{ marginTop: "6px", marginBottom: "6px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                                <UserMenu menuOpen={this.state.menuOpen} signOut={signOut} />
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
    )(Navbar)
);