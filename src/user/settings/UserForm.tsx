import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useUser } from "auth/hooks/queries/useUser";
import { CardContainer } from "components/Card/CardContainer";
import { Form, Formik, FormikValues } from "formik";
import { FormikSubmitButton, FormikTextField } from "form/FormikHelpers";
import { useUpdateUserMutation } from "graphql/user.generated";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { UserSchema } from "validation/UserSchema";
import _ from "lodash";

export function UserForm() {
  const user = useUser();
  const [initialVals, setInitialVals] = useState(user);

  if (!user.userId) {
    const details = "Unable to get user information";
    return <ErrorDetail error={details} additionalDetails={details} />;
  }

  const [updateUser] = useUpdateUserMutation({
    onCompleted(user) {
      setInitialVals(user.updateUser);
    },
  });

  return (
    <CardContainer header="User Details">
      <Formik
        enableReinitialize
        initialValues={initialVals}
        onSubmit={(v, { setSubmitting }: FormikValues) => {
          setSubmitting(true);
          updateUser({
            variables: { input: { id: user.userId, ..._.omit(v, ["userId"]) } },
          }).finally(() => setSubmitting(false));
        }}
        validationSchema={UserSchema}
      >
        <Form>
          <Stack direction="row" spacing={2}>
            <FormikTextField
              name="email"
              label="Email"
              type="email"
              margin="none"
            />
            <FormikTextField
              name="password"
              label="Password"
              type="password"
              margin="none"
            />
          </Stack>
          <Stack direction="row" spacing={2} mt={2} mb={1}>
            <FormikTextField
              name="fullName"
              label="Full Name"
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
