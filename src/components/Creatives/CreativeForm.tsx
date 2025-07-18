import { Box, Container, LinearProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { CardContainer } from "@/components/Card/CardContainer";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { CreativeSchema } from "@/validation/CreativeSchema";
import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { CreativeType } from "@/components/Creatives/CreativeType";
import { NotificationAd } from "@/user/ads/NotificationAd";
import { SubmitPanel } from "@/components/Button/SubmitPanel";
import { useGetCreativeDetails } from "@/components/Creatives/hooks/useGetCreativeDetails";
import { useSubmitCreative } from "@/components/Creatives/hooks/useSubmitCreative";
import CreativeCampaigns from "@/components/Creatives/CreativeCampaigns";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import {
  CampaignFragment,
  CampaignsForCreativeDocument,
  CreativeInput,
} from "@/graphql-client/graphql";
import _ from "lodash";
import { isReviewableState } from "@/util/displayState";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useQuery } from "@apollo/client";

interface Params {
  id: string;
}

export function CreativeForm() {
  const { advertiser } = useAdvertiser();
  const { id } = useParams<Params>();
  const isNew = id === "new";
  useTrackMatomoPageView({
    documentTitle: `${isNew ? "New" : "Existing"} Creative Form`,
  });
  const { data, loading, error: getError } = useGetCreativeDetails({ id });

  const { submit, error: submitError } = useSubmitCreative({ id });

  const {
    data: campaigns,
    loading: cLoading,
    error: cError,
  } = useQuery(CampaignsForCreativeDocument, {
    variables: { creativeId: id, advertiserId: advertiser.id },
    skip: id === "new",
  });

  if (loading || !data) {
    return <LinearProgress />;
  }

  if (getError) {
    return (
      <ErrorDetail
        error={getError}
        additionalDetails={msg`Unable to load ad`}
      />
    );
  }

  return (
    <MiniSideBar>
      <Container maxWidth="xl">
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(values, { setSubmitting }) => {
            void submit(values, setSubmitting);
          }}
          validationSchema={CreativeSchema()}
        >
          {({ values }) => (
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                flexWrap="wrap"
              >
                <CardContainer
                  header={
                    isNew ? <Trans>Create ad</Trans> : <Trans>Edit ad</Trans>
                  }
                  sx={{ flexGrow: 1 }}
                >
                  <CreativeType allowTypeChange={id === "new"} />
                </CardContainer>

                <ErrorDetail
                  error={submitError}
                  additionalDetails={msg`Unable to save ad`}
                />

                <CreativeCampaigns
                  data={campaigns}
                  error={cError}
                  loading={cLoading}
                />

                <CreativeTypeSpecificFields creativeType={values.type.code} />

                <SubmitPanel
                  isCreate={isNew}
                  {...dialogProps(values, campaigns?.creativeCampaigns)}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </MiniSideBar>
  );
}

const CreativeTypeSpecificFields = ({
  creativeType,
}: {
  creativeType?: string;
}) => {
  if (creativeType === "notification_all_v1") return <NotificationAd />;

  return null;
};

const dialogProps = (
  creative: CreativeInput,
  creativeCampaigns?: Partial<CampaignFragment>[],
) => {
  if (_.isEmpty(creativeCampaigns)) {
    return { useDialog: false };
  }
  const campaigns = creativeCampaigns ?? [];
  const campaignLength = campaigns.length;

  let message = msg`Modifying an ad will immediately put it into review. This means it will no longer be shown to users until it is approved.`;
  if (campaignLength > 1) {
    message = msg`Modifying an ad will immediately put it into review. This means it will no longer be shown to users until it is approved. This ad is also shared across ${campaignLength} campaigns. Any modifications made will be effective for all campaigns using this creative.`;
  }

  const creativeName = creative.name;
  const hasDialog =
    !isReviewableState(creative.state) &&
    campaigns.some((c) => !isReviewableState(c.state));
  return {
    hasDialog,
    dialogTitle: msg`Are you sure you want to modify "${creativeName}"?`,
    dialogMessage: message,
  };
};
