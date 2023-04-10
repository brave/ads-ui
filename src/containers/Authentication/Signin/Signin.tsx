import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import BraveLogo from "assets/images/brave-logotype-full-color.png";
import { useSignIn } from "auth/hooks/mutations/useSignIn";
import { useHistory } from "react-router-dom";

interface Props {
  state?: unknown;
}

export function SignIn({ state }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const history = useHistory();

  const { signIn, loading } = useSignIn({
    onSuccess() {
      history.push("/", { triedAuth: true });
    },
    onError(msg) {
      setError(msg);
    },
  });

  useEffect(() => {
    if (state) {
      const s = state as { triedAuth: boolean };

      // Catches when a person with the role of "user" tries to login.
      if (s.triedAuth) {
        setError("Unable to login to Brave Ads Dashboard");
      }
    }
  }, [state]);

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
      <Box height="520px" width="750px">
        <Card>
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
              Sign into your brave account
            </Typography>
            <TextField
              sx={{ mt: 5, mb: 3 }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              fullWidth
              value={password}
              type="password"
              sx={{ mb: 3 }}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              color="primary"
              size="medium"
              sx={{ mt: 4 }}
              disabled={loading}
              onClick={() => {
                signIn(email, password);
              }}
            >
              {loading ? "Logging in..." : "Sign in"}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
