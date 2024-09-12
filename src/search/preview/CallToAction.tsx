/* eslint-disable lingui/no-unlocalized-strings */
import { Box, Button, Link, Typography } from "@mui/material";

interface Props {
  domain: string;
  hideBookMeeting: boolean;
}

export function CallToAction({ domain, hideBookMeeting }: Props) {
  return (
    <Box
      marginBottom={1}
      padding={2}
      display="flex"
      gap={1}
      alignItems="center"
      bgcolor="#F7F9FF"
      borderRadius="12px"
    >
      <Box flex={1}>
        <Typography variant="h2" marginBottom={2}>
          Brave Search Ads Preview
        </Typography>
        <Typography variant="body2" marginBottom={2}>
          This preview has been created for{" "}
          <Link
            href={`https://${domain}/`}
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            {domain}
          </Link>{" "}
          by analyzing existing Google campaigns and matching them with keyword
          volumes from Brave Search.
        </Typography>
        {!hideBookMeeting && (
          <Typography variant="body2" marginBottom={2}>
            To view and manage all available ads and get started with Search Ads
            from Brave, please book a meeting with an account manager.
          </Typography>
        )}
      </Box>

      {!hideBookMeeting && (
        <Box minWidth="100px">
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2sEAG3kPSlTKpGd48pYAa2zTd-QpI2L2ewxao="
            target="_blank"
            rel="noreferrer"
          >
            Book a Meeting
          </Button>
        </Box>
      )}
    </Box>
  );
}
