import * as Types from "./types";

import { gql } from "@apollo/client";
import { AdSetFragmentDoc } from "./ad-set.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CampaignFragment = {
  __typename?: "Campaign";
  id: string;
  name: string;
  state: string;
  dailyCap: number;
  priority: number;
  passThroughRate: number;
  pacingOverride: boolean;
  pacingStrategy: Types.CampaignPacingStrategies;
  externalId: string;
  currency: string;
  budget: number;
  dailyBudget: number;
  spent: number;
  createdAt: any;
  startAt: any;
  endAt: any;
  source: Types.CampaignSource;
  type: string;
  format: Types.CampaignFormat;
  dayProportion?: number | null;
  geoTargets?: Array<{
    __typename?: "Geocode";
    code: string;
    name: string;
  }> | null;
  adSets: Array<{
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
  }>;
};

export type LoadCampaignQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type LoadCampaignQuery = {
  __typename?: "Query";
  campaign?: {
    __typename?: "Campaign";
    id: string;
    name: string;
    state: string;
    dailyCap: number;
    priority: number;
    passThroughRate: number;
    pacingOverride: boolean;
    pacingStrategy: Types.CampaignPacingStrategies;
    externalId: string;
    currency: string;
    budget: number;
    dailyBudget: number;
    spent: number;
    createdAt: any;
    startAt: any;
    endAt: any;
    source: Types.CampaignSource;
    type: string;
    format: Types.CampaignFormat;
    dayProportion?: number | null;
    geoTargets?: Array<{
      __typename?: "Geocode";
      code: string;
      name: string;
    }> | null;
    adSets: Array<{
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
    }>;
  } | null;
};

export type CreateCampaignMutationVariables = Types.Exact<{
  input: Types.CreateCampaignInput;
}>;

export type CreateCampaignMutation = {
  __typename?: "Mutation";
  createCampaign: { __typename?: "Campaign"; id: string };
};

export type UpdateCampaignMutationVariables = Types.Exact<{
  input: Types.UpdateCampaignInput;
}>;

export type UpdateCampaignMutation = {
  __typename?: "Mutation";
  updateCampaign: { __typename?: "Campaign"; id: string };
};

export const CampaignFragmentDoc = gql`
  fragment Campaign on Campaign {
    id
    name
    state
    dailyCap
    priority
    passThroughRate
    pacingOverride
    pacingStrategy
    externalId
    currency
    budget
    dailyBudget
    spent
    createdAt
    startAt
    endAt
    source
    type
    format
    dayProportion
    geoTargets {
      code
      name
    }
    adSets {
      ...AdSet
    }
  }
  ${AdSetFragmentDoc}
`;
export const LoadCampaignDocument = gql`
  query LoadCampaign($id: String!) {
    campaign(id: $id) {
      ...Campaign
    }
  }
  ${CampaignFragmentDoc}
`;

/**
 * __useLoadCampaignQuery__
 *
 * To run a query within a React component, call `useLoadCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadCampaignQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadCampaignQuery,
    LoadCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoadCampaignQuery, LoadCampaignQueryVariables>(
    LoadCampaignDocument,
    options
  );
}
export function useLoadCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadCampaignQuery,
    LoadCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoadCampaignQuery, LoadCampaignQueryVariables>(
    LoadCampaignDocument,
    options
  );
}
export type LoadCampaignQueryHookResult = ReturnType<
  typeof useLoadCampaignQuery
>;
export type LoadCampaignLazyQueryHookResult = ReturnType<
  typeof useLoadCampaignLazyQuery
>;
export type LoadCampaignQueryResult = Apollo.QueryResult<
  LoadCampaignQuery,
  LoadCampaignQueryVariables
>;
export function refetchLoadCampaignQuery(
  variables: LoadCampaignQueryVariables
) {
  return { query: LoadCampaignDocument, variables: variables };
}
export const CreateCampaignDocument = gql`
  mutation CreateCampaign($input: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $input) {
      id
    }
  }
`;
export type CreateCampaignMutationFn = Apollo.MutationFunction<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;

/**
 * __useCreateCampaignMutation__
 *
 * To run a mutation, you first call `useCreateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaignMutation, { data, loading, error }] = useCreateCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >(CreateCampaignDocument, options);
}
export type CreateCampaignMutationHookResult = ReturnType<
  typeof useCreateCampaignMutation
>;
export type CreateCampaignMutationResult =
  Apollo.MutationResult<CreateCampaignMutation>;
export type CreateCampaignMutationOptions = Apollo.BaseMutationOptions<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;
export const UpdateCampaignDocument = gql`
  mutation UpdateCampaign($input: UpdateCampaignInput!) {
    updateCampaign(updateCampaignInput: $input) {
      id
    }
  }
`;
export type UpdateCampaignMutationFn = Apollo.MutationFunction<
  UpdateCampaignMutation,
  UpdateCampaignMutationVariables
>;

/**
 * __useUpdateCampaignMutation__
 *
 * To run a mutation, you first call `useUpdateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCampaignMutation, { data, loading, error }] = useUpdateCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCampaignMutation,
    UpdateCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCampaignMutation,
    UpdateCampaignMutationVariables
  >(UpdateCampaignDocument, options);
}
export type UpdateCampaignMutationHookResult = ReturnType<
  typeof useUpdateCampaignMutation
>;
export type UpdateCampaignMutationResult =
  Apollo.MutationResult<UpdateCampaignMutation>;
export type UpdateCampaignMutationOptions = Apollo.BaseMutationOptions<
  UpdateCampaignMutation,
  UpdateCampaignMutationVariables
>;
