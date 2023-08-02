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
import { useCreatePaymentSession } from "checkout/hooks/useCreatePaymentSession";
import { ErrorDetail } from "components/Error/ErrorDetail";

interface Params {
  campaignId: string;
}

export function EditCampaign() {
  const { advertiser } = useAdvertiser();
  const history = useHistory();
  const params = useParams<Params>();
  const { createPaymentSession, loading } = useCreatePaymentSession();

  const {
    data: initialData,
    loading: qLoading,
    error,
  } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [mutation] = useUpdateCampaignMutation({
    onCompleted(data) {
      if (initialData?.campaign?.hasPaymentIntent) {
        history.push(
          `/user/main/complete/edit?referenceId=${data.updateCampaign.id}`,
        );
      } else {
        createPaymentSession(data.updateCampaign.id);
      }
    },
    onError() {
      alert("Unable to Update Campaign.");
    },
  });

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Campaign does not exist, or cannot be edited. Please try again later."
      />
    );
  }

  if (!initialData || !initialData.campaign || qLoading || loading) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(initialData.campaign, advertiser.id);
  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          const input = transformEditForm(v, params.campaignId);
          await mutation({ variables: { input } });
          setSubmitting(false);
        }}
        validationSchema={CampaignSchema}
      >
        <BaseForm isEdit={true} />
      </Formik>
    </Container>
  );
}
