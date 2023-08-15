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
    __typename?: "NewTabPagePayload";
    logo?: {
      __typename?: "Logo";
      imageUrl: string;
      alt: string;
      companyName: string;
      destinationUrl: string;
    } | null;
    wallpapers?: Array<{
      __typename?: "Wallpaper";
      imageUrl: string;
      focalPoint: { __typename?: "FocalPoint"; x: number; y: number };
    }> | null;
  } | null;
  payloadInlineContent?: {
    __typename?: "InlineContentPayload";
    title: string;
    ctaText: string;
    imageUrl: string;
    targetUrl: string;
    dimensions: string;
    description: string;
  } | null;
  payloadSearch?: {
    __typename?: "SearchPayload";
    body: string;
    title: string;
    targetUrl: string;
  } | null;
  payloadSearchHomepage?: {
    __typename?: "SearchHomepagePayload";
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
        __typename?: "NewTabPagePayload";
        logo?: {
          __typename?: "Logo";
          imageUrl: string;
          alt: string;
          companyName: string;
          destinationUrl: string;
        } | null;
        wallpapers?: Array<{
          __typename?: "Wallpaper";
          imageUrl: string;
          focalPoint: { __typename?: "FocalPoint"; x: number; y: number };
        }> | null;
      } | null;
      payloadInlineContent?: {
        __typename?: "InlineContentPayload";
        title: string;
        ctaText: string;
        imageUrl: string;
        targetUrl: string;
        dimensions: string;
        description: string;
      } | null;
      payloadSearch?: {
        __typename?: "SearchPayload";
        body: string;
        title: string;
        targetUrl: string;
      } | null;
      payloadSearchHomepage?: {
        __typename?: "SearchHomepagePayload";
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

export type CreateNotificationCreativeMutationVariables = Types.Exact<{
  input: Types.CreateNotificationCreativeInput;
}>;

export type CreateNotificationCreativeMutation = {
  createNotificationCreative: {
    id: string;
    payloadNotification?: {
      body: string;
      title: string;
      targetUrl: string;
    } | null;
  };
};

export type UpdateNotificationCreativeMutationVariables = Types.Exact<{
  input: Types.UpdateNotificationCreativeInput;
}>;

export type UpdateNotificationCreativeMutation = {
  updateNotificationCreative: { id: string };
};

export type CreateCreativeMutationVariables = Types.Exact<{
  input: Types.CreativeInput;
}>;

export type CreateCreativeMutation = {
  __typename?: "Mutation";
  createCreative: { __typename?: "Creative"; id: string };
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
export const CreateNotificationCreativeDocument = gql`
  mutation createNotificationCreative(
    $input: CreateNotificationCreativeInput!
  ) {
    createNotificationCreative(createNotificationCreativeInput: $input) {
      id
      payloadNotification {
        body
        title
        targetUrl
      }
    }
  }
`;
export type CreateNotificationCreativeMutationFn = Apollo.MutationFunction<
  CreateNotificationCreativeMutation,
  CreateNotificationCreativeMutationVariables
>;

/**
 * __useCreateNotificationCreativeMutation__
 *
 * To run a mutation, you first call `useCreateNotificationCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationCreativeMutation, { data, loading, error }] = useCreateNotificationCreativeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationCreativeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNotificationCreativeMutation,
    CreateNotificationCreativeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNotificationCreativeMutation,
    CreateNotificationCreativeMutationVariables
  >(CreateNotificationCreativeDocument, options);
}
export type CreateNotificationCreativeMutationHookResult = ReturnType<
  typeof useCreateNotificationCreativeMutation
>;
export type CreateNotificationCreativeMutationResult =
  Apollo.MutationResult<CreateNotificationCreativeMutation>;
export type CreateNotificationCreativeMutationOptions =
  Apollo.BaseMutationOptions<
    CreateNotificationCreativeMutation,
    CreateNotificationCreativeMutationVariables
  >;
export const UpdateNotificationCreativeDocument = gql`
  mutation updateNotificationCreative(
    $input: UpdateNotificationCreativeInput!
  ) {
    updateNotificationCreative(updateNotificationCreativeInput: $input) {
      id
    }
  }
`;
export type UpdateNotificationCreativeMutationFn = Apollo.MutationFunction<
  UpdateNotificationCreativeMutation,
  UpdateNotificationCreativeMutationVariables
>;

/**
 * __useUpdateNotificationCreativeMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationCreativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationCreativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationCreativeMutation, { data, loading, error }] = useUpdateNotificationCreativeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationCreativeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNotificationCreativeMutation,
    UpdateNotificationCreativeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateNotificationCreativeMutation,
    UpdateNotificationCreativeMutationVariables
  >(UpdateNotificationCreativeDocument, options);
}
export type UpdateNotificationCreativeMutationHookResult = ReturnType<
  typeof useUpdateNotificationCreativeMutation
>;
export type UpdateNotificationCreativeMutationResult =
  Apollo.MutationResult<UpdateNotificationCreativeMutation>;
export type UpdateNotificationCreativeMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateNotificationCreativeMutation,
    UpdateNotificationCreativeMutationVariables
  >;
export const CreateCreativeDocument = gql`
  mutation createCreative($input: CreativeInput!) {
    createCreative(creative: $input) {
      id
    }
  }
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
