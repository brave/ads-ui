import { Box, Card, Container, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { Form, Formik } from "formik";
import { AdvertiserAddress } from "@/auth/components/AdvertiserAddress";
import { useAuthContext } from "@/auth/context/auth.hook";
import { getUser } from "@/auth/lib";
import { AdvertiserForm, initialAdvertiserForm } from "@/auth/components/types";
import { useHistory } from "react-router-dom";
import {
  AdvertiserBillingAddressDocument,
  PaymentType,
} from "@/graphql-client/graphql";
import { AdvertiserAgreed } from "@/auth/components/AdvertiserAgreed";
import { FormikSubmitButton } from "@/form/FormikButton";
import { AdvertiserSchema } from "@/validation/AdvertiserSchema";
import { useState } from "react";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import _ from "lodash";
import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "@/graphql-client/index";

const Advertiser_Update = graphql(`
  mutation UpdateAdvertiser($input: AdsManagerUpdateAdvertiserInput!) {
    adsManagerUpdateAdvertiser(adsManagerUpdateAdvertiserInput: $input) {
      id
    }
  }
`);

export function AdvertiserDetailsForm() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Advertiser Agreement Form",
  });
  const history = useHistory();
  const { advertiser } = useAdvertiser();
  const { setSessionUser } = useAuthContext();
  const requiresPaymentAgree =
    advertiser.selfServiceManageCampaign &&
    advertiser.selfServicePaymentType !== PaymentType.Netsuite;
  const [initial, setInitial] = useState<AdvertiserForm>(
    initialAdvertiserForm(!requiresPaymentAgree),
  );

  const [mutation] = useMutation(Advertiser_Update, {
    async onCompleted() {
      const user = await getUser();
      setSessionUser(user);
      history.push("/user/main");
      trackMatomoEvent("advertiser", "update-success");
    },
    onError() {
      trackMatomoEvent("advertiser", "update-failed");
    },
  });

  const { data, loading } = useQuery(AdvertiserBillingAddressDocument, {
    variables: { id: advertiser.id },
    onCompleted: (data) => {
      setInitial(initialAdvertiserForm(!requiresPaymentAgree, data.advertiser));
    },
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Formik
        initialValues={initial}
        enableReinitialize
        onSubmit={async (v: AdvertiserForm, { setSubmitting }) => {
          setSubmitting(true);
          await mutation({
            variables: {
              input: {
                id: advertiser.id,
                agreed: v.terms && v.tracking && v.payment && v.language,
                billingAddress: v.address.id
                  ? undefined
                  : _.omit(v.address, ["id"]),
              },
            },
          });
          setSubmitting(false);
        }}
        validationSchema={AdvertiserSchema()}
      >
        <Form>
          <Box>
            {loading && (
              <Skeleton
                variant="rounded"
                width="100%"
                height={600}
                sx={{ mb: 2 }}
              />
            )}
            {!loading && (
              <Card
                sx={{
                  p: 3,
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h4" alignSelf="center" sx={{ mb: 3 }}>
                  Complete your business profile to continue
                </Typography>

                <AdvertiserAddress address={data?.advertiser?.billingAddress} />

                <AdvertiserAgreed requiresPaymentAgree={requiresPaymentAgree} />

                <Box alignSelf="center">
                  <FormikSubmitButton
                    isCreate={false}
                    label={"Enter Ads Manager"}
                    sx={{ borderRadius: "10px", mt: 3 }}
                  />
                </Box>
              </Card>
            )}
          </Box>
        </Form>
      </Formik>
    </Container>
  );
}
