import React, { Component, useState, useEffect } from 'react';
import TabSelector from '../../../../components/tabSelector/TabSelector';
import { Text } from "../../../../components/Text/Text";
import Section from '../../../../components/section/Section';

import base64url from "base64url";
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/formElements/formElements';

const AccountSettings = props => {

    const [JWT, setJWT] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [attestationObj, setAttestationObj] = useState({});
    const [clientCred, setClientCred] = useState({} as any);

    const [authenticators, setAuthenticators] = useState([] as any);

    const { auth, classes, drawer, match } = props;

    const tabConfig = [
        { label: "Overview", selected: false, link: match.url.replace("/settings", "") + "/overview" },
        { label: "Documents", selected: false, link: match.url.replace("/settings", "") + "/documents" },
        { label: "Billing", selected: false, link: match.url.replace("/settings", "") + "/billing" },
        { label: "History", selected: false, link: match.url.replace("/settings", "") + "/history" },
        { label: "Settings", selected: true, link: match.url.replace("/settings", "") + "/settings" },
    ]

    const submitForm = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/register-authenticator`,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: props.auth.id
                })
            } as any);
        let data = await resp.json();

        create(data)
    }

    const getAuthenticators = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/authenticators`,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: props.auth.id
                })
            } as any);
        let data = await resp.json();
        setAuthenticators(data);
    }

    const create = (attestationObj) => {
        attestationObj = preformatMakeCredReq(attestationObj);
        navigator.credentials.create({ publicKey: attestationObj })
            .then((cred: any) => {
                sendClientCredential(cred);
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

    const sendClientCredential = async (clientCredential) => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/challenge/${props.auth.id}`,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(publicKeyCredentialToJSON(clientCredential))
            });
        let data = await resp.json();
        console.log(data);
    }
    useEffect(() => {
        getAuthenticators();
    }, []);

    return <div>
        <TabSelector config={tabConfig} />

        <Section fullWidthChild={true} header={"Security"}>
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text content={`Two Factor Authentication: ${authenticators.length > 0 ? "On" : "Off"}`} fontFamily={"Poppins"} sizes={[20, 20, 16, 16, 18]} />
                    <Button onClick={(e) => submitForm()} style={{ width: "175px", marginLeft: "auto" }}>
                        <Text content={"Add Authenticator"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                    </Button>
                </div>
                {
                    authenticators.length > 0 &&
                    <div style={{ marginTop: "56px" }}>
                        <Text content={`Security Keys: `} fontFamily={"Poppins"} sizes={[20, 20, 16, 16, 16]} />
                    </div>
                }
                <div style={{ marginTop: "28px" }}>
                    {authenticators.map(authenticator => (
                        <div style={{ marginBottom: "8px" }}>
                            {`${authenticator.fmt} - ${authenticator.publicKey}`}
                        </div>
                    ))}
                </div>
            </div>


        </Section>
    </div>


}

export default AccountSettings; 