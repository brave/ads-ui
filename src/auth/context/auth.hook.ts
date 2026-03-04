import { IAuthContext } from "@/auth/context/auth.state";
import { useContext } from "react";

export function useAuthContext() {
  return useContext(IAuthContext);
}
