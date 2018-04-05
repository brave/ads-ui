import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "material-ui";
import * as React from "react";

class FlightNew extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>New Flight</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new flight you should put information here.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FlightNew;
