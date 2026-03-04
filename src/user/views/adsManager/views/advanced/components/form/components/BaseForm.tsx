import { StepDrawer } from "@/components/Steps/StepDrawer";
import { FormContext } from "@/state/context";
import { AdvertiserPrice } from "@/user/hooks/useAdvertiserWithPrices";
import { AdSetFields } from "@/user/views/adsManager/views/advanced/components/adSet/AdSetFields";
import { NewAdSet } from "@/user/views/adsManager/views/advanced/components/adSet/NewAdSet";
import { CampaignSettings } from "@/user/views/adsManager/views/advanced/components/campaign/CampaignSettings";
import { PaymentButton } from "@/user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { Form } from "formik";
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Review } from "../../review/Review";

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
