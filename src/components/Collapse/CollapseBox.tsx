import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { PropsWithChildren, useState } from "react";

interface Props {
  header: string;
}

export function CollapseBox({ header, children }: Props & PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <Box mt={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h2">{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
}
