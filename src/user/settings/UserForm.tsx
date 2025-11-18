import { ReactNode, useState } from "react";
import { useUser } from "@/auth/hooks/queries/useUser";
import { CardContainer } from "@/components/Card/CardContainer";
import { Form, Formik, FormikValues } from "formik";
import { FormikTextField } from "@/form/FormikHelpers";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { UserSchema } from "@/validation/UserSchema";
import { FormikSubmitButton } from "@/form/FormikButton";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
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
  const [initialVals, setInitialVals] = useState<UserFormValues>({
    fullName: user.fullName ?? "",
  });
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);

  if (!user.userId) {
    const details = "Unable to get profile information";
    return <ErrorDetail error={details} additionalDetails={details} />;
  }

  const [updateUser] = useMutation(UpdateCurrentUser, {
    onCompleted(user) {
      trackMatomoEvent("user", "update");
      setInitialVals(user.updateCurrentUser);
    },
    onError(err) {
      const errorMessage = err.message;
      setErrorMessage(`Failed to update profile: ${errorMessage}`);
    },
  });

  return (
    <CardContainer header="Profile Details">
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
              label={"Full Name"}
              type="text"
              margin="none"
            />
            <FormikTextField
              name="password"
              label={"Password"}
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
