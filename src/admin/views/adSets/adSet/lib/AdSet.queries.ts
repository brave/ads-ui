import { gql } from "apollo-boost";

export const AD_SET = gql`
query adSet($id: String!){
    adSet(id: $id) {
        id
        state
        createdAt
        modifiedAt
        billingType
        execution
        perDay
        totalMax
        segments {
            code
            name
        }
        oses {
            code
            name
        }
        conversions {
           urlPattern
           type
           observationWindow
        }
    }
    segments {
        data {
            code
            name
        }
    }
}
`;

export const UPDATE_AD_SET = gql`
mutation updateAdSet($updateAdSetInput: UpdateAdSetInput!){
    updateAdSet(updateAdSetInput: $updateAdSetInput) {
        id
    }
}
`;