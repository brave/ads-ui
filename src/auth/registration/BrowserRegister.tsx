import { useRegister } from "@/auth/hooks/mutations/useRegister";
import { BrowserForm } from "@/auth/registration/BrowserForm";
import { RegistrationContainer } from "@/auth/registration/RegistrationContainer";
import { initialValues, RegistrationForm } from "@/auth/registration/types";
import { FormikSubmitButton } from "@/form/FormikButton";
import { PersistRegistrationValues } from "@/form/PersistRegistrationValues";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { RegistrationSchema } from "@/validation/RegistrationSchema";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";

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
        validationSchema={RegistrationSchema("browser")}
      >
        <Form>
          <BrowserForm />

          <Box display="flex" justifyContent="center" m={3}>
            <FormikSubmitButton
              isCreate={true}
              label={"Submit"}
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
