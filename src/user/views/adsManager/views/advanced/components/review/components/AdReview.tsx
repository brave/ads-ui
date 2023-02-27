import { AdSetForm, Creative } from "../../../../../types";
import { Box, List, Stack, Typography } from "@mui/material";
import { CustomListItemText } from "../../../../../../../../components/List/CustomListItemText";
import React from "react";
import { FormikErrors } from "formik";

interface Props {
  ad: Creative;
  adIdx: number;
  error?: string | FormikErrors<Creative>;
}

export function AdReview({ ad, adIdx, error }: Props) {
  const hasError = !!error;
  console.log(error);
  const adError = error as FormikErrors<Creative>;
  console.log(adError);

  return (
    <>
      <Typography variant="h6">Ad {adIdx + 1}</Typography>
      <List>
        <CustomListItemText
          primary="Creative Name"
          secondary={ad.name}
          error={hasError ? adError.name : ""}
        />
        <CustomListItemText
          primary="Creative Type"
          secondary="Notification Ad"
        />
        <CustomListItemText
          primary="Title"
          secondary={ad.title}
          error={hasError ? adError.title : ""}
        />
        <CustomListItemText
          primary="Body"
          secondary={ad.body}
          error={hasError ? adError.body : ""}
        />
        <CustomListItemText
          primary="Target Url"
          secondary={ad.targetUrl}
          error={hasError ? adError.targetUrl : ""}
        />
        <CustomListItemText
          error={
            hasError ? (
              <Stack display="flex" flexDirection="column" spacing={1}>
                {adError.targetUrlValid?.split("#").map((e) => (
                  <Box>{e}</Box>
                ))}
              </Stack>
            ) : (
              <></>
            )
          }
        />
      </List>
    </>
  );
}
