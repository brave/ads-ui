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
   GetCreativeInstances, GetSegments, UpdateCreativeSets,
} from "../../../actions";

import CreativeInstanceList from "../../../components/CreativeInstances/CreativeInstanceList/CreativeInstanceList";
import CreativeSetForm from "../../../components/CreativeSets/CreatoveSetForm/CreativeSetForm";

import { styles } from "./CreativeSetView.style";

class CampaignView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const campaign = _.find(props.campaigns, { id: this.props.match.params.id }) as any;
    const creativeSet = _.find(props.creativeSets, { id: this.props.match.params.creativeSetId }) as any;
    props.getSegments(props.auth);
    props.getCreativeInstances(creativeSet.id, props.auth);
    this.state = {
      campaign,
      creativeSet,
      open: false,
      unlock: false,
    };
  }

  public render() {
    const { classes, segments, creativeInstances, match } = this.props;
    const { campaign, creativeSet, unlock } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{campaign.name} Creative Set</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" action={this.getLockButton()} />
          <CardContent className={classes.content}>
            <CreativeSetForm creativeSet={creativeSet} segments={segments}
              unlock={unlock} onSubmit={(value: string) => this.handleSubmit(value)} />
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardHeader title="Creatives" />
          <CardContent className={classes.content}>
            <CreativeInstanceList match={match} creativeInstances={creativeInstances} />
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
    await this.props.update(this.state.campaign.id, value, this.props.auth);
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
  creativeInstances: state.creativeInstanceReducer.creativeInstances,
  creativeSets: state.creativeSetReducer.creativesets,
  creatives: state.creativeReducer.creatives,
  segments: state.segmentReducer.segments,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  getCreativeInstances: (creativeSetId: string, user: any) => dispatch(GetCreativeInstances(creativeSetId, user)),
  getSegments: (user: any) => dispatch(GetSegments(user)),
  update: (campaignId: string, value: any, user: any) => dispatch(UpdateCreativeSets(campaignId, value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
