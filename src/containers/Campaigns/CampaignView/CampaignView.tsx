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
  constructor(props: any) {
    super(props);
    this.state = {
      openNew: false,
      unlock: false,
    };
  }

  public render() {
    const {
      classes,
      createFlight,
      match,
      campaigns,
      update,
      user,
    } = this.props;
    const { unlock, openNew } = this.state;
    const id = match.params.id;
    const campaign = _.find(campaigns, (item) => {
      return item.id === id;
    });
    const notActiveFlights = _.filter(campaign.flights, { active: false });
    const activeFlights = _.filter<any>(campaign.flights, { active: true });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleClickOpenNew = () => {
      this.setState({ openNew: true });
    };
    const handleCloseNew = () => {
      this.setState({ openNew: false });
    };
    const handleOkNew = async (modalState: any) => {
      const flight = {
        campaign: campaign.id,
        endAt: modalState.selectedEndDate,
        geoOperator: "and",
        order: 1,
        startedAt: modalState.selectedStartDate,
      };
      await createFlight(flight, user);
    };
    const getAddButton = () => {
      return (
        <div>
          <IconButton onClick={handleClickOpenNew} color="primary">
            <Icon>add</Icon>
          </IconButton>
        </div>
      );
    };
    const getLockButton = () => {
      if (!unlock) {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock</Icon>
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock_open</Icon>
          </IconButton>
        );
      }
    };
    const handleSubmit = async (value: any, e: Event) => {
      await update(value, user);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" action={getLockButton()} />
          <CardContent className={classes.content}>
            <CampaignForm campaign={campaign} unlock={unlock} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardHeader title="Flights" action={getAddButton()} />
          <CardContent>
            <FlightNew open={openNew} handleClose={handleCloseNew} handleOk={handleOkNew}></FlightNew>
            <ExpansionPanel disabled={activeFlights.length < 1}>
              <ExpansionPanelSummary expandIcon={<Icon>expand</Icon>}>
                Current Flight Detail
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {activeFlights.length > 0 &&
                  <FlightDetail flight={activeFlights[0]} />
                }
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
