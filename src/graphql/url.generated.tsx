import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ValidateTargetUrlQueryVariables = Types.Exact<{
  url: Types.Scalars["String"]["input"];
}>;

export type ValidateTargetUrlQuery = {
  validateTargetUrl: {
    isValid: boolean;
    redirects: Array<{
      url: string;
      violations: Array<{ summary: string; detail: string }>;
    }>;
  };
};

export const ValidateTargetUrlDocument = gql`
  query validateTargetUrl($url: String!) {
    validateTargetUrl(targetUrl: $url) {
      isValid
      redirects {
        url
        violations {
          summary
          detail
        }
      }
    }
  }
`;

/**
 * __useValidateTargetUrlQuery__
 *
 * To run a query within a React component, call `useValidateTargetUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTargetUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTargetUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useValidateTargetUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >(ValidateTargetUrlDocument, options);
}
export function useValidateTargetUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >(ValidateTargetUrlDocument, options);
}
export function useValidateTargetUrlSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ValidateTargetUrlQuery,
    ValidateTargetUrlQueryVariables
  >(ValidateTargetUrlDocument, options);
}
export type ValidateTargetUrlQueryHookResult = ReturnType<
  typeof useValidateTargetUrlQuery
>;
export type ValidateTargetUrlLazyQueryHookResult = ReturnType<
  typeof useValidateTargetUrlLazyQuery
>;
export type ValidateTargetUrlSuspenseQueryHookResult = ReturnType<
  typeof useValidateTargetUrlSuspenseQuery
>;
export type ValidateTargetUrlQueryResult = Apollo.QueryResult<
  ValidateTargetUrlQuery,
  ValidateTargetUrlQueryVariables
>;
export function refetchValidateTargetUrlQuery(
  variables: ValidateTargetUrlQueryVariables,
) {
  return { query: ValidateTargetUrlDocument, variables: variables };
}
