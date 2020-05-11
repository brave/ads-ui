import { gql } from "apollo-boost";

export const ORGANIZATION_USERS = gql`
query advertiser($id: String!){
    advertiser(id: $id) {
        id
        userAdvertisers {
            userId
            user {
                fullName
                createdAt
                role
                email
            }
        }
    }
}
`;
