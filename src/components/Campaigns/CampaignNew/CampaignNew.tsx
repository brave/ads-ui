import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCampaigns } from "../../../actions";
import CampaignForm from "../CampaignForm/CampaignForm";

import { styles } from "./CampaignNew.style";

class CampaignNew extends React.Component<any, any> {
  public render() {
    const { classes, create, auth, history } = this.props;
    const handleSubmit = async (value: any) => {
      const result = await create(value, auth);
      history.push(`/main/campaigns/${result.id}`);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">New Campaign</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CampaignForm unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, user: any) => dispatch((CreateCampaigns(value, user))),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignNew)) as any);
