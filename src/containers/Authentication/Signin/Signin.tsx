import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BraveLogo from "../../../../brave-logotype-full-color.png";
import { useHistory } from "react-router-dom";
import { useSignIn } from "auth/hooks/mutations/useSignIn";
import { useGetLink } from "auth/hooks/mutations/useGetLink";
import { LoadingButton } from "@mui/lab";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useLink, setUseLink] = useState(true);
  const [error, setError] = useState<string>();
  const [requestedLink, setRequestedLink] = useState(false);
  const history = useHistory();

  const { signIn, loading: signInLoading } = useSignIn({
    onSuccess() {
      history.push("/");
    },
    onError(msg) {
      setError(msg);
    },
  });

  const { link, loading: linkLoading } = useGetLink({
    onSuccess() {
      setRequestedLink(true);
    },
    onError(msg) {
      setError(msg);
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse 100% 100% at 0% 0%,rgb(57, 45, 209, 0.8) 0%,rgb(255, 67, 67, 0.8) 100%)",
        height: "100%",
      }}
    >
      <Box height={useLink ? "460px" : "500px"} width="725px">
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: "28px",
            borderRadius: "6px",
            boxShadow: "rgba(99, 105, 110, 0.18) 0px 1px 12px 0px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              width="150px"
              height="60px"
              marginBottom="24px"
              sx={{
                background: `url(${BraveLogo}) no-repeat center`,
                backgroundSize: "100%",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", color: "#434251" }}
              variant="h4"
            >
              Sign into your brave Ads account
            </Typography>
            <TextField
              sx={{ mt: 5, mb: 3 }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
            />
            {!useLink && (
              <TextField
                fullWidth
                value={password}
                type="password"
                sx={{ mb: 3 }}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter your password"
              />
            )}
            {useLink && (
              <Typography sx={{ textAlign: "center" }}>
                Enter your email address to get a secure login link. Use this
                link to access your brave Ads account.
              </Typography>
            )}
            <LoadingButton
              color="primary"
              size="large"
              variant="contained"
              sx={{ mt: 2, textTransform: "none" }}
              disabled={signInLoading || linkLoading}
              loading={signInLoading || linkLoading}
              onClick={() => {
                signIn(email, password);
              }}
            >
              {useLink ? "Get login link" : "Sign In"}
            </LoadingButton>
            <Link
              underline="none"
              sx={{ mt: 1, cursor: "pointer" }}
              onClick={() => setUseLink(!useLink)}
            >
              {useLink
                ? "or log in in using a password"
                : "or log in using a secure link"}
            </Link>

            {error && <Alert severity="error">{error}</Alert>}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
