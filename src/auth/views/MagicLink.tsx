import { useState } from "react";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import { useGetLink } from "@/auth/hooks/mutations/useGetLink";
import { LoadingButton } from "@mui/lab";
import { AuthContainer } from "@/auth/views/components/AuthContainer";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { SignInWithGoogle } from "@/auth/components/SignInWithGoogle";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { Redirect, Switch } from "react-router-dom";

export function MagicLink() {
  const isAuthenticated = useIsAuthenticated();
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

  if (isAuthenticated) {
    return (
      <Switch>
        <Redirect to="/user/main" exact={true} />
      </Switch>
    );
  }

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
          <Trans>
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
          </Trans>
        </Typography>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Box display="flex" alignItems="center" flexDirection="column" p={3}>
        <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4">
          <Trans>Sign in to Brave Ads Manager</Trans>
        </Typography>

        <Box p={2}>
          <SignInWithGoogle />
        </Box>

        <Typography m={2}>
          <Trans>or</Trans>
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ mb: 1, maxWidth: 350 }}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={_(msg`Email`)}
            error={!!error}
            helperText={error}
            size="small"
            variant={"standard"}
          />

          <LoadingButton
            color="primary"
            size="small"
            variant="contained"
            sx={{ width: 220 }}
            disabled={loading}
            loading={loading}
            onClick={() => {
              requestLink(email);
            }}
          >
            <Trans>Get login link</Trans>
          </LoadingButton>
        </Stack>
      </Box>
    </AuthContainer>
  );
}
