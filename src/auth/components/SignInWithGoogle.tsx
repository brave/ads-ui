import { useEffect } from "react";
import { useLoadGsi } from "@/auth/hooks/queries/useLoadGsi";
import { useGoogleSignIn } from "@/auth/hooks/mutations/useGoogleSignIn";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { useHistory } from "react-router-dom";

export function SignInWithGoogle() {
  const loaded = useLoadGsi();
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
    if (!loaded) return;

    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id: "test",
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
  }, [loaded]);

  return <div id="google-button-div"></div>;
}
