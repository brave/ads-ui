import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./CreativeItem.style";

class CreativeItem extends React.Component<any, any> {
  public render() {
    const { classes, creative, match } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div>
            <Typography gutterBottom variant="headline" component="h2">
              {creative.payload.h5}
            </Typography>
            <Typography component="p">
              {creative.type.code} | {creative.state}
            </Typography>
            <Typography>
              <a href={creative.payload.targetUrl}>{creative.payload.targetUrl}</a>
            </Typography>
          </div>
          <div className={classes.indicator}>
            {creative.campaigns &&
              <Avatar>
                {creative.campaigns.length.toString()}
              </Avatar>
            }
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.leftActions}>
            <Link className={classes.link} to={`${match.url}/${creative.id}`}>
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

export default withStyles(styles, { withTheme: true })(CreativeItem);
