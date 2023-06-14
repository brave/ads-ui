import { Form } from "formik";
import { Review } from "../../review/Review";
import React from "react";
import { CampaignSettings } from "user/views/adsManager/views/advanced/components/campaign/fields/CampaignSettings";
import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { StepDrawer } from "components/Steps/StepDrawer";
import { PaymentButton } from "user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { NewAd } from "user/ads/NewAd";
import { AdSetFields } from "user/views/adsManager/views/advanced/components/adSet/AdSetFields";
import { NewAdSet } from "user/views/adsManager/views/advanced/components/adSet/NewAdSet";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

interface Props {
  isEdit: boolean;
}

export function BaseForm({ isEdit }: Props) {
  const { url } = useRouteMatch();
  const history = useHistory();

  const steps = [
    {
      label: "Campaign Settings",
      path: `${url}/settings`,
      component: <CampaignSettings isEdit={isEdit} />,
    },
    {
      label: "Budget",
      path: `${url}/budget`,
      component: <BudgetField isEdit={isEdit} />,
    },
    {
      label: "Ads",
      path: `${url}/ads`,
      component: <NewAd />,
    },
    {
      label: "Ad Sets",
      path: `${url}/adSets`,
      content: <NewAdSet />,
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
      <Switch>
        <StepDrawer
          steps={steps}
          finalComponent={<PaymentButton isEdit={isEdit} />}
        >
          {steps.map((s) => (
            <Route path={s.path} key={s.path}>
              {s.component}
            </Route>
          ))}
        </StepDrawer>
      </Switch>
    </Form>
  );
}
