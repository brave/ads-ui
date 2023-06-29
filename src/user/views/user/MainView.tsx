import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { AdSetList } from "user/adSet/AdSetList";
import { AdList } from "user/ads/AdList";
import DatasetIcon from "@mui/icons-material/Dataset";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export function CampaignDetails() {
  const [tabValue, setTabValue] = useState(
    Number(window.localStorage.getItem("tabValue") ?? 0)
  );

  const tabs = [
    { label: "Ad Sets", icon: <DatasetIcon /> },
    { label: "Ads", icon: <LibraryBooksIcon /> },
  ];

  return (
    <></>
    // <Box width="100%" sx={{ mt: 1 }} bgcolor="#fff">
    //   <Box border="1px solid #ededed">
    //     <Tabs
    //       value={tabValue}
    //       variant="fullWidth"
    //       onChange={(e, nv) => {
    //         setTabValue(nv);
    //         window.localStorage.setItem("tabValue", nv);
    //       }}
    //     >
    //       {tabs.map((t, idx) => (
    //         <Tab
    //           key={t.label}
    //           value={idx}
    //           label={t.label}
    //           icon={t.icon}
    //           iconPosition="end"
    //           sx={{
    //             flexGrow: 1,
    //             borderBottom: "1px solid #ededed",
    //             borderLeft: idx !== tabs.length ? "1px solid #ededed" : "none",
    //           }}
    //           disabled={loading}
    //         />
    //       ))}
    //     </Tabs>
    //
    //     {!loading ? (
    //       <Box display="flex" flexDirection="column" mt={1}>
    //         {tabValue === 0 && (
    //           <AdSetList
    //             advertiserCampaigns={data?.advertiserCampaigns}
    //             fromDate={fromDateFilter}
    //           />
    //         )}
    //
    //         {tabValue === 1 && (
    //           <AdList
    //             advertiserCampaigns={data?.advertiserCampaigns}
    //             fromDate={fromDateFilter}
    //           />
    //         )}
    //       </Box>
    //     ) : (
    //       <Box m={3}>
    //         <Skeleton variant="rounded" height={500} />
    //       </Box>
    //     )}
    //   </Box>
    // </Box>
  );
}
