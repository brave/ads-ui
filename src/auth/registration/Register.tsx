import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { RegistrationSchema } from "auth/registration/RegistrationSchema";
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
  const [step, setStep] = useState(0);
  const { register, hasRegistered, error } = useRegister();

  if (hasRegistered || error) {
    return (
      <AuthContainer>
        <AdvertiserRegistered error={error} />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer height={step === 2 ? "650px" : "475px"}>
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
          {step === 0 && <NameField />}

          {step === 1 && <AdvertiserField />}

          {step === 2 && <AddressField />}

          <Stack direction="row" spacing={1}>
            <StepsButton
              onNext={() => setStep(step + 1)}
              onBack={() => setStep(step - 1)}
              showBack={step !== 0}
              showNext={step < 2}
            />

            {step === 2 && (
              <FormikSubmitButton isCreate={true} label="Submit for approval" />
            )}
          </Stack>
        </Form>
      </Formik>
    </AuthContainer>
  );
}
