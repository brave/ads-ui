import { useEffect } from "react";
import { useGoogleSignIn } from "@/auth/hooks/mutations/useGoogleSignIn";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { useHistory } from "react-router-dom";

export function SignInWithGoogle() {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const history = useHistory();

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
        text: "signin_with",
        logo_alignment: "left",
      },
    );
  }, []);

  return <div id="google-button-div"></div>;
}
