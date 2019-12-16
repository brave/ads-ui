import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CreativeTableItem.style";

class CreativeTableItem extends React.Component<any, any> {
  public render() {
    const { classes, creative, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{creative.name}</div>
        </TableCell>
        <TableCell>
          <div>{creative.type.code}</div>
        </TableCell>
        <TableCell>
          <div>{creative.payload.title}</div>
        </TableCell>
        <TableCell>
          <div>{creative.payload.body}</div>
        </TableCell>
        <TableCell>
          <div>{creative.state}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/${creative.id}`}>
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(CreativeTableItem);
