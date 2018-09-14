import { Button, Icon, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetCreatives } from "../../../actions";

import CreativeItem from "../CreativeItem/CreativeItem";
import CreativesFilter from "../CreativesFilter/CreativesFilter";

import { styles } from "./CreativesList.style";

class CreativesList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetCreatives(this.props.auth);
  }
  public render() {
    const { classes, match } = this.props;
    const { creatives } = this.props.creativeReducer;
    const listItems = creatives.map((item: any) => {
      return (
        <div key={item.id} className={classes.item}>
          <CreativeItem match={match} creative={item} />
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <CreativesFilter />
        <div className={classes.list}>
          {listItems}
        </div>
        <Link className={classes.fab} to={match.url + "/new"}>
          <Button color="secondary" variant="fab">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  creativeReducer: state.creativeReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCreatives: (user: any) => dispatch(GetCreatives(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesList));
