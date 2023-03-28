import * as Types from "./types";

import { gql } from "@apollo/client";
import { CampaignFragmentDoc } from "./campaign.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AdvertiserQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AdvertiserQuery = {
  __typename?: "Query";
  advertiser?: {
    __typename?: "Advertiser";
    id: string;
    publicKey?: string | null;
  } | null;
};

export type UpdateAdvertiserMutationVariables = Types.Exact<{
  updateAdvertiserInput: Types.UpdateAdvertiserInput;
}>;

export type UpdateAdvertiserMutation = {
  __typename?: "Mutation";
  updateAdvertiser: {
    __typename?: "Advertiser";
    id: string;
    publicKey?: string | null;
  };
};

export type AdvertiserCampaignsQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AdvertiserCampaignsQuery = {
  __typename?: "Query";
  advertiser?: {
    __typename?: "Advertiser";
    campaigns: Array<{
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
        }> | null;
        ads?: Array<{
          __typename?: "Ad";
          id: string;
          state: string;
          prices: Array<{
            __typename?: "AdPrice";
            amount: number;
            type: string;
          }>;
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
    }>;
  } | null;
};

export const AdvertiserDocument = gql`
  query advertiser($id: String!) {
    advertiser(id: $id) {
      id
      publicKey
    }
  }
`;

/**
 * __useAdvertiserQuery__
 *
 * To run a query within a React component, call `useAdvertiserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdvertiserQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserQuery,
    AdvertiserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdvertiserQuery, AdvertiserQueryVariables>(
    AdvertiserDocument,
    options
  );
}
export function useAdvertiserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserQuery,
    AdvertiserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdvertiserQuery, AdvertiserQueryVariables>(
    AdvertiserDocument,
    options
  );
}
export type AdvertiserQueryHookResult = ReturnType<typeof useAdvertiserQuery>;
export type AdvertiserLazyQueryHookResult = ReturnType<
  typeof useAdvertiserLazyQuery
>;
export type AdvertiserQueryResult = Apollo.QueryResult<
  AdvertiserQuery,
  AdvertiserQueryVariables
>;
export function refetchAdvertiserQuery(variables: AdvertiserQueryVariables) {
  return { query: AdvertiserDocument, variables: variables };
}
export const UpdateAdvertiserDocument = gql`
  mutation updateAdvertiser($updateAdvertiserInput: UpdateAdvertiserInput!) {
    updateAdvertiser(updateAdvertiserInput: $updateAdvertiserInput) {
      id
      publicKey
    }
  }
`;
export type UpdateAdvertiserMutationFn = Apollo.MutationFunction<
  UpdateAdvertiserMutation,
  UpdateAdvertiserMutationVariables
>;

/**
 * __useUpdateAdvertiserMutation__
 *
 * To run a mutation, you first call `useUpdateAdvertiserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdvertiserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdvertiserMutation, { data, loading, error }] = useUpdateAdvertiserMutation({
 *   variables: {
 *      updateAdvertiserInput: // value for 'updateAdvertiserInput'
 *   },
 * });
 */
export function useUpdateAdvertiserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAdvertiserMutation,
    UpdateAdvertiserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAdvertiserMutation,
    UpdateAdvertiserMutationVariables
  >(UpdateAdvertiserDocument, options);
}
export type UpdateAdvertiserMutationHookResult = ReturnType<
  typeof useUpdateAdvertiserMutation
>;
export type UpdateAdvertiserMutationResult =
  Apollo.MutationResult<UpdateAdvertiserMutation>;
export type UpdateAdvertiserMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdvertiserMutation,
  UpdateAdvertiserMutationVariables
>;
export const AdvertiserCampaignsDocument = gql`
  query advertiserCampaigns($id: String!) {
    advertiser(id: $id) {
      campaigns {
        ...Campaign
      }
    }
  }
  ${CampaignFragmentDoc}
`;

/**
 * __useAdvertiserCampaignsQuery__
 *
 * To run a query within a React component, call `useAdvertiserCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserCampaignsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdvertiserCampaignsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >(AdvertiserCampaignsDocument, options);
}
export function useAdvertiserCampaignsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >(AdvertiserCampaignsDocument, options);
}
export type AdvertiserCampaignsQueryHookResult = ReturnType<
  typeof useAdvertiserCampaignsQuery
>;
export type AdvertiserCampaignsLazyQueryHookResult = ReturnType<
  typeof useAdvertiserCampaignsLazyQuery
>;
export type AdvertiserCampaignsQueryResult = Apollo.QueryResult<
  AdvertiserCampaignsQuery,
  AdvertiserCampaignsQueryVariables
>;
export function refetchAdvertiserCampaignsQuery(
  variables: AdvertiserCampaignsQueryVariables
) {
  return { query: AdvertiserCampaignsDocument, variables: variables };
}
