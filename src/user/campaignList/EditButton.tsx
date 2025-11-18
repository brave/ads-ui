import {
  CampaignFormat,
  CampaignSource,
  CampaignSummaryFragment,
} from "@/graphql-client/graphql";
import { Button, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = (props: {
  campaign?: CampaignSummaryFragment;
  disabled: boolean;
}) => {
  const { campaign, disabled } = props;
  const canEdit =
    campaign &&
    campaign.source === CampaignSource.SelfServe &&
    campaign.format === CampaignFormat.PushNotification &&
    campaign.state !== "completed";
  const campaignName = campaign?.name;

  return (
    <Tooltip
      title={!campaign ? "Select one campaign to edit" : `Edit ${campaignName}`}
    >
      <span>
        <Button
          color="primary"
          variant="text"
          size="small"
          component={RouterLink}
          to={`/user/main/adsmanager/advanced/${campaign?.id}/settings`}
          disabled={!canEdit || disabled}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </span>
    </Tooltip>
  );
};
