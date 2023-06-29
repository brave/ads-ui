import React, { useState } from "react";
import DatasetIcon from "@mui/icons-material/Dataset";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  useLoadCampaignAdsQuery,
  useLoadCampaignQuery,
} from "graphql/campaign.generated";
import { useParams } from "react-router-dom";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import { AdSetList } from "user/adSet/AdSetList";
import { AdList } from "user/ads/AdList";

interface Params {
  campaignId: string;
}

export function CampaignDetails() {
  const params = useParams<Params>();
  const { data, loading, error } = useLoadCampaignAdsQuery({
    variables: { id: params.campaignId },
    fetchPolicy: "cache-and-network",
  });

  const [tabValue, setTabValue] = useState(
    Number(window.localStorage.getItem("tabValue") ?? 0)
  );

  const tabs = [
    { label: "Ad Sets", icon: <DatasetIcon /> },
    { label: "Ads", icon: <LibraryBooksIcon /> },
  ];

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve AdSets or Ads for Campaign."
      />
    );
  }

  return (
    <Box width="100%" sx={{ mt: 5, borderRadius: "12px" }} bgcolor="#fff">
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
          {tabValue === 0 && <AdSetList campaign={data?.campaign} />}

          {tabValue === 1 && <AdList campaign={data?.campaign} />}
        </Box>
      ) : (
        <Box m={3}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      )}
    </Box>
  );
}
