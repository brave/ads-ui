import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GeocodeFragment = { code: string; name: string };

export type SegmentFragment = { code: string; name: string };

export type ActiveGeocodesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ActiveGeocodesQuery = {
  activeGeocodes: { data: Array<{ code: string; name: string }> };
};

export type SegmentsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SegmentsQuery = {
  segments: { data: Array<{ code: string; name: string }> };
};

export const GeocodeFragmentDoc = gql`
  fragment Geocode on ActiveGeocodesEntry {
    code
    name
  }
`;
export const SegmentFragmentDoc = gql`
  fragment Segment on SegmentsEntry {
    code
    name
  }
`;
export const ActiveGeocodesDocument = gql`
  query ActiveGeocodes {
    activeGeocodes {
      data {
        ...Geocode
      }
    }
  }
  ${GeocodeFragmentDoc}
`;

/**
 * __useActiveGeocodesQuery__
 *
 * To run a query within a React component, call `useActiveGeocodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveGeocodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveGeocodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveGeocodesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ActiveGeocodesQuery,
    ActiveGeocodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ActiveGeocodesQuery, ActiveGeocodesQueryVariables>(
    ActiveGeocodesDocument,
    options,
  );
}
export function useActiveGeocodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActiveGeocodesQuery,
    ActiveGeocodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ActiveGeocodesQuery, ActiveGeocodesQueryVariables>(
    ActiveGeocodesDocument,
    options,
  );
}
export type ActiveGeocodesQueryHookResult = ReturnType<
  typeof useActiveGeocodesQuery
>;
export type ActiveGeocodesLazyQueryHookResult = ReturnType<
  typeof useActiveGeocodesLazyQuery
>;
export type ActiveGeocodesQueryResult = Apollo.QueryResult<
  ActiveGeocodesQuery,
  ActiveGeocodesQueryVariables
>;
export function refetchActiveGeocodesQuery(
  variables?: ActiveGeocodesQueryVariables,
) {
  return { query: ActiveGeocodesDocument, variables: variables };
}
export const SegmentsDocument = gql`
  query Segments {
    segments {
      data {
        ...Segment
      }
    }
  }
  ${SegmentFragmentDoc}
`;

/**
 * __useSegmentsQuery__
 *
 * To run a query within a React component, call `useSegmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSegmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSegmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSegmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<SegmentsQuery, SegmentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SegmentsQuery, SegmentsQueryVariables>(
    SegmentsDocument,
    options,
  );
}
export function useSegmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SegmentsQuery,
    SegmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SegmentsQuery, SegmentsQueryVariables>(
    SegmentsDocument,
    options,
  );
}
export type SegmentsQueryHookResult = ReturnType<typeof useSegmentsQuery>;
export type SegmentsLazyQueryHookResult = ReturnType<
  typeof useSegmentsLazyQuery
>;
export type SegmentsQueryResult = Apollo.QueryResult<
  SegmentsQuery,
  SegmentsQueryVariables
>;
export function refetchSegmentsQuery(variables?: SegmentsQueryVariables) {
  return { query: SegmentsDocument, variables: variables };
}
