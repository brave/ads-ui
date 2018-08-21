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
  TextField,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";

import * as React from "react";

import { styles } from "./FlightAddDayParting.style";

class FlightAddDayparting extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dow: 1,
      endHour: 0,
      startHour: 0,
    };
  }

  public render() {
    const { open, handleClose, handleOk, classes } = this.props;
    const { dow, startHour, endHour } = this.state;
    const handleCreate = () => {
      handleOk(this.state);
      handleClose();
    };
    const handleDOW = (event: any) => {
      this.setState({ dow: event.target.value });
    };
    const handleStartHour = (event: any) => {
      this.setState({ startHour: event.target.value });
    };
    const handleEndHour = (event: any) => {
      this.setState({ endHour: event.target.value });
    };
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Flight Day Parting</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a day parting...
            </DialogContentText>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel>Day of Week</InputLabel>
                <Select value={dow} onChange={handleDOW}>
                  <MenuItem value={0}>Sunday</MenuItem>
                  <MenuItem value={1}>Monday</MenuItem>
                  <MenuItem value={2}>Tuesday</MenuItem>
                  <MenuItem value={3}>Wednesday</MenuItem>
                  <MenuItem value={4}>Thursday</MenuItem>
                  <MenuItem value={5}>Friday</MenuItem>
                  <MenuItem value={6}>Saturday</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                label="Start Hour"
                type="number"
                value={startHour}
                onChange={handleStartHour}
                required
                className={classes.formControl}
              >
              </TextField>
            </div>
            <div>
              <TextField
                label="End Hour"
                type="number"
                value={endHour}
                onChange={handleEndHour}
                required
                className={classes.formControl}
              >
              </TextField>
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
});

export default withStyles(styles)(connect(mapStateToProps)(FlightAddDayparting)) as any;
