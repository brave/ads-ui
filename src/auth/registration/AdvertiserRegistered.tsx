import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";

interface Props {
  error?: string;
}

export function AdvertiserRegistered({ error }: Props) {
  return (
    <React.Fragment>
      {!!error ? (
        <Stack direction="column" alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ textAlign: "left", mb: 5 }}>
            We encountered a problem creating your account. Please reach out to
            <Link sx={{ ml: 1 }} href="mailto:selfserve@brave.com">
              selfserve@brave.com
            </Link>{" "}
            or try again.
          </Typography>
          <CancelOutlinedIcon sx={{ fontSize: "100px", mb: 5 }} color="error" />
          <Link
            variant="h5"
            sx={{ textAlign: "center" }}
            underline="none"
            href=""
          >
            Try again
          </Link>
        </Stack>
      ) : (
        <Stack direction="column" alignItems="center">
          <Typography variant="h5" sx={{ mb: 3 }}>
            Success! Our team will now carefully review the provided
            information.
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Once the review process is complete, we will send you an email to
            notify you of the approval status and any further steps required. We
            look forward to progressing our partnership with you and will be in
            touch soon.
          </Typography>
          <VerifiedIcon sx={{ fontSize: "100px", mb: 5 }} color="success" />
        </Stack>
      )}
    </React.Fragment>
  );
}
