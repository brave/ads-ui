import { AuthContainer } from "@/auth/views/components/AuthContainer";
import { useAuthorize } from "@/auth/hooks/queries/useAuthorize";
import { Link as RouterLink, Switch, useHistory } from "react-router-dom";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";
import { Trans } from "@lingui/macro";
import { LoadingButton } from "@mui/lab";
import logo from "@/assets/images/brave-icon-release-color.svg";

export function AuthVerify() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Magic Link Verification",
  });
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const { loading, error, verify } = useAuthorize({
    onCompleted() {
      history.push("/user/main");
      trackMatomoEvent("magic-link", "verified");
    },
    onError() {
      trackMatomoEvent("magic-link", "failed-verification");
    },
  });

  const id = params.get("id");
  const code = params.get("code");

  if (!id || !code) {
    return (
      <Switch>
        <RouterLink to="/auth/link" />
      </Switch>
    );
  }

  return (
    <AuthContainer>
      <img src={logo} height={50} />
      <Typography gutterBottom variant="h6">
        <Trans>You are logging into the Brave Ads Manager Dashboard.</Trans>
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        <Trans>
          Click the continue button below to complete the login process.
        </Trans>
      </Typography>
      <LoadingButton
        loading={loading}
        disabled={loading || !!error}
        onClick={() => verify(code, id)}
        variant="contained"
        sx={{ mt: 2, pl: 5, pr: 5, borderRadius: "12px", mb: 2 }}
        size="large"
      >
        <Trans>Continue</Trans>
      </LoadingButton>
      {!loading && error && (
        <Alert
          severity="error"
          action={
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to="/auth/link"
              sx={{ alignSelf: "center" }}
            >
              <Trans>Return</Trans>
            </Button>
          }
        >
          <AlertTitle>
            <Trans>Unable to login.</Trans>
          </AlertTitle>
          <Trans>
            The magic link you have requested has either expired or has already
            been used. Please return to the login page and try again.
          </Trans>
        </Alert>
      )}
    </AuthContainer>
  );
}
