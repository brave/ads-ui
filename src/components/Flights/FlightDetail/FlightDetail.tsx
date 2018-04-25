import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  withStyles,
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import {
  AddFlightDayparting,
  AddFlightGeoTargeting,
  AddFlightSegment,
  GetGeocodes,
  GetSegments,
} from "../../../actions";

import FlightAddDayParting from "../FlightAddDayParting/FlightAddDayParting";
import FlightAddGeoTargeting from "../FlightAddGeoTargeting/FlightAddGeoTargeting";
import FlightAddSegment from "../FlightAddSegment/FlightAddSegment";
import FlightItemDetail from "../FlightItemDetail/FlightItemDetail";

import { styles } from "./FlightDetail.style";

class FlightDetail extends React.Component<any, any> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      flight: nextProps.flight,
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      flight: props.flight,
      openDayParting: false,
      openGeo: false,
      openSegment: false,
    };
  }
  public render() {
    const {
      addFightDayParting,
      addFlightGeoCode,
      addFlightSegment,
      classes,
      getSegments,
      getGeocodes,
      user,
    } = this.props;
    const { openGeo, openSegment, openDayParting, flight } = this.state;

    const handleClickOpenGeo = async () => {
      await getGeocodes(user);
      this.setState({ openGeo: true });
    };
    const handleCloseGeo = () => {
      this.setState({ openGeo: false });
    };
    const handleOkGeo = async (modalState: any) => {
      const { geocode } = modalState;
      await addFlightGeoCode(flight.id, user, geocode);
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
      await addFlightSegment(flight.id, user, segmentRequest);
    };
    const handleClickOpenDayParting = () => {
      this.setState({ openDayParting: true });
    };
    const handleCloseDayParting = () => {
      this.setState({ openDayParting: false });
    };
    const handleOkDayParting = async (modalState: any) => {
      await addFightDayParting(flight.id, user, modalState);
    };
    return (
      <div className={classes.currentExpansion}>
        <Card>
          <CardContent>
            <FlightItemDetail flight={flight} />
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClickOpenGeo}
              variant="raised"
              color="primary"
              className={classes.flightButtons}>
              Add Geo Targeting
            <Icon className={classes.flightButtonIcons}>place</Icon>
            </Button>
            <Button
              onClick={handleClickOpenSegment}
              variant="raised"
              color="primary"
              className={classes.flightButtons}>
              Add Segment
            <Icon className={classes.flightButtonIcons}>bookmark</Icon>
            </Button>
            <Button
              onClick={handleClickOpenDayParting}
              variant="raised"
              color="primary"
              className={classes.flightButtons}>
              Add Day Parting
            <Icon className={classes.flightButtonIcons}>flight_takeoff</Icon>
            </Button>
          </CardActions>
        </Card>
        <FlightAddDayParting
          open={openDayParting}
          handleClose={handleCloseDayParting}
          handleOk={handleOkDayParting}></FlightAddDayParting>
        <FlightAddGeoTargeting
          open={openGeo}
          handleClose={handleCloseGeo}
          handleOk={handleOkGeo}></FlightAddGeoTargeting>
        <FlightAddSegment
          open={openSegment}
          handleClose={handleCloseSegment}
          handleOk={handleOkSegment}></FlightAddSegment>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  addFightDayParting: (flightID: any, user: any, dayParting: any) => {
    return dispatch(AddFlightDayparting(flightID, user, dayParting));
  },
  addFlightGeoCode: (flightID: any, user: any, geoCode: any) => {
    return dispatch(AddFlightGeoTargeting(flightID, user, geoCode));
  },
  addFlightSegment: (flightID: any, user: any, segment: any) => {
    return dispatch(AddFlightSegment(flightID, user, segment));
  },
  getGeocodes: (user: any) => dispatch(GetGeocodes(user)),
  getSegments: (user: any) => dispatch(GetSegments(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FlightDetail as any));
