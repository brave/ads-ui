import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCreativeSets, GetSegments } from "../../../actions";
import CreativeSetForm from "../CreatoveSetForm/CreativeSetForm";

import { styles } from "./CreativeSetNew.style";

class CreativeSetNew extends React.Component<any, any> {
  public componentDidMount(){
    this.props.getSegments(this.props.auth);
  }
  public render() {
    const { classes, create, auth, history, match, segments } = this.props;
    const handleSubmit = async (value: any) => {
      value.totalMax = parseFloat(value.totalMax);
      value.perDay = parseFloat(value.perDay);
      const result = await create(match.params.campaignId, value, auth);
      const url = match.url.replace("/new", "");
      history.push(`${url}/${result.id}`);
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
  getSegments: (user: any) => dispatch(GetSegments(user)),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativeSetNew)) as any);
