export const login = (payload: any) => ({
    payload,
    type: "LOGIN",
});

export const logout = (payload: any) => ({
    payload,
    type: "LOGOUT",
});
