import * as Types from "./types";

import { gql } from "@apollo/client";
import { CreativeFragmentDoc } from "./creative.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AdSetFragment = {
  __typename?: "AdSet";
  id: string;
  createdAt: any;
  billingType?: string | null;
  name?: string | null;
  totalMax: number;
  perDay: number;
  state: string;
  execution: string;
  keywords?: Array<string> | null;
  keywordSimilarity?: number | null;
  negativeKeywords?: Array<string> | null;
  bannedKeywords?: Array<string> | null;
  targetingTerms?: Array<string> | null;
  segments?: Array<{
    __typename?: "Segment";
    code: string;
    name: string;
  }> | null;
  oses?: Array<{ __typename?: "OS"; code: string; name: string }> | null;
  conversions?: Array<{
    __typename?: "Conversion";
    id: string;
    type: string;
    urlPattern: string;
    observationWindow: number;
    extractExternalId: boolean;
  }> | null;
  ads?: Array<{
    __typename?: "Ad";
    id: string;
    state: string;
    prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
    webhooks: Array<{ __typename?: "Webhook"; type: string; url: string }>;
    creative: {
      __typename?: "Creative";
      id: string;
      createdAt: any;
      modifiedAt: any;
      name: string;
      state: string;
      type: { __typename?: "CreativeType"; code: string };
      payloadNotification?: {
        __typename?: "NotificationPayload";
        body: string;
        title: string;
        targetUrl: string;
      } | null;
    };
  }> | null;
};

export type AdFragment = {
  __typename?: "Ad";
  id: string;
  state: string;
  prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
  webhooks: Array<{ __typename?: "Webhook"; type: string; url: string }>;
  creative: {
    __typename?: "Creative";
    id: string;
    createdAt: any;
    modifiedAt: any;
    name: string;
    state: string;
    type: { __typename?: "CreativeType"; code: string };
    payloadNotification?: {
      __typename?: "NotificationPayload";
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
  __typename?: "Mutation";
  createAdSet: {
    __typename?: "AdSet";
    id: string;
    createdAt: any;
    billingType?: string | null;
    name?: string | null;
    totalMax: number;
    perDay: number;
    state: string;
    execution: string;
    keywords?: Array<string> | null;
    keywordSimilarity?: number | null;
    negativeKeywords?: Array<string> | null;
    bannedKeywords?: Array<string> | null;
    targetingTerms?: Array<string> | null;
    segments?: Array<{
      __typename?: "Segment";
      code: string;
      name: string;
    }> | null;
    oses?: Array<{ __typename?: "OS"; code: string; name: string }> | null;
    conversions?: Array<{
      __typename?: "Conversion";
      id: string;
      type: string;
      urlPattern: string;
      observationWindow: number;
      extractExternalId: boolean;
    }> | null;
    ads?: Array<{
      __typename?: "Ad";
      id: string;
      state: string;
      prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
      webhooks: Array<{ __typename?: "Webhook"; type: string; url: string }>;
      creative: {
        __typename?: "Creative";
        id: string;
        createdAt: any;
        modifiedAt: any;
        name: string;
        state: string;
        type: { __typename?: "CreativeType"; code: string };
        payloadNotification?: {
          __typename?: "NotificationPayload";
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
  __typename?: "Mutation";
  updateAdSet: {
    __typename?: "AdSet";
    id: string;
    createdAt: any;
    billingType?: string | null;
    name?: string | null;
    totalMax: number;
    perDay: number;
    state: string;
    execution: string;
    keywords?: Array<string> | null;
    keywordSimilarity?: number | null;
    negativeKeywords?: Array<string> | null;
    bannedKeywords?: Array<string> | null;
    targetingTerms?: Array<string> | null;
    segments?: Array<{
      __typename?: "Segment";
      code: string;
      name: string;
    }> | null;
    oses?: Array<{ __typename?: "OS"; code: string; name: string }> | null;
    conversions?: Array<{
      __typename?: "Conversion";
      id: string;
      type: string;
      urlPattern: string;
      observationWindow: number;
      extractExternalId: boolean;
    }> | null;
    ads?: Array<{
      __typename?: "Ad";
      id: string;
      state: string;
      prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
      webhooks: Array<{ __typename?: "Webhook"; type: string; url: string }>;
      creative: {
        __typename?: "Creative";
        id: string;
        createdAt: any;
        modifiedAt: any;
        name: string;
        state: string;
        type: { __typename?: "CreativeType"; code: string };
        payloadNotification?: {
          __typename?: "NotificationPayload";
          body: string;
          title: string;
          targetUrl: string;
        } | null;
      };
    }> | null;
  };
};

export type CreateAdMutationVariables = Types.Exact<{
  createAdInput: Types.CreateAdInput;
}>;

export type CreateAdMutation = {
  __typename?: "Mutation";
  createAd: {
    __typename?: "Ad";
    id: string;
    state: string;
    prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
    webhooks: Array<{ __typename?: "Webhook"; type: string; url: string }>;
    creative: {
      __typename?: "Creative";
      id: string;
      createdAt: any;
      modifiedAt: any;
      name: string;
      state: string;
      type: { __typename?: "CreativeType"; code: string };
      payloadNotification?: {
        __typename?: "NotificationPayload";
        body: string;
        title: string;
        targetUrl: string;
      } | null;
    };
  };
};

export type UpdateAdMutationVariables = Types.Exact<{
  updateAdInput: Types.UpdateAdInput;
}>;

export type UpdateAdMutation = {
  __typename?: "Mutation";
  updateAd: { __typename?: "Ad"; id: string };
};

export const AdFragmentDoc = gql`
  fragment Ad on Ad {
    id
    state
    prices {
      amount
      type
    }
    webhooks {
      type
      url
    }
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
    targetingTerms
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
      extractExternalId
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
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAdSetMutation, CreateAdSetMutationVariables>(
    CreateAdSetDocument,
    options
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
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAdSetMutation, UpdateAdSetMutationVariables>(
    UpdateAdSetDocument,
    options
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
export const CreateAdDocument = gql`
  mutation createAd($createAdInput: CreateAdInput!) {
    createAd(createAdInput: $createAdInput) {
      ...Ad
    }
  }
  ${AdFragmentDoc}
`;
export type CreateAdMutationFn = Apollo.MutationFunction<
  CreateAdMutation,
  CreateAdMutationVariables
>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      createAdInput: // value for 'createAdInput'
 *   },
 * });
 */
export function useCreateAdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAdMutation,
    CreateAdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(
    CreateAdDocument,
    options
  );
}
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<
  CreateAdMutation,
  CreateAdMutationVariables
>;
export const UpdateAdDocument = gql`
  mutation updateAd($updateAdInput: UpdateAdInput!) {
    updateAd(updateAdInput: $updateAdInput) {
      id
    }
  }
`;
export type UpdateAdMutationFn = Apollo.MutationFunction<
  UpdateAdMutation,
  UpdateAdMutationVariables
>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      updateAdInput: // value for 'updateAdInput'
 *   },
 * });
 */
export function useUpdateAdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAdMutation,
    UpdateAdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(
    UpdateAdDocument,
    options
  );
}
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdMutation,
  UpdateAdMutationVariables
>;
