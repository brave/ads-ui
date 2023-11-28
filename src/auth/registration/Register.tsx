import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { NameField } from "auth/registration/NameField";
import { AddressField } from "auth/registration/AddressField";
import { FormikSubmitButton } from "form/FormikButton";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";
import { NextAndBack } from "components/Steps/NextAndBack";
import { Box, Toolbar, Typography } from "@mui/material";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { PaddedCardContainer } from "components/Card/PaddedCardContainer";
import { PersistRegistrationValues } from "form/PersistRegistrationValues";
import { AccountChoice } from "auth/registration/AccountChoice";
import { useHistory } from "react-router-dom";

type RegistrationStep = {
  label: string;
  subheader?: string;
  component: any;
};

export function Register() {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const { register, hasRegistered, error } = useRegister();

  if (hasRegistered || error) {
    return (
      <AuthContainer>
        <AdvertiserRegistered error={error} />
      </AuthContainer>
    );
  }

  const steps: RegistrationStep[] = [
    {
      label: "Choose what kind of account to open",
      subheader: "You can change this later",
      component: <AccountChoice />,
    },
    { label: "Your information", component: <NameField /> },
    { label: "Company information", component: <AddressField /> },
  ];

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: { md: 1.5 }, mt: 1 }} />
      <Box display="flex" maxWidth="800px" flexDirection="column" mb={3}>
        <Typography
          textAlign="center"
          variant="h4"
          sx={{ mb: steps[activeStep].subheader ? 1 : 3 }}
        >
          {steps[activeStep].label}
        </Typography>
        {steps[activeStep].subheader && (
          <Typography
            textAlign="center"
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {steps[activeStep].subheader}
          </Typography>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
            setSubmitting(true);
            register(v);
            setSubmitting(false);
          }}
          validationSchema={RegistrationSchema}
        >
          {({ values }) => (
            <Form>
              {activeStep === 0 ? (
                steps[activeStep].component
              ) : (
                <PaddedCardContainer>
                  {steps[activeStep].component}
                </PaddedCardContainer>
              )}

              <NextAndBack
                activeStep={activeStep}
                steps={steps.length - 1}
                onNext={() => {
                  if (values.setup === "managed") {
                    history.replace("/contact");
                  } else {
                    setActiveStep(activeStep + 1);
                  }
                }}
                onBack={() => setActiveStep(activeStep - 1)}
                disabled={!values.setup}
                final={
                  <FormikSubmitButton
                    isCreate={true}
                    label="Submit for approval"
                  />
                }
              />

              <PersistRegistrationValues />
            </Form>
          )}
        </Formik>
      </Box>
    </Background>
  );
}
