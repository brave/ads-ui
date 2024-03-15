import type * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreativeFragment = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  state: string;
  type: { code: string };
  payloadNotification?: {
    body: string;
    title: string;
    targetUrl: string;
  } | null;
  payloadNewTabPage?: {
    logo?: {
      imageUrl: string;
      alt: string;
      companyName: string;
      destinationUrl: string;
    } | null;
    wallpapers?: Array<{
      imageUrl: string;
      focalPoint: { x: number; y: number };
    }> | null;
  } | null;
  payloadInlineContent?: {
    title: string;
    ctaText: string;
    imageUrl: string;
    targetUrl: string;
    dimensions: string;
    description: string;
  } | null;
  payloadSearch?: { body: string; title: string; targetUrl: string } | null;
  payloadSearchHomepage?: {
    body: string;
    imageUrl: string;
    imageDarkModeUrl?: string | null;
    targetUrl: string;
    title: string;
    ctaText: string;
  } | null;
};

export type AdvertiserCreativesQueryVariables = Types.Exact<{
  advertiserId: Types.Scalars["String"]["input"];
}>;

export type AdvertiserCreativesQuery = {
  advertiser?: {
    id: string;
    creatives: Array<{
      id: string;
      createdAt: string;
      modifiedAt: string;
      name: string;
      state: string;
      type: { code: string };
      payloadNotification?: {
        body: string;
        title: string;
        targetUrl: string;
      } | null;
      payloadNewTabPage?: {
        logo?: {
          imageUrl: string;
          alt: string;
          companyName: string;
          destinationUrl: string;
        } | null;
        wallpapers?: Array<{
          imageUrl: string;
          focalPoint: { x: number; y: number };
        }> | null;
      } | null;
      payloadInlineContent?: {
        title: string;
        ctaText: string;
        imageUrl: string;
        targetUrl: string;
        dimensions: string;
        description: string;
      } | null;
      payloadSearch?: { body: string; title: string; targetUrl: string } | null;
      payloadSearchHomepage?: {
        body: string;
        imageUrl: string;
        imageDarkModeUrl?: string | null;
        targetUrl: string;
        title: string;
        ctaText: string;
      } | null;
    }>;
  } | null;
};

export type CreateCreativeMutationVariables = Types.Exact<{
  input: Types.CreativeInput;
}>;

export type CreateCreativeMutation = {
  createCreative: {
    id: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    state: string;
    type: { code: string };
    payloadNotification?: {
      body: string;
      title: string;
      targetUrl: string;
    } | null;
    payloadNewTabPage?: {
      logo?: {
        imageUrl: string;
        alt: string;
        companyName: string;
        destinationUrl: string;
      } | null;
      wallpapers?: Array<{
        imageUrl: string;
        focalPoint: { x: number; y: number };
      }> | null;
    } | null;
    payloadInlineContent?: {
      title: string;
      ctaText: string;
      imageUrl: string;
      targetUrl: string;
      dimensions: string;
      description: string;
    } | null;
    payloadSearch?: { body: string; title: string; targetUrl: string } | null;
    payloadSearchHomepage?: {
      body: string;
      imageUrl: string;
      imageDarkModeUrl?: string | null;
      targetUrl: string;
      title: string;
      ctaText: string;
    } | null;
  };
};

export type UpdateCreativeMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  input: Types.CreativeInput;
}>;

export type UpdateCreativeMutation = {
  updateCreative: {
    id: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    state: string;
    type: { code: string };
    payloadNotification?: {
      body: string;
      title: string;
      targetUrl: string;
    } | null;
    payloadNewTabPage?: {
      logo?: {
        imageUrl: string;
        alt: string;
        companyName: string;
        destinationUrl: string;
      } | null;
      wallpapers?: Array<{
        imageUrl: string;
        focalPoint: { x: number; y: number };
      }> | null;
    } | null;
    payloadInlineContent?: {
      title: string;
      ctaText: string;
      imageUrl: string;
      targetUrl: string;
      dimensions: string;
      description: string;
    } | null;
    payloadSearch?: { body: string; title: string; targetUrl: string } | null;
    payloadSearchHomepage?: {
      body: string;
      imageUrl: string;
      imageDarkModeUrl?: string | null;
      targetUrl: string;
      title: string;
      ctaText: string;
    } | null;
  };
};

