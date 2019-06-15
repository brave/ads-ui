import * as React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import * as S from "./SideBar.style";

import {
  Icon,
  IconButton,
  TableCell,
  TableRow,
  withStyles
} from "@material-ui/core";
import { H6, H5 } from "../Text/Text";

const linkStyle = { textDecoration: "none", color: "inherit" };

class SideBar extends React.Component<any, any> {
  public render() {
    return <S.Container>{renderNav(this.props)}</S.Container>;
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
              selected={
                props.match.url + "/performances" === window.location.pathname
              }
            >
              <S.SubContainer>
                <Icon>bar_chart</Icon>
              </S.SubContainer>
              <H5 fontFamily={"Poppins"}>Performance</H5>
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
      break;
    case "admin":
      return (
        <div>
          <Link style={linkStyle} to={props.match.url + "/dashboard"}>
            <S.Nav
              selected={
                props.match.url + "/dashboard" === window.location.pathname
              }
            >
              <S.SubContainer>
                <Icon>dashboard</Icon>
              </S.SubContainer>
              <H5 fontFamily={"Poppins"}>Dashboard</H5>
            </S.Nav>
          </Link>
          <Link style={linkStyle} to={props.match.url + "/users"}>
            <S.Nav
              selected={props.match.url + "/users" === window.location.pathname}
            >
              <S.SubContainer>
                <Icon>person</Icon>
              </S.SubContainer>
              <H5 fontFamily={"Poppins"}>Users</H5>
            </S.Nav>
          </Link>
          {/* <S.Nav selected={false}>
            <S.SubContainer>
              <Icon>apps</Icon>
            </S.SubContainer>
            <H5 fontFamily={"Poppins"}>Campaigns</H5>
          </S.Nav>
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
      break;
  }
}

export default SideBar;
