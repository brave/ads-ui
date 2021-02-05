import React, { useContext, useEffect, useState, useRef } from "react";
import Section from "../../components/section/Section";
import { Text } from "../../components/Text/Text";
import { Button, Input, InputContainer, TextArea } from "../../components/formElements/formElements";
import Select from 'react-select';
import _ from "lodash";
import * as tweetnacl from "tweetnacl";
import { ADVERTISER, UPDATE_ADVERTISER } from "./queries/Settings.queries";
import { useMutation, useQuery } from "react-apollo";

const Settings = props => {

    const [loading, setLoading] = useState(false)
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#fafafa"
        }),
    }

    const setActiveAdvertiser = (e) => {
        props.setActiveAdvertiser(_.find(props.advertisers, { id: e.value }))
    }

    const advertisers = () => {
        let advertisers = [] as any;
        props.advertisers.forEach((advertiser) => {
            advertisers.push({
                value: advertiser.id,
                label: advertiser.name
            })
        });
        return advertisers;
    }

    const generateKeyPair = () => {
        const keypair = tweetnacl.box.keyPair()
        const publicKey = btoa(String.fromCharCode.apply(null, keypair.publicKey as unknown as number[]))
        const privateKey = btoa(String.fromCharCode.apply(null, keypair.secretKey as unknown as number[]))
        setPublicKey(publicKey)
        setPrivateKey(privateKey)
        setLoading(true);

        updateAdvertiser({
            variables: {
                updateAdvertiserInput: { id: props.activeAdvertiser.id, publicKey: publicKey }
            }
        })

        // function to revert b64 encoded string to UInt8 if needed
        // let b64decoded = Uint8Array.from(atob(b64encoded), c => c.charCodeAt(0))
    }

    const handleUpdateAdvertiser = () => {
        setLoading(false)
        alert("Saved!")
    }

    const initializeAdvertiser = (data) => {
        setPublicKey(data.advertiser.publicKey)
    }


    const [updateAdvertiser, { loading: updateAdvertiserLoading, error: updateAdvertiserError }] =
        useMutation(UPDATE_ADVERTISER, {
            variables: {
                updateAdvertiserInput: {
                    id: props.activeAdvertiser.id,
                    publicKey: publicKey
                }
            },
            onCompleted: handleUpdateAdvertiser
        });

    const { loading: queryLoading, error: queryError, data } = useQuery(ADVERTISER, {
        variables: { id: props.activeAdvertiser.id },
        onCompleted: initializeAdvertiser,
    });

    if (queryLoading) return <></>;

    return (
        <div>
            <Text content="Account Settings" fontFamily="Poppins" sizes={[22, 22, 22, 22, 22]}></Text>
            <div style={{ marginTop: "48px", marginBottom: "48px" }}></div>


            <Text content="Keys (Coming Soon!)" fontFamily="Poppins" sizes={[22, 22, 22, 22, 18]}></Text>

            <Text style={{ marginTop: "28px" }} content={"Generate a key pair for your organization. Brave Ads will use your organization's public key to sign and encrypt conversion data. Only your organization will have access to the private key, which can be used to decrypt and view conversion data."} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />

            <div style={{ marginTop: "28px" }}></div>

            <div style={{ display: "flex", width: "600px" }}>
                <InputContainer style={{ width: "100%", marginRight: "24px" }}>
                    <div style={{ display: "flex" }}>
                        <Text content={"Your organization's public key:"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <Input value={publicKey}></Input>
                </InputContainer>
                {
                    !loading ?
                        <Button onClick={() => generateKeyPair()} style={{ height: "32px", marginTop: "26px", marginLeft: "auto", backgroundColor: "#4C54D2", minWidth: "100px" }}>
                            <Text content={"Generate"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                        </Button>
                        :
                        <Button style={{ height: "32px", marginTop: "26px", marginLeft: "auto", backgroundColor: "#4C54D2", opacity: .6, cursor: "default", minWidth: "100px" }}>
                            <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                        </Button>
                }
            </div>

            { privateKey !== '' &&
                <div style={{ display: "flex", width: "600px" }}>
                    <InputContainer style={{ width: "100%", marginRight: "24px" }}>
                        <div style={{ display: "flex" }}>
                            <Text content={"Your organization's private key:"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        </div>
                        <Input value={privateKey}></Input>
                        <div style={{ display: "flex" }}>
                            <Text style={{ marginTop: "12px", marginLeft: "4px", color: "#4C54D2" }} content={"Keep this safe! Brave cannot recover this key"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                        </div>
                    </InputContainer>
                    <Button style={{ height: "32px", marginTop: "26px", marginLeft: "auto", backgroundColor: "#4C54D2", visibility: "hidden" }}>
                        <Text content={"Generate"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                    </Button>
                </div>
            }

            <div style={{ marginTop: "24px", marginBottom: "24px" }}></div>

            <Text content="Organization" fontFamily="Poppins" sizes={[22, 22, 22, 22, 18]}></Text>
            <div style={{ marginBottom: "28px" }}></div>

            <div style={{ height: "400px" }}>
                <InputContainer>
                    <div style={{ display: "flex", marginBottom: "4px" }}>
                        <Text content={"Select organization"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <Select
                        styles={customStyles}
                        onChange={setActiveAdvertiser}
                        value={{ value: props.activeAdvertiser.id, label: props.activeAdvertiser.name }}
                        options={advertisers()}
                    />

                </InputContainer>
            </div>

        </div>
    );
}


export default Settings;
