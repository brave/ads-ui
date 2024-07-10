import { ErrorBoundary } from "@/ErrorBoundary";
import { Navbar } from "@/components/Navigation/Navbar";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSearchData } from "./data";
import { SearchPreviewResults } from "./SearchPreviewResults";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { NoPreviewAvailable } from "./NoPreviewAvailable";

/* eslint-disable lingui/no-unlocalized-strings */

export function SearchPreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, data } = useSearchData(slug);
  return (
    <Box display="flex" height="100vh" width="100vw" flexDirection="row">
      <Navbar />
      <Box
        component="main"
        marginTop="64px"
        height="calc(100% - 64px)"
        flex={1}
        overflow="hidden"
        padding={1}
        bgcolor="background.default"
      >
        <ErrorBoundary>
          {data ? (
            <SearchPreviewResults data={data} />
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
