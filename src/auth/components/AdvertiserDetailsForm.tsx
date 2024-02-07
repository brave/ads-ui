import { Box, Card, Container, Divider, Skeleton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Form, Formik } from "formik";
import { AdvertiserAddress } from "auth/components/AdvertiserAddress";
import { useAuthContext } from "auth/context/auth.hook";
import {
  useAdvertiserBillingAddressQuery,
  useUpdateAdvertiserMutation,
} from "graphql/advertiser.generated";
import { getUser } from "auth/lib";
import { AdvertiserForm, initialAdvertiserForm } from "auth/components/types";
import { useHistory } from "react-router-dom";
import { PaymentType } from "graphql/types";
import { AdvertiserAgreed } from "auth/components/AdvertiserAgreed";
import { FormikSubmitButton } from "form/FormikButton";
import { AdvertiserSchema } from "validation/AdvertiserSchema";
import { useState } from "react";
import _ from "lodash";

export function AdvertiserDetailsForm() {
  const history = useHistory();
  const { advertiser } = useAdvertiser();
  const { setSessionUser } = useAuthContext();
  const requiresPaymentAgree =
    advertiser.selfServiceManageCampaign &&
    advertiser.selfServicePaymentType !== PaymentType.Netsuite;
  const [initial, setInitial] = useState<AdvertiserForm>(
    initialAdvertiserForm(!requiresPaymentAgree),
  );

  const [mutation] = useUpdateAdvertiserMutation({
    async onCompleted() {
      const user = await getUser();
      setSessionUser(user);
      history.push("/user/main");
    },
  });

  const { data, loading } = useAdvertiserBillingAddressQuery({
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
              updateAdvertiserInput: {
                id: advertiser.id,
                agreed: v.terms && v.tracking && v.payment,
                billingAddress: v.address.id
                  ? undefined
                  : _.omit(v.address, ["id"]),
              },
            },
          });
          setSubmitting(false);
        }}
        validationSchema={AdvertiserSchema}
      >
        <Form>
          <Box display="flex" flexDirection="column">
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
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="h4">
                    Welcome to Brave Ads, <strong>{advertiser.name}</strong>
                  </Typography>
                  <Typography variant="subtitle1">
                    Prior to using the dashboard, please take a moment to
                    complete your profile and review the following
                    acknowledgements:
                  </Typography>
                </Stack>

                {!data?.advertiser?.billingAddress && (
                  <>
                    <Divider sx={{ mt: 1, mb: 1 }} />

                    <AdvertiserAddress />
                  </>
                )}

                <Divider sx={{ mt: 1, mb: 1 }} />

                <AdvertiserAgreed requiresPaymentAgree={requiresPaymentAgree} />
              </Card>
            )}
            <Box alignSelf="flex-end">
              <FormikSubmitButton isCreate={false} label="Access dashboard" />
            </Box>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
}
