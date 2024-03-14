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

export type CampaignMetricSummaryValuesFragment = {
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

export type CampaignMetricDetailValuesFragment = {
  click: string;
  impression: string;
  siteVisit: string;
  conversion: string;
  dismiss: string;
  spendUsd: string;
  rates: {
    clickThrough: string;
    clickToConversion: string;
    costPerAcquisition: string;
  };
};

export type DailyValuesFragment = {
  dimensions: { day?: any | null };
  metrics: {
    click: string;
    impression: string;
    siteVisit: string;
    conversion: string;
    dismiss: string;
    spendUsd: string;
    rates: {
      clickThrough: string;
      clickToConversion: string;
      costPerAcquisition: string;
    };
  };
};

export type FetchDailyMetricsForCampaignQueryVariables = Types.Exact<{
  filter: Types.PerformanceFilter;
}>;

export type FetchDailyMetricsForCampaignQuery = {
  performance: {
    values: Array<{
      dimensions: { day?: any | null };
      metrics: {
        click: string;
        impression: string;
        siteVisit: string;
        conversion: string;
        dismiss: string;
        spendUsd: string;
        rates: {
          clickThrough: string;
          clickToConversion: string;
          costPerAcquisition: string;
        };
      };
    }>;
    total: {
      metrics: {
        click: string;
        impression: string;
        siteVisit: string;
        conversion: string;
        dismiss: string;
        spendUsd: string;
        rates: {
          clickThrough: string;
          clickToConversion: string;
          costPerAcquisition: string;
        };
      };
    };
  };
};

export type AdSetValuesFragment = {
  dimensions: {
    adSet?: {
      id: string;
      name: string;
      state: string;
      billingType?: string | null;
    } | null;
  };
  metrics: {
    click: string;
    impression: string;
    siteVisit: string;
    conversion: string;
    dismiss: string;
    spendUsd: string;
    rates: {
      clickThrough: string;
      clickToConversion: string;
      costPerAcquisition: string;
    };
  };
};

export type FetchAdSetMetricsForCampaignQueryVariables = Types.Exact<{
  filter: Types.PerformanceFilter;
}>;

export type FetchAdSetMetricsForCampaignQuery = {
  performance: {
    values: Array<{
      dimensions: {
        adSet?: {
          id: string;
          name: string;
          state: string;
          billingType?: string | null;
        } | null;
      };
      metrics: {
        click: string;
        impression: string;
        siteVisit: string;
        conversion: string;
        dismiss: string;
        spendUsd: string;
        rates: {
          clickThrough: string;
          clickToConversion: string;
          costPerAcquisition: string;
        };
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
export const CampaignMetricSummaryValuesFragmentDoc = gql`
  fragment CampaignMetricSummaryValues on Metrics {
    click
    impression
    siteVisit
    spendUsd
    rates {
      clickThrough
    }
  }
`;
export const CampaignMetricDetailValuesFragmentDoc = gql`
  fragment CampaignMetricDetailValues on Metrics {
    click
    impression
    siteVisit
    conversion
    dismiss
    spendUsd
    rates {
      clickThrough
      clickToConversion
      costPerAcquisition
    }
  }
`;
export const DailyValuesFragmentDoc = gql`
  fragment DailyValues on Performance {
    dimensions {
      day
    }
    metrics {
      ...CampaignMetricDetailValues
    }
  }
  ${CampaignMetricDetailValuesFragmentDoc}
`;
export const AdSetValuesFragmentDoc = gql`
  fragment AdSetValues on Performance {
    dimensions {
      adSet {
        id
        name
        state
        billingType
      }
    }
    metrics {
      ...CampaignMetricDetailValues
    }
  }
  ${CampaignMetricDetailValuesFragmentDoc}
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
          ...CampaignMetricSummaryValues
        }
      }
    }
  }
  ${CampaignMetricSummaryValuesFragmentDoc}
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
export const FetchDailyMetricsForCampaignDocument = gql`
  query fetchDailyMetricsForCampaign($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        ...DailyValues
      }
      total {
        metrics {
          ...CampaignMetricDetailValues
        }
      }
    }
  }
  ${DailyValuesFragmentDoc}
  ${CampaignMetricDetailValuesFragmentDoc}
`;

/**
 * __useFetchDailyMetricsForCampaignQuery__
 *
 * To run a query within a React component, call `useFetchDailyMetricsForCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDailyMetricsForCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDailyMetricsForCampaignQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFetchDailyMetricsForCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  > &
    (
      | {
          variables: FetchDailyMetricsForCampaignQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  >(FetchDailyMetricsForCampaignDocument, options);
}
export function useFetchDailyMetricsForCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  >(FetchDailyMetricsForCampaignDocument, options);
}
export function useFetchDailyMetricsForCampaignSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FetchDailyMetricsForCampaignQuery,
    FetchDailyMetricsForCampaignQueryVariables
  >(FetchDailyMetricsForCampaignDocument, options);
}
export type FetchDailyMetricsForCampaignQueryHookResult = ReturnType<
  typeof useFetchDailyMetricsForCampaignQuery
>;
export type FetchDailyMetricsForCampaignLazyQueryHookResult = ReturnType<
  typeof useFetchDailyMetricsForCampaignLazyQuery
>;
export type FetchDailyMetricsForCampaignSuspenseQueryHookResult = ReturnType<
  typeof useFetchDailyMetricsForCampaignSuspenseQuery
>;
export type FetchDailyMetricsForCampaignQueryResult = Apollo.QueryResult<
  FetchDailyMetricsForCampaignQuery,
  FetchDailyMetricsForCampaignQueryVariables
>;
export function refetchFetchDailyMetricsForCampaignQuery(
  variables: FetchDailyMetricsForCampaignQueryVariables,
) {
  return { query: FetchDailyMetricsForCampaignDocument, variables: variables };
}
export const FetchAdSetMetricsForCampaignDocument = gql`
  query fetchAdSetMetricsForCampaign($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        ...AdSetValues
      }
    }
  }
  ${AdSetValuesFragmentDoc}
`;

/**
 * __useFetchAdSetMetricsForCampaignQuery__
 *
 * To run a query within a React component, call `useFetchAdSetMetricsForCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAdSetMetricsForCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAdSetMetricsForCampaignQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFetchAdSetMetricsForCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  > &
    (
      | {
          variables: FetchAdSetMetricsForCampaignQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  >(FetchAdSetMetricsForCampaignDocument, options);
}
export function useFetchAdSetMetricsForCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  >(FetchAdSetMetricsForCampaignDocument, options);
}
export function useFetchAdSetMetricsForCampaignSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FetchAdSetMetricsForCampaignQuery,
    FetchAdSetMetricsForCampaignQueryVariables
  >(FetchAdSetMetricsForCampaignDocument, options);
}
export type FetchAdSetMetricsForCampaignQueryHookResult = ReturnType<
  typeof useFetchAdSetMetricsForCampaignQuery
>;
export type FetchAdSetMetricsForCampaignLazyQueryHookResult = ReturnType<
  typeof useFetchAdSetMetricsForCampaignLazyQuery
>;
export type FetchAdSetMetricsForCampaignSuspenseQueryHookResult = ReturnType<
  typeof useFetchAdSetMetricsForCampaignSuspenseQuery
>;
export type FetchAdSetMetricsForCampaignQueryResult = Apollo.QueryResult<
  FetchAdSetMetricsForCampaignQuery,
  FetchAdSetMetricsForCampaignQueryVariables
>;
export function refetchFetchAdSetMetricsForCampaignQuery(
  variables: FetchAdSetMetricsForCampaignQueryVariables,
) {
  return { query: FetchAdSetMetricsForCampaignDocument, variables: variables };
}
