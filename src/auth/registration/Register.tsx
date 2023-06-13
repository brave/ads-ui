import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import React from "react";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { Stack } from "@mui/material";
import { NameField } from "auth/registration/NameField";
import { StepsButton } from "auth/registration/StepsButton";
import { AdvertiserField } from "auth/registration/AdvertiserField";
import { AddressField } from "auth/registration/AddressField";
import { FormikSubmitButton } from "form/FormikHelpers";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";

export function Register() {
  const { register, hasRegistered, error } = useRegister();

  if (hasRegistered || error) {
    return (
      <AuthContainer>
        <AdvertiserRegistered error={error} />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
          setSubmitting(true);
          register(v);
          setSubmitting(false);
        }}
        validationSchema={RegistrationSchema}
      >
        <Form>
          <Stack direction="row" spacing={1}>
            <StepsButton
              steps={[
                { label: "Your information", component: <NameField /> },
                {
                  label: "Organization details",
                  component: <AdvertiserField />,
                },
                { label: "Organization address", component: <AddressField /> },
              ]}
              finalComponent={
                <FormikSubmitButton
                  isCreate={true}
                  label="Submit for approval"
                />
              }
            />
          </Stack>
        </Form>
      </Formik>
    </AuthContainer>
  );
}
