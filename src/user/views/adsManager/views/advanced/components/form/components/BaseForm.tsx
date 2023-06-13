import { Form, FormikValues, useFormikContext } from "formik";
import { Review } from "../../review/Review";
import React, { useState } from "react";
import { CampaignForm } from "../../../../../types";
import { CampaignSettings } from "user/views/adsManager/views/advanced/components/campaign/fields/CampaignSettings";
import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { StepDrawer } from "components/Steps/StepDrawer";
import { PaymentButton } from "user/views/adsManager/views/advanced/components/form/components/PaymentButton";
import { NotificationAdForm } from "user/ads/NotificationAdForm";

interface Props {
  isEdit: boolean;
  draftId?: string;
}

export function BaseForm({ isEdit, draftId }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const showCard = (values: FormikValues) => {
    return value > 0 && value !== values.adSets.length + 1;
  };

  return (
    <Form>
      <StepDrawer
        steps={[
          {
            label: "Campaign Settings",
            description: "Define when and where you want your campaign to run",
            component: <CampaignSettings isEdit={isEdit} />,
          },
          {
            label: "Budget",
            description: "Set a limit on how much your campaign will spend.",
            component: <BudgetField isEdit={isEdit} />,
          },
          {
            label: "Ads",
            description: "Create new ads to be shared across Ad sets",
            component: <NotificationAdForm />,
          },
          {
            label: "Review",
            description: "Review details before submitting for approval",
            component: <Review />,
          },
        ]}
        finalComponent={<PaymentButton isEdit={isEdit} />}
      />
      {/*<Box>*/}
      {/*  {showCard(values) && (*/}
      {/*    <>*/}
      {/*      <AdSetFields*/}
      {/*        tabValue={value}*/}
      {/*        onRemove={() => setValue(value - 1)}*/}
      {/*        onCreate={() => setValue(value + 1)}*/}
      {/*        isEdit={isEdit}*/}
      {/*      />*/}
      {/*      <AdField index={value - 1} isEdit={isEdit} />*/}
      {/*      <Box sx={{ mt: 2 }}>*/}
      {/*        <Button*/}
      {/*          variant="contained"*/}
      {/*          size="large"*/}
      {/*          onClick={() => setValue(values.adSets.length + 1)}*/}
      {/*        >*/}
      {/*          Next*/}
      {/*        </Button>*/}
      {/*      </Box>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</Box>*/}
    </Form>
  );
}
