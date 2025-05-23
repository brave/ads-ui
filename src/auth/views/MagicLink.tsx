import { useState } from "react";

import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGetLink } from "@/auth/hooks/mutations/useGetLink";
import { AuthContainer } from "@/auth/views/components/AuthContainer";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export default function MagicLink() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Magic Link Login",
  });
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);
  const { _ } = useLingui();

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
          <Trans>A login email is on the way</Trans>
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          <Trans>
            Click on the secure login link in the email to access your Brave Ads
            account.
          </Trans>
        </Typography>
        <Typography variant="subtitle1">
          <Trans>Don&rsquo;t see the email?</Trans>
        </Typography>
        <Typography variant="subtitle2">
          <Trans>
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
          </Trans>
        </Typography>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Typography sx={{ textAlign: "center", mb: 3 }} variant="subtitle1">
        <Trans>
          Enter your email address to get a secure login link. Use this link to
          access your Brave Ads account.
        </Trans>
      </Typography>

      <TextField
        sx={{ mb: 1 }}
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={_(msg`Email`)}
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
        <Trans>Get login link</Trans>
      </Button>

      <Link
        underline="none"
        sx={{ mt: 1 }}
        component={RouterLink}
        to="/auth/signin"
        replace
      >
        <Trans>or sign in using a password</Trans>
      </Link>
    </AuthContainer>
  );
}
