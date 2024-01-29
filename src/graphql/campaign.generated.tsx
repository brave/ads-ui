import * as Types from "./types";

import { gql } from "@apollo/client";
import {
  AdSetFragmentDoc,
  AdSetWithDeletedAdsFragmentDoc,
} from "./ad-set.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CampaignFragment = {
  id: string;
  name: string;
  state: string;
  dailyCap: number;
  priority: number;
  passThroughRate: number;
  pacingOverride: boolean;
  pacingStrategy: Types.CampaignPacingStrategies;
  externalId?: string | null;
  currency: string;
  budget: number;
  spent: number;
  createdAt: any;
  startAt: any;
  endAt: any;
  source: Types.CampaignSource;
  type: string;
  format: Types.CampaignFormat;
  paymentType: Types.PaymentType;
  dayProportion?: number | null;
  stripePaymentId?: string | null;
  hasPaymentIntent: boolean;
  dayPartings: Array<{ dow: string; startMinute: number; endMinute: number }>;
  geoTargets: Array<{ code: string; name: string }>;
  adSets: Array<{
    id: string;
    price?: string | null;
    createdAt: any;
    billingType?: string | null;
    name: string;
    totalMax: number;
    perDay: number;
    state: string;
    segments: Array<{ code: string; name: string }>;
    oses: Array<{ code: string; name: string }>;
    conversions: Array<{
      id: string;
      type: string;
      urlPattern: string;
      observationWindow: number;
    }>;
    ads: Array<{
      id: string;
      state: string;
      price: string;
      priceType: Types.ConfirmationType;
      creative: {
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
        payloadSearch?: {
          body: string;
          title: string;
          targetUrl: string;
        } | null;
        payloadSearchHomepage?: {
          body: string;
          imageUrl: string;
          imageDarkModeUrl?: string | null;
          targetUrl: string;
          title: string;
          ctaText: string;
        } | null;
      };
    }>;
  }>;
  advertiser: { id: string };
};

export type CampaignSummaryFragment = {
  id: string;
  name: string;
  state: string;
  dailyCap: number;
  priority: number;
  passThroughRate: number;
  pacingOverride: boolean;
  pacingStrategy: Types.CampaignPacingStrategies;
  externalId?: string | null;
  currency: string;
  budget: number;
  paymentType: Types.PaymentType;
  spent: number;
  createdAt: any;
  startAt: any;
  endAt: any;
  source: Types.CampaignSource;
  type: string;
  format: Types.CampaignFormat;
  dayProportion?: number | null;
};

export type CampaignAdsFragment = {
  id: string;
  name: string;
  state: string;
  startAt: any;
  endAt: any;
  source: Types.CampaignSource;
  currency: string;
  format: Types.CampaignFormat;
  advertiser: { id: string };
  adSets: Array<{
    id: string;
    createdAt: any;
    name: string;
    state: string;
    billingType?: string | null;
    oses: Array<{ code: string; name: string }>;
    segments: Array<{ code: string; name: string }>;
    conversions: Array<{ id: string }>;
    ads: Array<{
      id: string;
      state: string;
      price: string;
      priceType: Types.ConfirmationType;
      creative: {
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
        payloadSearch?: {
          body: string;
          title: string;
          targetUrl: string;
        } | null;
        payloadSearchHomepage?: {
          body: string;
          imageUrl: string;
          imageDarkModeUrl?: string | null;
          targetUrl: string;
          title: string;
          ctaText: string;
        } | null;
      };
    }>;
  }>;
};

export type LoadCampaignQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type LoadCampaignQuery = {
  campaign?: {
    id: string;
    name: string;
    state: string;
    dailyCap: number;
    priority: number;
    passThroughRate: number;
    pacingOverride: boolean;
    pacingStrategy: Types.CampaignPacingStrategies;
    externalId?: string | null;
    currency: string;
    budget: number;
    spent: number;
    createdAt: any;
    startAt: any;
    endAt: any;
    source: Types.CampaignSource;
    type: string;
    format: Types.CampaignFormat;
    paymentType: Types.PaymentType;
    dayProportion?: number | null;
    stripePaymentId?: string | null;
    hasPaymentIntent: boolean;
    dayPartings: Array<{ dow: string; startMinute: number; endMinute: number }>;
    geoTargets: Array<{ code: string; name: string }>;
    adSets: Array<{
      id: string;
      price?: string | null;
      createdAt: any;
      billingType?: string | null;
      name: string;
      totalMax: number;
      perDay: number;
      state: string;
      segments: Array<{ code: string; name: string }>;
      oses: Array<{ code: string; name: string }>;
      conversions: Array<{
        id: string;
        type: string;
        urlPattern: string;
        observationWindow: number;
      }>;
      ads: Array<{
        id: string;
        state: string;
        price: string;
        priceType: Types.ConfirmationType;
        creative: {
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
          payloadSearch?: {
            body: string;
            title: string;
            targetUrl: string;
          } | null;
          payloadSearchHomepage?: {
            body: string;
            imageUrl: string;
            imageDarkModeUrl?: string | null;
            targetUrl: string;
            title: string;
            ctaText: string;
          } | null;
        };
      }>;
    }>;
    advertiser: { id: string };
  } | null;
};

