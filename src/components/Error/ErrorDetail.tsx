import { ApolloError } from "@apollo/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  error?: any;
  additionalDetails?: string;
}

export const ErrorDetail: React.FC<Props> = ({ error, additionalDetails }) => {
  if (!error) {
    return null;
  }

  // helpful shortcut - if it's a 401, you'll just need to login again
  if (
    error instanceof ApolloError &&
    error.networkError &&
    "statusCode" in error.networkError &&
    error.networkError.statusCode === 401
  ) {
    return (
      <Box mt={2}>
        <Alert severity="warning">
          <AlertTitle>401 Forbidden</AlertTitle>A forbidden error was returned.
          You may need to log out and back in again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Alert severity="error">
        <AlertTitle>Something went wrong.</AlertTitle>
        <p>An error has occurred while processing your request.</p>
        <p>Please try again, or contact our operations team for assistance.</p>
      </Alert>

      {additionalDetails && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Additional Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ overflow: "scroll" }}>{additionalDetails}</pre>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
