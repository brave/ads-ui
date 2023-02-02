import * as React from "react";
import { Link } from "react-router-dom";
import * as S from "./Sidebar.style";
import { Text } from "../../../components/Text/Text";
import CampaignIcon from '@mui/icons-material/Campaign';

const linkStyle = { textDecoration: "none", color: "inherit" };

class Sidebar extends React.Component<any, any> {
  public render() {
    return (
      <S.Container>
        <React.Fragment>{renderNav()}</React.Fragment>
      </S.Container>
    );
  }
}

function renderNav() {
  return (
    <div>
      <Link style={linkStyle} to="/campaigns">
        <S.Nav selected={true}>
          <S.SubContainer>
            <CampaignIcon />
          </S.SubContainer>
          <Text sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"}>
            Campaigns
              </Text>
        </S.Nav>
      </Link>
    </div>
  );
}

export default Sidebar;
