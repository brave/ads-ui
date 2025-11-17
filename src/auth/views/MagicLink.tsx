import { useState } from "react";

import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGetLink } from "@/auth/hooks/mutations/useGetLink";
import { AuthContainer } from "@/auth/views/components/AuthContainer";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";

export default function MagicLink() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Magic Link Login",
  });
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);

  const { requestLink, loading, error } = useGetLink({
    onSuccess() {
      trackMatomoEvent("magic-link", "requested");
      setRequested(true);
    },
    onError() {
      trackMatomoEvent("magic-link", "request-failed");
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
        <Typography variant="subtitle1">Don&rsquo;t see the email?</Typography>
        <Typography variant="subtitle2">
          Check your spam folder or{" "}
          <Link
            sx={{ cursor: "pointer" }}
            variant="inherit"
            onClick={() => {
              setRequested(false);
            }}
          >
            return to the login page
          </Link>{" "}
          to try again.
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
        label={"Email"}
        error={!!error}
        helperText={error}
      />

      <Button
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, mb: 1 }}
        disabled={loading}
        loading={loading}
        onClick={() => {
          requestLink(email);
        }}
      >
        Get login link
      </Button>

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
