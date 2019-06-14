import * as React from "react";
import * as S from "./SideBar.style";

import {
  Icon,
  IconButton,
  TableCell,
  TableRow,
  withStyles
} from "@material-ui/core";
import { H6, H5 } from "../Text/Text";

class SideBar extends React.Component<any, any> {
  public render() {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "white",
          width: "300px",
          paddingTop: "24px"
        }}
      >
        <S.Nav selected={true}>
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
        </S.Nav>
      </div>
    );
  }
}

export default SideBar;
