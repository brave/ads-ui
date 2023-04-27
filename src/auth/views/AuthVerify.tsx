import { AuthContainer } from "auth/views/components/AuthContainer";
import { useAuthorize } from "auth/hooks/mutations/useAuthorize";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Box, CircularProgress, Link, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export function AuthVerify() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { auth } = useAuthorize({
    onSuccess() {
      setLoading(false);
      history.push("/");
    },
    onError(msg) {
      setLoading(false);
      setError(true);
    },
  });

  useEffect(() => {
    const code = params.get("code");
    const id = params.get("id");
    if (code && id) {
      auth(code, id);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContainer>
      {loading && (
        <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 7 }}>
            Logging in ...
          </Typography>

          <CircularProgress size={100} />
        </Stack>
      )}
      {!loading && !error && (
        <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Successfully logged in!
          </Typography>
          <VerifiedIcon sx={{ fontSize: "100px", mb: 5 }} color="success" />
          <Link
            variant="h5"
            sx={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => history.push("/")}
          >
            Not automatically redirected? Click this link to go to the
            dashboard.
          </Link>
        </Stack>
      )}
      {!loading && error && (
        <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Unable to login
          </Typography>
          <CancelOutlinedIcon sx={{ fontSize: "100px", mb: 5 }} color="error" />
          <Link
            variant="h5"
            sx={{ cursor: "pointer" }}
            onClick={() => history.push("/auth/signin")}
          >
            Return to login page
          </Link>
        </Stack>
      )}
    </AuthContainer>
  );
}
