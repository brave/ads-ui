import { advertiserQuery, updateAdvertiserMutation } from "./OrganizationOverview.queries";
import _ from "lodash";

export async function initializeData(context) {
    let initializedData = {} as any;
    let advertiser = await initializeAdvertiser(context.props.match.params.advertiserId, context.props.auth.accessToken);
    initializedData.originalAdvertiser = _.cloneDeep(advertiser);
    initializedData.newAdvertiser = _.cloneDeep(advertiser);
    initializedData.validations = {};
    return initializedData;
}

async function initializeAdvertiser(advertiserId, accessToken) {
    let data = await fetchData(advertiserQuery(advertiserId), accessToken)
    let response = data.advertiser;
    return response;
}

export async function updateAdvertiser(advertiserId, advertiser, accessToken, context) {

    // Mailing and Billing Address will be the same for now
    let updateAdvertiserInput = {
        id: advertiser.id,
        name: advertiser.name,
        phone: advertiser.phone,
        referrer: advertiser.referrer,
        billingEmail: advertiser.billingEmail,
        mailingAddress: advertiser.mailingAddress,
        billingAddress: advertiser.mailingAddress,
        state: advertiser.state
    }
    context.setState({
        saving: true,
    }, async () => {
        let data = await fetchData(updateAdvertiserMutation(updateAdvertiserInput), accessToken)
        context.setState({
            saving: false,
        },
            () => {
                alert("Save successful!")
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
    if (context.state.newAdvertiser.name === '') {
        let validations = context.state.validations;
        validations.name = { name: "Name", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (context.state.newAdvertiser.name === '123') {
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
    if (context.state.newAdvertiser.billingEmail === '') {
        let validations = context.state.validations;
        validations.billingEmail = { name: "E-mail Address", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (!emailRegex.test(context.state.newAdvertiser.billingEmail)) {
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
    if (context.state.newAdvertiser.phone === '') {
        let validations = context.state.validations;
        validations.phone = { name: "Phone Number", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else if (context.state.newAdvertiser.phone.length > 23) {
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
        context.state.newAdvertiser.mailingAddress.street1 === '' ||
        context.state.newAdvertiser.mailingAddress.city === '' ||
        context.state.newAdvertiser.mailingAddress.country === ''
    ) {
        let validations = context.state.validations;
        validations.mailingAddress = { name: "Address", state: "pending", error: undefined }
        context.setState({ validations })
    }
    else {
        let validations = context.state.validations;
        validations.mailingAddress = { name: "Address", state: "valid", error: undefined }
        context.setState({ validations })
    }
}

function validateStatus(context) {
    if (context.state.newAdvertiser.state === '') {
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