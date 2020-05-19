import React, { useContext, useEffect, useState } from "react";

import base64url from "base64url";

const TestSignin = props => {

    const [JWT, setJWT] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [attestationObj, setAttestationObj] = useState({});
    const [clientCred, setClientCred] = useState({} as any);

    const [assertion, setAssertion] = useState(false);

    const createCredentialDefaultArgs = {
        publicKey: {

            rp: {
                name: "Brave Ads"
            },


            user: {
                id: new Uint8Array(16),
                name: "ads-dev@brave.com",
                displayName: "Dan A. Lipeles"
            },

            pubKeyCredParams: [{
                type: "public-key",
                alg: -7
            }],

            attestation: "direct",

            timeout: 60000,

            challenge: new Uint8Array([
                0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
                0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
            ]).buffer
        }
    } as any;

    const getCredentialDefaultArgs = {
        publicKey: {
            timeout: 60000,
            challenge: new Uint8Array([
                0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
                0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
            ]).buffer
        },
    } as any;

    const create = (attestationObj) => {
        attestationObj = preformatMakeCredReq(attestationObj);
        navigator.credentials.create({ publicKey: attestationObj })
            .then((cred: any) => {
                console.log("Return to server: \n", cred);
                setClientCred(cred);
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    }

    const get = (attestationObj) => {

        attestationObj.challenge = base64url.toBuffer(attestationObj.challenge);

        attestationObj.allowCredentials.forEach((allowedCredential) => {
            allowedCredential.id = base64url.toBuffer(allowedCredential.id);
        });

        console.log(`Assertion Object:`, attestationObj);

        navigator.credentials.get({ publicKey: attestationObj })
            .then((cred: any) => {
                console.log("Return to server: \n", cred);
                setClientCred(cred);
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    }

    const preformatMakeCredReq = (makeCredReq) => {
        makeCredReq.challenge = base64url.toBuffer(makeCredReq.challenge);
        makeCredReq.user.id = base64url.toBuffer(makeCredReq.user.id);

        return makeCredReq
    }




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
        let data = await resp.json();

        setAttestationObj(data);

        setJWT(data.accessToken)
    }

    const publicKeyCredentialToJSON = (pubKeyCred) => {
        if (pubKeyCred instanceof Array) {
            let arr = [];
            for (let i of pubKeyCred)
                //@ts-ignore
                arr.push(publicKeyCredentialToJSON(i));

            return arr
        }

        if (pubKeyCred instanceof ArrayBuffer) {
            //@ts-ignore
            return base64url.encode(pubKeyCred)
        }

        if (pubKeyCred instanceof Object) {
            let obj = {};

            for (let key in pubKeyCred) {
                obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
            }

            return obj
        }

        return pubKeyCred
    }

    const sendClientCredential = async () => {
        console.log(clientCred);
        console.log(JSON.stringify(clientCred));
        console.log("clientCredential", clientCred)
        const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/challenge/2c7ce61b-f1dc-4505-ba1b-904af6b186c0`,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(publicKeyCredentialToJSON(clientCred))
            });
        let data = await resp.json();

        console.log(data);
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
                    JWT Output: {JWT}
                </div>
                <div style={{ marginTop: "32px" }}>
                    Server Challenge:
                    {JWT !== '' ? new TextDecoder().decode(getCredentialDefaultArgs.publicKey.challenge) : ""}
                </div>

                <button onClick={(e) => create(attestationObj)}>Solve Challenge</button>

                <button onClick={(e) => get(attestationObj)}>Solve Assersion Challenge</button>
                <br></br>
                <div>Authorized: {assertion.toString()}</div>
                <br></br>
                <button onClick={(e) => sendClientCredential()}>Send Client Credential</button>
            </div>
        </div >
    );
}


export default TestSignin;