export type LoadCreativeQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type LoadCreativeQuery = {
  creative?: {
    id: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    state: string;
    type: { code: string };
    payloadNotification?: {
      body: string;
      title: string;
      targetUrl: string;
    } | null;
    payloadNewTabPage?: {
      logo?: {
        imageUrl: string;
        alt: string;
        companyName: string;
        destinationUrl: string;
      } | null;
      wallpapers?: Array<{
        imageUrl: string;
        focalPoint: { x: number; y: number };
      }> | null;
    } | null;
    payloadInlineContent?: {
      title: string;
      ctaText: string;
      imageUrl: string;
      targetUrl: string;
      dimensions: string;
      description: string;
    } | null;
    payloadSearch?: { body: string; title: string; targetUrl: string } | null;
    payloadSearchHomepage?: {
      body: string;
      imageUrl: string;
      imageDarkModeUrl?: string | null;
      targetUrl: string;
      title: string;
      ctaText: string;
    } | null;
  } | null;
};

export type CampaignsForCreativeQueryVariables = Types.Exact<{
  creativeId: Types.Scalars["String"]["input"];
  advertiserId: Types.Scalars["String"]["input"];
}>;

export type CampaignsForCreativeQuery = {
  creativeCampaigns: Array<{
    id: string;
    name: string;
    state: string;
    format: Types.CampaignFormat;
  }>;
};

export const CreativeFragmentDoc = gql`
  fragment Creative on Creative {
    id
    createdAt
    modifiedAt
    name
    state
    type {
      code
    }
    payloadNotification {
      body
      title
      targetUrl
    }
    payloadNewTabPage {
      logo {
        imageUrl
        alt
        companyName
        destinationUrl
      }
      wallpapers {
        imageUrl
        focalPoint {
          x
          y
        }
      }
    }
    payloadInlineContent {
      title
      ctaText
      imageUrl
      targetUrl
      dimensions
      description
    }
    payloadNotification {
      body
      title
      targetUrl
    }
    payloadSearch {
      body
      title
      targetUrl
    }
    payloadSearchHomepage {
      body
      imageUrl
      imageDarkModeUrl
      targetUrl
      title
      ctaText
    }
  }
`;
export const AdvertiserCreativesDocument = gql`
  query advertiserCreatives($advertiserId: String!) {
    advertiser(id: $advertiserId) {
      id
      creatives {
        ...Creative
      }
    }
  }
  ${CreativeFragmentDoc}
`;

/**
 * __useAdvertiserCreativesQuery__
 *
 * To run a query within a React component, call `useAdvertiserCreativesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserCreativesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserCreativesQuery({
 *   variables: {
 *      advertiserId: // value for 'advertiserId'
 *   },
 * });
 */
export function useAdvertiserCreativesQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  > &
    (
      | { variables: AdvertiserCreativesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  >(AdvertiserCreativesDocument, options);
}
export function useAdvertiserCreativesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  >(AdvertiserCreativesDocument, options);
}
export function useAdvertiserCreativesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AdvertiserCreativesQuery,
    AdvertiserCreativesQueryVariables
  >(AdvertiserCreativesDocument, options);
}
export type AdvertiserCreativesQueryHookResult = ReturnType<
  typeof useAdvertiserCreativesQuery
>;
export type AdvertiserCreativesLazyQueryHookResult = ReturnType<
  typeof useAdvertiserCreativesLazyQuery
>;
export type AdvertiserCreativesSuspenseQueryHookResult = ReturnType<
  typeof useAdvertiserCreativesSuspenseQuery
>;
export type AdvertiserCreativesQueryResult = Apollo.QueryResult<
  AdvertiserCreativesQuery,
  AdvertiserCreativesQueryVariables
>;
export function refetchAdvertiserCreativesQuery(
  variables: AdvertiserCreativesQueryVariables,
) {
  return { query: AdvertiserCreativesDocument, variables: variables };
}
export const CreateCreativeDocument = gql`
  mutation createCreative($input: CreativeInput!) {
    createCreative(creative: $input) {
      ...Creative
    }
  }
  ${CreativeFragmentDoc}
`;
export type CreateCreativeMutationFn = Apollo.MutationFunction<
  CreateCreativeMutation,
  CreateCreativeMutationVariables
>;

