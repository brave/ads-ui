import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type EngagementFragment = {
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
  view: string;
  click: string;
  viewthroughConversion: string;
  clickthroughConversion: string;
  conversion: string;
  dismiss: string;
  downvote: string;
  landed: string;
  spend: string;
  upvote: string;
  price: number;
  android: number;
  ios: number;
  linux: number;
  macos: number;
  windows: number;
};

export type CampaignWithEngagementsFragment = {
  id: string;
  name: string;
  state: string;
  budget: number;
  spent: number;
  currency: string;
  createdAt: any;
  startAt: any;
  endAt: any;
  pacingIndex?: number | null;
  format: Types.CampaignFormat;
  adSets: Array<{
    id: string;
    conversions: Array<{
      id: string;
      type: string;
      extractExternalId: boolean;
    }>;
  }>;
  engagements: Array<{
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
    view: string;
    click: string;
    viewthroughConversion: string;
    clickthroughConversion: string;
    conversion: string;
    dismiss: string;
    downvote: string;
    landed: string;
    spend: string;
    upvote: string;
    price: number;
    android: number;
    ios: number;
    linux: number;
    macos: number;
    windows: number;
  }>;
};

export type AnalyticOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type AnalyticOverviewQuery = {
  campaign?: {
    id: string;
    name: string;
    state: string;
    budget: number;
    spent: number;
    currency: string;
    createdAt: any;
    startAt: any;
    endAt: any;
    pacingIndex?: number | null;
    format: Types.CampaignFormat;
    adSets: Array<{
      id: string;
      conversions: Array<{
        id: string;
        type: string;
        extractExternalId: boolean;
      }>;
    }>;
    engagements: Array<{
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
      view: string;
      click: string;
      viewthroughConversion: string;
      clickthroughConversion: string;
      conversion: string;
      dismiss: string;
      downvote: string;
      landed: string;
      spend: string;
      upvote: string;
      price: number;
      android: number;
      ios: number;
      linux: number;
      macos: number;
      windows: number;
    }>;
  } | null;
};

export type CampaignMetricValuesFragment = {
  click: string;
  impression: string;
  siteVisit: string;
  spendUsd: string;
  rates: { clickThrough: string };
};

export type CampaignMetricsQueryVariables = Types.Exact<{
  campaignIds:
    | Array<Types.Scalars["String"]["input"]>
    | Types.Scalars["String"]["input"];
}>;

export type CampaignMetricsQuery = {
  performance: {
    values: Array<{
      dimensions: { campaign?: { id: string } | null };
      metrics: {
        click: string;
        impression: string;
        siteVisit: string;
        spendUsd: string;
        rates: { clickThrough: string };
      };
    }>;
  };
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
    view
    click
    viewthroughConversion
    clickthroughConversion
    conversion
    dismiss
    downvote
    landed
    spend
    upvote
    downvote
    price
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
    budget
    spent
    currency
    createdAt
    startAt
    endAt
    currency
    pacingIndex
    format
    adSets {
      id
      conversions {
        id
        type
        extractExternalId
      }
    }
    engagements {
      ...Engagement
    }
  }
  ${EngagementFragmentDoc}
`;
export const CampaignMetricValuesFragmentDoc = gql`
  fragment CampaignMetricValues on Metrics {
    click
    impression
    siteVisit
    spendUsd
    rates {
      clickThrough
    }
  }
`;
export const AnalyticOverviewDocument = gql`
  query analyticOverview($id: String!) {
    campaign(id: $id) {
      ...CampaignWithEngagements
    }
  }
  ${CampaignWithEngagementsFragmentDoc}
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
  > &
    (
      | { variables: AnalyticOverviewQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(
    AnalyticOverviewDocument,
    options,
  );
}
export function useAnalyticOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >(AnalyticOverviewDocument, options);
}
export function useAnalyticOverviewSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AnalyticOverviewQuery,
    AnalyticOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
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
export type AnalyticOverviewSuspenseQueryHookResult = ReturnType<
  typeof useAnalyticOverviewSuspenseQuery
>;
export type AnalyticOverviewQueryResult = Apollo.QueryResult<
  AnalyticOverviewQuery,
  AnalyticOverviewQueryVariables
>;
export function refetchAnalyticOverviewQuery(
  variables: AnalyticOverviewQueryVariables,
) {
  return { query: AnalyticOverviewDocument, variables: variables };
}
export const CampaignMetricsDocument = gql`
  query campaignMetrics($campaignIds: [String!]!) {
    performance(filter: { campaignIds: $campaignIds }) {
      values {
        dimensions {
          campaign {
            id
          }
        }
        metrics {
          ...CampaignMetricValues
        }
      }
    }
  }
  ${CampaignMetricValuesFragmentDoc}
`;

/**
 * __useCampaignMetricsQuery__
 *
 * To run a query within a React component, call `useCampaignMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignMetricsQuery({
 *   variables: {
 *      campaignIds: // value for 'campaignIds'
 *   },
 * });
 */
export function useCampaignMetricsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CampaignMetricsQuery,
    CampaignMetricsQueryVariables
  > &
    (
      | { variables: CampaignMetricsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CampaignMetricsQuery, CampaignMetricsQueryVariables>(
    CampaignMetricsDocument,
    options,
  );
}
export function useCampaignMetricsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaignMetricsQuery,
    CampaignMetricsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CampaignMetricsQuery,
    CampaignMetricsQueryVariables
  >(CampaignMetricsDocument, options);
}
export function useCampaignMetricsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CampaignMetricsQuery,
    CampaignMetricsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CampaignMetricsQuery,
    CampaignMetricsQueryVariables
  >(CampaignMetricsDocument, options);
}
export type CampaignMetricsQueryHookResult = ReturnType<
  typeof useCampaignMetricsQuery
>;
export type CampaignMetricsLazyQueryHookResult = ReturnType<
  typeof useCampaignMetricsLazyQuery
>;
export type CampaignMetricsSuspenseQueryHookResult = ReturnType<
  typeof useCampaignMetricsSuspenseQuery
>;
export type CampaignMetricsQueryResult = Apollo.QueryResult<
  CampaignMetricsQuery,
  CampaignMetricsQueryVariables
>;
export function refetchCampaignMetricsQuery(
  variables: CampaignMetricsQueryVariables,
) {
  return { query: CampaignMetricsDocument, variables: variables };
}
