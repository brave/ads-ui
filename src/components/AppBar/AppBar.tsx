import { Icon, IconButton, withStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import * as S from "./AppBar.style";
import Button from "../Button/Button";
import { H6 } from "../Text/Text";
// import BottomNav from "./components/BottomNav/BottomNav";
const linkStyle = { textDecoration: "none", color: "inherit" };
import { Link, Redirect, Route, Switch } from "react-router-dom";
import "../OutsideAlerter/OutSideAlerter";

import UserMenu from "../UserMenu/UserMenu";

import { SignOut, ToggleDrawer, UserResend } from "../../actions";

import BraveAdsLogo from "../../assets/images/Subdomains_Rewards_Ads_Default.png";

import { styles } from "./AppBar.style";
import OutsideAlerter from "../OutsideAlerter/OutSideAlerter";

let iconStyle = { cursor: "pointer", color: "#ff7654", fontSize: "28px" };

class AppBar extends React.Component<any, any> {
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
    const { classes, toggleDrawer, open, signOut } = this.props;
    return (
      <div>
        <S.Container>
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
            style={{ justifyContent: "space-between", width: "120px" }}
          >
            <S.SubContainer style={{ visibility: "hidden" }}>
              <Icon style={iconStyle}>add_to_photos</Icon>
            </S.SubContainer>
            <S.SubContainer style={{ visibility: "hidden" }}>
              <Icon style={iconStyle}>notifications</Icon>
            </S.SubContainer>
            <OutsideAlerter onOutsideClick={this.closeMenu}>
              <S.SubContainer style={{ position: "relative" }}>
                <Icon onClick={this.toggleMenu} style={iconStyle}>
                  account_circle
                </Icon>
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
  )(AppBar)
);
