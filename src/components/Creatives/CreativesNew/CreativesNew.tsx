import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "material-ui";
import * as React from "react";

import CreativeForm from "../CreativeForm/CreativeForm";

import { style } from "./CreativesNew.style";

class CreativesNew extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">New Creative</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <CreativeForm />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(CreativesNew);
