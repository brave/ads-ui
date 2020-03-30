import { gql } from "apollo-boost";

export const AD_SET_NEW = gql`
query {
    segments {
        data {
            code
            name
        }
    }
}
`;

export const CREATE_AD_SET = gql`
mutation createAdSet($createAdSetInput: CreateAdSetInput!){
    createAdSet(createAdSetInput: $createAdSetInput) {
        id
    }
}
`;