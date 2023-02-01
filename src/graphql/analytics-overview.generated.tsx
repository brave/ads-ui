import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EngagementFragment = { __typename?: 'Engagement', createdat: any, type: string, count: number, android: number, ios: number, linux: number, macos: number, windows: number, other: number };

export type AnalyticOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type AnalyticOverviewQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: string, dailyBudget: number, budget: number, spent: number, currency: string, createdAt: any, startAt: any, endAt: any, pacingIndex?: number | null, type: string, format: Types.CampaignFormat, engagements?: Array<{ __typename?: 'Engagement', createdat: any, type: string, count: number, android: number, ios: number, linux: number, macos: number, windows: number, other: number }> | null } | null };

export const EngagementFragmentDoc = gql`
    fragment Engagement on Engagement {
  createdat
  type
  count
  android
  ios
  linux
  macos
  windows
  other
}
    `;
export const AnalyticOverviewDocument = gql`
    query analyticOverview($id: String!) {
  campaign(id: $id) {
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
    type
    format
    engagements {
      ...Engagement
    }
  }
}
    ${EngagementFragmentDoc}`;

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
export function useAnalyticOverviewQuery(baseOptions: Apollo.QueryHookOptions<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(AnalyticOverviewDocument, options);
      }
export function useAnalyticOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(AnalyticOverviewDocument, options);
        }
export type AnalyticOverviewQueryHookResult = ReturnType<typeof useAnalyticOverviewQuery>;
export type AnalyticOverviewLazyQueryHookResult = ReturnType<typeof useAnalyticOverviewLazyQuery>;
export type AnalyticOverviewQueryResult = Apollo.QueryResult<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>;