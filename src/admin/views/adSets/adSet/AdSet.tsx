import React, { useState, useEffect, useContext } from 'react';

import Context from "../../../../state/context";
import TabSelector from "../../../../components/tabSelector/TabSelector";

import Section from '../../../../components/section/Section';
import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../components/formElements/formElements";
import { Text } from "../../../../components/Text/Text";

import Select, { createFilter } from 'react-select';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AD_SET, UPDATE_AD_SET } from "./lib/AdSet.queries";
import { Icon } from '@material-ui/core';
import RadioButton from '../../../../components/radioButton/RadioButton';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
    }),
}

const pricingTypes = [
    { value: 'cpm', label: 'cpm' },
    { value: 'cpc', label: 'cpc' },
    { value: "cpl", label: "cpl" },
    { value: "cpx", label: "cpx" },
    { value: "rev_share", label: "rev_share" },
    { value: "other", label: "other" }
]

const statusTypes = [
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
]

const platformTypes = [
    { value: "_Bt5nxrNo", label: "macos" },
    { value: "k80syyzDa", label: "ios" },
    { value: "i1g4cO6Pl", label: "windows" },
    { value: "-Ug5OXisJ", label: "linux" },
    { value: "mbwfZU-4W", label: "android" },
]

const windowTypes = [
    { value: 1, label: '1 Day' },
    { value: 7, label: '7 Days' },
    { value: 30, label: '30 Days' }
]


