import * as React from "react";
import * as S from "./UserMenu.style";

import Icon from "@material-ui/core";
import { H6, H5 } from "../Text/Text";
import { Link } from "react-router-dom";

class UserMenu extends React.Component<any, any> {
  public render() {
    return (
      <S.Menu open={this.props.menuOpen}>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/admin/main/account/settings`}>
          <S.MenuItem>
            <H5 fontFamily={"Poppins"}>Settings</H5>
          </S.MenuItem>
        </Link>
        <S.MenuItem onClick={this.props.signOut}>
          <H5 fontFamily={"Poppins"}>Sign out</H5>
        </S.MenuItem>
      </S.Menu>
    );
  }
}

export default UserMenu;
