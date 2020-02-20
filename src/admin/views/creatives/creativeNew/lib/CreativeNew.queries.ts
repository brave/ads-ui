import { gql } from "apollo-boost";

export const CREATE_NOTIFICATION_CREATIVE = gql`
mutation createNotificationCreative($createNotificationCreativeInput: CreateNotificationCreativeInput!){
    createNotificationCreative(createNotificationCreativeInput: $createNotificationCreativeInput) {
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

export const CREATE_IN_PAGE_CREATIVE = gql`
mutation createInPageCreative($createInPageCreativeInput: CreateInPageCreativeInput!){
    createInPageCreative(createInPageCreativeInput: $createInPageCreativeInput) {
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
            size
            creativeUrl
            targetUrl
        }
    }
}
`;