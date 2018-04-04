import * as _ from "lodash";
import { AppBar, Card, CardContent, CardHeader, Icon, IconButton, Toolbar, Typography, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import { UpdateCampaigns } from "../../../actions";
import CampaignForm from "../CampaignForm/CampaignForm";

import { styles } from "./CampaignView.style";

class CampaignView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    const { classes, match, campaigns, update, user } = this.props;
    const { unlock } = this.state;
    const id = match.params.id;
    const campaign = _.find(campaigns, (item) => {
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
            <Typography variant="title">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Details" />
          <CardContent className={classes.content}>
            <CampaignForm campaign={campaign} unlock={unlock} onSubmit={handleSubmit} />
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
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  campaigns: state.campaignReducer.campaigns,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  update: (value: any, user: any) => dispatch(UpdateCampaigns(value, user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignView));
