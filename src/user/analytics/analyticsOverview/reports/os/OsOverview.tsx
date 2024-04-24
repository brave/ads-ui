import { Box, Stack } from "@mui/material";
import { EngagementFragment } from "@/graphql/analytics-overview.generated";
import { mapOsStats, processOs } from "../../lib/os.library";
import { OsPieChart } from "./components/OsPieChart";
import { OsBarChart } from "./components/OsBarChart";

interface Props {
  engagements: EngagementFragment[];
}

export function OsOverview({ engagements }: Props) {
  const os = processOs(engagements);
  const calculated = mapOsStats(os);

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
        />
      </Box>
    </Stack>
  );
}
