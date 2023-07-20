import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { NameField } from "auth/registration/NameField";
import { AddressField } from "auth/registration/AddressField";
import { FormikSubmitButton } from "form/FormikHelpers";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";
import { NextAndBack } from "components/Steps/NextAndBack";
import { Typography } from "@mui/material";

export function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const { register, hasRegistered, error } = useRegister();

  if (hasRegistered || error) {
    return (
      <AuthContainer>
        <AdvertiserRegistered error={error} />
      </AuthContainer>
    );
  }

  const steps = [
    { label: "Your information", component: <NameField /> },
    { label: "Your business's information", component: <AddressField /> },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
        setSubmitting(true);
        register(v);
        setSubmitting(false);
      }}
      validationSchema={RegistrationSchema}
    >
      <AuthContainer
        aboveCard={
          <Typography textAlign="center" variant="h4" sx={{ mb: 5 }}>
            {steps[activeStep].label}
          </Typography>
        }
        belowCard={
          <NextAndBack
            activeStep={activeStep}
            steps={steps.length - 1}
            onNext={() => setActiveStep(activeStep + 1)}
            onBack={() => setActiveStep(activeStep - 1)}
            final={
              <FormikSubmitButton isCreate={true} label="Submit for approval" />
            }
          />
        }
      >
        <Form>{steps[activeStep].component}</Form>
      </AuthContainer>
    </Formik>
  );
}
