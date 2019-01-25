import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./UserItem.style";

class UserItem extends React.Component<any, any> {
  public render() {
    const { classes, user, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{user.email}</div>
        </TableCell>
        <TableCell>
          <div>{user.fullName}</div>
        </TableCell>
        <TableCell>
          <div>{user.emailVerified.toString()}</div>
        </TableCell>
        <TableCell>
          <div>{user.role}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/${user.id}`}>
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(UserItem);
