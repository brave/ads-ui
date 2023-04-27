import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignIn } from "auth/hooks/mutations/useSignIn";

interface Props {
  onError?: (e: string) => void;
}

export function Login({ onError }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { signIn, loading: signInLoading } = useSignIn({
    onSuccess() {
      history.push("/");
    },
    onError(msg) {
      if (onError) {
        onError(msg);
      }
    },
  });

  return (
    <>
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
        sx={{ mb: 3 }}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Enter your password"
      />
      <LoadingButton
        color="primary"
        size="large"
        variant="contained"
        sx={{ mt: 2, textTransform: "none", mb: 1 }}
        disabled={signInLoading}
        loading={signInLoading}
        onClick={() => {
          signIn(email, password);
        }}
      >
        Sign In
      </LoadingButton>
    </>
  );
}
