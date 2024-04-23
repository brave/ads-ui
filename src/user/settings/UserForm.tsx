import { Stack } from "@mui/material";
import { useState } from "react";
import { useUser } from "@/auth/hooks/queries/useUser";
import { CardContainer } from "@/components/Card/CardContainer";
import { Form, Formik, FormikValues } from "formik";
import { FormikTextField } from "@/form/FormikHelpers";
import { useUpdateUserMutation } from "@/graphql/user.generated";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { UserSchema } from "@/validation/UserSchema";
import _ from "lodash";
import { FormikSubmitButton } from "@/form/FormikButton";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function UserForm() {
  const user = useUser();
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const { _: lingui } = useLingui();
  const [initialVals, setInitialVals] = useState(user);

  if (!user.userId) {
    const details = msg`Unable to get profile information`;
    return <ErrorDetail error={details.id} additionalDetails={details} />;
  }

  const [updateUser] = useUpdateUserMutation({
    onCompleted(user) {
      trackMatomoEvent("user", "update");
      setInitialVals(user.updateUser);
    },
  });

  return (
    <CardContainer header={<Trans>Profile Details</Trans>}>
      <Formik
        enableReinitialize
        initialValues={initialVals}
        onSubmit={(v, { setSubmitting }: FormikValues) => {
          setSubmitting(true);
          updateUser({
            variables: { input: { id: user.userId, ..._.omit(v, ["userId"]) } },
          }).finally(() => setSubmitting(false));
        }}
        validationSchema={UserSchema()}
      >
        <Form>
          <Stack direction="row" spacing={2}>
            <FormikTextField
              name="email"
              label={lingui(msg`Email`)}
              type="email"
              margin="none"
            />
            <FormikTextField
              name="password"
              label={lingui(msg`Password`)}
              type="password"
              margin="none"
            />
          </Stack>
          <Stack direction="row" spacing={2} mt={2} mb={1}>
            <FormikTextField
              name="fullName"
              label={lingui(msg`Full Name`)}
              type="text"
              margin="none"
            />
          </Stack>
          <FormikSubmitButton isCreate={false} />
        </Form>
      </Formik>
    </CardContainer>
  );
}
