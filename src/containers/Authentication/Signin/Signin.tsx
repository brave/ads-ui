import React, { useState } from "react";

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
import BraveLogo from "../../../../brave-logotype-full-color.png";
import { useHistory } from "react-router-dom";
import { useSignIn } from "auth/hooks/mutations/useSignIn";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const history = useHistory();

  const { signIn, loading } = useSignIn({
    onSuccess() {
      history.push("/");
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
      <Box height="520px" width="750px">
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
              size="large"
              variant="contained"
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