export type LoadCampaignAdsQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type LoadCampaignAdsQuery = {
  campaign?: {
    id: string;
    name: string;
    state: string;
    startAt: any;
    endAt: any;
    source: Types.CampaignSource;
    currency: string;
    format: Types.CampaignFormat;
    advertiser: { id: string };
    adSets: Array<{
      id: string;
      createdAt: any;
      name: string;
      state: string;
      billingType?: string | null;
      oses: Array<{ code: string; name: string }>;
      segments: Array<{ code: string; name: string }>;
      conversions: Array<{ id: string }>;
      ads: Array<{
        id: string;
        state: string;
        price: string;
        priceType: Types.ConfirmationType;
        creative: {
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
          payloadSearch?: {
            body: string;
            title: string;
            targetUrl: string;
          } | null;
          payloadSearchHomepage?: {
            body: string;
            imageUrl: string;
            imageDarkModeUrl?: string | null;
            targetUrl: string;
            title: string;
            ctaText: string;
          } | null;
        };
      }>;
    }>;
  } | null;
};

export type CreateCampaignMutationVariables = Types.Exact<{
  input: Types.CreateCampaignInput;
}>;

export type CreateCampaignMutation = {
  createCampaign: { id: string; paymentType: Types.PaymentType };
};

export type UpdateCampaignMutationVariables = Types.Exact<{
  input: Types.UpdateCampaignInput;
}>;

export type UpdateCampaignMutation = {
  updateCampaign: {
    id: string;
    paymentType: Types.PaymentType;
    stripePaymentId?: string | null;
  };
};

export const CampaignFragmentDoc = gql`
  fragment Campaign on Campaign {
    id
    name
    state
    dailyCap
    priority
    passThroughRate
    pacingOverride
    pacingStrategy
    externalId
    currency
    budget
    spent
    createdAt
    startAt
    endAt
    source
    type
    format
    paymentType
    dayProportion
    stripePaymentId
    paymentType
    hasPaymentIntent
    dayPartings {
      dow
      startMinute
      endMinute
    }
    geoTargets {
      code
      name
    }
    adSets {
      ...AdSet
    }
    advertiser {
      id
    }
  }
  ${AdSetFragmentDoc}
`;
export const CampaignSummaryFragmentDoc = gql`
  fragment CampaignSummary on Campaign {
    id
    name
    state
    dailyCap
    priority
    passThroughRate
    pacingOverride
    pacingStrategy
    externalId
    currency
    budget
    paymentType
    spent
    createdAt
    startAt
    endAt
    source
    type
    format
    paymentType
    dayProportion
  }
`;
export const CampaignAdsFragmentDoc = gql`
  fragment CampaignAds on Campaign {
    id
    name
    state
    startAt
    endAt
    source
    currency
    format
    advertiser {
      id
    }
    adSets {
      ...AdSetWithDeletedAds
    }
  }
  ${AdSetWithDeletedAdsFragmentDoc}
`;
export const LoadCampaignDocument = gql`
  query LoadCampaign($id: String!) {
    campaign(id: $id) {
      ...Campaign
    }
  }
  ${CampaignFragmentDoc}
`;

