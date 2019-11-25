import { createAdvertiserMutation } from "./AdvertiserNew.queries";
import _ from "lodash";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.advertiser = initializeAdvertiser();
    initializedData.validations = {};
    return initializedData;
}

function initializeAdvertiser() {
    return {
        name: '',
        billingEmail: '',
        phone: '',
        mailingAddress: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
        },
        state: 'active',
    }
}

export async function createAdvertiser(userId, advertiser, accessToken, context) {

    // Mailing and Billing Address will be the same for now.
    // Agreed defaults to true for now. 
    let createAdvertiserInput = {
        userId: userId,
        name: advertiser.name,
        phone: advertiser.phone,
        billingEmail: advertiser.billingEmail,
        mailingAddress: advertiser.mailingAddress,
        billingAddress: advertiser.mailingAddress,
        state: advertiser.state,
        agreed: true,
    }
    context.setState({
        saving: true,
    }, async () => {
        let data = await fetchData(createAdvertiserMutation(createAdvertiserInput), accessToken)
        context.setState({
            saving: false,
        },
            () => {
                window.location.href = context.props.match.url.replace("/new", `/${data.createAdvertiser.id}/overview`);
            }
        );
    });

}

export function validate(context) {
    validateName(context);
    validateEmail(context);
    validatePhone(context);
    validateMailingAddress(context);
    validateStatus(context);
    validateSaveButton(context);
}

async function fetchData(query, accessToken) {
    let url = `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql");
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    };

    let response = await fetch(url, options);
    let json = await response.json();
    return json.data;
}

function validateName(context) {
    if (context.state.advertiser.name === '') {
        let validations = context.state.validations;
        validations.name = { name: "Name", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (context.state.advertiser.name === '123') {
        let validations = context.state.validations;
        validations.name = { name: "Name", state: "error", error: "Field cannot contain numbers." }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.name = { name: "Name", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validateEmail(context) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (context.state.advertiser.billingEmail === '') {
        let validations = context.state.validations;
        validations.billingEmail = { name: "E-mail Address", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (!emailRegex.test(context.state.advertiser.billingEmail)) {
        let validations = context.state.validations;
        validations.billingEmail = { name: "E-mail Address", state: "error", error: "Please enter a valid e-mail address." }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.billingEmail = { name: "E-mail Address", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validatePhone(context) {
    if (context.state.advertiser.phone === '') {
        let validations = context.state.validations;
        validations.phone = { name: "Phone Number", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (context.state.advertiser.phone.length > 23) {
        let validations = context.state.validations;
        validations.phone = { name: "Phone Number", state: "error", error: "Please enter a valid phone number." }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.phone = { name: "Phone Number", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validateMailingAddress(context) {
    if (
        context.state.advertiser.mailingAddress.street1 === '' ||
        context.state.advertiser.mailingAddress.city === '' ||
        context.state.advertiser.mailingAddress.state === '' ||
        context.state.advertiser.mailingAddress.country === '' ||
        context.state.advertiser.mailingAddress.zipcode === ''
    ) {
        let validations = context.state.validations;
        validations.mailingAddress = { name: "Address", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (context.state.advertiser.mailingAddress.zipcode.length > 15) {
        let validations = context.state.validations;
        validations.mailingAddress = { name: "Address", state: "error", error: "Please enter a valid zip code." }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.mailingAddress = { name: "Address", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validateStatus(context) {
    if (context.state.advertiser.state === '') {
        let validations = context.state.validations;
        validations.state = { name: "Advertiser Status", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.state = { name: "Advertiser Status", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validateSaveButton(context) {
    if (
        context.state.validations.name.state === 'valid' &&
        context.state.validations.billingEmail.state === 'valid' &&
        context.state.validations.phone.state === 'valid' &&
        context.state.validations.mailingAddress.state === 'valid' &&
        context.state.validations.state.state === 'valid'
    ) {
        let validations = context.state.validations;
        validations.saveButton = {
            state: "valid"
        }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.saveButton = {
            state: "pending"
        }
        context.setState({ validations })
    }
}

export function mapState(state) {
    switch (state) {
        case 'active':
            return "Active"
        case "under_review":
            return "Under Review"
    }
}