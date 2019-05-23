import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCreatives } from "../../../actions";
import CreativeForm from "../CreativeForm/CreativeForm";

import { style } from "./CreativesNew.style";

class CreativesNew extends React.Component<any, any> {
  public render() {
    const { classes, create, auth, history, match } = this.props;
    const handleSubmit = async (value: any) => {
      value.advertiserId = this.props.advertisers[0].id;
      if (match.params.advertiserId) {
        value.advertiserId = match.params.advertiserId;
      }
      const result = await create(value, auth, match.params.userId);
      const url = match.url.replace("/new", "");

      history.push(`${url}/${result.id}`);
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">New Creative</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CreativeForm unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, user: any, userId: string) => dispatch(CreateCreatives(value, user, userId)),
});

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(CreativesNew)) as any);