const AdSet = props => {

    const [pricingType, setPricingType] = useState({ value: 'cpm', label: 'cpm' });
    const [totalImpressions, setTotalImpressions] = useState('');
    const [dailyImpressions, setDailyImpressions] = useState('');
    const [status, setStatus] = useState({ value: "active", label: "Active" });
    const [selectedAudiences, setSelectedAudieces] = useState([]);
    const [availableAudiences, setAvailableAudiences] = useState([]);
    // const [eligibleChannels, setEligibleChannels] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    // const [channels, setChannels] = useState([]);
    const [conversionType, setConversionType] = useState("postview");
    const [conversionUrl, setConversionUrl] = useState('');
    const [conversionWindow, setConversionWindow] = useState({ value: 1, label: "1 Day" })
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [validations, setValidations] = useState({} as any);

    const { match } = props;
    const tabConfig = [
        { label: "Overview", selected: true, link: match.url },
        { label: "Ads", selected: false, link: match.url.concat("/ads") },
    ]

    const context = useContext(Context);

    const updateAdSetForm = data => {
        setError(false);
        setSuccess(true);
        setSaving(false);
    }

    const prepareSegmentInput = selectedAudiences => {
        let segments = [] as any;
        if (selectedAudiences) {
            selectedAudiences.forEach((selectedAudience) => {
                segments.push({
                    code: selectedAudience.value,
                    name: selectedAudience.label
                })
            });
        }
        return segments
    }

    const prepareOSesInput = platforms => {
        let oses = [] as any;
        if (platforms) {
            platforms.forEach((platform) => {
                oses.push({
                    code: platform.value,
                    name: platform.label
                })
            });
        }
        return oses
    }

    // const prepareChannelsInput = channels => {
    //     let channelsInput = [] as any;
    //     if (channels) {
    //         channels.forEach((channel) => {
    //             channelsInput.push({
    //                 channelId: channel.value
    //             })
    //         });
    //     }
    //     return channelsInput
    // }

    const prepareConversionsInput = () => {
        let conversionsInput = [] as any;

        if (conversionUrl !== '') {
            conversionsInput.push({
                urlPattern: conversionUrl,
                type: conversionType,
                observationWindow: conversionWindow.value
            });
        }
        return conversionsInput
    }

    const [updateAdSet, { loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_AD_SET, {
            variables: {
                updateAdSetInput: {
                    id: props.match.params.creativeSetId,
                    campaignId: props.match.params.campaignId,
                    perDay: parseInt(dailyImpressions),
                    totalMax: parseInt(totalImpressions),
                    billingType: pricingType.value,
                    state: status.value,
                    segments: prepareSegmentInput(selectedAudiences),
                    oses: prepareOSesInput(platforms),
                    conversions: prepareConversionsInput(),
                }
            },
            onCompleted: updateAdSetForm
        });

    const validateForm = () => {
        let validations = {} as any;
        setSuccess(false);
        setSaving(true);

        //Validate form
        if (dailyImpressions === '') {
            validations.dailyImpressionsValidation = "Daily Impressions field is required";
        }

        if (totalImpressions === '') {
            validations.totalImpressionsValidation = "Total Impressions field is required";
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

    const initializeAdSet = data => {
        console.log(data);

        if (data.adSet.state) {
            setStatus({ value: data.adSet.state, label: data.adSet.state.charAt(0).toUpperCase() + data.adSet.state.slice(1) })
        }

        let audiences = [] as any;
        let selectedAudiences = [] as any;
        // let channelsTemp = [] as any;
        let platformsTemp = [] as any;
        // let selectedChannelsTemp = [] as any;

        if (data.segments.data) {
            data.segments.data.forEach((segment) => {
                audiences.push({ value: segment.code, label: segment.name })
            })
        }

        if (data.adSet.segments) {
            data.adSet.segments.forEach((segment) => {
                selectedAudiences.push({ value: segment.code, label: segment.name })
            })
        }

        // if (data.eligibleChannels) {
        //     data.eligibleChannels.forEach((channel, index) => {
        //         channelsTemp.push({ value: channel, label: channel })
        //     });
        // }

        if (data.adSet.oses) {
            data.adSet.oses.forEach((os) => {
                platformsTemp.push({ value: os.code, label: os.name })
            })
        }

        // if (data.adSet.channels) {
        //     data.adSet.channels.forEach((channel) => {
        //         selectedChannelsTemp.push({ value: channel.channelId, label: channel.channelId })
        //     })
        // }

        if (data.adSet.conversions) {
            data.adSet.conversions.forEach((conversion) => {
                if (conversion.type === "postview") {
                    setConversionType("postview");
                }
                else {
                    setConversionType("postclick");
                }
                setConversionUrl(conversion.urlPattern);
                setConversionWindow({ value: conversion.observationWindow, label: conversion.observationWindow + " Day(s)" })
            })
        }

        setAvailableAudiences(audiences);
        setSelectedAudieces(selectedAudiences);
        // setEligibleChannels(channelsTemp);
        setPlatforms(platformsTemp);
        // setChannels(selectedChannelsTemp);

        if (data.adSet.billingType) {
            setPricingType({ value: data.adSet.billingType, label: data.adSet.billingType });
        }
        setTotalImpressions(data.adSet.totalMax);
        setDailyImpressions(data.adSet.perDay);

        if (context.loading === true) {
            context.setLoading(undefined);
        }
    }

    const { loading: queryLoading, error: queryError, data } = useQuery(AD_SET, {
        variables: { id: props.match.params.creativeSetId },
        onCompleted: initializeAdSet,
    });


    if (queryLoading) return <></>;

    return (
        <div>
            <TabSelector config={tabConfig} />
            <div style={{ display: "flex", marginTop: "28px", width: "100%" }}>
                <div style={{ width: "720px" }}>

                    {
                        success &&
                        <MessageContainer style={{ marginBottom: "28px" }}>
                            <SuccessIcon>
                                <Icon style={{ color: "white", fontSize: "24px" }}>done</Icon>
                            </SuccessIcon>
                            <Message>
                                <Text content={"Ad Set saved successfully."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
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
                            <Text content={"Ad Set Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define your Ad Set details"} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Billing Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    value={pricingType}
                                    onChange={setPricingType}
                                    options={pricingTypes}
                                />

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Total Impressions per User"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {
                                    !validations.totalImpressionsValidation ?
                                        <Input value={totalImpressions} onChange={event => setTotalImpressions(event.target.value)}></Input>
                                        :
                                        <>
                                            <Input error={true} value={totalImpressions} onChange={event => setTotalImpressions(event.target.value)}></Input>
                                            <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.totalImpressionsValidation} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </>
                                }

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Daily Impressions per User"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {
                                    !validations.dailyImpressionsValidation ?
                                        <Input value={dailyImpressions} onChange={event => setDailyImpressions(event.target.value)}></Input>
                                        :
                                        <>
                                            <Input error={true} value={dailyImpressions} onChange={event => setDailyImpressions(event.target.value)}></Input>
                                            <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.dailyImpressionsValidation} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </>
                                }

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"State"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setStatus}
                                    value={status}
                                    options={statusTypes}
                                />

                            </InputContainer>

                            <Divider />

                            <Text content={"Audiences"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define your audiences."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Audiences"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setSelectedAudieces}
                                    value={selectedAudiences}
                                    options={availableAudiences}
                                    isMulti={true}
                                />

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Platforms"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setPlatforms}
                                    value={platforms}
                                    options={platformTypes}
                                    isMulti={true}
                                />

                            </InputContainer>

                            {/* <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Channels"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setChannels}
                                    value={channels}
                                    options={eligibleChannels}
                                    filterOption={createFilter({ ignoreAccents: false })}
                                    isMulti={true}
                                />

                            </InputContainer> */}

                            <Divider />

                            <Text content={"Conversion"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define post-engagement analytics."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>

                                <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                    <RadioButton checked={conversionType === "postview"} onClick={(e) => { setConversionType("postview") }} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                    <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Post-View"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>

                                <div style={{ display: "flex", marginTop: "8px", marginBottom: "12px" }}>
                                    <RadioButton checked={conversionType === "postclick"} onClick={(e) => { setConversionType("postclick") }} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                    <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Post-Click"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"URL Pattern"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Input placeholder="Enter a conversion url..." value={conversionUrl} onChange={event => setConversionUrl(event.target.value)}></Input>
                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Window"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setConversionWindow}
                                    value={conversionWindow}
                                    defaultValue={{ value: 30, label: '30 Days' }}
                                    options={windowTypes}
                                />
                            </InputContainer>




                            <div style={{ display: "flex" }}>
                                {
                                    saving ?
                                        <Button style={{ marginLeft: "auto", marginTop: "28px", opacity: .7, cursor: "default" }}>
                                            <Text content={"Saving..."} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                        :
                                        <Button onClick={() => {
                                            validateForm() && updateAdSet()
                                        }} style={{ marginLeft: "auto", marginTop: "28px" }}>
                                            <Text content={"Save"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                                        </Button>
                                }
                            </div>
                        </>
                    </Section>
                </div>
            </div>
        </div >
    );
}

export default AdSet;
