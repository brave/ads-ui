import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { UpdateCreatives } from "../../../actions";

import UserForm from "../../../components/Users/UserForm/UserForm";

import { styles } from "./UserView.style";

class CreativesView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public getActionButtons() {
    return (
      <div>
        <IconButton color="primary">
          <Icon>pause</Icon>
        </IconButton>
        <IconButton color="primary">
          <Icon>play_arrow</Icon>
        </IconButton>
      </div>
    );
  }

  public render() {
    const { classes, match, auth, update, users } = this.props;
    const { unlock } = this.state;
    const id = match.params.id;
    const user = _.find(users, (item) => {
      return item.id === id;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleSubmit = async (value: any, e: Event) => {
      await update(value, auth);
    };
    const getLockButton = () => {
      if (!unlock) {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock</Icon>
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock_open</Icon>
          </IconButton>
        );
      }
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{user.fullName}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Detail" action={getLockButton()}/>
          <CardContent className={classes.content}>
            <UserForm user={user} unlock={unlock} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  update: (value: any, user: any) => dispatch(UpdateCreatives(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesView));
