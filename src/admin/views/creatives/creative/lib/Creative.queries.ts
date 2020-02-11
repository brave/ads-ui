import { gql } from "apollo-boost";

export const CREATIVE = gql`
query creative($id: String!){
    creative(id: $id) {
        id
        createdAt
        modifiedAt
        name
        state
        type {
            code 
            name
        }
        payload {
            body
            title
            targetUrl
        }
    }
}
`;

export const UPDATE_NOTIFICATION_CREATIVE = gql`
mutation updateNotificationCreative($updateNotificationCreativeInput: UpdateNotificationCreativeInput!){
    updateNotificationCreative(updateNotificationCreativeInput: $updateNotificationCreativeInput) {
        id
        createdAt
        modifiedAt
        name
        state
        type {
            code 
            name
        }
        payload {
            body
            title
            targetUrl
        }
    }
}
`;