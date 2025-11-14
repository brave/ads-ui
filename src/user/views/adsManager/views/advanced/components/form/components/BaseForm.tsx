import { Form } from "formik";
import { Review } from "../../review/Review";
import { CampaignSettings } from "@/user/views/adsManager/views/advanced/components/campaign/CampaignSettings";
import { StepDrawer } from "@/components/Steps/StepDrawer";
import { PaymentButton } from "@/user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { AdSetFields } from "@/user/views/adsManager/views/advanced/components/adSet/AdSetFields";
import { NewAdSet } from "@/user/views/adsManager/views/advanced/components/adSet/NewAdSet";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { FormContext } from "@/state/context";
import { useState } from "react";
import { AdvertiserPrice } from "@/user/hooks/useAdvertiserWithPrices";

interface Props {
  hasPaymentIntent?: boolean | null;
  prices: AdvertiserPrice[];
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
