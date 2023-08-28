import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { NameField } from "auth/registration/NameField";
import { AddressField } from "auth/registration/AddressField";
import { FormikSubmitButton } from "form/FormikHelpers";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";
import { NextAndBack } from "components/Steps/NextAndBack";
import { Box, Toolbar, Typography } from "@mui/material";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { PaddedCardContainer } from "components/Card/PaddedCardContainer";
import { PersistRegistrationValues } from "form/PersistRegistrationValues";
import { useIsMobile } from "hooks/useIsMobile";

export function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const { register, hasRegistered, error } = useRegister();
  const isMobile = useIsMobile();

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
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: isMobile ? undefined : 1.5, mt: 1 }} />
      <Box display="flex" maxWidth="725px" flexDirection="column" mb={3}>
        <Typography textAlign="center" variant="h4" sx={{ mb: 3 }}>
          {steps[activeStep].label}
        </Typography>
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
            <PaddedCardContainer>
              {steps[activeStep].component}
            </PaddedCardContainer>

            <NextAndBack
              activeStep={activeStep}
              steps={steps.length - 1}
              onNext={() => setActiveStep(activeStep + 1)}
              onBack={() => setActiveStep(activeStep - 1)}
              final={
                <FormikSubmitButton
                  isCreate={true}
                  label="Submit for approval"
                />
              }
            />

            <PersistRegistrationValues />
          </Form>
        </Formik>
      </Box>
    </Background>
  );
}
