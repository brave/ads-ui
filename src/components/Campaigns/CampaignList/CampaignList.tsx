import { Button, Icon, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetCampaigns } from "../../../actions";

import CampaignFilter from "../CampaignFilter/CampaignFilter";
import CampaignItem from "../CampaignItem/CampaignItem";

import { styles } from "./CampaignList.style";

class CampaignList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetCampaigns(this.props.auth);
  }
  public render() {
    const { classes, match } = this.props;
    const { campaigns } = this.props.campaignReducer;
    const listItems = campaigns.map((item: any) => {
      return (
        <div key={item.id} className={classes.item}>
          <CampaignItem match={match} campaign={item} />
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <CampaignFilter />
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
  campaignReducer: state.campaignReducer,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (user: any) => dispatch(GetCampaigns(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CampaignList));
