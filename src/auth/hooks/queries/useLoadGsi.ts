import { useEffect, useState } from "react";

export const useLoadGsi = () => {
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
