import { Form, Formik } from "formik";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { NameField } from "auth/registration/NameField";
import { FormikSubmitButton } from "form/FormikButton";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { Box, Toolbar } from "@mui/material";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { PersistRegistrationValues } from "form/PersistRegistrationValues";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { PaddedCardContainer } from "components/Card/PaddedCardContainer";
import logo from "../../../brave-icon-release-color.svg";
import Typography from "@mui/material/Typography";
import { PrivacyPolicy } from "basic-attention-token/PrivacyPolicy";

export function BrowserRegister() {
  useTrackMatomoPageView({
    documentTitle: `Browser Ads Registration`,
  });

  const { register } = useRegister();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: { md: 1.5 }, mt: 1 }} />
      <Box display="flex" maxWidth="800px" flexDirection="column" mb={3}>
        <PaddedCardContainer>
          <img src={logo} height={50} />
          <div style={{ width: 600 }} />
          <Typography variant="h5" mt={3} mb={2}>
            <Trans>Start your company profile</Trans>
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
              setSubmitting(true);
              register(v);
              setSubmitting(false);
            }}
            validationSchema={RegistrationSchema()}
          >
            <Form>
              <NameField />

              <FormikSubmitButton isCreate={true} label={msg`Submit`} />

              <PersistRegistrationValues />
            </Form>
          </Formik>

          <PrivacyPolicy />
        </PaddedCardContainer>
      </Box>
    </Background>
  );
}
