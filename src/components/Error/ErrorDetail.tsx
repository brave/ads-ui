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
import { VERSION } from "util/version";
import { MessageDescriptor } from "@lingui/core";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface Props {
  error?: any;
  additionalDetails?: MessageDescriptor;
}

export const ErrorDetail = ({ error, additionalDetails }: Props) => {
  const { _ } = useLingui();
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
          <AlertTitle>
            <Trans>401 Forbidden</Trans>
          </AlertTitle>
          <Trans>
            A forbidden error was returned. You may need to log out and back in
            again.
          </Trans>
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
        <AlertTitle>
          <Trans>Something went wrong.</Trans>
        </AlertTitle>
        <p>
          <Trans>An error has occurred while processing your request.</Trans>
        </p>
        <p>
          <Trans>
            Please refresh the page to try again, or email <SelfServeMailTo />{" "}
            for assistance.
          </Trans>
        </p>
      </Alert>

      {additionalDetails && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <Trans>Additional Details</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ overflow: "scroll" }}>{_(additionalDetails)}</pre>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

const SelfServeMailTo = () => (
  // eslint-disable-next-line lingui/no-unlocalized-strings
  <a href="mailto:selfserve@brave.com">selfserve@brave.com</a>
);
