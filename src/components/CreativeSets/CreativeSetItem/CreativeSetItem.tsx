import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CreativeSetItem.style";

class CreativeSetItem extends React.Component<any, any> {
  public render() {
    const { classes, creativeSet, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{creativeSet.execution}</div>
        </TableCell>
        <TableCell>
          <div>{creativeSet.perDay}</div>
        </TableCell>
        <TableCell>
          <div>{creativeSet.totalMax}</div>
        </TableCell>
        <TableCell>
          <div>{creativeSet.state}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/creativeSet/${creativeSet.id}`}>
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(CreativeSetItem);
