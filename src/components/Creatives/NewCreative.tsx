import { Box, Container, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { CreativeInput } from "graphql/types";
import {
  AdvertiserCreativesDocument,
  useCreateCreativeMutation,
} from "graphql/creative.generated";
import { useState } from "react";
import { CardContainer } from "components/Card/CardContainer";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CreativeSchema } from "validation/CreativeSchema";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CreativeType } from "components/Creatives/CreativeType";
import { NotificationAd } from "user/ads/NotificationAd";
import { InlineContentAd } from "user/ads/InlineContentAd";
import { SubmitPanel } from "components/Button/SubmitPanel";

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
    payloadInlineContent: {
      title: "",
      targetUrl: "",
      ctaText: "",
      description: "",
      imageUrl: "",
      dimensions: "900x750",
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
    console.log(values);
    const input: CreativeInput = {
      advertiserId: advertiser.id,
      name: values.name,
      payloadNotification: values.payloadNotification,
      payloadInlineContent: values.payloadInlineContent,
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
          {({ values }) => (
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                flexWrap="wrap"
              >
                <CardContainer header="New creative" sx={{ flexGrow: 1 }}>
                  <Form>
                    <CreativeType />

                    <ErrorDetail
                      error={error}
                      additionalDetails="Unable to create creative"
                    />

                    {/*<PersistCreativeValues />*/}
                  </Form>
                </CardContainer>

                <CreativeTypeSpecificFields creativeType={values.type.code} />

                <SubmitPanel isCreate={true} />
              </Box>
            </Form>
          )}
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

const CreativeTypeSpecificFields = ({
  creativeType,
}: {
  creativeType?: string;
}) => {
  if (creativeType === "notification_all_v1")
    return <NotificationAd useCustomButton />;
  if (creativeType === "inline_content_all_v1")
    return <InlineContentAd useCustomButton />;

  return null;
};
