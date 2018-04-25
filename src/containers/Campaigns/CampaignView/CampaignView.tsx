import * as _ from "lodash";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import {
  CreateFlights,
  UpdateCampaigns,
} from "../../../actions";

import CampaignForm from "../../../components/Campaigns/CampaignForm/CampaignForm";
import FlightDetail from "../../../components/Flights/FlightDetail/FlightDetail";
import FlightNew from "../../../components/Flights/FlightNew/FlightNew";
import FlightTable from "../../../components/Flights/FlightTable/FlightTable";

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
    const { campaign, notActiveFlights, activeFlight } = this.state;
    const { unlock, openNew } = this.state;
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
        <Card className={classes.infoCard}>
          <CardHeader title="Flights" action={this.getAddButton()} />
          <CardContent>
            <FlightNew
              open={openNew}
              handleClose={() => this.handleCloseNew()}
              handleOk={(modalState: any) => this.handleOkNew(modalState)}></FlightNew>
            <ExpansionPanel disabled={!activeFlight}>
              <ExpansionPanelSummary expandIcon={<Icon>expand</Icon>}>
                Current Flight Detail
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {this.getFlightDetail()}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled={notActiveFlights.length < 1}>
              <ExpansionPanelSummary expandIcon={<Icon>expand</Icon>}>
                <Typography className={classes.heading}>Previous History</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FlightTable flights={notActiveFlights} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </CardContent>
        </Card>
      </div>
    );
  }

  private getFlightDetail() {
    if (this.state.activeFlight) {
      return (<FlightDetail flight={this.state.activeFlight} />);
    }
    return (<div></div>);
  }

  private getAddButton() {
    return (
      <div>
        <IconButton onClick={() => this.handleClickOpenNew()} color="primary">
          <Icon>add</Icon>
        </IconButton>
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

  private handleClickOpenNew() {
    this.setState({ openNew: true });
  }

  private handleCloseNew() {
    this.setState({ openNew: false });
  }

  private async handleOkNew(modalState: any) {
    const flight = {
      campaign: this.state.campaign.id,
      endAt: modalState.selectedEndDate,
      geoOperator: "and",
      order: 1,
      startedAt: modalState.selectedStartDate,
    };
    await this.props.createFlight(flight, this.props.user);
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  campaigns: state.campaignReducer.campaigns,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  createFlight: (value: any, user: any) => dispatch(CreateFlights(value, user)),
  update: (value: any, user: any) => dispatch(UpdateCampaigns(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
