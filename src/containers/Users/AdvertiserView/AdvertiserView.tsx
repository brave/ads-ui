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
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { GetCampaigns, GetCreatives, GetInvoices, UpdateAdvertisers } from "../../../actions";

import AdvertiserForm from "../../../components/Advertisers/AdvertiserForm/Advertiser-form";
import InvoiceList from "../../../components/Invoices/InvoiceList/InvoiceList";

import CampaignTableList from "../../../components/Campaigns/CampaignTableList/CampaignTableList";
import CreativeTableList from "../../../components/Creatives/CreativeTableList/CreativeTableList";
import { Text } from "../../../components/Text/Text";

import { styles } from "./AdvertiserView.style";
import { Link } from "react-router-dom";

const linkStyle = { textDecoration: "none", color: "inherit", marginLeft: "auto" };

class AdvertiserView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      unlock: false,
    };
  }

  public componentDidMount() {
    const id = this.props.match.params.userId;
    const user = _.find(this.props.users, (item) => {
      return item.id === id;
    });
    this.props.GetInvoices(this.props.auth, user.id);
    this.props.GetCampaigns(this.props.auth, user.id);
    this.props.GetCreatives(this.props.auth, user.id);
  }

  public render() {
    const { classes, match, auth, update, advertisers, invoices, creatives, campaigns, users, location } = this.props;
    const { unlock } = this.state;
    const id = match.params.userId;
    const advertiserId = match.params.advertiserId;
    const user = _.find(users, (item) => {
      return item.id === id;
    });
    const advertiser = _.find(advertisers, (item) => {
      return item.id === advertiserId;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleSubmit = async (value: any, e: Event) => {
      const userId = user.id;
      let values = value;
      values.id = advertiser.id;
      values.mailingAddress = {
        city: values.city,
        country: values.country,
        state: values.state,
        street1: values.street1,
        street2: values.street2,
        zipcode: values.zipcode,
      };
      values.billingAddress = values.mailingAddress;
      alert(values.state);
      values.state = value.ad_state;
      await update(values, auth, userId);
    };
    const getLockButton = () => {
      if (!unlock) {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock</Icon>
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock_open</Icon>
          </IconButton>
        );
      }
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{advertiser.name}</Typography>
            {this.props.location.search === "?experiment=true" &&
              <Link style={linkStyle} to={`/admin/main/adsmanager/selection?userId=${match.params.userId}&advertiserId=${match.params.advertiserId}`}>
                <div style={{ padding: "0px 20px", background: "#4C54D2", color: "white", border: "none", borderRadius: "100px 100px 100px 100px" }}>
                  <span>
                    <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                      New Campaign
                                    </Text>
                  </span>
                </div>
              </Link>
            }
          </Toolbar>
        </AppBar>

        <CardHeader title="Detail" action={getLockButton()} />
        <CardContent className={classes.content}>
          <AdvertiserForm auth={auth} advertiser={advertiser} unlock={unlock} onSubmit={handleSubmit} />
        </CardContent>


        <CardHeader title="Invoices" />
        <CardContent className={classes.content}>
          <InvoiceList invoices={invoices} match={match} />
        </CardContent>


        <CardHeader style={{ padding: "0" }} title="Campaigns" />
        <CardContent style={{ padding: "0" }} className={classes.content}>
          <CampaignTableList campaigns={campaigns} match={match} />
        </CardContent>


        <CardHeader title="Creatives" />
        <CardContent className={classes.content}>
          <CreativeTableList creatives={creatives} match={match} />
        </CardContent>

      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  campaigns: state.campaignReducer.campaigns,
  creatives: state.creativeReducer.creatives,
  invoices: state.invoiceReducer.invoices,
  users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (auth: any, userId: string) => dispatch(GetCampaigns(auth, userId)),
  GetCreatives: (auth: any, userId: string) => dispatch(GetCreatives(auth, userId)),
  GetInvoices: (auth: any, userId: string) => dispatch(GetInvoices(auth, userId)),
  update: (value: any, auth: any, userId: string) => dispatch(UpdateAdvertisers(value, auth, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvertiserView));