import {AdSetForm, Creative} from "../../../../../types";
import {List, Typography} from "@mui/material";
import {CustomListItemText} from "../../../../../../../../components/List/CustomListItemText";
import React from "react";
import {FormikErrors} from "formik";

interface Props {
  ad: Creative;
  adIdx: number;
  error?: string | FormikErrors<Creative>;
}

export function AdReview({ ad, adIdx, error }: Props) {
  const adError = error as FormikErrors<Creative>;

  return (
    <>
      <Typography variant="h6">
        Ad { adIdx + 1 }
      </Typography>
      <List>
        <CustomListItemText
          primary="Creative Name"
          secondary={ad.name}
          error={adError.name}
        />
        <CustomListItemText
          primary="Creative Type"
          secondary="Notification Ad"
        />
        <CustomListItemText
          primary="Title"
          secondary={ad.title}
          error={adError.title}
        />
        <CustomListItemText
          primary="Body"
          secondary={ad.body}
          error={adError.body}
        />
        <CustomListItemText
          primary="Target Url"
          secondary={ad.targetUrl}
          error={adError.targetUrl}
        />
      </List>
    </>
  )
}
