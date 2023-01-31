import { gql } from "@apollo/client";

export const ADVERTISER = gql`
query advertiser($id: String!){
    advertiser(id: $id) {
        id
        publicKey
}
}
`;

export const UPDATE_ADVERTISER = gql`
mutation updateAdvertiser($updateAdvertiserInput: UpdateAdvertiserInput!){
    updateAdvertiser(updateAdvertiserInput: $updateAdvertiserInput) {
        id
        publicKey
}
}
`;
