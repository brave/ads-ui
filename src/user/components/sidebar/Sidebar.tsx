import * as React from "react";
import { Link } from "react-router-dom";
import * as S from "./Sidebar.style";

import {
  Icon} from "@material-ui/core";
import { Text } from "../../../components/Text/Text";

const linkStyle = { textDecoration: "none", color: "inherit" };

class Sidebar extends React.Component<any, any> {
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
      {/* <Link style={linkStyle} to={props.match.url + "/performances"}>
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
      </Link> */}
      <Link style={linkStyle} to={props.match.url + "/campaigns"}>
        <S.Nav
          selected={window.location.pathname.includes(
            props.match.url + "/campaigns"
          ) || window.location.pathname.includes(
            props.match.url + "/campaign"
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
}

export default Sidebar;