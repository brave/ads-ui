import { AuthContainer } from "auth/views/components/AuthContainer";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { NameField } from "auth/registration/NameField";
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
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg } from "@lingui/macro";
import { MessageDescriptor } from "@lingui/core";
import { Trans as TransWithId } from "@lingui/react";

type RegistrationStep = {
  label: MessageDescriptor;
  subheader?: MessageDescriptor;
  component: any;
  pos: string;
};

export function Register() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const steps: RegistrationStep[] = [
    {
      label: msg`Choose what kind of account to open`,
      subheader: msg`You can change this later`,
      component: <AccountChoice />,
      pos: "choice",
    },
    {
      label: msg`Create an account`,
      component: <NameField />,
      pos: "personal",
    },
  ];

  const activeStep = useRef<number>(0);
  activeStep.current = steps.findIndex((s) => {
    return s.pos === (params.get("pos") ?? "choice");
  });

  useTrackMatomoPageView({
    documentTitle: `Registration: ${activeStep.current === 0 ? "Account Choice" : "Create Account"}`,
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
          <TransWithId id={steps[currentStep].label.id} />
        </Typography>
        {steps[currentStep].subheader && (
          <Typography
            textAlign="center"
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            <TransWithId id={steps[currentStep].subheader!.id} />
          </Typography>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
            setSubmitting(true);
            register(v);
            setSubmitting(false);
          }}
          validationSchema={RegistrationSchema()}
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
                  if (currentStep === 0 && values.setup === "managed") {
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
                    label={msg`Submit for approval`}
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
