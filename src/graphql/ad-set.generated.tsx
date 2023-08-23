import * as Types from "./types";

import { gql } from "@apollo/client";
import { CreativeFragmentDoc } from "./creative.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AdSetFragment = {
  id: string;
  createdAt: any;
  billingType?: string | null;
  name?: string | null;
  totalMax: number;
  perDay: number;
  state: string;
  execution?: string | null;
  keywords?: Array<string> | null;
  keywordSimilarity?: number | null;
  negativeKeywords?: Array<string> | null;
  bannedKeywords?: Array<string> | null;
  segments?: Array<{ code: string; name: string }> | null;
  oses?: Array<{ code: string; name: string }> | null;
  conversions?: Array<{
    id: string;
    type: string;
    urlPattern: string;
    observationWindow: number;
  }> | null;
  ads?: Array<{
    id: string;
    state: string;
    price: string;
    priceType: Types.ConfirmationType;
    creative: {
      id: string;
      createdAt: any;
      modifiedAt: any;
      name: string;
      state: string;
      type: { code: string };
      payloadNotification?: {
        body: string;
        title: string;
        targetUrl: string;
      } | null;
    };
  }> | null;
};

export type AdFragment = {
  id: string;
  state: string;
  price: string;
  priceType: Types.ConfirmationType;
  creative: {
    id: string;
    createdAt: any;
    modifiedAt: any;
    name: string;
    state: string;
    type: { code: string };
    payloadNotification?: {
      body: string;
      title: string;
      targetUrl: string;
    } | null;
  };
};

export type CreateAdSetMutationVariables = Types.Exact<{
  createAdSetInput: Types.CreateAdSetInput;
}>;

export type CreateAdSetMutation = {
  createAdSet: {
    id: string;
    createdAt: any;
    billingType?: string | null;
    name?: string | null;
    totalMax: number;
    perDay: number;
    state: string;
    execution?: string | null;
    keywords?: Array<string> | null;
    keywordSimilarity?: number | null;
    negativeKeywords?: Array<string> | null;
    bannedKeywords?: Array<string> | null;
    segments?: Array<{ code: string; name: string }> | null;
    oses?: Array<{ code: string; name: string }> | null;
    conversions?: Array<{
      id: string;
      type: string;
      urlPattern: string;
      observationWindow: number;
    }> | null;
    ads?: Array<{
      id: string;
      state: string;
      price: string;
      priceType: Types.ConfirmationType;
      creative: {
        id: string;
        createdAt: any;
        modifiedAt: any;
        name: string;
        state: string;
        type: { code: string };
        payloadNotification?: {
          body: string;
          title: string;
          targetUrl: string;
        } | null;
      };
    }> | null;
  };
};

export type UpdateAdSetMutationVariables = Types.Exact<{
  updateAdSetInput: Types.UpdateAdSetInput;
}>;

export type UpdateAdSetMutation = {
  updateAdSet: {
    id: string;
    createdAt: any;
    billingType?: string | null;
    name?: string | null;
    totalMax: number;
    perDay: number;
    state: string;
    execution?: string | null;
    keywords?: Array<string> | null;
    keywordSimilarity?: number | null;
    negativeKeywords?: Array<string> | null;
    bannedKeywords?: Array<string> | null;
    segments?: Array<{ code: string; name: string }> | null;
    oses?: Array<{ code: string; name: string }> | null;
    conversions?: Array<{
      id: string;
      type: string;
      urlPattern: string;
      observationWindow: number;
    }> | null;
    ads?: Array<{
      id: string;
      state: string;
      price: string;
      priceType: Types.ConfirmationType;
      creative: {
        id: string;
        createdAt: any;
        modifiedAt: any;
        name: string;
        state: string;
        type: { code: string };
        payloadNotification?: {
          body: string;
          title: string;
          targetUrl: string;
        } | null;
      };
    }> | null;
  };
};

export const AdFragmentDoc = gql`
  fragment Ad on Ad {
    id
    state
    price
    priceType
    creative {
      ...Creative
    }
  }
  ${CreativeFragmentDoc}
`;
export const AdSetFragmentDoc = gql`
  fragment AdSet on AdSet {
    id
    createdAt
    billingType
    name
    totalMax
    perDay
    state
    execution
    keywords
    keywordSimilarity
    negativeKeywords
    bannedKeywords
    segments {
      code
      name
    }
    oses {
      code
      name
    }
    conversions {
      id
      type
      urlPattern
      observationWindow
    }
    ads {
      ...Ad
    }
  }
  ${AdFragmentDoc}
`;
export const CreateAdSetDocument = gql`
  mutation createAdSet($createAdSetInput: CreateAdSetInput!) {
    createAdSet(createAdSetInput: $createAdSetInput) {
      ...AdSet
    }
  }
  ${AdSetFragmentDoc}
`;
export type CreateAdSetMutationFn = Apollo.MutationFunction<
  CreateAdSetMutation,
  CreateAdSetMutationVariables
>;

/**
 * __useCreateAdSetMutation__
 *
 * To run a mutation, you first call `useCreateAdSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdSetMutation, { data, loading, error }] = useCreateAdSetMutation({
 *   variables: {
 *      createAdSetInput: // value for 'createAdSetInput'
 *   },
 * });
 */
export function useCreateAdSetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAdSetMutation,
    CreateAdSetMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAdSetMutation, CreateAdSetMutationVariables>(
    CreateAdSetDocument,
    options,
  );
}
export type CreateAdSetMutationHookResult = ReturnType<
  typeof useCreateAdSetMutation
>;
export type CreateAdSetMutationResult =
  Apollo.MutationResult<CreateAdSetMutation>;
export type CreateAdSetMutationOptions = Apollo.BaseMutationOptions<
  CreateAdSetMutation,
  CreateAdSetMutationVariables
>;
export const UpdateAdSetDocument = gql`
  mutation updateAdSet($updateAdSetInput: UpdateAdSetInput!) {
    updateAdSet(updateAdSetInput: $updateAdSetInput) {
      ...AdSet
    }
  }
  ${AdSetFragmentDoc}
`;
export type UpdateAdSetMutationFn = Apollo.MutationFunction<
  UpdateAdSetMutation,
  UpdateAdSetMutationVariables
>;

/**
 * __useUpdateAdSetMutation__
 *
 * To run a mutation, you first call `useUpdateAdSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdSetMutation, { data, loading, error }] = useUpdateAdSetMutation({
 *   variables: {
 *      updateAdSetInput: // value for 'updateAdSetInput'
 *   },
 * });
 */
export function useUpdateAdSetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAdSetMutation,
    UpdateAdSetMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAdSetMutation, UpdateAdSetMutationVariables>(
    UpdateAdSetDocument,
    options,
  );
}
export type UpdateAdSetMutationHookResult = ReturnType<
  typeof useUpdateAdSetMutation
>;
export type UpdateAdSetMutationResult =
  Apollo.MutationResult<UpdateAdSetMutation>;
export type UpdateAdSetMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdSetMutation,
  UpdateAdSetMutationVariables
>;
