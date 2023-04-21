import { useAuthContext } from "auth/context/auth.hook";

type User = { userId?: string; role?: string; email?: string };

export function useUser(): User {
  const { userId, role, email } = useAuthContext();

  return {
    userId,
    role,
    email,
  };
}
