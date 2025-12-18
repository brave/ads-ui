import { Form, Formik } from "formik";
import { initialValues, RegistrationForm } from "@/auth/registration/types";
import { FormikSubmitButton } from "@/form/FormikButton";
import { useRegister } from "@/auth/hooks/mutations/useRegister";
import { Box, Card, Typography } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { RegistrationSchema } from "@/validation/RegistrationSchema";
import { SearchForm } from "@/auth/registration/SearchForm";
import logo from "@/assets/images/brave-icon-release-color.svg";
import { PrivacyPolicy } from "@/basic-attention-token/PrivacyPolicy";

export function SearchRegister() {
  useTrackMatomoPageView({
    documentTitle: `Search Ads Registration`,
  });

  const { register } = useRegister();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 3,
      }}
    >
      <img src={logo} height={50} />
      <Typography variant="h5" mt={3} mb={2}>
        Check your brand&rsquo;s eligibility
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={async (v: RegistrationForm, { setSubmitting }) => {
          setSubmitting(true);

          // quick fixes to capture last minute changes to form structure
          v.mediaSpend = undefined;
          v.advertiser.url = v.domain;

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
              label={"Check eligibility"}
              sx={{
                padding: "12px 30px 12px 30px",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Form>
      </Formik>
      <PrivacyPolicy isSearch={true} />
    </Card>
  );
}
