import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCampaigns, GetGeocodes } from "../../../actions";
import CampaignForm from "../CampaignForm/CampaignForm";

import { styles } from "./CampaignNew.style";

class CampaignNew extends React.Component<any, any> {
  public componentDidMount(){
    this.props.getGeoCodes(this.props.auth);
  }
  public render() {
    const { classes, create, auth, advertisers, history, geocodes, match } = this.props;
    const handleSubmit = async (value: any) => {
      value.advertiserId = match.params.advertiserId || advertisers[0].id;
      value.type = "paid";
      value.budget = parseFloat(value.budget);
      value.dailyCap = parseFloat(value.dailyCap);
      const result = await create(value, auth);
      const url = this.props.match.url.replace("/new", "");
      history.push(`${url}/${result.id}`);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">New Campaign</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CampaignForm geocodes={geocodes} unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  geocodes: state.geoCodeReducer.geocodes,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, user: any) => dispatch((CreateCampaigns(value, user))),
  getGeoCodes: (user: any) => dispatch(GetGeocodes(user)),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignNew)) as any);
