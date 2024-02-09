import { useState } from "react";

import { Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGetLink } from "auth/hooks/mutations/useGetLink";
import { LoadingButton } from "@mui/lab";
import { AuthContainer } from "auth/views/components/AuthContainer";

export function MagicLink() {
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);

  const { requestLink, loading, error } = useGetLink({
    onSuccess() {
      setRequested(true);
    },
  });

  if (requested) {
    return (
      <AuthContainer>
        <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
          A login email is on the way
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Click on the secure login link in the email to access your Brave Ads
          account.
        </Typography>
        <Typography variant="subtitle1">
          Don&rsquo;t see the email? Check your spam folder or{" "}
          <Link
            sx={{ cursor: "pointer" }}
            variant="inherit"
            onClick={() => {
              setRequested(false);
            }}
          >
            try again.
          </Link>
        </Typography>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Typography sx={{ textAlign: "center", mb: 3 }} variant="subtitle1">
        Enter your email address to get a secure login link. Use this link to
        access your Brave Ads account.
      </Typography>

      <TextField
        sx={{ mb: 1 }}
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder="Enter your email"
        error={!!error}
        helperText={error}
      />

      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, mb: 1 }}
        disabled={loading}
        loading={loading}
        onClick={() => {
          void requestLink(email);
        }}
      >
        Get login link
      </LoadingButton>

      <Link
        underline="none"
        sx={{ mt: 1 }}
        component={RouterLink}
        to="/auth/signin"
        replace
      >
        or sign in using a password
      </Link>
    </AuthContainer>
  );
}
