import { Alert, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useSignIn } from "auth/hooks/mutations/useSignIn";
import { AuthContainer } from "auth/views/components/AuthContainer";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { signIn, loading, error } = useSignIn({
    onSuccess() {
      history.replace("/user/main");
    },
  });

  return (
    <AuthContainer>
      <Typography sx={{ fontFamily: "Poppins", color: "#434251" }} variant="h1">
        Log into your Brave Ads account
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
        Log in
      </LoadingButton>

      <Link
        underline="none"
        component={RouterLink}
        sx={{ mt: 1 }}
        to="/auth/link"
        replace
      >
        or sign in using a secure link
      </Link>
    </AuthContainer>
  );
}
