import { Box, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { useHistory, useLocation, useParams } from "react-router-dom";
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

interface Params {
  advertiserId: string;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export const NewCreative: React.FC = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const location = useLocation<CreativeInput>();

  const defaultValue: CreativeInput & { targetUrlValid: boolean } = {
    advertiserId: params.advertiserId,
    state: "active",
    name: "",
    type: {
      code: "",
      name: "",
    },
    targetUrlValid: false,
    payloadNotification: {
      body: "",
      targetUrl: "",
      title: "",
    },
    startAt: null,
    endAt: null,
  };

  const initialValue = location.state ?? defaultValue;

  const [createCreativeMutation, { error }] = useCreateCreativeMutation({
    refetchQueries: [
      {
        query: AdvertiserCreativesDocument,
        variables: { advertiserId: params.advertiserId },
      },
    ],
  });

  const [id, setId] = useState("");

  const doSubmit = async (values: CreativeInput) => {
    const input: CreativeInput = {
      advertiserId: values.advertiserId,
      name: values.name,
      payloadNotification: values.payloadNotification,
      startAt: values.startAt,
      endAt: values.endAt,
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
    <Box>
      <CardContainer header="New creative">
        <Formik
          initialValues={initialValue}
          onSubmit={doSubmit}
          validationSchema={CreativeSchema}
        >
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
              <FormikSubmitButton isCreate={true} allowNavigation={!!id} />
            </Box>
          </Form>
        </Formik>

        <Snackbar
          message={`Creative ${id} successfully created`}
          open={!!id}
          autoHideDuration={5000}
        />
      </CardContainer>
    </Box>
  );
};
