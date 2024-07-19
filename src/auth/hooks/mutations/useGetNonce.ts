import { useEffect, useState } from "react";
import { nonce } from "@/auth/lib/index";

export function useGetNonce() {
  const [value, setValue] = useState<string>();

  const setNonce = () => {
    nonce().then((res) => {
      setValue(res);
    });
  };

  useEffect(() => {
    if (!value) {
      setNonce();
    }

    const to = setTimeout(() => {
      setNonce();
    }, 180_000);

    return () => clearTimeout(to);
  }, []);

  return { nonce: value };
}
