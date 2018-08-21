import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateCreatives } from "../../../actions";
import CreativeForm from "../CreativeForm/CreativeForm";

import { style } from "./CreativesNew.style";

class CreativesNew extends React.Component<any, any> {
  public render() {
    const { classes, create, auth, history } = this.props;
    const handleSubmit = async (value: any) => {
      const result = await create(value, auth);
      history.push(`/main/creatives/${result.id}`);
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">New Creative</Typography>
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
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, user: any) => dispatch(CreateCreatives(value, user)),
});

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(CreativesNew)) as any);
