import { Box, Stack } from "@mui/material";
import React from "react";
import { EngagementFragment } from "../../../../../graphql/analytics-overview.generated";
import { mapOsStats, processOs } from "../../lib/os.library";
import { OsPieChart } from "./components/OsPieChart";
import { OsBarChart } from "./components/OsBarChart";
import { CampaignFragment } from "../../../../../graphql/campaign.generated";
import { CampaignFormat } from "../../../../../graphql/types";

interface Props {
  engagements: EngagementFragment[];
  campaign: CampaignFragment;
}

export function OsOverview({ engagements, campaign }: Props) {
  const os = processOs(engagements);
  const calculated = mapOsStats(os);
  const isNtp = campaign.format === CampaignFormat.NtpSi;

  return (
    <Stack
      display="flex"
      justifyContent="space-evenly"
      direction="row"
      spacing={1}
    >
      <Box width="50%">
        <OsPieChart
          view={os.view}
          conversion={os.conversion}
          click={os.click}
          landed={os.landed}
          dismiss={os.dismiss}
          spend={os.spend}
          isNtp={isNtp}
        />
      </Box>
      <Box width="50%">
        <OsBarChart
          ctr={calculated.ctr}
          cpa={calculated.cpa}
          landingRate={calculated.landingRate}
          visitRate={calculated.visitRate}
          convRate={calculated.convRate}
          dismissRate={calculated.dismissRate}
          isNtp={isNtp}
        />
      </Box>
    </Stack>
  );
}
