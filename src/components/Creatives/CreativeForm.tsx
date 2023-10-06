import { Box, Container, LinearProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { CardContainer } from "components/Card/CardContainer";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CreativeSchema } from "validation/CreativeSchema";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { CreativeType } from "components/Creatives/CreativeType";
import { NotificationAd } from "user/ads/NotificationAd";
import { InlineContentAd } from "user/ads/InlineContentAd";
import { SubmitPanel } from "components/Button/SubmitPanel";
import { useGetCreativeDetails } from "components/Creatives/hooks/useGetCreativeDetails";
import { useSubmitCreative } from "components/Creatives/hooks/useSubmitCreative";
import CreativeCampaigns from "components/Creatives/CreativeCampaigns";
import { useCampaignsForCreativeQuery } from "graphql/creative.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CreativeInput } from "graphql/types";
import { CampaignFragment } from "graphql/campaign.generated";
import _ from "lodash";

interface Params {
  id: string;
}

export function CreativeForm() {
  const { advertiser } = useAdvertiser();
  const { id } = useParams<Params>();
  const isNew = id === "new";
  const { data, loading, error: getError } = useGetCreativeDetails({ id });

  const { submit, error: submitError } = useSubmitCreative({ id });

  const {
    data: campaigns,
    loading: cLoading,
    error: cError,
  } = useCampaignsForCreativeQuery({
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
        additionalDetails="Unable to load creative"
      />
    );
  }

  return (
    <MiniSideBar>
      <Container maxWidth="xl">
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={submit}
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
                <CardContainer
                  header={`${isNew ? "New" : "Edit"} creative`}
                  sx={{ flexGrow: 1 }}
                >
                  <CreativeType allowTypeChange={id === "new"} />
                </CardContainer>

                <ErrorDetail
                  error={submitError}
                  additionalDetails="Unable to save creative"
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
  if (creativeType === "notification_all_v1")
    return <NotificationAd useCustomButton />;
  if (creativeType === "inline_content_all_v1")
    return <InlineContentAd useCustomButton />;

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

  let message =
    "Modifying a creative will immediately put it into review. This means it will no longer be shown to users until it is approved";
  if (campaignLength > 1) {
    message = `${message}. This creative is also shared across ${campaignLength} campaigns. Any modifications made will be effective for all campaigns using this creative.`;
  }

  const useDialogue =
    creative.state !== "draft" && campaigns.some((c) => c.state !== "draft");
  return {
    useDialog: useDialogue,
    dialogTitle: `Are you sure you want to modify "${creative.name}"?`,
    dialogMessage: message,
  };
};
