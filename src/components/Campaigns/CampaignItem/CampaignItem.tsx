import { Avatar, Card, CardActions, CardContent, Icon, IconButton, Typography, withStyles } from "@material-ui/core";
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
            <Typography gutterBottom variant="headline" component="h2">
              {campaign.name}
            </Typography>
          </div>
          <div className={classes.indicator}>
            <Avatar>
              {campaign.creatives.length.toString()}
            </Avatar>
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
            <IconButton color="primary">
              <Icon>equalizer</Icon>
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CampaignItem);
