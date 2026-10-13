import { IAuthContext } from "@/auth/context/auth.state";
import { use } from "react";

export function useAuthContext() {
  return use(IAuthContext);
}
