import { ComponentType, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Settings from "./settings/Settings";
import { Box } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { AdvertiserAgreed } from "auth/components/AdvertiserAgreed";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Navbar } from "components/Navigation/Navbar";
import { CampaignView } from "user/views/user/CampaignView";
import { CampaignReportView } from "user/views/user/CampaignReportView";
import { Profile } from "user/views/user/Profile";
import { IAdvertiser } from "auth/context/auth.interface";

const buildApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    credentials: "include",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export function User() {
  const client = useMemo(() => buildApolloClient(), []);
  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Navbar />
          <Box
            width="100%"
            height="100%"
            padding={1}
            marginTop="64px"
            bgcolor="background.default"
          >
            <Switch>
              {/* /adsmanager */}
              <ProtectedRoute
                path="/user/main/adsmanager/advanced/new/:draftId"
                authedComponent={NewCampaign}
                validateAdvertiserProperty={{
                  key: "selfServiceCreate",
                  val: true,
                }}
              />

              <ProtectedRoute
                path="/user/main/adsmanager/advanced/:campaignId"
                authedComponent={EditCampaign}
                validateAdvertiserProperty={{
                  key: "selfServiceEdit",
                  val: true,
                }}
              />

              <ProtectedRoute
                path="/user/main/complete/:mode"
                authedComponent={CompletionForm}
              />

              {/* /campaigns/:campaignId/analytics - */}
              <ProtectedRoute
                path="/user/main/campaign/:campaignId"
                authedComponent={CampaignReportView}
              />

              <Route path="/user/main/settings" component={Settings} />

              <Route path="/user/main/profile" component={Profile} />

              <ProtectedRoute
                path="/user/main/campaign"
                authedComponent={CampaignView}
                unauthedComponent={AdvertiserAgreed}
              />

              {/* default */}
              <Redirect to="/user/main/campaign" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

interface ProtectedProps {
  authedComponent?: ComponentType;
  unauthedComponent?: ComponentType;
  path?: string;
  validateAdvertiserProperty?: { key: keyof IAdvertiser; val: any };
}

const ProtectedRoute = ({
  authedComponent,
  unauthedComponent,
  path,
  validateAdvertiserProperty,
}: ProtectedProps) => {
  const { advertiser } = useAdvertiser();

  if (!advertiser.agreed && unauthedComponent === undefined) {
    return <Redirect to="/user/main" />;
  }

  if (
    validateAdvertiserProperty &&
    advertiser[validateAdvertiserProperty.key] !== validateAdvertiserProperty.val
  ) {
    return <Redirect to="/user/main" />;
  }

  return (
    <Route
      path={path}
      component={advertiser.agreed ? authedComponent : unauthedComponent}
    />
  );
};
