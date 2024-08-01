import { ReactNode, useState } from "react";
import { useUser } from "@/auth/hooks/queries/useUser";
import { CardContainer } from "@/components/Card/CardContainer";
import { Form, Formik, FormikValues } from "formik";
import { FormikTextField } from "@/form/FormikHelpers";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { UserSchema } from "@/validation/UserSchema";
import { FormikSubmitButton } from "@/form/FormikButton";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useMutation } from "@apollo/client";
import { Snackbar, Stack } from "@mui/material";
import { graphql } from "@/graphql-client";

const UpdateCurrentUser = graphql(`
  mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {
    updateCurrentUser(input: $input) {
      ...User
    }
  }
`);

interface UserFormValues {
  fullName: string;
  password?: string;
}

export function UserForm() {
  const user = useUser();
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const { _: lingui } = useLingui();
  const [initialVals, setInitialVals] = useState<UserFormValues>({
    fullName: user.fullName ?? "",
  });
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);

  if (!user.userId) {
    const details = msg`Unable to get profile information`;
    return <ErrorDetail error={details.id} additionalDetails={details} />;
  }

  const [updateUser] = useMutation(UpdateCurrentUser, {
    onCompleted(user) {
      trackMatomoEvent("user", "update");
      setInitialVals(user.updateCurrentUser);
    },
    onError(err) {
      setErrorMessage(<Trans>Failed to update profile: {err.message}</Trans>);
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
            variables: {
              input: {
                fullName: v.fullName,
                password: v.password,
              },
            },
          }).finally(() => setSubmitting(false));
        }}
        validationSchema={UserSchema()}
      >
        <Form>
          <Stack gap={2}>
            <FormikTextField
              name="fullName"
              label={lingui(msg`Full Name`)}
              type="text"
              margin="none"
            />
            <FormikTextField
              name="password"
              label={lingui(msg`Password`)}
              type="password"
              margin="none"
            />
            <FormikSubmitButton isCreate={false} />

            <Snackbar
              open={!!errorMessage}
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
              autoHideDuration={10_000}
            />
          </Stack>
        </Form>
      </Formik>
    </CardContainer>
  );
}
