import { Form } from "formik";
import { Review } from "../../review/Review";
import React from "react";
import { CampaignSettings } from "user/views/adsManager/views/advanced/components/campaign/CampaignSettings";
import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { StepDrawer } from "components/Steps/StepDrawer";
import { PaymentButton } from "user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { NewAd } from "user/ads/NewAd";
import { AdSetFields } from "user/views/adsManager/views/advanced/components/adSet/AdSetFields";
import { NewAdSet } from "user/views/adsManager/views/advanced/components/adSet/NewAdSet";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BudgetSettings } from "user/views/adsManager/views/advanced/components/campaign/BudgetSettings";

interface Props {
  isEdit: boolean;
}

export function BaseForm({ isEdit }: Props) {
  const { url } = useRouteMatch();

  const steps = [
    {
      label: "Campaign Settings",
      path: `${url}/settings`,
      component: <CampaignSettings isEdit={isEdit} />,
    },
    {
      label: "Budget",
      path: `${url}/budget`,
      component: <BudgetSettings isEdit={isEdit} />,
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
      content: <NewAdSet isEdit={isEdit} />,
      component: <AdSetFields isEdit={isEdit} />,
    },
    {
      label: "Review",
      path: `${url}/review`,
      component: <Review />,
    },
  ];

  return (
    <Form>
      <StepDrawer
        steps={steps}
        finalComponent={<PaymentButton isEdit={isEdit} />}
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
  );
}
