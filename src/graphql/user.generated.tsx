import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UserFragment = {
  email: string;
  fullName: string;
  id: string;
  role: string;
};

export type LoadUserQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type LoadUserQuery = {
  user: { email: string; fullName: string; id: string; role: string };
};

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = {
  updateUser: { email: string; fullName: string; id: string; role: string };
};

export const UserFragmentDoc = gql`
  fragment User on User {
    email
    fullName
    id
    role
  }
`;
export const LoadUserDocument = gql`
  query LoadUser($id: String!) {
    user(id: $id) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useLoadUserQuery__
 *
 * To run a query within a React component, call `useLoadUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadUserQuery(
  baseOptions: Apollo.QueryHookOptions<LoadUserQuery, LoadUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoadUserQuery, LoadUserQueryVariables>(
    LoadUserDocument,
    options,
  );
}
export function useLoadUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadUserQuery,
    LoadUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoadUserQuery, LoadUserQueryVariables>(
    LoadUserDocument,
    options,
  );
}
export type LoadUserQueryHookResult = ReturnType<typeof useLoadUserQuery>;
export type LoadUserLazyQueryHookResult = ReturnType<
  typeof useLoadUserLazyQuery
>;
export type LoadUserQueryResult = Apollo.QueryResult<
  LoadUserQuery,
  LoadUserQueryVariables
>;
export function refetchLoadUserQuery(variables: LoadUserQueryVariables) {
  return { query: LoadUserDocument, variables: variables };
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
