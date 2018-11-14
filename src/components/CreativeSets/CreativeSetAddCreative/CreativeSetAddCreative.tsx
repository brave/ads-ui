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
import React from "react";

import { styles } from "./CreativeSetAddCreative.style";

class CreativeSetAddCreative extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      creative: props.creatives[0].id,
      open: props.open,
    };
  }

  public handleClose = () => {
    const { handleClose } = this.props;
    this.setState({
      open: false,
    });
    handleClose("cancel");
  }

  public handleSubmit = () => {
    const { handleClose } = this.props;
    this.setState({
      open: false,
    });
    handleClose("submit", this.state.creative);
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open,
      });
    }
  }

  public handleChange = (event: any) => {
    this.setState({
      creative: event.target.value,
    });
  }

  public render() {
    const listItems = this.props.creatives.map((item: any) => {
      return (
        <MenuItem key={item.id} value={item.id}>{item.payload.body}</MenuItem>
      );
    });
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose} >
        <DialogTitle>Add Creative</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a Creative to this Creative Set, Select a creative and press submit.
        </DialogContentText>
          <FormControl>
            <InputLabel>Creatives</InputLabel>
            <Select onChange={this.handleChange} value={this.state.creative}>
              {listItems}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
        </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CreativeSetAddCreative);
