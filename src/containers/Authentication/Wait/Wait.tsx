import { Button, withStyles } from "@material-ui/core";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SignOut } from "../../../actions";

import { styles } from "./Wait.style";

class WaitContainer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  public render() {
    const { auth, advertisers, classes, signout } = this.props;
    const activeAdvertiser = _.find(advertisers, { state: "active" });
    if (!auth || !auth.signedIn || !auth.emailVerified) {
      return (<Redirect to="/" />);
    } else if (activeAdvertiser) {
      return (<Redirect to="/" />);
    }
    return (
      <div className={classes.root}>
        <div className={classes.row1}>
          <div className={classes.row1_column1}>
            Wait
          </div>
          <div className={classes.row1_column2}>
            <img className={classes.image} src="/favicon.png" />
          </div>
        </div>
        <div className={classes.row2}>
          <Button onClick={signout} variant="raised" color="primary">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signout: () => dispatch(SignOut()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WaitContainer));
