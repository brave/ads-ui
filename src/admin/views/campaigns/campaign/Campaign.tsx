import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@material-ui/core';

import Section from '../../../../components/section/Section';
import { Divider, Input, InputContainer, Selection, Button, MessageContainer, ErrorIcon, SuccessIcon, Message } from "../../../../components/formElements/formElements";
import { Text } from "../../../../components/Text/Text";
import Select from 'react-select';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { CAMPAIGN, UPDATE_CAMPAIGN } from "./lib/Campaign.queries";

import Context from "../../../../state/context";
import TabSelector from '../../../../components/tabSelector/TabSelector';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
    { value: 'fixed', label: "Fixed" }
]

const priorityTypes = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
]

const Campaign = props => {

    const context = useContext(Context);

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;

    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [priority, setPriority] = useState({ value: 1, label: "1" });
    const [passThroughRate, setPassThroughRate] = useState('');
    const [externalId, setExternalId] = useState('');
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD[T]HH:mm'));
    const [endDate, setEndDate] = useState(moment().add(1, "month").format('YYYY-MM-DD[T]HH:mm'));
    const [pacingOverride, setPacingOverride] = useState(false);
    const [campaignType, setCampaignType] = useState({ value: "paid", label: "Paid" });
    const [status, setStatus] = useState({ value: "active", label: "Active" });
    const [currency, setCurrency] = useState({ value: "USD", label: "USD" });
    const [lifetimeBudget, setLifetimeBudget] = useState('');
    const [dailyBudget, setDailyBudget] = useState('');
    const [locations, setLocations] = useState([] as any);
    const [activeLocations, setActiveLocations] = useState([])
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

    const { match } = props;

    const tabConfig = [
        { label: "Overview", selected: true, link: props.match.url },
        { label: "Ad Sets", selected: false, link: props.match.url.concat("/creativeSet") },
    ]

    const handleUpdateCampaign = data => {
        setError(false);
        setSuccess(true);
        setSaving(false);
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

    const [updateCampaign, { loading: updateNotificationCreativeLoading, error: updateNotificationCreativeError }] =
        useMutation(UPDATE_CAMPAIGN, {
            variables: {
                updateCampaignInput: {
                    id: props.match.params.campaignId,
                    name,
                    state: status.value,
                    dailyCap: parseInt(frequency),
                    priority: priority.value,
                    passThroughRate: parseFloat(passThroughRate),
                    externalId,
                    currency: currency.value,
                    budget: parseFloat(lifetimeBudget.replace(/[^\d.]/g, '')),
                    dailyBudget: parseFloat(dailyBudget.replace(/[^\d.]/g, '')),
                    startAt: moment(startDate).utc().format("YYYY-MM-DD[T]HH:mm:SS.000[Z]"),
                    endAt: moment(endDate).utc().format("YYYY-MM-DD[T]HH:mm:SS.000[Z]"),
                    pacingOverride,
                    dayPartings: convertScheduleToDayPart(),
                    type: campaignType.value,
                    geoTargets: prepareGeoTargetsInput()
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

    const matchDayPartingToSchedule = (index) => {
        if (index === "0") {
            return "sunday"
        } else if (index === "1") {
            return "monday"
        } else if (index === "2") {
            return "tuesday"
        } else if (index === "3") {
            return "wednesday"
        } else if (index === "4") {
            return "thursday"
        } else if (index === "5") {
            return "friday"
        } else if (index === "6") {
            return "saturday"
        } else {
            return "null";
        }
    }


    const initializeCampaign = data => {
        setName(data.campaign.name);
        setFrequency(data.campaign.dailyCap);
        setPriority({ value: data.campaign.priority, label: data.campaign.priority.toString() });
        setPassThroughRate(data.campaign.passThroughRate);
        setPacingOverride(data.campaign.pacingOverride);
        setExternalId(data.campaign.externalId);

        setStartDate(moment(data.campaign.startAt).format('YYYY-MM-DD[T]HH:mm'));
        setEndDate(moment(data.campaign.endAt).format('YYYY-MM-DD[T]HH:mm'));

        setCampaignType({ value: data.campaign.type, label: data.campaign.type })
        setStatus({ value: data.campaign.state, label: data.campaign.state })
        setCurrency({ value: data.campaign.currency, label: data.campaign.currency })

        let formattedString;

        formattedString = data.campaign.budget.toString().replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (data.campaign.currency === 'USD') {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        if (formattedString.includes("NaN")) {
            formattedString = '';
        }
        setLifetimeBudget(formattedString);

        formattedString = data.campaign.dailyBudget.toString().replace(/[^\d.]/g, '');
        formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (data.campaign.currency === 'USD') {
            formattedString = "$" + formattedString;
        }
        else {
            formattedString = formattedString + " BAT";
        }
        if (formattedString.includes("NaN")) {
            formattedString = '';
        }
        setDailyBudget(formattedString);

        let temp = [] as any;

        if (data.campaign.geoTargets) {
            data.campaign.geoTargets.forEach((geoTarget) => {
                temp.push({ value: geoTarget.code, label: geoTarget.name })
            })
        }

        setLocations(temp);

        let activeLocationsTemp = [] as any;

        if (data.activeGeocodes.data) {
            data.activeGeocodes.data.forEach((activeGeocode) => {
                activeLocationsTemp.push({
                    value: activeGeocode.code, label: activeGeocode.name
                })
            })
        }

        setActiveLocations(activeLocationsTemp);

        let tempSchedule = {
            sunday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            monday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            tuesday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            wednesday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            thursday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            friday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            saturday: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        }

        if (data.campaign.dayPartings && data.campaign.dayPartings.length > 0) {
            setOnSchedule(true);
            data.campaign.dayPartings.forEach((dayParting) => {
                let startIndex = dayParting.startMinute / 60;
                let endIndex = dayParting.endMinute / 60;
                for (let j = startIndex; j < endIndex; j++) {
                    tempSchedule[matchDayPartingToSchedule(dayParting.dow)][j] = true;
                }
            })
        } else {
            setOnSchedule(false);
        }

        setSchedule({ ...tempSchedule })

        // setStatus({ value: data.creative.state, label: data.creative.state });


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

    const { loading: queryLoading, error: queryError, data } = useQuery(CAMPAIGN, {
        variables: { id: props.match.params.campaignId },
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
                                <Text content={"Campaign saved successfully."} sizes={[16, 16, 15, 15, 14]} fontFamily={"Poppins"} />
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

                    <div style={{ display: "flex", marginBottom: "28px", alignItems: "center" }}>

                        <Link style={{ textDecoration: "none", color: "#2C2C2C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/organization/${match.params.advertiserId}/overview`}>
                            <Text style={{ cursor: "pointer" }} content={"Advertiser"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        </Link>

                        <Icon style={{ fontSize: "25px", marginTop: "2px" }}>chevron_right</Icon>

                        <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={match.url}>
                            <Text style={{ cursor: "pointer" }} content={"Campaign"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        </Link>

                        <Icon style={{ fontSize: "25px", marginTop: "2px" }}>chevron_right</Icon>
                        <Link style={{ textDecoration: "none", color: "#2C2C2C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={match.url.concat("/creativeSet")}>
                            <Text style={{ cursor: "pointer" }} content={"Ad Sets"} sizes={[16, 16, 15, 15, 18]} fontFamily={"Poppins"} />
                        </Link>

                        <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginLeft: "auto" }} to={`/admin/main/organization/${match.params.advertiserId}/campaign/${match.params.campaignId}/analytics/overview`}>
                            <Button style={{ width: "140px", marginTop: "2px" }}>
                                <Text content={"View Reporting"} style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"} />
                            </Button>
                        </Link>

                    </div>

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
                                <div style={{ display: "flex", marginBottom: "4px" }}>
                                    <Text content={"Priority"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Select
                                    styles={customStyles}
                                    onChange={setPriority}
                                    value={priority}
                                    options={priorityTypes}
                                />

                            </InputContainer>

                            <InputContainer>
                                <div style={{ display: "flex" }}>
                                    <Text content={"Pass Through Rate"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                                </div>
                                <Input value={passThroughRate} onChange={event => setPassThroughRate(event.target.value)}></Input>
                            </InputContainer>

                            <div style={{ width: "99%", display: "flex", marginTop: "-12px", marginRight: "8px", marginBottom: "8px" }}>
                                <Text style={{ marginLeft: "auto" }} content={`Pacing Override`} sizes={[16, 16, 15, 15, 12]} fontFamily={"Poppins"} />
                                <input checked={pacingOverride} onChange={event => setPacingOverride(event.target.checked)} type="checkbox"></input>
                            </div>

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
                                            validateForm() && updateCampaign()
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

export default Campaign;