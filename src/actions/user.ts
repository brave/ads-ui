import fetch from "cross-fetch";

export const SIGN_IN_START = "SIGNINSTART";
export const SignInStart = (payload: any) => ({
    payload,
    type: SIGN_IN_START,
});

export const SIGN_IN_SUCCESSFUL = "SIGNINSUCCESSFUL";
export const SignInSuccessful = (payload: any) => ({
    payload,
    type: SIGN_IN_SUCCESSFUL,
});

export const SIGN_IN_FAILED = "SIGNINFAILED";
export const SignInFailed = (payload: any) => ({
    payload,
    type: SIGN_IN_FAILED,
});

export const SIGN_OUT = "SIGNOUT";
export const SignOut = (payload: any) => ({
    payload,
    type: SIGN_OUT,
});

export const SignIn = (payload: any) => {
    return (dispatch: any) => {
        dispatch(SignInStart({}));
        return fetch(`http://localhost:4000/user`, {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then((response: any) => response.json())
            .then((json: any) => dispatch(SignInSuccessful(json)))
            .catch((error: any) => dispatch(SignInFailed(error)));
    };
};
