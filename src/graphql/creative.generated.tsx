import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreativeFragment = {
  id: string;
  createdAt: any;
  modifiedAt: any;
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
  advertiserId: Types.Scalars["String"];
}>;

export type AdvertiserCreativesQuery = {
  advertiser?: {
    id: string;
    creatives: Array<{
      id: string;
      createdAt: any;
      modifiedAt: any;
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
    createdAt: any;
    modifiedAt: any;
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
  >,
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
export type AdvertiserCreativesQueryHookResult = ReturnType<
  typeof useAdvertiserCreativesQuery
>;
export type AdvertiserCreativesLazyQueryHookResult = ReturnType<
  typeof useAdvertiserCreativesLazyQuery
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
