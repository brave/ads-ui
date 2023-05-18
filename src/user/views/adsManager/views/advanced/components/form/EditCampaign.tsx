import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { CampaignForm } from "../../../../types";
import { CampaignSchema } from "validation/CampaignSchema";
import {
  editCampaignValues,
  populateFilter,
  transformEditForm,
} from "user/library";
import {
  useLoadCampaignQuery,
  useUpdateCampaignMutation,
} from "graphql/campaign.generated";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";

interface Params {
  campaignId: string;
}

interface Props {
  fromDate: Date | null;
}

export function EditCampaign({ fromDate }: Props) {
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const history = useHistory();
  const params = useParams<Params>();

  const { data, loading } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
  });

  const [mutation] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: advertiser.id,
          filter: populateFilter(fromDate),
        }),
      },
    ],
    onCompleted() {
      history.push("/user/main/complete/edit");
    },
  });

  if (!data || !data.campaign || loading) {
    return <LinearProgress />;
  }

  const initialValues = editCampaignValues(data.campaign);

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        onSubmit={(v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          transformEditForm(v, params.campaignId, advertiser.id, userId)
            .then(async (u) => {
              return await mutation({ variables: { input: u } });
            })
            .catch((e) => alert("Unable to update Campaign"))
            .finally(() => setSubmitting(false));
        }}
        validationSchema={CampaignSchema}
      >
        <BaseForm isEdit={true} advertiser={advertiser} />
      </Formik>
    </Container>
  );
}
