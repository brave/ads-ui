import { Form } from "formik";
import { Review } from "../../review/Review";
import { CampaignSettings } from "user/views/adsManager/views/advanced/components/campaign/CampaignSettings";
import { StepDrawer } from "components/Steps/StepDrawer";
import { PaymentButton } from "user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { NewAd } from "user/ads/NewAd";
import { AdSetFields } from "user/views/adsManager/views/advanced/components/adSet/AdSetFields";
import { NewAdSet } from "user/views/adsManager/views/advanced/components/adSet/NewAdSet";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BudgetSettings } from "user/views/adsManager/views/advanced/components/campaign/BudgetSettings";
import { FormContext } from "state/context";
import { useState } from "react";
import { AdvertiserPriceFragment } from "graphql/advertiser.generated";

interface Props {
  hasPaymentIntent?: boolean | null;
  prices: AdvertiserPriceFragment[];
}

export function BaseForm({ hasPaymentIntent, prices }: Props) {
  const { url } = useRouteMatch();
  const [isShowingAds, setIsShowingAds] = useState(false);

  const steps = [
    {
      label: "Campaign Settings",
      path: `${url}/settings`,
      component: <CampaignSettings prices={prices} />,
    },
    {
      label: "Budget",
      path: `${url}/budget`,
      component: <BudgetSettings />,
    },
    {
      label: "Ads",
      path: `${url}/ads`,
      component: <NewAd />,
    },
    {
      label: "Ad Sets",
      path: `${url}/adSets`,
      queryParams: "?current=0",
      content: <NewAdSet />,
      component: <AdSetFields />,
    },
    {
      label: "Review",
      path: `${url}/review`,
      component: <Review />,
    },
  ];

  return (
    <FormContext.Provider
      value={{
        isShowingAds,
        setIsShowingAds,
      }}
    >
      <Form>
        <StepDrawer
          steps={steps}
          finalComponent={
            <PaymentButton hasPaymentIntent={hasPaymentIntent ?? false} />
          }
        >
          <Switch>
            {steps.map((s) => (
              <Route path={s.path} key={s.path}>
                {s.component}
              </Route>
            ))}
          </Switch>
        </StepDrawer>
      </Form>
    </FormContext.Provider>
  );
}
