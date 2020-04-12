import * as React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import * as S from "./SideBar.style";
import BATLogo from "../../assets/images/basic-attention-token-logo.png";

import {
  Icon,
  IconButton,
  TableCell,
  TableRow,
  withStyles
} from "@material-ui/core";
import { H6, H5, Text } from "../Text/Text";
import AdsManager from "../../admin/views/adsManager/AdsManager";

const linkStyle = { textDecoration: "none", color: "inherit" };

class SideBar extends React.Component<any, any> {
  public render() {
    return (
      <S.Container>
        <React.Fragment>{renderNav(this.props)}</React.Fragment>
        {/* <S.BATContainer>
          <img style={{ height: "45px" }} src={BATLogo} />
        </S.BATContainer> */}
      </S.Container>
    );
  }
}

function renderNav(props) {
  switch (props.type) {
    case "user":
      return (
        <div>
          {/* <S.Nav selected={true}>
            <S.SubContainer>
              <Icon>dashboard</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Dashboard</H5>
          </S.Nav>
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>note</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Creatives</H5>
          </S.Nav>
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>apps</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Campaigns</H5>
          </S.Nav> */}
          <Link style={linkStyle} to={props.match.url + "/performances"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/performances"
              )}
            >
              <S.SubContainer>
                <Icon>bar_chart</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Performance
              </Text>
            </S.Nav>
          </Link>
          {/* <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>email</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Invoices</H5>
          </S.Nav>
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>settings</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Preferences</H5>
          </S.Nav> */}
        </div>
      );
    case "admin":
      return (
        <div>
          <Link style={linkStyle} to={props.match.url + "/dashboard"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/dashboard"
              )}
            >
              <S.SubContainer>
                <Icon>dashboard</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Dashboard
              </Text>
            </S.Nav>
          </Link>
          <Link style={linkStyle} to={props.match.url + "/users"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/users"
              )}
            >
              <S.SubContainer>
                <Icon>person</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Users
              </Text>
            </S.Nav>
          </Link>
          <Link style={linkStyle} to={props.match.url + "/campaigns/overview"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/campaigns"
              ) || window.location.pathname.includes(
                props.match.url + "/adsmanager"
              )}
            >
              <S.SubContainer>
                <Icon>apps</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Campaigns
              </Text>
            </S.Nav>
          </Link>
          <Link style={linkStyle} to={props.match.url + "/pacing"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/pacing"
              )}
            >
              <S.SubContainer>
                <Icon>bar_chart</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Pacing
              </Text>
            </S.Nav>
          </Link>
          <Link style={linkStyle} to={props.match.url + "/approvals"}>
            <S.Nav
              selected={window.location.pathname.includes(
                props.match.url + "/approvals"
              )}
            >
              <S.SubContainer>
                <Icon>done</Icon>
              </S.SubContainer>
              <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
                Approvals
              </Text>
            </S.Nav>
          </Link>

          {/* 
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>bar_chart</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Performance</H5>
          </S.Nav>
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>email</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Invoices</H5>
          </S.Nav>
          <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>settings</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Preferences</H5>
          </S.Nav> */}
        </div>
      );
  }
}

export default SideBar;