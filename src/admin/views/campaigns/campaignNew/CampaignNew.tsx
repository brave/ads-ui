import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@material-ui/core';
import moment from "moment";

import Section from '../../../../components/section/Section';
import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../components/formElements/formElements";
import { Text } from "../../../../components/Text/Text";
import Select from 'react-select';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { CAMPAIGN_NEW, CREATE_CAMPAIGN } from "./lib/CampaignNew.queries";

import Context from "../../../../state/context";
import RadioButton from '../../../../components/radioButton/RadioButton';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#fafafa"
    }),
}

const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'BAT', label: 'BAT' },
]

const statusTypes = [
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'alert', label: 'Alert' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'complete', label: 'Completed' },
    { value: 'daycomplete', label: 'Daycomplete' },
    { value: 'draft', label: 'Draft' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'deleted', label: 'Deleted' }
]

const campaignTypes = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'barter', label: 'Barter' },
    { value: 'make_good', label: 'Make Good' },
    { value: 'house', label: 'House' },
    { value: 'cause', label: 'Cause' },
    { value: 'fixed', label: 'Fixed' }
]

const CampaignNew = props => {

    const context = useContext(Context);

    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [externalId, setExternalId] = useState('');
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD[T]HH:mm'));
    const [endDate, setEndDate] = useState(moment().add(1, "month").format('YYYY-MM-DD[T]HH:mm'));
    const [campaignType, setCampaignType] = useState({ value: "paid", label: "Paid" });
    const [status, setStatus] = useState({ value: "active", label: "Active" });
    const [currency, setCurrency] = useState({ value: "USD", label: "USD" });
    const [lifetimeBudget, setLifetimeBudget] = useState('');
    const [dailyBudget, setDailyBudget] = useState('');
    const [locations, setLocations] = useState([] as any);
    const [activeLocations, setActiveLocations] = useState([]);
    const [onSchedule, setOnSchedule] = useState(false);
    const [schedule, setSchedule] = useState(
        {
            sunday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            monday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            tuesday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            wednesday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            thursday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            friday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            saturday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        }
    );

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [validations, setValidations] = useState({} as any);

    const handleUpdateCampaign = data => {
        setError(false);
        setSuccess(true);
        setSaving(false);

        setTimeout(() => {
            props.history.push(`/admin/main/users/${props.match.params.userId}/advertiser/${props.match.params.advertiserId}/campaign/${data.createCampaign.id}`)
        }, 3000)
    }

    const prepareGeoTargetsInput = () => {
        let temp = [] as any;
        if (locations) {
            locations.forEach((location) => {
                temp.push({
                    code: location.value,
                    name: location.label
                })
            })
        }
        return temp;
    }

    const convertScheduleToDayPart = () => {
        if (onSchedule) {
            let dayPartings = [] as any;
            let startMinute: any = null;
            let endMinute: any = null;
            Object.keys(schedule).forEach((day, i) => {
                schedule[day].forEach((segment, j) => {
                    if (segment === true && startMinute === null) {
                        startMinute = j * 60;
                    }
                    if ((segment === false || j === 23) && startMinute !== null && endMinute === null) {
                        if (j !== 23) {
                            endMinute = j * 60;
                        } else {
                            endMinute = 1440;
                        }
                        dayPartings.push({ dow: i.toString(), startMinute, endMinute });
                        startMinute = null;
                        endMinute = null;
                    }
                });
            })
            return dayPartings;
        } else {
            return [];
        }
    }

    const [createCampaign, { loading: updateNotificationCreativeLoading, error: updateNotificationCreativeError }] =
        useMutation(CREATE_CAMPAIGN, {
            variables: {
                createCampaignInput: {
                    userId: props.match.params.userId,
                    advertiserId: props.match.params.advertiserId,
                    id: props.match.params.campaignId,
                    name,
                    state: status.value,
                    dailyCap: parseInt(frequency),
                    externalId,
                    currency: currency.value,
                    budget: parseFloat(lifetimeBudget.replace(/[^\d.]/g, '')),
                    dailyBudget: parseFloat(dailyBudget.replace(/[^\d.]/g, '')),
                    startAt: moment(startDate).utc().format("YYYY-MM-DD[T]HH:mm:SS.000[Z]"),
                    endAt: moment(endDate).utc().format("YYYY-MM-DD[T]HH:mm:SS.000[Z]"),
                    type: campaignType.value,
                    source: "direct",
                    geoTargets: prepareGeoTargetsInput(),
                    dayPartings: convertScheduleToDayPart()
                }
            },
            onCompleted: handleUpdateCampaign
        });

    const handleCurrency = event => {
        setDailyBudget('');
        setLifetimeBudget('');
        setCurrency(event)
    }

    const formatLifetimeBudget = () => {
        let formattedString = lifetimeBudget.replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (currency.label === "USD") {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        if (formattedString.includes("NaN")) {
            formattedString = '';
        }
        setLifetimeBudget(formattedString);
    }

    const formatDailyBudget = () => {
        let formattedString = dailyBudget.replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (currency.label === "USD") {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        if (formattedString.includes("NaN")) {
            formattedString = '';
        }
        setDailyBudget(formattedString);
    }


    const initializeCampaign = data => {

        let activeLocationsTemp = [] as any;

        if (data.activeGeocodes.data) {
            data.activeGeocodes.data.forEach((activeGeocode) => {
                activeLocationsTemp.push({
                    value: activeGeocode.code, label: activeGeocode.name
                })
            })
        }

        setActiveLocations(activeLocationsTemp);

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

        if (frequency === '') {
            validations.frequencyValidation = "Frequency field is required";
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

    const updateSchedule = (day, index, value, e?) => {
        if (e.buttons == 1 || e.buttons == 3) {
            let temp = { ...schedule };
            temp[day][index] = value;
            setSchedule(temp);
        }
    }

    const renderSchedule = () => {
        return <div style={{ width: "100%", marginTop: "24px" }}>
            <div style={{ display: "flex", width: "100%", marginLeft: "110px", marginBottom: "2px" }}>
                <div style={{ width: "69px" }}>
                    <Text content={"12am"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"3am"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"6am"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"9am"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"12pm"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"3pm"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"6pm"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                <div style={{ width: "69px" }}>
                    <Text content={"9pm"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Monday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.monday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("monday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("monday", i, true, e)} onMouseOver={(e) => updateSchedule("monday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Tuesday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.tuesday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("tuesday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("tuesday", i, true, e)} onMouseOver={(e) => updateSchedule("tuesday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Wednesday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.wednesday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("wednesday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("wednesday", i, true, e)} onMouseOver={(e) => updateSchedule("wednesday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Thursday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.thursday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("thursday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("thursday", i, true, e)} onMouseOver={(e) => updateSchedule("thursday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Friday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.friday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("friday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("friday", i, true, e)} onMouseOver={(e) => updateSchedule("friday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Saturday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.saturday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("saturday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("saturday", i, true, e)} onMouseOver={(e) => updateSchedule("saturday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
            <div style={{ display: "flex", width: "100%", paddingBottom: "8px", paddingTop: "8px", borderBottom: "1px solid #e2e2e2" }}>
                <div style={{ display: "flex", width: "110px", height: "34px", alignItems: "center" }}>
                    <Text content={"Sunday"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                </div>
                {schedule.sunday.map((hour, i) => {
                    if (hour) {
                        return <div onMouseDown={(e) => updateSchedule("sunday", i, false, e)} style={{ width: "21px", height: "34px", backgroundColor: "#F87454", borderRadius: "4px", marginRight: "2px", cursor: "pointer" }}></div>
                    } else {
                        return <div onMouseDown={(e) => updateSchedule("sunday", i, true, e)} onMouseOver={(e) => updateSchedule("sunday", i, true, e)} style={{ width: "21px", height: "34px", backgroundColor: "#FAFAFA", borderRadius: "4px", border: "1px solid #e2e2e2", marginRight: "2px", cursor: "pointer" }}></div>
                    }
                })}
            </div>
        </div>
    }

    const { loading: queryLoading, error: queryError, data } = useQuery(CAMPAIGN_NEW, {
        onCompleted: initializeCampaign,
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
                                <Text content={"Campaign saved successfully. Redirecting..."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
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
                            <Text content={"Campaign Details"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Define the parameters of your ad campaign."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>


                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Campaign Name"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
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
                                    <Text content={"Frequency"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {
                                    !validations.frequencyValidation ?
                                        <Input value={frequency} onChange={event => setFrequency(event.target.value)}></Input>
                                        :
                                        <>
                                            <Input error={true} value={frequency} onChange={event => setFrequency(event.target.value)}></Input>
                                            <Text style={{ marginTop: "4px" }} color={"#E32444"} content={validations.frequencyValidation} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                        </>
                                }

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"External ID"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Input value={externalId} onChange={event => setExternalId(event.target.value)}></Input>
                            </InputContainer>

                            <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                                <InputContainer style={{ width: "45%" }}>
                                    <div style={{ display: "flex" }}>
                                        <Text content={"Start Date"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </div>
                                    <Input value={startDate} onChange={event => setStartDate(event.target.value)} type="datetime-local" />
                                </InputContainer>

                                <div style={{ width: "10%", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>
                                    <Icon style={{ fontSize: "20px", marginBottom: "6px", color: "grey" }}>arrow_forward</Icon>
                                </div>

                                <InputContainer style={{ width: "45%" }}>
                                    <div style={{ display: "flex" }}>
                                        <Text content={"End Date"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    </div>
                                    <Input value={endDate} onChange={event => setEndDate(event.target.value)} type="datetime-local" />
                                </InputContainer>
                            </div>

                            <div style={{ width: "99%", display: "flex", marginTop: "-12px", marginRight: "8px", marginBottom: "8px" }}>
                                <Text style={{ marginLeft: "auto" }} content={`${(new Date).toString().split('(')[1].slice(0, -1)} (UTC ${moment().format('Z')})`} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Scheduling"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <div style={{ display: "flex", marginTop: "16px", marginBottom: "8px" }}>
                                    <RadioButton checked={!onSchedule} onClick={() => setOnSchedule(false)} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                    <Text style={{ marginTop: "-1px", marginLeft: "8px", marginRight: "16px" }} content={"Run ads all the time"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
                                    <RadioButton checked={onSchedule} onClick={() => setOnSchedule(true)} style={{ marginRight: "8px" }} type="radio" name="gender" value="male" />
                                    <Text style={{ marginTop: "-1px", marginLeft: "8px" }} content={"Run ads on a schedule"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                {onSchedule && renderSchedule()}
                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Type"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setCampaignType}
                                    value={campaignType}
                                    options={campaignTypes}
                                />

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

                            <Text content={"Budgets"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Set a limit on how much your campaign will spend."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Lifetime Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <Input value={lifetimeBudget} onChange={(event) => setLifetimeBudget(event.target.value)} onBlur={formatLifetimeBudget} style={{ marginRight: "12px" }} />
                                    <div style={{ marginTop: "4px", width: "160px" }}>
                                        <Select
                                            styles={customStyles}
                                            options={currencies}
                                            value={currency}
                                            onChange={handleCurrency}
                                        />
                                    </div>
                                </div>
                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Daily Budget"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                    <Icon style={{ fontSize: "16px", color: "#ACB0B5", marginTop: "1px", marginLeft: "2px" }}>info</Icon>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <Input value={dailyBudget} onChange={(event) => setDailyBudget(event.target.value)} onBlur={formatDailyBudget} style={{ marginRight: "12px" }} />
                                    <div style={{ marginTop: "4px", width: "160px" }}>
                                        <Select
                                            styles={customStyles}
                                            options={currencies}
                                            value={currency}
                                            onChange={handleCurrency}
                                        />
                                    </div>
                                </div>
                            </InputContainer>

                            <Divider />

                            <Text content={"Location"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                            <div style={{ display: "flex" }}>
                                <Text content={"Select the geographic regions where your ads will be shown."} style={{ marginTop: "2px", marginBottom: "28px" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                <Text title="Wiki's coming soon!" content={"Learn More."} color={"#E0694C"} style={{ marginTop: "2px", marginBottom: "28px", marginLeft: "4px", cursor: "pointer" }} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                            </div>

                            <InputContainer>
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Location"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setLocations}
                                    value={locations}
                                    options={activeLocations}
                                    isMulti={true}
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
                                            validateForm() && createCampaign()
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

export default CampaignNew;