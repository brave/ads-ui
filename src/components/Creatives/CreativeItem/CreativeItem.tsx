import * as React from "react";

import { Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography, withStyles } from "material-ui";

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
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {creative.caption}
          </Typography>
          <Typography component="p">
            {creative.code}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color="primary">
            <Icon>pause</Icon>
          </IconButton>
          <IconButton color="primary">
            <Icon>play_arrow</Icon>
          </IconButton>
          <IconButton color="primary">
            <Icon>equalizer</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreativeItem);
