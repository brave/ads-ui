import * as _ from "lodash";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  withStyles,
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import { CreateFlights, GetCampaigns, UpdateCampaigns } from "../../../actions";

import FlightNew from "../../Flights/FlightNew/FlightNew";
import CampaignForm from "../CampaignForm/CampaignForm";

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
    const { classes, createFlight, getCampaigns, match, campaigns, update, user } = this.props;
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
    const handleOk = async (modalState: any) => {
      const flight = {
        campaign: campaign.id,
        endAt: modalState.selectedStartDate,
        geoOperator: "and",
        order: 1,
        startedAt: modalState.selectedStartDate,
      };
      await createFlight(flight, user);
      getCampaigns(user);
    };
    const handleSubmit = async (value: any, e: Event) => {
      await update(value, user);
    };
    const tableBodyRows = campaign.flights.map((item: any, index: number) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {index}
          </TableCell>
          <TableCell>
            {item.startedAt}
          </TableCell>
          <TableCell>
            {item.endAt}
          </TableCell>
        </TableRow>
      );
    });
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
          <CardHeader title="Flights" />
          <CardContent>
            <IconButton onClick={handleClickOpen} color="primary">
              <Icon>add</Icon>
            </IconButton>
            <FlightNew open={open} handleClose={handleClose} handleOk={handleOk}></FlightNew>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Flight
                  </TableCell>
                    <TableCell>
                      Start Date
                  </TableCell>
                    <TableCell>
                      End Date
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableBodyRows}
                </TableBody>
              </Table>
            </Paper>
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
  getCampaigns: (user: any) => dispatch(GetCampaigns(user)),
  update: (value: any, user: any) => dispatch(UpdateCampaigns(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
