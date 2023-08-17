import { Box, Container, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { CreativeInput } from "graphql/types";
import { CreativeFields } from "./CreativeFields";
import {
  AdvertiserCreativesDocument,
  useCreateCreativeMutation,
} from "graphql/creative.generated";
import { useState } from "react";
import { CardContainer } from "components/Card/CardContainer";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { FormikSubmitButton } from "form/FormikHelpers";
import { CreativeSchema } from "validation/CreativeSchema";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { PersistCreativeValues } from "form/PersistCreativeValues";
import { CreativeTypePreview } from "components/Creatives/CreativeTypePreview";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function NewCreative() {
  const { advertiser } = useAdvertiser();
  const history = useHistory();
  const location = useLocation<CreativeInput>();

  const defaultValue: CreativeInput & { targetUrlValid: boolean } = {
    advertiserId: "",
    state: "under_review",
    name: "",
    type: {
      code: "notification_all_v1",
    },
    targetUrlValid: false,
    payloadNotification: {
      body: "",
      targetUrl: "",
      title: "",
    },
  };

  const initialValue = location.state ?? defaultValue;

  const [createCreativeMutation, { error }] = useCreateCreativeMutation({
    refetchQueries: [
      {
        query: AdvertiserCreativesDocument,
        variables: { advertiserId: advertiser.id },
      },
    ],
  });

  const [id, setId] = useState("");

  const doSubmit = async (values: CreativeInput) => {
    const input: CreativeInput = {
      advertiserId: advertiser.id,
      name: values.name,
      payloadNotification: values.payloadNotification,
      state: values.state,
      type: values.type,
    };

    const response = await createCreativeMutation({
      variables: { input },
    });
    const id = response.data?.createCreative.id;
    if (id) {
      setId(id);
      await wait(2000);
      history.replace(id);
    }
  };

  return (
    <MiniSideBar>
      <Container maxWidth="xl">
        <Formik
          initialValues={initialValue}
          onSubmit={doSubmit}
          validationSchema={CreativeSchema}
        >
          <Box display="flex" flexDirection="row" gap={1} flexWrap="wrap">
            <CardContainer header="New creative" sx={{ flexGrow: 1 }}>
              <Form>
                <CreativeFields allowTypeChange={true} />

                <ErrorDetail
                  error={error}
                  additionalDetails="Unable to create creative"
                />

                <Box
                  mt={1}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="baseline"
                >
                  <FormikSubmitButton isCreate={true} allowNavigation={true} />
                </Box>

                <PersistCreativeValues />
              </Form>
            </CardContainer>

            <CardContainer header="Preview">
              <CreativeTypePreview />
            </CardContainer>
          </Box>
        </Formik>

        <Snackbar
          message={`Creative ${id} successfully created`}
          open={!!id}
          autoHideDuration={5000}
        />
      </Container>
    </MiniSideBar>
  );
}
