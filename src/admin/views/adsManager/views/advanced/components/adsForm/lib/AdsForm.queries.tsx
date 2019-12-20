export function creativeAssetsQuery(creativeId) {
    return `
    query{
        creative(id: "${creativeId}"){
            payload{
                title
                body
            }
        }
    }`

}