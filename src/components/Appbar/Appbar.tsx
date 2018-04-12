import * as classNames from "classnames";
import { AppBar, Button, Icon, IconButton, withStyles } from "material-ui";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import { connect } from "react-redux";

import { SignOut, ToggleDrawer } from "../../actions";

import { styles } from "./Appbar.style";

class Appbar extends React.Component<any, any> {

  public render() {
    const { classes, toggleDrawer, open, signOut } = this.props;
    const getMenuItem = () => {
      if (!open) {
        return (
            <Icon>menu</Icon>
        );
      } else {
        return (
            <Icon>close</Icon>
        );
      }
    };
    return (
      <div>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}
          color="primary">
          <Toolbar disableGutters={true}>
              <IconButton onClick={toggleDrawer} color="inherit"
                className={classNames(classes.menuButton)} >
                {getMenuItem()}
              </IconButton>
            <img src="/favicon.png" className={classes.logo} />
            <Typography className={classes.flex} variant="title" color="inherit">
              Advertisment
            </Typography>
            <Button color="inherit" onClick={signOut}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  open: state.drawerReducer.open,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signOut: () => dispatch(SignOut({})),
  toggleDrawer: () => dispatch(ToggleDrawer({})),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Appbar));
