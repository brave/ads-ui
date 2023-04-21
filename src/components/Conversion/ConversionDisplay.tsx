import { Conversion } from "user/views/adsManager/types";
import { CustomListItemText } from "../List/CustomListItemText";
import React from "react";
import { ConversionError } from "./ConversionError";
import { List } from "@mui/material";
import { FormikErrors } from "formik";

interface Props {
  conversions: Conversion[];
  hasErrors: boolean;
  convErrors?: FormikErrors<Conversion>[] | string[] | string;
}

export function ConversionDisplay({
  conversions,
  hasErrors,
  convErrors,
}: Props) {
  const display = (c: Conversion) => {
    return (
      <List>
        <CustomListItemText primary="Type" secondary={c.type} />
        <CustomListItemText
          primary="Window"
          secondary={`${c.observationWindow} days`}
        />
        <CustomListItemText primary="URL" secondary={c.urlPattern} />
      </List>
    );
  };

  return (
    <>
      {conversions.length === 0 ? (
        <CustomListItemText
          primary="Conversion"
          secondary="No conversion metrics set"
        />
      ) : (
        <>
          {conversions.map((c, idx) => (
            <CustomListItemText
              primary="Conversion"
              secondary={display(c)}
              error={
                hasErrors && convErrors?.[idx] ? (
                  <ConversionError errors={convErrors?.[idx]} />
                ) : undefined
              }
            />
          ))}
        </>
      )}
    </>
  );
}
