import { Form, Formik } from "formik";
import { BrowserRegistrationSchema } from "validation/BrowserRegistrationSchema";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { FormikSubmitButton } from "form/FormikButton";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { Box } from "@mui/material";
import { PersistRegistrationValues } from "form/PersistRegistrationValues";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg } from "@lingui/macro";
import { RegistrationContainer } from "auth/registration/RegistrationContainer";
import { BrowserForm } from "auth/registration/BrowserForm";

export function BrowserRegister() {
  useTrackMatomoPageView({
    documentTitle: `Browser Ads Registration`,
  });

  const { register } = useRegister();

  return (
    <RegistrationContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
          setSubmitting(true);
          register(v, "browser");
          setSubmitting(false);
        }}
        validationSchema={BrowserRegistrationSchema()}
      >
        <Form>
          <BrowserForm />

          <Box display="flex" justifyContent="center" m={3}>
            <FormikSubmitButton
              isCreate={true}
              label={msg`Submit`}
              sx={{
                padding: "12px 30px 12px 30px",
                borderRadius: "12px",
              }}
            />
          </Box>

          <PersistRegistrationValues />
        </Form>
      </Formik>
    </RegistrationContainer>
  );
}
