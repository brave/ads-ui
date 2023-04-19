import { Container } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { CampaignForm, initialCampaign } from "../../../../types";
import { CampaignSchema } from "../../../../../../../validation/CampaignSchema";
import { populateFilter, transformNewForm } from "../../../../../../library";
import { useCreateCampaignMutation } from "../../../../../../../graphql/campaign.generated";
import { refetchAdvertiserCampaignsQuery } from "../../../../../../../graphql/advertiser.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { PersistFormValues } from "../../../../../../../form/PersistFormValues";
import { DraftContext } from "../../../../../../../state/context";
import { useAdvertiser } from "../../../../../../../auth/hooks/queries/useAdvertiser";
import { useUser } from "../../../../../../../auth/hooks/queries/useUser";

interface Params {
  draftId: string;
}

interface Props {
  fromDate: Date | null;
}

export function NewCampaign({ fromDate }: Props) {
  const history = useHistory();
  const params = useParams<Params>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();

  const { setDrafts } = useContext(DraftContext);

  const initial: CampaignForm = {
    ...initialCampaign,
    draftId: params.draftId,
  };

  const [mutation] = useCreateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: advertiser.id,
          filter: populateFilter(fromDate),
        }),
      },
    ],
    onCompleted() {
      localStorage.removeItem(params.draftId);
      setDrafts();
      history.push("/user/main/complete/new");
    },
  });

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initial}
        onSubmit={(v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          transformNewForm(v, advertiser.id, userId)
            .then(async (c) => {
              return await mutation({ variables: { input: c } });
            })
            .catch((e) => {
              alert("Unable to save Campaign");
            })
            .finally(() => {
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
