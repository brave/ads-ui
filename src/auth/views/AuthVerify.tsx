import { AuthContainer } from "auth/views/components/AuthContainer";
import { useAuthorize } from "auth/hooks/queries/useAuthorize";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { CircularProgress, Link, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTrackWithMatomo } from "hooks/useTrackWithMatomo";

export function AuthVerify() {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Magic Link Verification",
  });
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const { loading, error } = useAuthorize({
    variables: {
      code: params.get("code") ?? "",
      id: params.get("id") ?? "",
    },
    onCompleted() {
      history.push("/user/main");
      trackMatomoEvent("magic-link", "verified");
    },
    onError() {
      trackMatomoEvent("magic-link", "failed-verification");
    },
  });

  return (
    <AuthContainer>
      {loading && (
        <Stack direction="column" alignItems="center" sx={{ mt: 7 }}>
          <Typography variant="h4" sx={{ mb: 7 }}>
            Logging in
          </Typography>

          <CircularProgress size={100} />
        </Stack>
      )}
      {!loading && !error && (
        <Stack direction="column" alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Successfully logged in!
          </Typography>
          <VerifiedIcon sx={{ fontSize: "100px", mb: 5 }} color="success" />
          <Link
            variant="h5"
            component={RouterLink}
            sx={{ textAlign: "center" }}
            to="/user/main"
            replace
          >
            Not automatically redirected? Click this link to go to the
            dashboard.
          </Link>
        </Stack>
      )}
      {!loading && error && (
        <Stack direction="column" alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 5 }}>
            Unable to login, link has expired or has already been used.
          </Typography>
          <CancelOutlinedIcon sx={{ fontSize: "100px", mb: 5 }} color="error" />
          <Link variant="h5" component={RouterLink} to="/auth/link" replace>
            Request another link.
          </Link>
        </Stack>
      )}
    </AuthContainer>
  );
}
