import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";

class Appbar extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              ADS UI
            </Typography>
            <Button variant="fab" mini color="secondary">
              <Icon>add</Icon>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Appbar;
