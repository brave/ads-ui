import { Conversion } from "../../user/views/adsManager/types";
import { List } from "@mui/material";
import { CustomListItemText } from "../List/CustomListItemText";
import React from "react";

interface Props {
  conversion: Conversion;
}

export default function ConversionDisplay({ conversion }: Props) {
  const isEmpty =
    conversion.type === "" &&
    conversion.urlPattern === "" &&
    conversion.observationWindow <= 0;
  if (isEmpty) {
    return <>No conversion metric set.</>;
  }

  return (
    <List>
      <CustomListItemText primary="Type" secondary={conversion.type} />
      <CustomListItemText
        primary="Window"
        secondary={`${conversion.observationWindow} days`}
      />
      <CustomListItemText primary="URL" secondary={conversion.urlPattern} />
    </List>
  );
}
