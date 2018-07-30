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
} from "@material-ui/core";
import * as _ from "lodash";
import { connect } from "react-redux";

import * as React from "react";

import { styles } from "./FlightAddGeoTargeting.style";

class FlightAddGeoTargeting extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      geocode: {
        code: "",
      },
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
        <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
      );
    });
    const handleChange = (event: any) => {
      const selectedGeocode = _.find(geocodes, { code: event.target.value });
      this.setState({ geocode: selectedGeocode });
    };
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Flight Geo Targeting</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a geo targeting...
            </DialogContentText>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel>Geo Code</InputLabel>
                <Select value={geocode.code} onChange={handleChange}>
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

export default withStyles(styles)(connect(mapStateToProps)(FlightAddGeoTargeting)) as any;
