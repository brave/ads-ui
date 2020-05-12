import React, { useContext, useEffect, useState } from "react";

const TestSignin = props => {

    const [jwt, setJWT] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/token`,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userName,
                    password
                })
            });
        console.log(resp);
    }

    return (
        <div>
            Web Authn Testing

            <div style={{ marginTop: "24px" }}>
                <input autoComplete="new-password" name="null" onChange={(e) => { setUserName(e.target.value) }} style={{ marginRight: "12px" }} placeholder={"Username"}></input>
                <input autoComplete="new-password" name="null" onChange={(e) => { setPassword(e.target.value) }} type={"password"} placeholder={"Password"}></input>
                <br></br>
                <button onClick={(e) => { submitForm() }} style={{ marginTop: "20px" }}>Submit</button>

                <div style={{ marginTop: "12px" }}>
                    JWT Output: {jwt}
                </div>
            </div>
        </div >
    );
}


export default TestSignin;

