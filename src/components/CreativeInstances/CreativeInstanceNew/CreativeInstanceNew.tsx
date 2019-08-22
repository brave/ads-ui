import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { GetCreatives, CreateCreativeInstances } from "../../../actions";
import CreativeInstanceForm from "../CreativeInstanceForm/CreativeInstanceForm";

import { styles } from "./CreativeInstanceNew.style";

class CreativeInstanceNew extends React.Component<any, any> {
  public componentDidMount() {
    this.props.getCreatives(this.props.auth, this.props.match.params.userId);
  }
  public render() {
    const { classes, create, auth, history, match, confirmationTypes, creatives } = this.props;
    let advertiserCreatives = _.cloneDeep(creatives);
    if (this.props.match.params.advertiserId) {
      advertiserCreatives = _.filter(advertiserCreatives, { advertiserId: this.props.match.params.advertiserId })
    }
    const handleSubmit = async (value: any) => {
      if (value) {
        if (value.prices && value.prices.length > 0) {
          for (const price of value.prices) {
            value.amount = Number(value).valueOf();
          }
        }
        if (value.creative) {
          value.creativeId = value.creative.id;
        }
      }
      value.creativeSetId = match.params.creativeSetId;
      const result = await create(value, auth);
      const url = match.url.replace("/new", "");
      history.push(`${url}/${result.id}`);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">New Creative Instance</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CreativeInstanceForm confirmationTypes={confirmationTypes} creatives={advertiserCreatives} unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  creatives: state.creativeReducer.creatives,
  confirmationTypes: state.confirmationTypeReducer.confirmationTypes,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, auth: any) => dispatch((CreateCreativeInstances(value, auth))),
  getCreatives: (auth: any, userId: string) => dispatch((GetCreatives(auth, userId)))
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativeInstanceNew)) as any);
