import * as _ from "lodash";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import { UpdateCreatives } from "../../../actions";
import CreativeForm from "../CreativeForm/CreativeForm";
import CampaignTable from "./CampaignTable/CampaignTable";

import { styles } from "./CreativesView.style";

class CreativesView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public getActionButtons() {
    return (
      <div>
        <IconButton color="primary">
          <Icon>pause</Icon>
        </IconButton>
        <IconButton color="primary">
          <Icon>play_arrow</Icon>
        </IconButton>
      </div>
    );
  }

  public render() {
    const { classes, match, creatives, update, user } = this.props;
    const { unlock } = this.state;
    const id = match.params.id;
    const creative = _.find(creatives, (item) => {
      return item.id === id;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleSubmit = async (value: any, e: Event) => {
      await update(value, user);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{creative.caption}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Detail" />
          <CardContent className={classes.content}>
            <CreativeForm creative={creative} unlock={unlock} onSubmit={handleSubmit} />
            <div>
              {!unlock &&
                <IconButton onClick={switchLock} color="primary">
                  <Icon>lock</Icon>
                </IconButton>
              }
              {unlock &&
                <IconButton onClick={switchLock} color="primary">
                  <Icon>lock_open</Icon>
                </IconButton>
              }
            </div>
          </CardContent>
        </Card>
        <Card className={classes.campaignCard}>
          <CardHeader title="Campaigns" action={this.getActionButtons()} />
          <CardContent>
            <CampaignTable campaigns={creative.campaigns} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creatives: state.creativeReducer.creatives,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  update: (value: any, user: any) => dispatch(UpdateCreatives(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesView));
