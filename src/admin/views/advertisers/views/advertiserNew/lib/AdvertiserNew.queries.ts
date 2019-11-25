export function createAdvertiserMutation(createAdvertiserInput) {
    return `
    mutation{
        createAdvertiser(
        createAdvertiserInput: ${JSON.stringify(createAdvertiserInput).replace(/\"([^(\")"]+)\":/g, "$1:")}
        ){
            id
        }
    }
    `
};