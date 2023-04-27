import React, { useState } from "react";

import { Alert, Box, Link } from "@mui/material";
import BraveLogo from "../../../brave-logotype-full-color.png";
import { AuthContainer } from "auth/views/components/AuthContainer";
import { RequestLink } from "auth/views/components/RequestLink";
import { Login } from "auth/views/components/Login";

export function SignIn() {
  const [useLink, setUseLink] = useState(true);
  const [error, setError] = useState<string>();
  const [triedLogin, setTriedLogin] = useState(false);

  return (
    <AuthContainer height={useLink ? "400px" : "500px"}>
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

      {useLink ? (
        <RequestLink
          onError={setError}
          onClick={() => setTriedLogin(!triedLogin)}
        />
      ) : (
        <Login onError={setError} />
      )}

      {!triedLogin && (
        <Link
          underline="none"
          sx={{ mt: 1, cursor: "pointer" }}
          onClick={() => setUseLink(!useLink)}
        >
          {useLink
            ? "or log in in using a password"
            : "or log in using a secure link"}
        </Link>
      )}

      {error && <Alert severity="error">{error}</Alert>}
    </AuthContainer>
  );
}
