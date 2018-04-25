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
    if (nextProps.flight !== prevState.flight) {
      return {
        flight: nextProps.flight,
      };
    }
    return null;
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

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.flight !== this.state.flight) {
      this.setState({ flight: this.state.flight });
    }
  }

  public render() {
    const { classes } = this.props;
    const { openGeo, openSegment, openDayParting, flight } = this.state;
    return (
      <div className={classes.currentExpansion}>
        <Card>
          <CardContent>
            <FlightItemDetail flight={flight} />
          </CardContent>
          <CardActions>
            <Button
              onClick={() => this.handleClickOpenGeo()}
              variant="raised"
              color="primary"
              className={classes.flightButtons}>
              Add Geo Targeting
            <Icon className={classes.flightButtonIcons}>place</Icon>
            </Button>
            <Button
              onClick={() => this.handleClickOpenSegment()}
              variant="raised"
              color="primary"
              className={classes.flightButtons}>
              Add Segment
            <Icon className={classes.flightButtonIcons}>bookmark</Icon>
            </Button>
            <Button
              onClick={() => this.handleClickOpenDayParting()}
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
          handleClose={() => this.handleCloseDayParting()}
          handleOk={(modalState: any) => this.handleOkDayParting(modalState)}></FlightAddDayParting>
        <FlightAddGeoTargeting
          open={openGeo}
          handleClose={() => this.handleCloseGeo()}
          handleOk={(modalState: any) => this.handleOkGeo(modalState)}></FlightAddGeoTargeting>
        <FlightAddSegment
          open={openSegment}
          handleClose={() => this.handleCloseSegment()}
          handleOk={(modalState: any) => this.handleOkSegment(modalState)}></FlightAddSegment>
      </div>
    );
  }

  private async handleClickOpenGeo() {
    await this.props.getGeocodes(this.props.user);
    this.setState({ openGeo: true });
  }

  private handleCloseGeo() {
    this.setState({ openGeo: false });
  }

  private async handleOkGeo(modalState: any) {
    const { geocode } = modalState;
    await this.props.addFlightGeoCode(this.state.flight.id, this.props.user, geocode);
  }

  private async handleClickOpenSegment() {
    await this.props.getSegments(this.props.user);
    this.setState({ openSegment: true });
  }

  private handleCloseSegment() {
    this.setState({ openSegment: false });
  }

  private async handleOkSegment(modalState: any) {
    const { segment, priority } = modalState;
    const segmentRequest = {
      code: segment.code,
      priority,
    };
    await this.props.addFlightSegment(this.state.flight.id, this.props.user, segmentRequest);
  }

  private handleClickOpenDayParting() {
    this.setState({ openDayParting: true });
  }

  private handleCloseDayParting() {
    this.setState({ openDayParting: false });
  }

  private async handleOkDayParting(modalState: any) {
    await this.props.addFightDayParting(this.state.flight.id, this.props.user, modalState);
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
