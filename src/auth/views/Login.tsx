import { Alert, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useSignIn } from "@/auth/hooks/mutations/useSignIn";
import { AuthContainer } from "@/auth/views/components/AuthContainer";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function Login() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Password Login",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { _ } = useLingui();

  const { signIn, loading, error } = useSignIn({
    onSuccess() {
      trackMatomoEvent("password-login", "success");
      history.replace("/user/main");
    },
    onError() {
      trackMatomoEvent("password-login", "failed");
    },
  });

  return (
    <AuthContainer>
      <Typography
        sx={{ fontFamily: "Poppins", color: "#434251" }}
        variant="subtitle1"
      >
        <Trans>Log into your Brave Ads account</Trans>
      </Typography>
      <TextField
        sx={{ mt: 5, mb: 3 }}
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={_(msg`Email`)}
      />
      <TextField
        fullWidth
        value={password}
        type="password"
        sx={{ mb: 2 }}
        onChange={(e) => setPassword(e.target.value)}
        label={_(msg`Password`)}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, mb: 1 }}
        disabled={loading}
        loading={loading}
        onClick={() => {
          signIn(email, password);
        }}
      >
        <Trans>Log in</Trans>
      </LoadingButton>

      <Link
        underline="none"
        component={RouterLink}
        sx={{ mt: 1 }}
        to="/auth/link"
        replace
      >
        <Trans>or sign in using a secure link</Trans>
      </Link>
    </AuthContainer>
  );
}
