import { Button, Icon, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import { GetCreatives } from "../../actions";

import CreativeItem from "./CreativeItem/CreativeItem";
import CreativesFilter from "./CreativesFilter/CreativesFilter";

import { styles } from "./Creatives.style";

class Creatives extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetCreatives(this.props.userReducer);
  }
  public render() {
    const { classes } = this.props;
    const { creatives } = this.props.creativeReducer;
    const listItems = creatives.map((item: any) => {
      return (
        <div key={item.id} className={classes.item}>
          <CreativeItem creative={item} />
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <CreativesFilter />
        <div className={classes.list}>
          {listItems}
        </div>
        <Button color="secondary" className={classes.fab} variant="fab">
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creativeReducer: state.creativeReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCreatives: (user: any) => dispatch(GetCreatives(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Creatives));
