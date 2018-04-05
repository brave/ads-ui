import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "material-ui";
import * as React from "react";

class FlightNew extends React.Component<any, any> {
  public render() {
    const { open, handleClose } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Flight</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new flight you should put information here.
            </DialogContentText>
            <TextField autoFocus label="Start Date" type="text" fullWidth />
            <TextField label="End Date" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleClose}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FlightNew;
