import React, { useState } from "react";

import { Alert, Link, Stack, TextField, Typography } from "@mui/material";
import { useGetLink } from "auth/hooks/mutations/useGetLink";
import { LoadingButton } from "@mui/lab";
import { AuthContainer } from "auth/views/components/AuthContainer";
import { useHistory } from "react-router-dom";

export function MagicLink() {
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);
  const history = useHistory();

  const { link, loading, error } = useGetLink({
    onSuccess() {
      setRequested(true);
    },
  });

  if (requested) {
    return (
      <AuthContainer height="400px">
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
            }}
          >
            try again.
          </Link>
        </Stack>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer height="400px">
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder="Enter your email"
        error={!!error}
        helperText={error}
      />
      <Typography sx={{ textAlign: "center", mb: 1 }}>
        Enter your email address to get a secure login link. Use this link to
        access your brave Ads account.
      </Typography>

      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, textTransform: "none", mb: 1 }}
        disabled={loading}
        loading={loading}
        onClick={() => {
          link(email);
        }}
      >
        Get login link
      </LoadingButton>

      {!requested && (
        <Link
          underline="none"
          sx={{ mt: 1, cursor: "pointer" }}
          onClick={() => history.replace("/auth/signin")}
        >
          or log in in using a password
        </Link>
      )}
    </AuthContainer>
  );
}
