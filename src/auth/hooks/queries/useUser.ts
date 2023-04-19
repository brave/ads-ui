import { useAuthContext } from "../../context/auth.hook";

export function useUser() {
  const { userId, role, email } = useAuthContext();

  return {
    userId,
    role,
    email,
  };
}
