import * as React from "react";
import * as S from "./UserMenu.style";

import Icon from "@material-ui/core";
import { H6, H5 } from "../Text/Text";

class UserMenu extends React.Component<any, any> {
  public render() {
    return (
      <S.Menu open={this.props.menuOpen}>
        <S.MenuItem onClick={this.props.signOut}>
          <H5 fontFamily={"Poppins"}>Sign out</H5>
        </S.MenuItem>
      </S.Menu>
    );
  }
}

export default UserMenu;
