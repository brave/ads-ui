import * as _ from "lodash";
import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import CreativeForm from "../CreativeForm/CreativeForm";

import { styles } from "./CreativesView.style";

class CreativesView extends React.Component<any, any> {
  public render() {
    const { classes, match, creatives } = this.props;
    const id = match.params.id;
    const creative = _.find(creatives, (item) => {
      return item.id === id;
    });
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{creative.caption}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardContent>
            <CreativeForm creative={creative} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creatives: state.creativeReducer.creatives,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesView));
