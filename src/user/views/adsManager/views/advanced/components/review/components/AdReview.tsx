import { Creative } from "../../../../../types";
import { Box, Typography } from "@mui/material";
import { FormikErrors } from "formik";
import { DisplayError, ReviewField } from "./ReviewField";

interface Props {
  ad: Creative;
  adIdx: number;
  error?: string | FormikErrors<Creative>;
}

export function AdReview({ ad, adIdx, error }: Props) {
  const adError = error as FormikErrors<Creative> | undefined;

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Ad {adIdx + 1}
      </Typography>
      <ReviewField caption="Ad Name" value={ad.name} error={adError?.name} />
      <ReviewField caption="Ad Type" value="Notification Ad" />
      <ReviewField caption="Ad Title" value={ad.title} error={adError?.title} />
      <ReviewField caption="Ad Body" value={ad.body} error={adError?.body} />
      <ReviewField
        caption="Ad Target Url"
        value={ad.targetUrl}
        error={adError?.targetUrl}
      />

      {adError?.targetUrlValidationResult?.split("#").map((e, idx) => (
        <Box key={`error-${idx}`}>
          <DisplayError error={e} />
        </Box>
      ))}
    </>
  );
}
