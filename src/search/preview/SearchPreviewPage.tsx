import { ErrorBoundary } from "@/ErrorBoundary";
import { Navbar } from "@/components/Navigation/Navbar";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLandingPageData } from "./data";
import { SearchPreviewResults } from "./SearchPreviewResults";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { NoPreviewAvailable } from "./NoPreviewAvailable";
import { extractOptionsFromUrlSlug } from "./options";

/* eslint-disable lingui/no-unlocalized-strings */

export default function SearchPreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const options = extractOptionsFromUrlSlug(slug);

  const { loading, data } = useLandingPageData(options.slug);
  return (
    <Box display="flex" height="100vh" width="100vw" flexDirection="row">
      <Navbar />
      <Box
        component="main"
        marginTop="72px"
        height="calc(100% - 72px)"
        flex={1}
        overflow="hidden"
        padding={1}
        bgcolor="background.default"
      >
        <ErrorBoundary>
          {data ? (
            <SearchPreviewResults
              data={data}
              hideBookMeeting={options.hideBookMeeting}
              hideEstimates={options.hideEstimates}
            />
          ) : loading ? (
            <FullScreenProgress />
          ) : (
            <NoPreviewAvailable />
          )}
        </ErrorBoundary>
      </Box>
    </Box>
  );
}
