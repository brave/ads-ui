import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
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
    ...initialCampaign,
    draftId: params.draftId,
  };

  const [mutation] = useCreateCampaignMutation({
    onCompleted(data) {
      localStorage.removeItem(params.draftId);
      setDrafts();

      if (advertiser.selfServiceSetPrice) {
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
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const newForm = await transformNewForm(v, advertiser, userId);
            await mutation({ variables: { input: newForm } });
          } catch (e) {
            setSubmitting(false);
          }
        }}
        validationSchema={CampaignSchema}
      >
        <>
          <BaseForm isEdit={false} draftId={params.draftId} />
          <PersistFormValues id={params.draftId} />
        </>
      </Formik>
    </Container>
  );
}
