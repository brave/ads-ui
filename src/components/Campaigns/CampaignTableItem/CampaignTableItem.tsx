import {
  Icon,
  IconButton,
  TableCell,
  TableRow,
  withStyles
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CampaignTableItem.style";

class CampaignTableItem extends React.Component<any, any> {
  public render() {
    const { classes, campaign, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{campaign.name}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.budget}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.dailyBudget}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.dailyCap}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.startAt}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.endAt}</div>
        </TableCell>
        <TableCell>
          <div>{campaign.state}</div>
          <Link
            className={classes.viewButton}
            to={`${match.url}/campaign/${campaign.id}/reporttwo`}
          >
            <IconButton color="primary">
              <Icon>timeline</Icon>
            </IconButton>
          </Link>
        </TableCell>
        <TableCell>
          <Link
            className={classes.viewButton}
            to={`${match.url}/campaign/${campaign.id}`}
          >
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
          <Link
            className={classes.viewButton}
            to={`${match.url}/campaign/${campaign.id}/report`}
          >
            <IconButton color="primary">
              <Icon>timeline</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(CampaignTableItem);
