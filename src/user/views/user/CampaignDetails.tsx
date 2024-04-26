import { useState } from "react";
import DatasetIcon from "@mui/icons-material/Dataset";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useParams } from "react-router-dom";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import { AdSetList } from "@/user/adSet/AdSetList";
import { AdList } from "@/user/ads/AdList";
import { adEngagements } from "@/user/analytics/analyticsOverview/lib/ads.library";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  EngagementFragment,
  LoadCampaignAdsDocument,
} from "@/graphql-client/graphql";
import { useQuery } from "@apollo/client";

interface Params {
  campaignId: string;
}

interface Props {
  engagementLoading: boolean;
  engagements: EngagementFragment[];
}

export function CampaignDetails({ engagements, engagementLoading }: Props) {
  const params = useParams<Params>();
  const { _ } = useLingui();
  const { data, loading, error } = useQuery(LoadCampaignAdsDocument, {
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [tabValue, setTabValue] = useState(
    Number(window.localStorage.getItem("tabValue") ?? 0),
  );

  const tabs = [
    { label: _(msg`Ad sets`), icon: <DatasetIcon /> },
    { label: _(msg`Ads`), icon: <LibraryBooksIcon /> },
  ];

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to retrieve ad sets or ads for Campaign.`}
      />
    );
  }

  return (
    <Box sx={{ borderRadius: "12px" }} bgcolor="#fff">
      <Tabs
        value={tabValue}
        variant="fullWidth"
        onChange={(e, nv) => {
          setTabValue(nv);
          window.localStorage.setItem("tabValue", nv);
        }}
      >
        {tabs.map((t, idx) => (
          <Tab
            key={t.label}
            value={idx}
            label={t.label}
            icon={t.icon}
            iconPosition="end"
            sx={{
              flexGrow: 1,
              borderRadius: "12px",
            }}
            disabled={loading}
          />
        ))}
      </Tabs>

      {!loading ? (
        <Box display="flex" flexDirection="column" mt={1}>
          {tabValue === 0 && (
            <AdSetList
              engagements={adEngagements(engagements, "creativeset")}
              loading={loading || engagementLoading}
              campaign={data?.campaign}
            />
          )}

          {tabValue === 1 && (
            <AdList
              campaign={data?.campaign}
              engagements={adEngagements(engagements, "creativeinstance")}
              loading={loading || engagementLoading}
            />
          )}
        </Box>
      ) : (
        <Box p={3}>
          <Skeleton variant="rounded" height={300} />
        </Box>
      )}
    </Box>
  );
}
