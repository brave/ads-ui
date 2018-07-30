import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
        <CardMedia
          className={classes.media}
          image={creative.imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <div>
            <Typography gutterBottom variant="headline" component="h2">
              {creative.caption}
            </Typography>
            <Typography component="p">
              {creative.body}
            </Typography>
            <Typography>
              <a href={creative.targetUrl}>{creative.targetUrl}</a>
            </Typography>
          </div>
          <div className={classes.indicator}>
            <Avatar>
              {creative.campaigns.length.toString()}
            </Avatar>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.leftActions}>
            <Link className={classes.link} to={`${match.url}/${creative.id}`}>
              <IconButton color="primary">
                <Icon>list</Icon>
              </IconButton>
            </Link>
            <IconButton color="primary">
              <Icon>pause</Icon>
            </IconButton>
            <IconButton color="primary">
              <Icon>play_arrow</Icon>
            </IconButton>
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

export default withStyles(styles, { withTheme: true })(CreativeItem);
