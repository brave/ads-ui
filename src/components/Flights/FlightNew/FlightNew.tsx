import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui";
import DatePicker from "material-ui-pickers/DatePicker";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import * as moment from "moment";

import * as React from "react";

class FlightNew extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedEndDate: moment().add(7, "d"),
      selectedStartDate: moment(),
    };
  }

  public render() {
    const { open, handleClose, handleOk } = this.props;
    const handleStartDateChange = (date: any) => {
      this.setState({
        selectedStartDate: date,
      });
    };
    const handleEndDateChange = (date: any) => {
      this.setState({
        selectedEndDate: date,
      });
    };
    const handleCreate = () => {
      handleOk(this.state);
      handleClose();
    };
    const { selectedStartDate, selectedEndDate } = this.state;
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Flight</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new flight you should put information here.
            </DialogContentText>
            <div>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  disablePast={true}
                  value={selectedStartDate}
                  label="Start Date"
                  onChange={handleStartDateChange} />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  minDate={selectedStartDate}
                  value={selectedEndDate}
                  label="End Date"
                  onChange={handleEndDateChange} />
              </MuiPickersUtilsProvider>
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

export default FlightNew;