/**
 * __useCreateCreativeMutation__
 *
 * To run a mutation, you first call `useCreateCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreativeMutation, { data, loading, error }] = useCreateCreativeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreativeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCreativeMutation,
    CreateCreativeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCreativeMutation,
    CreateCreativeMutationVariables
  >(CreateCreativeDocument, options);
}
export type CreateCreativeMutationHookResult = ReturnType<
  typeof useCreateCreativeMutation
>;
export type CreateCreativeMutationResult =
  Apollo.MutationResult<CreateCreativeMutation>;
export type CreateCreativeMutationOptions = Apollo.BaseMutationOptions<
  CreateCreativeMutation,
  CreateCreativeMutationVariables
>;
export const UpdateCreativeDocument = gql`
  mutation updateCreative($id: String!, $input: CreativeInput!) {
    updateCreative(id: $id, creative: $input) {
      ...Creative
    }
  }
  ${CreativeFragmentDoc}
`;
export type UpdateCreativeMutationFn = Apollo.MutationFunction<
  UpdateCreativeMutation,
  UpdateCreativeMutationVariables
>;

/**
 * __useUpdateCreativeMutation__
 *
 * To run a mutation, you first call `useUpdateCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreativeMutation, { data, loading, error }] = useUpdateCreativeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCreativeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCreativeMutation,
    UpdateCreativeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCreativeMutation,
    UpdateCreativeMutationVariables
  >(UpdateCreativeDocument, options);
}
export type UpdateCreativeMutationHookResult = ReturnType<
  typeof useUpdateCreativeMutation
>;
export type UpdateCreativeMutationResult =
  Apollo.MutationResult<UpdateCreativeMutation>;
export type UpdateCreativeMutationOptions = Apollo.BaseMutationOptions<
  UpdateCreativeMutation,
  UpdateCreativeMutationVariables
>;
export const LoadCreativeDocument = gql`
  query loadCreative($id: String!) {
    creative(id: $id) {
      ...Creative
    }
  }
  ${CreativeFragmentDoc}
`;

/**
 * __useLoadCreativeQuery__
 *
 * To run a query within a React component, call `useLoadCreativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadCreativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadCreativeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadCreativeQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadCreativeQuery,
    LoadCreativeQueryVariables
  > &
    (
      | { variables: LoadCreativeQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoadCreativeQuery, LoadCreativeQueryVariables>(
    LoadCreativeDocument,
    options,
  );
}
export function useLoadCreativeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadCreativeQuery,
    LoadCreativeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoadCreativeQuery, LoadCreativeQueryVariables>(
    LoadCreativeDocument,
    options,
  );
}
export function useLoadCreativeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LoadCreativeQuery,
    LoadCreativeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoadCreativeQuery, LoadCreativeQueryVariables>(
    LoadCreativeDocument,
    options,
  );
}
export type LoadCreativeQueryHookResult = ReturnType<
  typeof useLoadCreativeQuery
>;
export type LoadCreativeLazyQueryHookResult = ReturnType<
  typeof useLoadCreativeLazyQuery
>;
export type LoadCreativeSuspenseQueryHookResult = ReturnType<
  typeof useLoadCreativeSuspenseQuery
>;
export type LoadCreativeQueryResult = Apollo.QueryResult<
  LoadCreativeQuery,
  LoadCreativeQueryVariables
>;
export function refetchLoadCreativeQuery(
  variables: LoadCreativeQueryVariables,
) {
  return { query: LoadCreativeDocument, variables: variables };
}
export const CampaignsForCreativeDocument = gql`
  query campaignsForCreative($creativeId: String!, $advertiserId: String!) {
    creativeCampaigns(creativeId: $creativeId, advertiserId: $advertiserId) {
      id
      name
      state
      format
    }
  }
`;

/**
 * __useCampaignsForCreativeQuery__
 *
 * To run a query within a React component, call `useCampaignsForCreativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignsForCreativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignsForCreativeQuery({
 *   variables: {
 *      creativeId: // value for 'creativeId'
 *      advertiserId: // value for 'advertiserId'
 *   },
 * });
 */
export function useCampaignsForCreativeQuery(
  baseOptions: Apollo.QueryHookOptions<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  > &
    (
      | { variables: CampaignsForCreativeQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  >(CampaignsForCreativeDocument, options);
}
export function useCampaignsForCreativeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  >(CampaignsForCreativeDocument, options);
}
export function useCampaignsForCreativeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CampaignsForCreativeQuery,
    CampaignsForCreativeQueryVariables
  >(CampaignsForCreativeDocument, options);
}
export type CampaignsForCreativeQueryHookResult = ReturnType<
  typeof useCampaignsForCreativeQuery
>;
export type CampaignsForCreativeLazyQueryHookResult = ReturnType<
  typeof useCampaignsForCreativeLazyQuery
>;
export type CampaignsForCreativeSuspenseQueryHookResult = ReturnType<
  typeof useCampaignsForCreativeSuspenseQuery
>;
export type CampaignsForCreativeQueryResult = Apollo.QueryResult<
  CampaignsForCreativeQuery,
  CampaignsForCreativeQueryVariables
>;
export function refetchCampaignsForCreativeQuery(
  variables: CampaignsForCreativeQueryVariables,
) {
  return { query: CampaignsForCreativeDocument, variables: variables };
}
