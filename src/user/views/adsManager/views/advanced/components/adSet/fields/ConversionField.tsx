import { Divider, Typography } from "@mui/material";
import { ConversionFields } from "../../../../../../../../components/Conversion/ConversionFields";
import React from "react";

interface Props {
  index: number;
}

export function ConversionField({ index }: Props) {
  return (
    <>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 3 }}>
        Conversion
      </Divider>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Define post-engagement analytics.
      </Typography>
      <ConversionFields idx={index} />
    </>
  );
}
