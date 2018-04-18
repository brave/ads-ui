import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from "material-ui";
import { connect } from "react-redux";

import * as React from "react";

import { styles } from "./FlightAddDayParting.style";

class FlightAddDayparting extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      geocode: "",
    };
  }

  public render() {
    const { open, handleClose, handleOk } = this.props;
    const handleCreate = () => {
      handleOk(this.state);
      handleClose();
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
