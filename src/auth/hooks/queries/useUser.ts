import { useAuthContext } from "auth/context/auth.hook";

type User = {
  userId?: string;
  role?: string;
  email?: string;
  fullName?: string;
};

export function useUser(): User {
  const { userId, role, email, fullName } = useAuthContext();

  return {
    fullName,
    userId,
    role,
    email,
  };
}
