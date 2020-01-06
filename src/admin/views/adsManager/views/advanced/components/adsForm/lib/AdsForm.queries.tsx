export function creativeAssetsQuery(creativeId) {
    return `
    query{
        creative(id: "${creativeId}"){
            name, 
            payload{
                title,
                body,
                targetUrl
            }
        }
    }`

}

export function creativeTypeQuery(creativeId) {
    return `
    query{
        creative(id: "${creativeId}"){
                type {
                    code
                }
            }
    }`

}