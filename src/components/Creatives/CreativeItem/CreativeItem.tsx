import * as React from "react";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import styles from "./CreativeItem.style";

class CreativeItem extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    const creative = {
      caption: "lorem ipsum",
      code: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      imgUrl: "http://www.sample-videos.com/img/Sample-jpg-image-200kb.jpg",
      targetUrl: "http://google.com",
    };

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
