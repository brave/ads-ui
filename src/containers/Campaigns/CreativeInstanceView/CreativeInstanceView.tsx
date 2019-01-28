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
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import {
   GetConfirmationTypes, GetCreatives,
} from "../../../actions";


import { styles } from "./CreativeInstanceView.style";
import CreativeInstanceForm from "../../../components/CreativeInstances/CreativeInstanceForm/CreativeInstanceForm";

class CreativeInstanceView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const creativeInstance = _.find(props.creativeInstances, { id: this.props.match.params.creativeInstanceId }) as any;
    props.getConfirmationTypes(props.auth);
    this.state = {
      creativeInstance,
      unlock: false,
    };
  }

  public render() {
    const { classes, creatives, match, confirmationTypes } = this.props;
    const { creativeInstance, unlock } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">Creative Instance</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" action={this.getLockButton()} />
          <CardContent className={classes.content}>
            <CreativeInstanceForm creativeInstance={creativeInstance} creatives={creatives}
            confirmationTypes={confirmationTypes} match={match}
              unlock={unlock}/>
          </CardContent>
        </Card>
      </div>
    );
  }

  private getLockButton = () => {
    if (!this.state.unlock) {
      return (
        <div></div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  private switchLock() {
    this.setState({
      unlock: !this.state.unlock,
    });
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  creativeInstances: state.creativeInstanceReducer.creativeInstances,
  creatives: state.creativeReducer.creatives,
  confirmationTypes: state.confirmationTypeReducer.confirmationTypes,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  getConfirmationTypes: (user: any) => dispatch(GetConfirmationTypes(user)),
  getCreatives: (auth: any, userId: string)=>dispatch((GetCreatives(auth, userId))),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativeInstanceView));
