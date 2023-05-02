import { Alert, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignIn } from "auth/hooks/mutations/useSignIn";
import { AuthContainer } from "auth/views/components/AuthContainer";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { signIn, loading, error } = useSignIn({
    onSuccess() {
      history.replace("/");
    },
  });

  return (
    <AuthContainer>
      <Typography sx={{ fontFamily: "Poppins", color: "#434251" }} variant="h4">
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
      <TextField
        fullWidth
        value={password}
        type="password"
        sx={{ mb: 2 }}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Enter your password"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, textTransform: "none", mb: 1 }}
        disabled={loading}
        loading={loading}
        onClick={() => {
          signIn(email, password);
        }}
      >
        Sign In
      </LoadingButton>

      <Link
        underline="none"
        sx={{ mt: 1, cursor: "pointer" }}
        onClick={() => history.replace("/auth/link")}
      >
        or sign in in using a secure link
      </Link>
    </AuthContainer>
  );
}
