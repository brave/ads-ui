import { Avatar, Card, CardActions, CardContent, Icon, IconButton, Typography, withStyles } from "@material-ui/core";
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";

import { styles } from "./CampaignItem.style";

class CampaignItem extends React.Component<any, any> {
  public render() {
    const { classes, campaign, match } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div>
            <Typography gutterBottom variant="h2">
              {campaign.name}
            </Typography>
            <Typography component="p">
              {moment(campaign.startAt).format("MMMM Do YYYY")} to&nbsp;
              {moment(campaign.endAt).format("MMMM Do YYYY")}
            </Typography>
          </div>
          <div className={classes.indicator}>
            {campaign.creatives &&
              <Avatar>
                {campaign.creatives.length.toString()}
              </Avatar>
            }
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.leftActions}>
            <Link className={classes.link} to={`${match.url}/${campaign.id}`}>
              <IconButton color="primary">
                <Icon>list</Icon>
              </IconButton>
            </Link>
          </div>
          <div className={classes.rightActions}>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CampaignItem);
