import React, { useState } from "react";

import { Link, Stack, TextField, Typography } from "@mui/material";
import { useGetLink } from "auth/hooks/mutations/useGetLink";
import { LoadingButton } from "@mui/lab";

interface Props {
  onError?: (e: string) => void;
  onClick?: () => void;
}

export function RequestLink({ onError, onClick }: Props) {
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);

  const { link, loading: linkLoading } = useGetLink({
    onSuccess() {
      setRequested(true);
      if (onClick) {
        onClick();
      }
    },
    onError(msg) {
      if (onError) {
        onError(msg);
      }
    },
  });

  if (requested) {
    return (
      <>
        <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
          A login email is on the way
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Click on the secure login link in the email to access your brave Ads
          account.
        </Typography>
        <Stack direction="row" spacing={0.75}>
          <Typography variant="subtitle1">
            Don't see the email? Check your spam folder or
          </Typography>
          <Link
            sx={{ cursor: "pointer" }}
            variant="subtitle1"
            onClick={() => {
              setRequested(false);
              if (onClick) {
                onClick();
              }
            }}
          >
            try again.
          </Link>
        </Stack>
      </>
    );
  }

  return (
    <>
      <TextField
        sx={{ mb: 4 }}
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder="Enter your email"
      />
      <Typography sx={{ textAlign: "center" }}>
        Enter your email address to get a secure login link. Use this link to
        access your brave Ads account.
      </Typography>
      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 4, textTransform: "none", mb: 1 }}
        disabled={linkLoading}
        loading={linkLoading}
        onClick={() => {
          link(email);
        }}
      >
        Get login link
      </LoadingButton>
    </>
  );
}
