import { Form, Formik } from "formik";
import { initialValues, RegistrationForm } from "auth/registration/types";
import { FormikSubmitButton } from "form/FormikButton";
import { useRegister } from "auth/hooks/mutations/useRegister";
import { Box } from "@mui/material";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg } from "@lingui/macro";
import { RegistrationContainer } from "auth/registration/RegistrationContainer";
import { RegistrationSchema } from "validation/RegistrationSchema";
import { SearchForm } from "auth/registration/SearchForm";

export function SearchRegister() {
  useTrackMatomoPageView({
    documentTitle: `Search Ads Registration`,
  });

  const { register } = useRegister();

  return (
    <RegistrationContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
          setSubmitting(true);
          register(v, "search");
          setSubmitting(false);
        }}
        validationSchema={RegistrationSchema("search")}
      >
        <Form>
          <SearchForm />

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
        </Form>
      </Formik>
    </RegistrationContainer>
  );
}
