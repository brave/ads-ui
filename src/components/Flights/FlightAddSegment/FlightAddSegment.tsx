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
} from "material-ui";
import { connect } from "react-redux";

import * as React from "react";

import { styles } from "./FlightAddSegment.style";

class FlightAddSegment extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      proirity: 0,
      segment: "",
    };
  }

  public render() {
    const { open, handleClose, handleOk, classes, segments } = this.props;
    const { segment, priority } = this.state;
    const handleCreate = () => {
      handleOk(this.state);
      handleClose();
    };
    const getSelectItems = segments.map((item: any, index: number) => {
      return (
        <MenuItem value={item}>{item.code}</MenuItem>
      );
    });
    const handleChange = (event: any) => {
      this.setState({ segment: event.target.value });
    };
    const handlePriority = (event: any) => {
      this.setState({ priority: parseInt(event.target.value, 10) });
    };
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Flight Segment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a segment...
            </DialogContentText>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel>Segment</InputLabel>
                <Select value={segment} onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {getSelectItems}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                label="Priority"
                type="number"
                value={priority}
                onChange={handlePriority}
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
  segments: state.segmentReducer.segments,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FlightAddSegment)) as any;
