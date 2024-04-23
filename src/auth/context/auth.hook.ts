import { useContext } from "react";
import { IAuthContext } from "@/auth/context/auth.state";

export function useAuthContext() {
  return useContext(IAuthContext);
}
