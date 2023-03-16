import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ValidateTargetUrlQueryVariables = Types.Exact<{
  url: Types.Scalars["String"];
}>;

export type ValidateTargetUrlQuery = {
  __typename?: "Query";
  validateTargetUrl: {
    __typename?: "TargetUrlValidation";
    errors: Array<string>;
    isValid: boolean;
  };
};

export const ValidateTargetUrlDocument = gql`
  query validateTargetUrl($url: String!) {
    validateTargetUrl(targetUrl: $url) {
      errors
      isValid
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
  >
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
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
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
export type ValidateTargetUrlQueryResult = Apollo.QueryResult<
  ValidateTargetUrlQuery,
  ValidateTargetUrlQueryVariables
>;
export function refetchValidateTargetUrlQuery(
  variables: ValidateTargetUrlQueryVariables
) {
  return { query: ValidateTargetUrlDocument, variables: variables };
}
