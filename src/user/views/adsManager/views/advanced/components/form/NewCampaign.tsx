import { Container } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { CampaignForm, initialCampaign } from "../../../../types";
import { CampaignSchema } from "../../../../../../../validation/CampaignSchema";
import { transformNewForm } from "../../../../../../library";
import { useCreateCampaignMutation } from "../../../../../../../graphql/campaign.generated";
import { refetchAdvertiserQuery } from "../../../../../../../graphql/advertiser.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { IAdvertiser, IAuthUser } from "../../../../../../../actions";
import { PersistFormValues } from "../../../../../../../form/PersistFormValues";
import { DraftContext } from "../../../../../../../state/context";

interface Props {
  auth: IAuthUser;
  advertiser: IAdvertiser;
}

interface Params {
  draftId: string;
}

export function NewCampaign({ auth, advertiser }: Props) {
  const history = useHistory();
  const params = useParams<Params>();
  const { setDrafts } = useContext(DraftContext);

  const initial: CampaignForm = {
    ...initialCampaign,
    draftId: params.draftId,
  };

  const [mutation] = useCreateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserQuery({ id: advertiser.id }),
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
          transformNewForm(v, auth, advertiser.id)
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
