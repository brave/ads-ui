import { Alert, AlertTitle } from "@mui/material";

/* eslint-disable lingui/no-unlocalized-strings */

export function NoPreviewAvailable() {
  return (
    <Alert severity="error">
      <AlertTitle>No Results</AlertTitle>
      Please check the URL is correct
    </Alert>
  );
}
