import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { CampaignForm, initialCampaign } from "../../../../types";
import { CampaignSchema } from "validation/CampaignSchema";
import { transformNewForm } from "user/library";
import { useCreateCampaignMutation } from "graphql/campaign.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { PersistFormValues } from "form/PersistFormValues";
import { DraftContext } from "state/context";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";
import { useCreateSession } from "checkout/hooks/useCreateSession";
import { PaymentType } from "graphql/types";

interface Params {
  draftId: string;
}

export function NewCampaign() {
  const history = useHistory();
  const params = useParams<Params>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const { replaceSession, loading } = useCreateSession();

  const { setDrafts } = useContext(DraftContext);

  const initial: CampaignForm = {
    ...initialCampaign(advertiser),
    draftId: params.draftId,
  };

  const [mutation] = useCreateCampaignMutation({
    onCompleted(data) {
      const campaign = data.createCampaign;
      localStorage.removeItem(params.draftId);
      setDrafts();
      if (campaign.paymentType !== PaymentType.Stripe) {
        history.push("/user/main/complete/new");
      } else {
        replaceSession(data.createCampaign.id);
      }
    },
  });

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initial}
        onSubmit={(v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          transformNewForm(v, advertiser, userId)
            .then(async (c) => {
              return await mutation({ variables: { input: c } });
            })
            .catch((e) => {
              alert("Unable to save Campaign");
              setSubmitting(false);
            });
        }}
        validationSchema={CampaignSchema}
      >
        {({ values }) => (
          <>
            <BaseForm
              isEdit={false}
              values={values}
              advertiser={advertiser}
              draftId={params.draftId}
            />
            <PersistFormValues id={params.draftId} />
          </>
        )}
      </Formik>
    </Container>
  );
}
