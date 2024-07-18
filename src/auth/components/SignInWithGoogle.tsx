import { useGoogleSignIn } from "@/auth/hooks/mutations/useGoogleSignIn";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export function SignInWithGoogle() {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const history = useHistory();
  const loaded = useLoadGsi();

  const { signIn } = useGoogleSignIn({
    onSuccess() {
      trackMatomoEvent("google-login", "success");
      history.replace("/user/main");
    },
    onError() {
      trackMatomoEvent("google-login", "failed");
    },
  });

  useEffect(() => {
    if (!loaded) return;

    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id: import.meta.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: (response: { credential: string }) =>
        signIn(response.credential),
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button-div"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        logo_alignment: "left",
      },
    );
  }, [loaded]);

  return <div id="google-button-div"></div>;
}

const useLoadGsi = () => {
  const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] =
    useState(false);

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://accounts.google.com/gsi/client";
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.onload = () => {
      setScriptLoadedSuccessfully(true);
    };
    scriptTag.onerror = () => {
      setScriptLoadedSuccessfully(false);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return scriptLoadedSuccessfully;
};
