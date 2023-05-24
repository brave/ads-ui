import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React from "react";
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
import { useCreateSession } from "checkout/hooks/useCreateSession";
import { PaymentType } from "graphql/types";

interface Params {
  campaignId: string;
}

export function EditCampaign() {
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const history = useHistory();
  const params = useParams<Params>();
  const { replaceSession, loading } = useCreateSession();

  const { data: initialData, loading: qLoading } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [mutation] = useUpdateCampaignMutation({
    onCompleted(data) {
      if (
        initialData?.campaign?.stripePaymentId ||
        advertiser.selfServiceSetPrice ||
        initialData?.campaign?.paymentType === PaymentType.ManualBat
      ) {
        history.push("/user/main/complete/edit");
      } else {
        replaceSession(data.updateCampaign.id);
      }
    },
  });

  if (!initialData || !initialData.campaign || qLoading || loading) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(initialData?.campaign);

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
        <BaseForm isEdit={true} />
      </Formik>
    </Container>
  );
}
