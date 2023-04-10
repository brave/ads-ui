import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { CampaignForm } from "../../../../types";
import { CampaignSchema } from "../../../../../../../validation/CampaignSchema";
import {
  editCampaignValues,
  transformEditForm,
} from "../../../../../../library";
import {
  refetchLoadCampaignQuery,
  useLoadCampaignQuery,
  useUpdateCampaignMutation,
} from "../../../../../../../graphql/campaign.generated";
import { refetchAdvertiserQuery } from "../../../../../../../graphql/advertiser.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { useAuthContext } from "../../../../../../../auth/context/auth.hook";

interface Params {
  campaignId: string;
}

export function EditCampaign() {
  const auth = useAuthContext();
  const history = useHistory();
  const params = useParams<Params>();

  const { data, loading } = useLoadCampaignQuery({
    variables: { id: params.campaignId },
  });

  const [mutation] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserQuery({ id: auth.advertiser.id }),
      },
      {
        ...refetchLoadCampaignQuery({ id: params.campaignId }),
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
          transformEditForm(v, params.campaignId, auth)
            .then(async (u) => {
              return await mutation({ variables: { input: u } });
            })
            .catch((e) => alert("Unable to update Campaign"))
            .finally(() => setSubmitting(false));
        }}
        validationSchema={CampaignSchema}
      >
        {({ values }) => (
          <BaseForm
            isEdit={true}
            values={values}
            advertiser={auth.advertiser}
          />
        )}
      </Formik>
    </Container>
  );
}
