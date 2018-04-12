import * as classNames from "classnames";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import { connect } from "react-redux";

import { OpenDrawer, SignOut } from "../../actions";

import { styles } from "./Appbar.style";

class Appbar extends React.Component<any, any> {

  public render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.props.drawer.open && classes.appBarShift)}
          color="primary">
          <Toolbar disableGutters={!this.props.drawer.open}>
            <IconButton onClick={this.props.OpenDrawer} color="inherit" aria-label="open drawer"
              className={classNames(classes.menuButton, this.props.drawer.open && classes.hide)}
            >
              <Icon>menu</Icon>
            </IconButton>
            <img src="/favicon.png" className={classes.logo}/>
            <Typography className={classes.flex} variant="title" color="inherit">
              ADS UI
            </Typography>
            <Button color="inherit" onClick={this.props.Signout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  drawer: state.drawerReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  OpenDrawer: () => dispatch(OpenDrawer({})),
  Signout: () => dispatch(SignOut({})),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Appbar));
