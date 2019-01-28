import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CreativeInstanceItem.style";

class CreativeListItem extends React.Component<any, any> {
  public render() {
    const { classes, creativeInstance, match } = this.props;
    const url = match.url;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{creativeInstance.creative.name}</div>
        </TableCell>
        <TableCell>
          <div>{creativeInstance.prices.map((element: any) => {
            return `${element.type}  `
          })}</div>
        </TableCell>
        <TableCell>
          <div>{creativeInstance.prices.map((element: any) => {
            return `${element.amount}  `
          })}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${url}/creativeInstance/${creativeInstance.id}`}>
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(CreativeListItem);
