import * as React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  Typography,
  withStyles,
} from "material-ui";

import styles from "./CreativeItem.style";

class CreativeItem extends React.Component<any, any> {
  public render() {
    const { classes, creative } = this.props;
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
            <Button variant="fab" color="primary">
              {creative.campaigns.length}
            </Button>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.leftActions}>
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
