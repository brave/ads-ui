import * as React from "react";

import { AppBar, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, withStyles } from "@material-ui/core";

import { styles } from "./CreativesFilter.style";

class CreativesFilter extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar className={classes.toolbar}>
            <FormControl className={classes.formControl}>
              <TextField className={classes.input} label="Search" />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Sort</InputLabel>
              <Select className={classes.select} value="" displayEmpty name="age">
                <MenuItem value="creation">Creation</MenuItem>
                <MenuItem value="last edit">Last Edit</MenuItem>
                <MenuItem value="associated campaigns">Associated Campaigns</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(CreativesFilter);
