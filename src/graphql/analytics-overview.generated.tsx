import * as Types from "./types";

import { gql } from "@apollo/client";
import { CampaignFragmentDoc } from "./campaign.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type EngagementFragment = {
  __typename?: "Engagement";
  creativeinstanceid: string;
  createdat: any;
  type: string;
  pricetype: string;
  creativesetname?: string | null;
  creativesetid: string;
  creativename: string;
  creativeid: string;
  creativestate: string;
  creativepayload: string;
  count: number;
  price: number;
  cost: number;
  android: number;
  ios: number;
  linux: number;
  macos: number;
  windows: number;
};

export type CampaignWithEngagementsFragment = {
  __typename?: "Campaign";
  id: string;
  name: string;
  state: string;
  dailyBudget: number;
  budget: number;
  spent: number;
  currency: string;
  createdAt: any;
  startAt: any;
  endAt: any;
  pacingIndex?: number | null;
  format: Types.CampaignFormat;
  engagements?: Array<{
    __typename?: "Engagement";
    creativeinstanceid: string;
    createdat: any;
    type: string;
    pricetype: string;
    creativesetname?: string | null;
    creativesetid: string;
    creativename: string;
    creativeid: string;
    creativestate: string;
    creativepayload: string;
    count: number;
    price: number;
    cost: number;
    android: number;
    ios: number;
    linux: number;
    macos: number;
    windows: number;
  }> | null;
};

export type AnalyticOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AnalyticOverviewQuery = {
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
    paymentType: Types.PaymentType;
    dayProportion?: number | null;
    stripePaymentId?: string | null;
    engagements?: Array<{
      __typename?: "Engagement";
      creativeinstanceid: string;
      createdat: any;
      type: string;
      pricetype: string;
      creativesetname?: string | null;
      creativesetid: string;
      creativename: string;
      creativeid: string;
      creativestate: string;
      creativepayload: string;
      count: number;
      price: number;
      cost: number;
      android: number;
      ios: number;
      linux: number;
      macos: number;
      windows: number;
    }> | null;
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
        prices: Array<{ __typename?: "AdPrice"; amount: number; type: string }>;
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
    advertiser: { __typename?: "Advertiser"; id: string };
  } | null;
};

export type EngagementOverviewQueryVariables = Types.Exact<{
  advertiserId: Types.Scalars["String"];
  filter?: Types.InputMaybe<Types.CampaignFilter>;
}>;

export type EngagementOverviewQuery = {
  __typename?: "Query";
  engagementsOverview?: Array<{
    __typename?: "EngagementOverview";
    date: any;
    click: number;
    view: number;
    landed: number;
    spend: number;
    campaignId: string;
  }> | null;
};

export const EngagementFragmentDoc = gql`
  fragment Engagement on Engagement {
    creativeinstanceid
    createdat
    type
    pricetype
    creativesetname
    creativesetid
    creativename
    creativeid
    creativestate
    creativepayload
    count
    price
    cost
    android
    ios
    linux
    macos
    windows
  }
`;
export const CampaignWithEngagementsFragmentDoc = gql`
  fragment CampaignWithEngagements on Campaign {
    id
    name
    state
    dailyBudget
    budget
    spent
    currency
    createdAt
    startAt
    endAt
    currency
    pacingIndex
    format
    engagements {
      ...Engagement
    }
  }
  ${EngagementFragmentDoc}
`;
export const AnalyticOverviewDocument = gql`
  query analyticOverview($id: String!) {
    campaign(id: $id) {
      ...Campaign
      engagements {
        ...Engagement
      }
    }
  }
  ${CampaignFragmentDoc}
  ${EngagementFragmentDoc}
`;

/**
 * __useAnalyticOverviewQuery__
 *
 * To run a query within a React component, call `useAnalyticOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnalyticOverviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(
    AnalyticOverviewDocument,
    options
  );
}
export function useAnalyticOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >(AnalyticOverviewDocument, options);
}
export type AnalyticOverviewQueryHookResult = ReturnType<
  typeof useAnalyticOverviewQuery
>;
export type AnalyticOverviewLazyQueryHookResult = ReturnType<
  typeof useAnalyticOverviewLazyQuery
>;
export type AnalyticOverviewQueryResult = Apollo.QueryResult<
  AnalyticOverviewQuery,
  AnalyticOverviewQueryVariables
>;
export function refetchAnalyticOverviewQuery(
  variables: AnalyticOverviewQueryVariables
) {
  return { query: AnalyticOverviewDocument, variables: variables };
}
export const EngagementOverviewDocument = gql`
  query engagementOverview($advertiserId: String!, $filter: CampaignFilter) {
    engagementsOverview(advertiserId: $advertiserId, filter: $filter) {
      date
      click
      view
      landed
      spend
      campaignId
    }
  }
`;

/**
 * __useEngagementOverviewQuery__
 *
 * To run a query within a React component, call `useEngagementOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useEngagementOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEngagementOverviewQuery({
 *   variables: {
 *      advertiserId: // value for 'advertiserId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEngagementOverviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >(EngagementOverviewDocument, options);
}
export function useEngagementOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >(EngagementOverviewDocument, options);
}
export type EngagementOverviewQueryHookResult = ReturnType<
  typeof useEngagementOverviewQuery
>;
export type EngagementOverviewLazyQueryHookResult = ReturnType<
  typeof useEngagementOverviewLazyQuery
>;
export type EngagementOverviewQueryResult = Apollo.QueryResult<
  EngagementOverviewQuery,
  EngagementOverviewQueryVariables
>;
export function refetchEngagementOverviewQuery(
  variables: EngagementOverviewQueryVariables
) {
  return { query: EngagementOverviewDocument, variables: variables };
}
