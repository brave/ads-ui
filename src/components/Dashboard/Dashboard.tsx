import * as classNames from "classnames";
import Drawer from "material-ui/Drawer";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
// import { withStyles } from "material-ui/styles";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { CloseDrawer } from "../../actions";
import Appbar from "../Appbar/Appbar";

import Divider from "material-ui/Divider";
import List from "material-ui/List";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { styles } from "./Dashboard.style";

class Dashboard extends React.Component<any, any> {

  public render() {
    if (!this.props.user || !this.props.user.signedIn) {
      return (<Redirect to="/auth" />);
    }
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Appbar />
        <Drawer variant="permanent" open={false} classes={{
          paper: classNames(classes.drawerPaper, !this.props.drawer.open && classes.drawerPaperClose),
        }}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.CloseDrawer}>
              <Icon>chevron_left</Icon>
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon>star</Icon>
              </ListItemIcon>
              <ListItemText primary="Star" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon>send</Icon>
              </ListItemIcon>
              <ListItemText primary="Send" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon>drafts</Icon>
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>Content Here</Typography>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  drawer: state.drawerReducer,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseDrawer: () => dispatch(CloseDrawer({})),
  Signout: () => dispatch(CloseDrawer({})),
});

// export default connect(mapStateToProps)(Dashboard);
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