/**
 * __useLoadCampaignQuery__
 *
 * To run a query within a React component, call `useLoadCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadCampaignQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadCampaignQuery,
    LoadCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoadCampaignQuery, LoadCampaignQueryVariables>(
    LoadCampaignDocument,
    options,
  );
}
export function useLoadCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadCampaignQuery,
    LoadCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoadCampaignQuery, LoadCampaignQueryVariables>(
    LoadCampaignDocument,
    options,
  );
}
export function useLoadCampaignSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LoadCampaignQuery,
    LoadCampaignQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoadCampaignQuery, LoadCampaignQueryVariables>(
    LoadCampaignDocument,
    options,
  );
}
export type LoadCampaignQueryHookResult = ReturnType<
  typeof useLoadCampaignQuery
>;
export type LoadCampaignLazyQueryHookResult = ReturnType<
  typeof useLoadCampaignLazyQuery
>;
export type LoadCampaignSuspenseQueryHookResult = ReturnType<
  typeof useLoadCampaignSuspenseQuery
>;
export type LoadCampaignQueryResult = Apollo.QueryResult<
  LoadCampaignQuery,
  LoadCampaignQueryVariables
>;
export function refetchLoadCampaignQuery(
  variables: LoadCampaignQueryVariables,
) {
  return { query: LoadCampaignDocument, variables: variables };
}
export const LoadCampaignAdsDocument = gql`
  query LoadCampaignAds($id: String!) {
    campaign(id: $id) {
      ...CampaignAds
    }
  }
  ${CampaignAdsFragmentDoc}
`;

/**
 * __useLoadCampaignAdsQuery__
 *
 * To run a query within a React component, call `useLoadCampaignAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadCampaignAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadCampaignAdsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadCampaignAdsQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadCampaignAdsQuery,
    LoadCampaignAdsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoadCampaignAdsQuery, LoadCampaignAdsQueryVariables>(
    LoadCampaignAdsDocument,
    options,
  );
}
export function useLoadCampaignAdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadCampaignAdsQuery,
    LoadCampaignAdsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LoadCampaignAdsQuery,
    LoadCampaignAdsQueryVariables
  >(LoadCampaignAdsDocument, options);
}
export function useLoadCampaignAdsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LoadCampaignAdsQuery,
    LoadCampaignAdsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    LoadCampaignAdsQuery,
    LoadCampaignAdsQueryVariables
  >(LoadCampaignAdsDocument, options);
}
export type LoadCampaignAdsQueryHookResult = ReturnType<
  typeof useLoadCampaignAdsQuery
>;
export type LoadCampaignAdsLazyQueryHookResult = ReturnType<
  typeof useLoadCampaignAdsLazyQuery
>;
export type LoadCampaignAdsSuspenseQueryHookResult = ReturnType<
  typeof useLoadCampaignAdsSuspenseQuery
>;
export type LoadCampaignAdsQueryResult = Apollo.QueryResult<
  LoadCampaignAdsQuery,
  LoadCampaignAdsQueryVariables
>;
export function refetchLoadCampaignAdsQuery(
  variables: LoadCampaignAdsQueryVariables,
) {
  return { query: LoadCampaignAdsDocument, variables: variables };
}
export const CreateCampaignDocument = gql`
  mutation CreateCampaign($input: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $input) {
      id
      paymentType
    }
  }
`;
export type CreateCampaignMutationFn = Apollo.MutationFunction<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;

/**
 * __useCreateCampaignMutation__
 *
 * To run a mutation, you first call `useCreateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaignMutation, { data, loading, error }] = useCreateCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >(CreateCampaignDocument, options);
}
export type CreateCampaignMutationHookResult = ReturnType<
  typeof useCreateCampaignMutation
>;
export type CreateCampaignMutationResult =
  Apollo.MutationResult<CreateCampaignMutation>;
export type CreateCampaignMutationOptions = Apollo.BaseMutationOptions<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;
export const UpdateCampaignDocument = gql`
  mutation UpdateCampaign($input: UpdateCampaignInput!) {
    updateCampaign(updateCampaignInput: $input) {
      id
      paymentType
      stripePaymentId
    }
  }
`;
export type UpdateCampaignMutationFn = Apollo.MutationFunction<
  UpdateCampaignMutation,
  UpdateCampaignMutationVariables
>;

/**
 * __useUpdateCampaignMutation__
 *
 * To run a mutation, you first call `useUpdateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCampaignMutation, { data, loading, error }] = useUpdateCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCampaignMutation,
    UpdateCampaignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCampaignMutation,
    UpdateCampaignMutationVariables
  >(UpdateCampaignDocument, options);
}
export type UpdateCampaignMutationHookResult = ReturnType<
  typeof useUpdateCampaignMutation
>;
export type UpdateCampaignMutationResult =
  Apollo.MutationResult<UpdateCampaignMutation>;
export type UpdateCampaignMutationOptions = Apollo.BaseMutationOptions<
  UpdateCampaignMutation,
  UpdateCampaignMutationVariables
>;
