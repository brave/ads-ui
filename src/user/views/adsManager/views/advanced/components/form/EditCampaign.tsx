import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React, { useTransition } from "react";
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
import { createSession } from "checkout/lib";

interface Params {
  campaignId: string;
}

export function EditCampaign() {
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const history = useHistory();
  const params = useParams<Params>();

  const { data, loading } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [mutation] = useUpdateCampaignMutation();

  if (!data || !data.campaign || loading) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(data.campaign);

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const transform = await transformEditForm(
              v,
              params.campaignId,
              advertiser,
              userId
            );
            if (
              v.stripePaymentId ||
              v.batWalletId ||
              advertiser.selfServiceSetPrice
            ) {
              await mutation({ variables: { input: transform } });
              history.push("/user/main/complete/edit");
            } else {
              const url = await createSession(advertiser.id, params.campaignId);
              window.location.replace(url);
            }
          } catch (e) {
            alert("Unable to update Campaign");
            setSubmitting(false);
          }
        }}
        validationSchema={CampaignSchema}
      >
        <BaseForm isEdit={true} />
      </Formik>
    </Container>
  );
}
