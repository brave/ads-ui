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

import { SignOut, ToggleDrawer } from "../../actions";

import BraveAdsLogo from "../../assets/images/Subdomains_Rewards_Ads_Default.png";

import { styles } from "./AppBar.style";

class AppBar extends React.Component<any, any> {
  public render() {
    const { classes, toggleDrawer, open, signOut } = this.props;
    const getMenuItem = () => {
      if (!open) {
        return <Icon>menu</Icon>;
      } else {
        return <Icon>close</Icon>;
      }
    };
    return (
      <div>
        <S.Container>
          <S.SubContainer>
            <img style={{ height: "30px" }} src={BraveAdsLogo} />
          </S.SubContainer>

          <S.SubContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #dbdbdb",
                height: "36px",
                width: "478px",
                borderRadius: "4px"
              }}
            >
              <Icon
                style={{ color: "#393A46", marginLeft: "8px", opacity: 0.5 }}
              >
                search
              </Icon>

              <input
                style={{
                  border: "none",
                  width: "90%",
                  height: "90%",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  fontWeight: 400
                }}
                type="text"
                placeholder="Search"
                name="name"
              />
            </div>
          </S.SubContainer>
          <S.SubContainer
            style={{ justifyContent: "space-between", width: "120px" }}
          >
            <S.SubContainer>
              <Icon style={{ color: "#ff7654", fontSize: "28px" }}>
                add_to_photos
              </Icon>
            </S.SubContainer>
            <S.SubContainer>
              <Icon
                style={{
                  fontSize: "28px",
                  color: "#ff7654"
                }}
              >
                notifications
              </Icon>
            </S.SubContainer>
            <S.SubContainer>
              <Icon
                style={{
                  fontSize: "28px",
                  color: "#ff7654"
                }}
              >
                account_circle
              </Icon>
            </S.SubContainer>
          </S.SubContainer>
        </S.Container>
        <BottomNav />
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
