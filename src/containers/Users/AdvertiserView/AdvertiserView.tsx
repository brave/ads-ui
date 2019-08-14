import {
  AppBar,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Card from "../../../components/Card/Card";
import { Text } from "../../../components/Text/Text";
import CampaignTable from "../../../components/Campaigns/CampaignTable/CampaignTable";

import {
  GetCampaigns,
  GetCreatives,
  GetInvoices,
  UpdateAdvertisers
} from "../../../actions";

import AdvertiserForm from "../../../components/Advertisers/AdvertiserForm/Advertiser-form";
import InvoiceList from "../../../components/Invoices/InvoiceList/InvoiceList";

import CampaignTableList from "../../../components/Campaigns/CampaignTableList/CampaignTableList";
import CreativeTableList from "../../../components/Creatives/CreativeTableList/CreativeTableList";

import { styles } from "./AdvertiserView.style";

class AdvertiserView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      unlock: false
    };
  }

  public componentDidMount() {
    const id = this.props.match.params.userId;
    const user = _.find(this.props.users, item => {
      return item.id === id;
    });
    this.props.GetInvoices(this.props.auth, user.id);
    this.props.GetCampaigns(this.props.auth, user.id);
    this.props.GetCreatives(this.props.auth, user.id);
  }

  public render() {
    const {
      classes,
      match,
      auth,
      update,
      advertisers,
      invoices,
      creatives,
      campaigns,
      users
    } = this.props;
    const { unlock } = this.state;
    const id = match.params.userId;
    const advertiserId = match.params.advertiserId;
    const user = _.find(users, item => {
      return item.id === id;
    });
    const advertiser = _.find(advertisers, item => {
      return item.id === advertiserId;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock
      });
    };
    const handleSubmit = async (value: any, e: Event) => {
      const userId = user.id;
      const values = value;
      values.id = advertiser.id;
      values.mailingAddress = {
        city: values.city,
        country: values.country,
        state: values.state,
        street1: values.street1,
        street2: values.street2,
        zipcode: values.zipcode
      };
      values.billingAddress = values.mailingAddress;
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
      <div
        style={{
          display: "grid",
          gridTemplateRows: "100px",
          gridRowGap: "24px",
          marginBottom: "72px"
        }}
      >

        <Text fontFamily={"Poppins"} sizes={[24, 24, 24, 24, 24]}>
          {advertiser.name}
        </Text>

        {/* <Card>
          <CardHeader title="Detail" action={getLockButton()} />
          <CardContent className={classes.content}>
            <AdvertiserForm
              auth={auth}
              advertiser={advertiser}
              unlock={unlock}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Invoices" />
          <CardContent className={classes.content}>
            <InvoiceList invoices={invoices} match={match} />
          </CardContent>
        </Card> */}
        {/* Old */}

        <CardHeader style={{ padding: "0" }} title="Campaigns" />
        <CardContent style={{ padding: "0", marginLeft: "-30px" }} className={classes.content}>
          <CampaignTableList style={{ padding: "0" }} campaigns={campaigns} match={match} />
        </CardContent>

        {/* New */}
        {/* <Card>
          <Text fontFamily={"Poppins"} sizes={[24, 24, 24, 24, 24]}>
            Campaigns
          </Text>
          <div
            style={{
              marginTop: "24px",
              marginLeft: "12px",
              marginRight: "12px"
            }}
          >
          </div>
        </Card> */}

        <CardHeader title="Creatives" />
        <CardContent style={{ padding: "0", marginLeft: "-30px" }} className={classes.content}>
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
  users: state.userReducer.users
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (auth: any, userId: string) =>
    dispatch(GetCampaigns(auth, userId)),
  GetCreatives: (auth: any, userId: string) =>
    dispatch(GetCreatives(auth, userId)),
  GetInvoices: (auth: any, userId: string) =>
    dispatch(GetInvoices(auth, userId)),
  update: (value: any, auth: any, userId: string) =>
    dispatch(UpdateAdvertisers(value, auth, userId))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdvertiserView)
);
