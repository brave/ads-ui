import { Creative } from "../../../../../types";
import { Box, List, Stack, Typography } from "@mui/material";
import { CustomListItemText } from "components/List/CustomListItemText";
import React from "react";
import { FormikErrors } from "formik";

interface Props {
  ad: Creative;
  adIdx: number;
  error?: string | FormikErrors<Creative>;
}

export function AdReview({ ad, adIdx, error }: Props) {
  const hasError = !!error;
  const adError = error as FormikErrors<Creative>;

  return (
    <>
      <Typography variant="h6">Ad {adIdx + 1}</Typography>
      <List>
        <CustomListItemText
          primary="Ad Name"
          secondary={ad.name}
          error={hasError ? adError.name : ""}
        />
        <CustomListItemText primary="Ad Type" secondary="Notification Ad" />
        <CustomListItemText
          primary="Ad Title"
          secondary={ad.title}
          error={hasError ? adError.title : ""}
        />
        <CustomListItemText
          primary="Ad Body"
          secondary={ad.body}
          error={hasError ? adError.body : ""}
        />
        <CustomListItemText
          primary="Ad Target Url"
          secondary={ad.targetUrl}
          error={hasError ? adError.targetUrl : ""}
        />
        <CustomListItemText
          error={
            hasError && adError.targetUrlValidationResult ? (
              <Stack display="flex" flexDirection="column" spacing={1}>
                {adError.targetUrlValidationResult?.split("#").map((e) => (
                  <Box>{e}</Box>
                ))}
              </Stack>
            ) : undefined
          }
        />
      </List>
    </>
  );
}
