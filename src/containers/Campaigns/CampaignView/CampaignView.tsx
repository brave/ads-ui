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
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import {
  UpdateCampaigns,
} from "../../../actions";

import CampaignForm from "../../../components/Campaigns/CampaignForm/CampaignForm";

import { styles } from "./CampaignView.style";

class CampaignView extends React.Component<any, any> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.campaigns !== nextProps.campaigns) {
      const campaign = _.find(nextProps.campaigns, { id: nextProps.match.params.id }) as any;
      const activeFlight = _.cloneDeep(_.find(campaign.flights, { active: true }));
      const notActiveFlights = _.filter(campaign.flights, { active: false });
      return {
        activeFlight,
        campaign,
        campaigns: nextProps.campaigns,
        notActiveFlights,
      };
    }
    return null;
  }

  constructor(props: any) {
    super(props);
    const campaign = _.find(props.campaigns, { id: this.props.match.params.id }) as any;
    const activeFlight = _.find(campaign.flights, { active: true });
    const notActiveFlights = _.filter(campaign.flights, { active: false });
    this.state = {
      activeFlight,
      campaign,
      campaigns: props.campaigns,
      notActiveFlights,
      openNew: false,
      unlock: false,
    };
  }

  public render() {
    const { classes } = this.props;
    const { campaign} = this.state;
    const { unlock } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" action={this.getLockButton()} />
          <CardContent className={classes.content}>
            <CampaignForm campaign={campaign} unlock={unlock} onSubmit={(value: string) => this.handleSubmit(value)} />
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
    await this.props.update(value, this.props.user);
  }

  private switchLock() {
    this.setState({
      unlock: !this.state.unlock,
    });
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  campaigns: state.campaignReducer.campaigns,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  update: (value: any, user: any) => dispatch(UpdateCampaigns(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
