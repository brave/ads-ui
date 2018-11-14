import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import {
  GetCreativeSets, GetGeocodes, UpdateCampaigns,
} from "../../../actions";

import CampaignForm from "../../../components/Campaigns/CampaignForm/CampaignForm";
import CreativeSetList from "../../../components/CreativeSets/CreativeSetList/CreativeSetList";

import { styles } from "./CampaignView.style";

class CampaignView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const campaign = _.find(props.campaigns, { id: this.props.match.params.campaignId }) as any;
    props.getGeocodes(props.auth);
    props.getCreativeSets(campaign.id, props.auth);
    this.state = {
      campaign,
      unlock: false,
    };
  }

  public render() {
    const { classes, creativesets, geocodes, match } = this.props;
    const { campaign, unlock } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" action={this.getLockButton()} />
          <CardContent className={classes.content}>
            <CampaignForm campaign={campaign} geocodes={geocodes}
              unlock={unlock} onSubmit={(value: string) => this.handleSubmit(value)} />
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardHeader title="Creative Sets" />
          <CardContent className={classes.content}>
            <CreativeSetList creativeSets={creativesets} match={match}></CreativeSetList>
          </CardContent>
        </Card>
      </div>
    );
  }

  private getLockButton = () => {
    if (!this.state.unlock) {
      return (
        <IconButton onClick={() => this.switchLock()} color="primary">
          <Icon>lock</Icon>
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => this.switchLock()} color="primary">
          <Icon>lock_open</Icon>
        </IconButton>
      );
    }
  }

  private async handleSubmit(value: any) {
    await this.props.update(value, this.props.auth, this.props.match.params.userId);
  }

  private switchLock() {
    this.setState({
      unlock: !this.state.unlock,
    });
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  campaigns: state.campaignReducer.campaigns,
  creativesets: state.creativeSetReducer.creativesets,
  geocodes: state.geoCodeReducer.geocodes,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  getCreativeSets: (campaignId: string, user: any) => dispatch(GetCreativeSets(campaignId, user)),
  getGeocodes: (user: any) => dispatch(GetGeocodes(user)),
  update: (value: any, user: any, userId: string) => dispatch(UpdateCampaigns(value, user, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
