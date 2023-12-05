import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import { useRef } from "react";
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
  pos: string;
};

export function Register() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const steps: RegistrationStep[] = [
    {
      label: "Choose what kind of account to open",
      subheader: "You can change this later",
      component: <AccountChoice />,
      pos: "choice",
    },
    { label: "Your information", component: <NameField />, pos: "personal" },
    {
      label: "Company information",
      component: <AddressField />,
      pos: "company",
    },
  ];

  const activeStep = useRef<number>(0);
  activeStep.current = steps.findIndex((s) => {
    console.log(params.get("pos"));
    return s.pos === (params.get("pos") ?? "choice");
  });

  const { register, hasRegistered, error } = useRegister();

  if (hasRegistered || error) {
    return (
      <AuthContainer>
        <AdvertiserRegistered error={error} />
      </AuthContainer>
    );
  }

  const currentStep = activeStep.current;
  console.log(currentStep);
  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: { md: 1.5 }, mt: 1 }} />
      <Box display="flex" maxWidth="800px" flexDirection="column" mb={3}>
        <Typography
          textAlign="center"
          variant="h4"
          sx={{ mb: steps[currentStep].subheader ? 1 : 3 }}
        >
          {steps[currentStep].label}
        </Typography>
        {steps[currentStep].subheader && (
          <Typography
            textAlign="center"
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {steps[currentStep].subheader}
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
              {currentStep === 0 ? (
                steps[currentStep].component
              ) : (
                <PaddedCardContainer>
                  {steps[currentStep].component}
                </PaddedCardContainer>
              )}

              <NextAndBack
                activeStep={currentStep}
                steps={steps.length - 1}
                onNext={() => {
                  if (values.setup === "managed") {
                    history.replace("/contact");
                  } else {
                    const step = (activeStep.current = currentStep + 1);
                    activeStep.current = step;
                    history.replace(`?pos=${steps[step].pos}`);
                  }
                }}
                onBack={() => {
                  const step = (activeStep.current = currentStep - 1);
                  activeStep.current = step;
                  history.replace(`?pos=${steps[step].pos}`);
                }}
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
