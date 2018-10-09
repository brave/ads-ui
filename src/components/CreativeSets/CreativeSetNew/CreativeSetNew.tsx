import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCreativeSets } from "../../../actions";
import CreativeSetForm from "../CreatoveSetForm/CreativeSetForm";

import { styles } from "./CreativeSetNew.style";

class CampaignNew extends React.Component<any, any> {
  public render() {
    const { classes, create, auth, history, match, segments } = this.props;
    const handleSubmit = async (value: any) => {
      value.totalMax = parseFloat(value.totalMax);
      value.perDay = parseFloat(value.perDay);
      const result = await create(match.params.id, value, auth);
      history.push(`/user/main/campaigns/${match.params.id}/creativeSet/${result.id}`);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">New CreativeSet</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CreativeSetForm segments={segments} unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  segments: state.segmentReducer.segments,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (campaignId: string, value: any, user: any) => dispatch((CreateCreativeSets(campaignId, value, user))),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignNew)) as any);
