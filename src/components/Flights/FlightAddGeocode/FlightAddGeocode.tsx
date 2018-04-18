import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
} from "material-ui";
import { connect } from "react-redux";

import * as React from "react";

import { styles } from "./FlightAddGeocode.style";

class FlightAddGeocode extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      geocode: "",
    };
  }

  public render() {
    const { open, handleClose, handleOk, classes, geocodes } = this.props;
    const { geocode } = this.state;
    const handleCreate = () => {
      handleOk(this.state);
      handleClose();
    };
    const getSelectItems = geocodes.map((item: any, index: number) => {
      return (
        <MenuItem value={item}>{item.name}</MenuItem>
      );
    });
    const handleChange = (event: any) => {
      this.setState({ geocode: event.target.value });
    };
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Flight Geocode</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a geo code...
            </DialogContentText>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel>Geo Code</InputLabel>
                <Select value={geocode} onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {getSelectItems}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleCreate}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  geocodes: state.geoCodeReducer.geocodes,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  // createFlight: (value: any, user: any) => dispatch(CreateFlights(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FlightAddGeocode)) as any;
