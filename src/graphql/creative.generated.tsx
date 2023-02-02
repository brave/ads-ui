import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreativeFragment = { __typename?: 'Creative', id: string, createdAt: any, modifiedAt: any, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null };

export type CreateCreativeMutationVariables = Types.Exact<{
  input: Types.CreativeInput;
}>;


export type CreateCreativeMutation = { __typename?: 'Mutation', createCreative: { __typename?: 'Creative', id: string } };

export type UpdateCreativeMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.CreativeInput;
}>;


export type UpdateCreativeMutation = { __typename?: 'Mutation', updateCreative: { __typename?: 'Creative', id: string } };

export const CreativeFragmentDoc = gql`
    fragment Creative on Creative {
  id
  createdAt
  modifiedAt
  name
  state
  type {
    code
  }
  payloadNotification {
    body
    title
    targetUrl
  }
}
    `;
export const CreateCreativeDocument = gql`
    mutation createCreative($input: CreativeInput!) {
  createCreative(creative: $input) {
    id
  }
}
    `;
export type CreateCreativeMutationFn = Apollo.MutationFunction<CreateCreativeMutation, CreateCreativeMutationVariables>;

/**
 * __useCreateCreativeMutation__
 *
 * To run a mutation, you first call `useCreateCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreativeMutation, { data, loading, error }] = useCreateCreativeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreativeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCreativeMutation, CreateCreativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCreativeMutation, CreateCreativeMutationVariables>(CreateCreativeDocument, options);
      }
export type CreateCreativeMutationHookResult = ReturnType<typeof useCreateCreativeMutation>;
export type CreateCreativeMutationResult = Apollo.MutationResult<CreateCreativeMutation>;
export type CreateCreativeMutationOptions = Apollo.BaseMutationOptions<CreateCreativeMutation, CreateCreativeMutationVariables>;
export const UpdateCreativeDocument = gql`
    mutation updateCreative($id: String!, $input: CreativeInput!) {
  updateCreative(id: $id, creative: $input) {
    id
  }
}
    `;
export type UpdateCreativeMutationFn = Apollo.MutationFunction<UpdateCreativeMutation, UpdateCreativeMutationVariables>;

/**
 * __useUpdateCreativeMutation__
 *
 * To run a mutation, you first call `useUpdateCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreativeMutation, { data, loading, error }] = useUpdateCreativeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCreativeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCreativeMutation, UpdateCreativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCreativeMutation, UpdateCreativeMutationVariables>(UpdateCreativeDocument, options);
      }
export type UpdateCreativeMutationHookResult = ReturnType<typeof useUpdateCreativeMutation>;
export type UpdateCreativeMutationResult = Apollo.MutationResult<UpdateCreativeMutation>;
export type UpdateCreativeMutationOptions = Apollo.BaseMutationOptions<UpdateCreativeMutation, UpdateCreativeMutationVariables>;