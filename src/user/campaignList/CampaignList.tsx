import React from "react";
import {useAdvertiserCampaignsQuery} from "../../graphql/advertiser.generated";
import { EnhancedTable, StandardRenderers } from "../../components/EnhancedTable";
import {IconButton, LinearProgress, Link} from "@mui/material";
import {renderMonetaryAmount} from "../../components/EnhancedTable/renderers";
import EditIcon from '@mui/icons-material/Edit';
import {useHistory} from "react-router-dom";
import {CampaignStatus} from "../../components/Campaigns/CampaignStatus";

interface Props {
  userId: string;
  advertiserId: string;
}

function CampaignList({ advertiserId }: Props) {
  const {loading, data} = useAdvertiserCampaignsQuery({
    variables: {id: advertiserId}
  });
  const history = useHistory();

  const EDIT_CAMPAIGN_ADVERTISER_ALLOW_LIST = [
    '84f72479-ede2-4b74-8ca4-11f3c0b276ba',
    '8cfac071-75f8-46ab-9c7f-4f8420d914d7',
    '8fc27541-4933-447b-93eb-50b4e4714fbb',
  ];

  const canEdit = process.env.REACT_APP_ENABLE_FEATURES === "true" || EDIT_CAMPAIGN_ADVERTISER_ALLOW_LIST.includes(advertiserId);

  if (loading) return <LinearProgress/>;

  return (
    <EnhancedTable
      rows={data?.advertiser?.campaigns}
      columns={[
        {
          title: "Campaign",
          value: (c) => c.name,
          extendedRenderer: (r) => (
            <Link
              href={r.state !== "under_review" ? `/user/main/campaign/${r.id}/analytics/overview` : undefined}
              underline="none"
            >
              {r.name}
            </Link>
          )
        },
        {
          title: "Status",
          value: (c) => c.state,
          extendedRenderer: (r) => <CampaignStatus campaign={{ state: r.state, endAt: r.endAt }} />
        },
        {
          title: "Budget",
          value: (c) => c.budget,
          extendedRenderer: (r) =>
            renderMonetaryAmount(r.budget, r.currency),
        },
        {
          title: "Spend",
          value: (c) => c.spent,
          extendedRenderer: (r) =>
            renderMonetaryAmount(r.spent, r.currency),
        },
        {
          title: "Start",
          value: (c) => c.startAt,
          renderer: StandardRenderers.date,
        },
        {
          title: "End",
          value: (c) => c.endAt,
          renderer: StandardRenderers.date,
        },
        {
          title: "",
          value: (c) => "",
          extendedRenderer: (r) => (
            <>
              {canEdit ? (
                <IconButton onClick={() => history.push(`/user/main/adsmanager/advanced/${r.id}`)}>
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </>
          )
        }
      ]}
    />
  );
}


export default CampaignList;
