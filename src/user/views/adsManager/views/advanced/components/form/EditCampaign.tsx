import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import { CampaignForm } from "../../../../types";
import { CampaignSchema } from "@/validation/CampaignSchema";
import { editCampaignValues, transformEditForm } from "@/user/library";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { useCreatePaymentSession } from "@/checkout/hooks/useCreatePaymentSession";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { useContext } from "react";
import { FilterContext } from "@/state/context";
import { useAdvertiserWithPrices } from "@/user/hooks/useAdvertiserWithPrices";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  AdvertiserCampaignsDocument,
  LoadCampaignDocument,
} from "@/graphql-client/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "@/graphql-client/index";

interface Params {
  campaignId: string;
}

const UpdateCampaign = graphql(`
  mutation AdsManagerUpdateCampaign($input: AdsManagerUpdateCampaignInput!) {
    adsManagerUpdateCampaign(adsManagerUpdateCampaignInput: $input) {
      id
    }
  }
`);

export function EditCampaign() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Edit Campaign",
  });
  const { fromDate } = useContext(FilterContext);
  const { _ } = useLingui();
  const history = useHistory();
  const params = useParams<Params>();
  const { createPaymentSession, loading } = useCreatePaymentSession();
  const {
    data,
    loading: priceLoading,
    error: priceError,
  } = useAdvertiserWithPrices();

  const {
    data: initialData,
    loading: qLoading,
    error,
  } = useQuery(LoadCampaignDocument, {
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const hasPaymentIntent = initialData?.campaign?.hasPaymentIntent;
  const [mutation] = useMutation(UpdateCampaign, {
    onCompleted(data) {
      trackMatomoEvent("campaign", "update-success");
      if (hasPaymentIntent) {
        history.push(
          `/user/main/complete/edit?referenceId=${data.adsManagerUpdateCampaign.id}`,
        );
      } else {
        void createPaymentSession(data.adsManagerUpdateCampaign.id);
      }
    },
    onError() {
      trackMatomoEvent("campaign", "update-failed");
      alert(_(msg`Unable to Update Campaign.`));
    },
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: {
          id: data.id,
          filter: { from: fromDate?.toISOString() },
        },
      },
    ],
  });

  if (error || priceError) {
    return (
      <ErrorDetail
        error={error ?? priceError}
        additionalDetails={msg`Campaign does not exist, or cannot be edited. Please try again later.`}
      />
    );
  }

  if (
    !initialData ||
    !initialData.campaign ||
    qLoading ||
    loading ||
    priceLoading
  ) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(initialData.campaign, data.id);
  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          const input = transformEditForm(v, initialValues, params.campaignId);
          await mutation({ variables: { input } });
          setSubmitting(false);
        }}
        validationSchema={CampaignSchema(data.prices)}
        enableReinitialize
      >
        <BaseForm hasPaymentIntent={hasPaymentIntent} prices={data.prices} />
      </Formik>
    </Container>
  );
}
