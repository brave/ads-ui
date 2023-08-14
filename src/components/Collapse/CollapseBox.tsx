import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PropsWithChildren } from "react";

interface Props {
  header: string;
}

export function CollapseBox({ header, children }: Props & PropsWithChildren) {
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
