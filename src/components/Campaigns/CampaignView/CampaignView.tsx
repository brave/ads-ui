import * as _ from "lodash";
import {
  AppBar,
  Button,
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
  AddFlightGeoCode,
  AddFlightSegment,
  CreateFlights,
  GetGeocodes,
  GetSegments,
  UpdateCampaigns,
} from "../../../actions";

import FlightAddDayParting from "../../Flights/FlightAddDayParting/FlightAddDayParting";
import FlightAddGeocode from "../../Flights/FlightAddGeocode/FlightAddGeocode";
import FlightAddSegment from "../../Flights/FlightAddSegment/FlightAddSegment";
import FlightNew from "../../Flights/FlightNew/FlightNew";
import CampaignForm from "../CampaignForm/CampaignForm";
import FlightTable from "./FlightTable/FlightTable";

import { styles } from "./CampaignView.style";

class CampaignView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      openDayParting: false,
      openGeo: false,
      openNew: false,
      openSegment: false,
      unlock: false,
    };
  }

  public render() {
    const {
      addFlightGeoCode,
      addFlightSegment,
      classes,
      createFlight,
      getSegments,
      getGeocodes,
      match,
      campaigns,
      update,
      user,
    } = this.props;
    const { unlock, openNew, openGeo, openSegment, openDayParting } = this.state;
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
    const handleClickOpenGeo = async () => {
      await getGeocodes(user);
      this.setState({ openGeo: true });
    };
    const handleCloseGeo = () => {
      this.setState({ openGeo: false });
    };
    const handleOkGeo = async (modalState: any) => {
      const { geocode } = modalState;
      await addFlightGeoCode(activeFlights[0].id, user, geocode);
    };
    const handleClickOpenSegment = async () => {
      await getSegments(user);
      this.setState({ openSegment: true });
    };
    const handleCloseSegment = () => {
      this.setState({ openSegment: false });
    };
    const handleOkSegment = async (modalState: any) => {
      const { segment, priority } = modalState;
      const segmentRequest = {
        code: segment.code,
        priority,
      };
      await addFlightSegment(activeFlights[0].id, user, segmentRequest);
    };
    const handleClickOpenDayParting = () => {
      this.setState({ openDayParting: true });
    };
    const handleCloseDayParting = () => {
      this.setState({ openDayParting: false });
    };
    const handleOkDayParting = async (modalState: any) => {
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
            <FlightAddDayParting
              open={openDayParting}
              handleClose={handleCloseDayParting}
              handleOk={handleOkDayParting}
            ></FlightAddDayParting>
            <FlightAddGeocode
              open={openGeo}
              handleClose={handleCloseGeo}
              handleOk={handleOkGeo}
            ></FlightAddGeocode>
            <FlightAddSegment
              open={openSegment}
              handleClose={handleCloseSegment}
              handleOk={handleOkSegment}
            ></FlightAddSegment>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<Icon>expand</Icon>}>
                Current Flight Detail
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.currentExpansion}>
                  <div>
                    <Button
                      onClick={handleClickOpenGeo}
                      variant="raised"
                      color="primary"
                      className={classes.flightButtons}
                    >
                      Add Geocode
                      <Icon className={classes.flightButtonIcons}>place</Icon>
                    </Button>
                    <Button
                      onClick={handleClickOpenSegment}
                      variant="raised"
                      color="primary"
                      className={classes.flightButtons}
                    >
                      Add Segment
                      <Icon className={classes.flightButtonIcons}>bookmark</Icon>
                    </Button>
                    <Button
                      onClick={handleClickOpenDayParting}
                      variant="raised"
                      color="primary"
                      className={classes.flightButtons}
                    >
                      Add Day Parting
                      <Icon className={classes.flightButtonIcons}>flight_takeoff</Icon>
                    </Button>
                  </div>
                  <div>
                    <FlightTable flights={activeFlights} />
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
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
  addFlightGeoCode: (flightID: any, user: any, geoCode: any) => dispatch(AddFlightGeoCode(flightID, user, geoCode)),
  addFlightSegment: (flightID: any, user: any, segment: any) => dispatch(AddFlightSegment(flightID, user, segment)),
  createFlight: (value: any, user: any) => dispatch(CreateFlights(value, user)),
  getGeocodes: (user: any) => dispatch(GetGeocodes(user)),
  getSegments: (user: any) => dispatch(GetSegments(user)),
  update: (value: any, user: any) => dispatch(UpdateCampaigns(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
