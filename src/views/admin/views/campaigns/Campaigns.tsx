import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CampaignList from "../../../../components/Campaigns/CampaignList/CampaignList";
import Campaign from "./views/Campaign";



class Campaigns extends React.Component<any, any> {
    public render() {
        const { match } = this.props;
        return (
            <div>
                <Switch>
                    <Route exact path={match.url} component={CampaignList} />
                    <Route exact path={match.url + "/:campaignId"} component={Campaign} />
                    {/* <Route exact path={match.url + "/new"} component={CampaignNew} />
          <Route exact path={match.url + "/:campaignId"} component={CampaignView} />
          <Route exact path={match.url + "/:campaignId/report"} component={CampaignPerformance} />
          <Route exact path={match.url + "/:campaignId/creativeSet/new"} component={CreativeSetNew} />
          <Route exact path={match.url + "/:campaignId/creativeSet/:creativeSetId"} component={CreativeSetView} />
          <Route exact path={match.url + "/:campaignId/creativeSet/:creativeSetId/creativeInstance/new"}
            component={CreativeInstanceNew} />
          <Route exact path={match.url + "/:campaignId/creativeSet/:creativeSetId/creativeInstance/:creativeInstanceId"}
            component={CreativeInstanceView} />
          <Redirect to={match.url} /> */}
                </Switch>
            </div>
        );
    }
}

export default Campaigns;
