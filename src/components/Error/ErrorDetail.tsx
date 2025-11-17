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
import { VERSION } from "@/util/version";

interface Props {
  error?: any;
  additionalDetails?: string;
}

export const ErrorDetail = ({ error, additionalDetails }: Props) => {
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

  const stringError = JSON.stringify(error, undefined, 2);

  const errorDetails = `
URL: ${document.location}
VERSION: ${VERSION.shortHash}
ERROR: ${error.stack ? error.stack : error}
${stringError === "{}" ? "" : stringError}
  `;

  console.error(errorDetails);

  return (
    <Box mt={2}>
      <Alert severity="error">
        <AlertTitle>Something went wrong.</AlertTitle>
        <p>An error has occurred while processing your request.</p>
        <p>
          Please refresh the page to try again, or email <SelfServeMailTo /> for
          assistance.
        </p>
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

const SelfServeMailTo = () => (
  <a href="mailto:selfserve@brave.com">selfserve@brave.com</a>
);
