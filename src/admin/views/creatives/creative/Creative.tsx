import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@material-ui/core';

import * as S from "./styles/Creative.style";
import Section from '../../../../components/section/Section';
import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../components/formElements/formElements";
import { Text } from "../../../../components/Text/Text";

import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATIVE, UPDATE_NOTIFICATION_CREATIVE, UPDATE_IN_PAGE_CREATIVE } from "./lib/Creative.queries";

import Context from "../../../../state/context";
import normalizeUrl from 'normalize-url';

const Creative = props => {

    const context = useContext(Context);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [targetUrl, setTargetUrl] = useState('');
    const [size, setSize] = useState('');
    const [creativeUrl, setCreativeUrl] = useState('');
    const [type, setType] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [validations, setValidations] = useState({} as any);

    const updateCreative = data => {
        setError(false);
        setSuccess(true);
        setSaving(false);
    }

    const [updateNotificationCreative, { loading: updateNotificationCreativeLoading, error: updateNotificationCreativeError }] =
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

    const [updateInPageCreative, { loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_IN_PAGE_CREATIVE, {
            variables: {
                updateInPageCreativeInput: {
                    userId: props.match.params.userId,
                    advertiserId: props.match.params.advertiserId,
                    creativeId: props.match.params.creativeId,
                    name,
                    type: {
                        code: "in_page_all_v1",
                        name: "in_page"
                    },
                    payload: {
                        size,
                        creativeUrl,
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
        }
        else if (data.creative.type.code === "in_page_all_v1") {
            setSize(data.creative.payload.size);
            setCreativeUrl(data.creative.payload.creativeUrl);
        }

        if (context.loading === true) {
            context.setLoading(undefined);
        }
    }

    const validateForm = () => {
        let validations = {} as any;
        setSuccess(false);
        setSaving(true);

        // Validate form
        if (name === '') {
            validations.nameValidation = "Name field is required";
        }
        if (targetUrl === '') {
            validations.targetUrlValidation = "Website URL field is required";
        }
        if (title === '' && type === "notification_all_v1") {
            validations.titleRequired = "Title field is required";
        }
        if (body === '' && type === "notification_all_v1") {
            validations.bodyRequired = "Body field is required";
        }
        if (size === '' && type === "in_page_all_v1") {
            validations.sizeRequired = "Size field is required";
        }
        if (creativeUrl === '' && type === "in_page_all_v1") {
            validations.creativeUrlRequired = "Image URL field is required";
        }

        // If errors: set error state true and set validations object
        if (Object.entries(validations).length > 0) {
            setValidations(validations);
            setError(true);
            setSaving(false);
            return false;
        }
        else {
            setValidations({} as any);
            return true;
        }
    }

    const formatTargetUrl = () => {
        try {
            setTargetUrl(normalizeUrl(targetUrl, { forceHttps: true }));
        }
        catch (e) {

        }
    }

    useEffect(() => {
        context.setLoading(true);
    }, [])

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
                                    {
                                        type === "notification_all_v1" &&
                                        <Selection style={{ cursor: "default" }} selected={true}>
                                            <Text content={"OS Notification"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "-2px", marginLeft: "3px" }}>info</Icon>
                                        </Selection>
                                    }
                                    {
                                        type === "in_page_all_v1" &&
                                        <Selection style={{ cursor: "default" }} selected={type === "in_page_all_v1"}>
                                            <Text content={"In-Page Image"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "-2px", marginLeft: "3px" }}>info</Icon>
                                        </Selection>
                                    }
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
                                        <Input value={targetUrl} onChange={event => setTargetUrl(event.target.value)} onBlur={() => { formatTargetUrl() }}></Input>
                                        :
                                        <>
                                            <Input error={true} value={targetUrl} onChange={event => setTargetUrl(event.target.value)} onBlur={() => { formatTargetUrl() }}></Input>
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
                                            {
                                                !validations.titleRequired ?
                                                    <Input value={title} onChange={event => setTitle(event.target.value)}></Input>
                                                    :
                                                    <>
                                                        <Input error={true} value={title} onChange={event => setTitle(event.target.value)}></Input>
                                                        <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.titleRequired} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </>
                                            }
                                        </InputContainer>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Body"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            {
                                                !validations.bodyRequired ?
                                                    <Input value={body} onChange={event => setBody(event.target.value)}></Input>
                                                    :
                                                    <>
                                                        <Input error={true} value={body} onChange={event => setBody(event.target.value)}></Input>
                                                        <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.bodyRequired} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </>
                                            }
                                        </InputContainer>
                                    </>
                                    :
                                    <>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Size"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            {
                                                !validations.sizeRequired ?
                                                    <Input value={size} onChange={event => setSize(event.target.value)}></Input>
                                                    :
                                                    <>
                                                        <Input error={true} value={size} onChange={event => setSize(event.target.value)}></Input>
                                                        <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.sizeRequired} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </>
                                            }
                                        </InputContainer>
                                        <InputContainer>
                                            <div style={{ display: "flex" }}>
                                                <Text content={"Image URL"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                            </div>
                                            {
                                                !validations.creativeUrlRequired ?
                                                    <Input value={creativeUrl} onChange={event => setCreativeUrl(event.target.value)}></Input>
                                                    :
                                                    <>
                                                        <Input error={true} value={creativeUrl} onChange={event => setCreativeUrl(event.target.value)}></Input>
                                                        <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.creativeUrlRequired} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                                    </>
                                            }
                                        </InputContainer>
                                    </>
                            }
                            <div style={{ display: "flex" }}>
                                {
                                    saving ?
                                        <Button style={{ marginLeft: "auto", marginTop: "28px", opacity: .7, cursor: "default" }}>
                                            <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                        :
                                        <Button onClick={() => {
                                            validateForm() && (type === "notification_all_v1" ? updateNotificationCreative() : updateInPageCreative())
                                        }} style={{ marginLeft: "auto", marginTop: "28px" }}>
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