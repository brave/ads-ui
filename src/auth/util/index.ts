export const getCredentials = async (
  method: "GET" | "POST",
  user?: { email: string; password: string }
): Promise<{ accessToken?: string }> => {
  const res = await fetch(
    `${import.meta.env.REACT_APP_SERVER_ADDRESS}/auth/token`,
    {
      method,
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        method === "POST" && user
          ? JSON.stringify({
              email: user.email,
              password: user.password,
            })
          : undefined,
    }
  );

  if (res.status === 400) {
    throw new Error(
      "The username or password did not match our records. Please try again."
    );
  }

  if (!res.ok) {
    throw new Error(
      "Unexpected error validating your credentials. Please try again later."
    );
  }

  return await res.json();
};

export const clearCredentials = async (): Promise<void> => {
  const res = await fetch(
    `${import.meta.env.REACT_APP_SERVER_ADDRESS}/auth/logout`,
    {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Could not logout at this time. Please try again later.");
  }

  return;
};
