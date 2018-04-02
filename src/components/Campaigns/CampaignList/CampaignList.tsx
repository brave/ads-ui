import { Button, Icon, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetCampaigns } from "../../../actions";

import { styles } from "./CampaignList.style";

class CampaignList extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    const { campaigns } = this.props.campaignReducer;
    const listItems = campaigns.map((item: any) => {
      return (
        <div key={item.id} className={classes.item}>
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <div className={classes.list}>
          {listItems}
        </div>
        <Link className={classes.fab} to="/main/campaigns/new">
          <Button color="secondary" variant="fab">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  campaignReducer: state.campaignReducer,
  userReducer: state.userReducer,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (user: any) => dispatch(GetCampaigns(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CampaignList));
