import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { CampaignForm } from "../../../../types";
import { CampaignSchema } from "validation/CampaignSchema";
import { editCampaignValues, transformEditForm } from "user/library";
import {
  useLoadCampaignQuery,
  useUpdateCampaignMutation,
} from "graphql/campaign.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";
import { PaymentModal } from "components/Modal/PaymentModal";

interface Params {
  campaignId: string;
}

export function EditCampaign() {
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const history = useHistory();
  const params = useParams<Params>();
  const [open, setOpen] = useState(false);

  const { data, loading: qLoading } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [mutation] = useUpdateCampaignMutation({
    onCompleted() {
      if (data?.campaign?.stripePaymentId || advertiser.selfServiceSetPrice) {
        history.push("/user/main/complete/edit");
      } else {
        setOpen(true);
      }
    },
  });

  if (!data || !data.campaign || qLoading) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(data?.campaign);

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const transform = await transformEditForm(
              v,
              params.campaignId,
              advertiser,
              userId
            );
            await mutation({ variables: { input: transform } });
          } catch (e) {
            setSubmitting(false);
          }
        }}
        validationSchema={CampaignSchema}
      >
        <>
          <BaseForm isEdit={true} />
          <PaymentModal
            open={open}
            onCancel={() => setOpen(false)}
            campaignId={params.campaignId}
            isEdit={true}
          />
        </>
      </Formik>
    </Container>
  );
}
