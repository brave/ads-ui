import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./AdvertiserItem.style";

class UserItem extends React.Component<any, any> {
  public render() {
    const { classes, advertiser, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{advertiser.name}</div>
        </TableCell>
        <TableCell>
          <div>{advertiser.phone}</div>
        </TableCell>
        <TableCell>
          <div>{advertiser.billingEmail}</div>
        </TableCell>
        <TableCell>
          <div>{advertiser.state}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/advertiser/${advertiser.id}/overview`}>
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
