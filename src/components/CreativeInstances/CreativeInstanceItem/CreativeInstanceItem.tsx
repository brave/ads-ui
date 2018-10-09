import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CreativeInstanceItem.style";

class CreativeListItem extends React.Component<any, any> {
  public render() {
    const { classes, creativeInstance, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{creativeInstance.creative.type.name}</div>
        </TableCell>
        <TableCell>
          <div>{creativeInstance.creative.type.platform}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/creativeSet/${creativeInstance.id}`}>
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
