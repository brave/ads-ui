import * as _ from "lodash";
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
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import { CreateFlights, UpdateCampaigns } from "../../../actions";

import FlightNew from "../../Flights/FlightNew/FlightNew";
import CampaignForm from "../CampaignForm/CampaignForm";
import FlightTable from "./FlightTable/FlightTable";

import { styles } from "./CampaignView.style";

class CampaignView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      unlock: false,
    };
  }

  public render() {
    const { classes, createFlight, match, campaigns, update, user } = this.props;
    const { unlock, open } = this.state;
    const id = match.params.id;
    const campaign = _.find(campaigns, (item) => {
      return item.id === id;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    const getAddButton = () => {
      return (
        <div>
          <IconButton onClick={handleClickOpen} color="primary">
            <Icon>add</Icon>
          </IconButton>
        </div>
      );
    };
    const handleOk = async (modalState: any) => {
      const flight = {
        campaign: campaign.id,
        endAt: modalState.selectedStartDate,
        geoOperator: "and",
        order: 1,
        startedAt: modalState.selectedStartDate,
      };
      await createFlight(flight, user);
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
          <CardHeader title="Details" />
          <CardContent className={classes.content}>
            <CampaignForm campaign={campaign} unlock={unlock} onSubmit={handleSubmit} />
            <div>
              {!unlock &&
                <IconButton onClick={switchLock} color="primary">
                  <Icon>lock</Icon>
                </IconButton>
              }
              {unlock &&
                <IconButton onClick={switchLock} color="primary">
                  <Icon>lock_open</Icon>
                </IconButton>
              }
            </div>
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardHeader title="Flights" action={getAddButton()}/>
          <CardContent>
            <FlightNew open={open} handleClose={handleClose} handleOk={handleOk}></FlightNew>
            <FlightTable flights={campaign.flights} />
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
