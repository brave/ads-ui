import React, { Component, useState, useEffect, useContext } from 'react';
import { Icon } from '@material-ui/core';

import * as S from "./styles/Creative.style";
import Section from '../../../../components/section/Section';
import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../components/formElements/formElements";
import { Text } from "../../../../components/Text/Text";

import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATIVE, UPDATE_NOTIFICATION_CREATIVE } from "./lib/Creative.queries";

import Context from "../../../../state/context";
import { validate } from 'graphql';

const Creative = props => {

    const context = useContext(Context);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [targetUrl, setTargetUrl] = useState('');
    const [size, setSize] = useState('');
    const [creativeUrl, setCreativeUrl] = useState('');
    const [type, setType] = useState('');
    const [originalCreative, setOriginalCreative] = useState({} as any);
    const [updated, setUpdated] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [validations, setValidations] = useState({} as any);

    const updateCreative = data => {
        console.log("Updated!");
        console.log(data);
    }

    const [updateNotificationCreative, { loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_NOTIFICATION_CREATIVE, {
            variables: {
                updateNotificationCreativeInput: {
                    userId: props.match.params.userId,
                    advertiserId: props.match.params.advertiserId,
                    creativeId: props.match.params.creativeId,
                    name,
                    type: {
                        code: "notification_all_v1",
                        name: "notification"
                    },
                    payload: {
                        title,
                        body,
                        targetUrl
                    }
                }
            },
            onCompleted: updateCreative
        });


    const initializeCreative = data => {
        setName(data.creative.name);
        setType(data.creative.type.code);
        setTargetUrl(data.creative.payload.targetUrl);

        if (data.creative.type.code === "notification_all_v1") {
            setTitle(data.creative.payload.title);
            setBody(data.creative.payload.body);
            setOriginalCreative({
                name: data.creative.name,
                type: data.creative.type.code,
                title: data.creative.payload.title,
                body: data.creative.payload.body,
                targetUrl: data.creative.payload.targetUrl,
            })
        }
        else if (data.creative.type.code === "in_page_all_v1") {
            setSize(data.creative.payload.size);
            setCreativeUrl(data.creative.payload.creativeUrl);
            setOriginalCreative({
                name: data.creative.name,
                type: data.creative.type.code,
                size: data.creative.payload.size,
                creativeUrl: data.creative.payload.creativeUrl,
                targetUrl: data.creative.payload.targetUrl,
            })
        }

        if (context.loading === true) {
            context.setLoading(undefined);
        }
    }

    const validateForm = () => {
        let validations = {} as any;

        // Validate form
        if (name === '') {
            validations.nameValidation = "Creative name field is required";
        }
        if (targetUrl === '') {
            validations.targetUrlValidation = "Website URL field is required";
        }

        // If errors: set error state true and set validations object
        if (Object.entries(validations).length > 0) {
            setValidations(validations);
            setError(true);
            return false;
        }
        else {
            return true;
        }
    }

    const handleType = type => {
        setType(type);
    }

    useEffect(() => {
        context.setLoading(true);
    }, [])

    useEffect(() => {


        console.log("again");
        if (originalCreative.type !== type) {
            setUpdated(true);
        }
        else if (originalCreative.name !== name) {
            setUpdated(true);
        }
        else if (originalCreative.targetUrl !== targetUrl) {
            setUpdated(true);
        }
        else if (type === "notification_all_v1" && originalCreative.title !== title) {
            setUpdated(true);
        }
        else if (type === "notification_all_v1" && originalCreative.body !== body) {
            setUpdated(true);
        }
        else if (type === "in_page_all_v1" && originalCreative.size !== size) {
            setUpdated(true);
        }
        else if (type === "in_page_all_v1" && originalCreative.creativeUrl !== creativeUrl) {
            setUpdated(true);
        }
        else {
            setUpdated(false);
        }
    }, [name, type, title, body, targetUrl, size, creativeUrl])


    const { loading: queryLoading, error: queryError, data } = useQuery(CREATIVE, {
        variables: { id: props.match.params.creativeId },
        onCompleted: initializeCreative,
        skip: !context.loading
    });


    if (queryLoading) return <></>;

    return (
        <>
            <div style={{ display: "flex", marginTop: "28px", width: "100%" }}>
                <div style={{ width: "720px" }}>

                    {
                        success &&
                        <MessageContainer style={{ marginBottom: "28px" }}>
                            <SuccessIcon>
                                <Icon style={{ color: "white", fontSize: "24px" }}>done</Icon>
                            </SuccessIcon>
                            <Message>
                                <Text content={"Creative saved successfully."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            </Message>
                        </MessageContainer>
                    }

                    {
                        error &&
                        <MessageContainer style={{ marginBottom: "28px" }}>
                            <ErrorIcon>
                                <Icon style={{ color: "white", fontSize: "24px" }}>info</Icon>
                            </ErrorIcon>
                            <Message>
                                <Text content={"Oops! Unable to submit form, please update highlighted fields and try again."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
                            </Message>
                        </MessageContainer>
                    }

                    <Section fullWidthChild={true}>
                        <>
                            <Text content={"Creative Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define the look and feel of your Ads."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>



                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Creative Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                                    <Selection onClick={() => { handleType("notification_all_v1") }} selected={type === "notification_all_v1"}>
                                        <Text content={"OS Notification"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "-2px", marginLeft: "3px" }}>info</Icon>
                                    </Selection>
                                    <Selection onClick={() => { handleType("in_page_all_v1") }} selected={type === "in_page_all_v1"}>
                                        <Text content={"In-Page Image"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "-2px", marginLeft: "3px" }}>info</Icon>
                                    </Selection>
                                    <Selection selected={false} style={{ visibility: "hidden" }}></Selection>
                                </div>
                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Creative Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {
                                    !validations.nameValidation ?
                                        <Input value={name} onChange={event => setName(event.target.value)}></Input>
                                        :
                                        <>
                                            <Input error={true} value={name} onChange={event => setName(event.target.value)}></Input>
                                            <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.nameValidation} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </>
                                }

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Website URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {
                                    !validations.targetUrlValidation ?
                                        <Input value={targetUrl} onChange={event => setTargetUrl(event.target.value)}></Input>
                                        :
                                        <>
                                            <Input error={true} value={targetUrl} onChange={event => setTargetUrl(event.target.value)}></Input>
                                            <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.targetUrlValidation} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </>
                                }
                            </InputContainer>

                            <Divider />

                            <Text content={"Creative"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define the copy and text used in your creative."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>



                            {
                                type === "notification_all_v1" ?
                                    <>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Title"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            <Input value={title} onChange={(e) => { setTitle(e.target.value) }}></Input>
                                        </InputContainer>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Body"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            <Input value={body} onChange={(e) => { setBody(e.target.value) }}></Input>
                                        </InputContainer>
                                    </>
                                    :
                                    <>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Size"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            <Input value={size}></Input>
                                        </InputContainer>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Image URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            <Input value={creativeUrl}></Input>
                                        </InputContainer>
                                    </>
                            }
                            <div style={{ display: "flex" }}>
                                {
                                    updated ?
                                        <Button onClick={() => {
                                            validateForm() && updateNotificationCreative()
                                        }} style={{ marginLeft: "auto", marginTop: "28px" }}>
                                            <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                        :
                                        <Button style={{ marginLeft: "auto", marginTop: "28px", opacity: .7 }}>
                                            <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                }
                            </div>
                        </>
                    </Section>
                </div>
            </div>
        </>
    );
}

export default Creative;