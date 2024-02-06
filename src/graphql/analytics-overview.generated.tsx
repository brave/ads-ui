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

export type EngagementOverviewQueryVariables = Types.Exact<{
  advertiserId: Types.Scalars["String"]["input"];
  filter?: Types.InputMaybe<Types.CampaignFilter>;
}>;

export type EngagementOverviewQuery = {
  engagementsOverview?: Array<{
    date: any;
    click: number;
    view: number;
    landed: number;
    spend?: number | null;
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
  >,
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
  >,
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >(EngagementOverviewDocument, options);
}
export function useEngagementOverviewSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    EngagementOverviewQuery,
    EngagementOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
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
export type EngagementOverviewSuspenseQueryHookResult = ReturnType<
  typeof useEngagementOverviewSuspenseQuery
>;
export type EngagementOverviewQueryResult = Apollo.QueryResult<
  EngagementOverviewQuery,
  EngagementOverviewQueryVariables
>;
export function refetchEngagementOverviewQuery(
  variables: EngagementOverviewQueryVariables,
) {
  return { query: EngagementOverviewDocument, variables: variables };
}
