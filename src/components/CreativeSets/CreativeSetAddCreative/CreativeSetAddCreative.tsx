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
  TextField,
} from "@material-ui/core";
import React from "react";

import { styles } from "./CreativeSetAddCreative.style";

class CreativeSetAddCreative extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      creative: props.creatives[0] ? props.creatives[0].id : undefined,
      open: props.open,
      confirmationType: undefined,
      amount: undefined,
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
    handleClose("submit", this.state);
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open,
      });
    }
  }

  public handleChangeCreative = (event: any) => {
    this.setState({
      creative: event.target.value,
    });
  }

  public handleChangeConfirmationType = (event: any) => {
    this.setState({
      confirmationType: event.target.value,
    });
  }

  public handleAmountChange = (event: any)=>{
    this.setState({
      amount: event.target.value,
    });
  }

  public render() {
    const creativesList = this.props.creatives.map((item: any) => {
      return (
        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
      );
    });
    const confirmationTypesList = this.props.confirmationTypes.map((item: any) => {
      return (
        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
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
          <div>
            <FormControl>
              <InputLabel>Creative</InputLabel>
              <Select onChange={this.handleChangeCreative} value={this.state.creative}>
                {creativesList}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select onChange={this.handleChangeConfirmationType} value={this.state.confirmationType}>
                {confirmationTypesList}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              label="Amount"
              value={this.state.amount}
              onChange={this.handleAmountChange}
              margin="normal"
            />
          </div>
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
