/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: object; output: object; }
  /** The `Numeric` datatype represents a fixed-precision number, which does not suffer from the rounding errors of a javascript floating point number. It's always returned as a string, but for input types either a string or number can be used, though strings are preferred to avoid risk of inaccuracy. */
  Numeric: { input: string | number; output: string; }
};

export type AdSetFilter = {
  /** only include adsets whose name contains this string (case-insensitive) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** only include adsets in any of these states */
  state?: InputMaybe<Array<AdSetState>>;
};

export enum AdSetState {
  Active = 'active',
  Draft = 'draft',
  Invalid = 'invalid',
  Paused = 'paused',
  Suspended = 'suspended',
  UnderReview = 'under_review'
}

export type AdsManagerAdSetInput = {
  /** New Ad Sets to be added to the Campaign, which require price and billing type */
  add?: InputMaybe<Array<AdsManagerNewAdSetInput>>;
  /** Ad Sets that are already part of the Campaign, which require an ID */
  modify?: InputMaybe<Array<AdsManagerUpdateAdSetInput>>;
};

export type AdsManagerConversionInput = {
  observationWindow: Scalars['Float']['input'];
  urlPattern: Scalars['String']['input'];
};

export type AdsManagerNewAdSetInput = {
  billingType: Scalars['String']['input'];
  conversion?: InputMaybe<AdsManagerConversionInput>;
  creativeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  osCodes: Array<Scalars['String']['input']>;
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price: Scalars['Numeric']['input'];
  segmentCodes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AdsManagerUpdateAdSetInput = {
  conversion?: InputMaybe<AdsManagerConversionInput>;
  creativeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  osCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  segmentCodes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AdsManagerUpdateAdvertiserInput = {
  /** Agreed to Terms And Conditions - Advertiser Facing Dashboard */
  agreed?: InputMaybe<Scalars['Boolean']['input']>;
  billingAddress?: InputMaybe<UpdateAddressInput>;
  id: Scalars['String']['input'];
  publicKey?: InputMaybe<Scalars['String']['input']>;
};

export type AdsManagerUpdateCampaignInput = {
  adSets?: InputMaybe<AdsManagerAdSetInput>;
  budget?: InputMaybe<Scalars['Numeric']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  geoTargetCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AdsManagerUpdateCreativeInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  payloadInlineContent?: InputMaybe<AdsManagerUpdateInlineContentPayloadInput>;
  payloadNotification?: InputMaybe<AdsManagerUpdateNotificationPayloadInput>;
};

export type AdsManagerUpdateInlineContentPayloadInput = {
  ctaText?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  targetUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AdsManagerUpdateNotificationPayloadInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  targetUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AdvertiserCampaignFilter = {
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** include ads */
  includeAds?: InputMaybe<Scalars['Boolean']['input']>;
  /** include creative sets */
  includeCreativeSets?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AdvertiserFilter = {
  state?: InputMaybe<Scalars['String']['input']>;
};

export type AdvertiserPriceInput = {
  billingModelPrice: Scalars['Numeric']['input'];
  billingType: BillingType;
  format: CampaignFormat;
};

export enum AdvertiserSource {
  Managed = 'MANAGED',
  SelfServe = 'SELF_SERVE'
}

export type ApproveCampaignInput = {
  campaignId: Scalars['String']['input'];
};

export enum BillingType {
  Cpc = 'CPC',
  Cpm = 'CPM',
  /** @deprecated Experiment, no longer supported */
  Cpsv = 'CPSV'
}

/** This is deprecated and will soon be replaced with CamapignState */
export enum CampaignEffectiveState {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Daycomplete = 'DAYCOMPLETE',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Invalid = 'INVALID',
  Paused = 'PAUSED',
  Suspended = 'SUSPENDED',
  UnderReview = 'UNDER_REVIEW'
}

export type CampaignFilter = {
  /** only include campaigns for this format */
  format?: InputMaybe<CampaignFormat>;
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** only include campaigns with this source */
  source?: InputMaybe<CampaignSource>;
  /** only include campaigns with this state */
  state?: InputMaybe<CampaignState>;
  /** exclude all campaigns whose time range is completely after this time */
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum CampaignFormat {
  NewsDisplayAd = 'NEWS_DISPLAY_AD',
  NtpSi = 'NTP_SI',
  PushNotification = 'PUSH_NOTIFICATION',
  Search = 'SEARCH',
  SearchHomepage = 'SEARCH_HOMEPAGE'
}

export enum CampaignPacingStrategies {
  ModelV1 = 'MODEL_V1',
  Original = 'ORIGINAL'
}

export type CampaignPerformanceFilter = {
  /** include only metrics for responses for all these countries */
  country?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include metrics starting from this time (inclusive) */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** include only metrics for responses for all these operating systems */
  os?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include only metrics for responses for all these segments */
  segment?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include metrics before this time (inclusive) */
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum CampaignRejection {
  InappropriateContent = 'INAPPROPRIATE_CONTENT',
  InvalidLandingPage = 'INVALID_LANDING_PAGE',
  Other = 'OTHER',
  ProhibitedCategory = 'PROHIBITED_CATEGORY'
}

export enum CampaignSource {
  Direct = 'DIRECT',
  Managed = 'MANAGED',
  Network = 'NETWORK',
  SelfServe = 'SELF_SERVE'
}

export enum CampaignState {
  Active = 'active',
  Completed = 'completed',
  Daycomplete = 'daycomplete',
  Deleted = 'deleted',
  Draft = 'draft',
  Invalid = 'invalid',
  Paused = 'paused',
  Suspended = 'suspended',
  UnderReview = 'under_review'
}

export enum CampaignType {
  Affiliate = 'AFFILIATE',
  Barter = 'BARTER',
  Cause = 'CAUSE',
  Fixed = 'FIXED',
  Free = 'FREE',
  House = 'HOUSE',
  MakeGood = 'MAKE_GOOD',
  Paid = 'PAID',
  Preemptive = 'PREEMPTIVE',
  Survey = 'SURVEY',
  Trial = 'TRIAL'
}

export type ChangeFilter = {
  /** exclude all changes whose time range is completely before this time */
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>;
  /** include changes made by system user */
  includeSystemUser?: InputMaybe<Scalars['Boolean']['input']>;
  /** limit the amount of results returned */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** only include changes for this reference id */
  referenceId?: InputMaybe<Scalars['String']['input']>;
  /** only include changes for this set of reference ids */
  referenceIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ConditionMatchersInput = {
  condition: Scalars['String']['input'];
  prefPath: Scalars['String']['input'];
};

export type CreateAdInput = {
  creative?: InputMaybe<CreativeInput>;
  creativeId?: InputMaybe<Scalars['String']['input']>;
  creativeSetId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  billingType: Scalars['String']['input'];
  brandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  brandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  campaignId?: InputMaybe<Scalars['String']['input']>;
  conditionMatchers?: InputMaybe<Array<ConditionMatchersInput>>;
  conversions?: InputMaybe<Array<CreateConversionInput>>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  keywordSimilarity?: InputMaybe<Scalars['Float']['input']>;
  keywordSimilarityMobile?: InputMaybe<Scalars['Float']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeTriggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeUrlPatterns?: InputMaybe<Array<Scalars['String']['input']>>;
  nonBrandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  nonBrandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  optimized?: InputMaybe<Scalars['Boolean']['input']>;
  oses?: InputMaybe<Array<CreateOsInput>>;
  perDay: Scalars['Float']['input'];
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price: Scalars['Numeric']['input'];
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  segments: Array<CreateSegmentInput>;
  splitTestGroup?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<AdSetState>;
  totalMax: Scalars['Float']['input'];
  triggerDomains?: InputMaybe<Array<Scalars['String']['input']>>;
  triggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street1: Scalars['String']['input'];
  street2?: InputMaybe<Scalars['String']['input']>;
  zipcode: Scalars['String']['input'];
};

export type CreateAdvertiserImageInput = {
  advertiserId: Scalars['String']['input'];
  format: CampaignFormat;
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateAdvertiserInput = {
  accountManagerId?: InputMaybe<Scalars['String']['input']>;
  additionalBillingEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  billingAddress?: InputMaybe<CreateAddressInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  billingModelPrices?: InputMaybe<Array<AdvertiserPriceInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  marketingChannel?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  selfServiceManageCampaign?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCampaignInput = {
  accountManagerId?: InputMaybe<Scalars['String']['input']>;
  adSets?: InputMaybe<Array<CreateAdSetInput>>;
  advertiserId: Scalars['String']['input'];
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  brandedKeyword?: InputMaybe<Scalars['String']['input']>;
  brandedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  budget: Scalars['Numeric']['input'];
  currency?: Scalars['String']['input'];
  customFavicon?: InputMaybe<Scalars['String']['input']>;
  customSiteName?: InputMaybe<Scalars['String']['input']>;
  dailyBudget?: InputMaybe<Scalars['Numeric']['input']>;
  dailyCap?: Scalars['Float']['input'];
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']['input']>;
  endAt: Scalars['DateTime']['input'];
  externalId?: InputMaybe<Scalars['String']['input']>;
  format: CampaignFormat;
  geoTargets: Array<GeocodeInput>;
  name: Scalars['String']['input'];
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  paymentType?: InputMaybe<PaymentType>;
  permitNonFamilyFriendly?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  source: Scalars['String']['input'];
  startAt: Scalars['DateTime']['input'];
  state: CampaignState;
  type?: CampaignType;
};

export type CreateCommentInput = {
  campaignId: Scalars['String']['input'];
  note: Scalars['String']['input'];
};

export type CreateConversionInput = {
  extractExternalId?: InputMaybe<Scalars['Boolean']['input']>;
  observationWindow: Scalars['Float']['input'];
  trailingAsteriskNotRequired?: InputMaybe<Scalars['Boolean']['input']>;
  type: Scalars['String']['input'];
  urlPattern: Scalars['String']['input'];
};

export type CreateOsInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSegmentInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
};

export type CreativeFilter = {
  /** only include creatives with this state */
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CreativeInput = {
  advertiserId: Scalars['String']['input'];
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  payloadInPage?: InputMaybe<InPagePayloadInput>;
  payloadInlineContent?: InputMaybe<InlineContentPayloadInput>;
  payloadNewTabPage?: InputMaybe<NewTabPagePayloadInput>;
  payloadNotification?: InputMaybe<NotificationPayloadInput>;
  payloadPromotedContent?: InputMaybe<PromotedContentPayloadInput>;
  payloadSearch?: InputMaybe<SearchPayloadInput>;
  payloadSearchHomepage?: InputMaybe<SearchHomepagePayloadInput>;
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state: Scalars['String']['input'];
};

export enum CreativeTypeCode {
  /** @deprecated Historic, no longer supported */
  InPageAllV1 = 'in_page_all_v1',
  /** Used for news display ads */
  InlineContentAllV1 = 'inline_content_all_v1',
  NewTabPageAllV1 = 'new_tab_page_all_v1',
  NotificationAllV1 = 'notification_all_v1',
  /** @deprecated Historic, no longer supported */
  PromotedContentAllV1 = 'promoted_content_all_v1',
  SearchAllV1 = 'search_all_v1',
  SearchHomepageAllV1 = 'search_homepage_all_v1'
}

export type CreativeTypeInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DayPartingInput = {
  dow: Scalars['String']['input'];
  endMinute: Scalars['Float']['input'];
  startMinute: Scalars['Float']['input'];
};

export type DeleteAdInput = {
  id: Scalars['String']['input'];
};

export type FocalPointInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type GeocodeInput = {
  code: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InPagePayloadInput = {
  creativeUrl: Scalars['String']['input'];
  /** size of the creative, e.g. 1024x768 */
  size: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
};

export type InlineContentPayloadInput = {
  ctaText: Scalars['String']['input'];
  description: Scalars['String']['input'];
  dimensions: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type KeyValueInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum LedgerTransactionType {
  CampaignTransfer = 'campaign_transfer',
  ExternalCredit = 'external_credit',
  ExternalDebit = 'external_debit'
}

export enum LedgerTransferSource {
  Advertiser = 'advertiser',
  Campaign = 'campaign'
}

export enum LedgerTransferStatus {
  Complete = 'complete',
  Failed = 'failed',
  Pending = 'pending'
}

export type LogoInput = {
  alt: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  destinationUrl: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type NewTabPagePayloadInput = {
  logo?: InputMaybe<LogoInput>;
  wallpapers?: InputMaybe<Array<WallpaperInput>>;
};

export type NotificationPayloadInput = {
  body: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export enum PaymentEventSource {
  Brave = 'brave',
  Radom = 'radom',
  Stripe = 'stripe'
}

export enum PaymentType {
  BraveLedger = 'BRAVE_LEDGER',
  ManualBat = 'MANUAL_BAT',
  Netsuite = 'NETSUITE',
  Radom = 'RADOM',
  Stripe = 'STRIPE'
}

export type PerformanceFilter = {
  /** include metrics for all these advertisers' campaigns */
  advertiserIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include metrics for all these campaigns */
  campaignIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include only metrics for responses for all these countries */
  country?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include metrics starting from this time (inclusive) */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** include only metrics for responses for all these operating systems */
  os?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include only metrics for responses for all these segments */
  segment?: InputMaybe<Array<Scalars['String']['input']>>;
  /** include metrics before this time (inclusive) */
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PromotedContentPayloadInput = {
  category: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  description: Scalars['String']['input'];
  domain?: InputMaybe<Scalars['String']['input']>;
  feed: Scalars['String']['input'];
  ogImages: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export enum RegistrationDenial {
  BadLandingPage = 'bad_landing_page',
  ContentCannotRun = 'content_cannot_run',
  DomainMismatch = 'domain_mismatch',
  LanguageNotSupported = 'language_not_supported',
  MissingTos = 'missing_tos'
}

export type RegistrationFilter = {
  state?: InputMaybe<Scalars['String']['input']>;
};

export enum RegistrationState {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  UnderReview = 'UNDER_REVIEW'
}

export type RejectCampaignInput = {
  campaignId: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  option: CampaignRejection;
};

export type SearchEligibilityFilter = {
  /** only include eligibility checks in any of these statuses */
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchHomepagePayloadInput = {
  body: Scalars['String']['input'];
  ctaText?: Scalars['String']['input'];
  imageDarkModeUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type SearchPayloadInput = {
  body: Scalars['String']['input'];
  /** ad-hoc parameters passed to search */
  meta?: InputMaybe<Scalars['JSONObject']['input']>;
  /** optionally, how this creative should be rendered with the SERP */
  style?: InputMaybe<Scalars['String']['input']>;
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  billingType?: InputMaybe<Scalars['String']['input']>;
  brandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  brandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  campaignId?: InputMaybe<Scalars['String']['input']>;
  conditionMatchers?: InputMaybe<Array<ConditionMatchersInput>>;
  conversions?: InputMaybe<Array<UpdateConversionsInput>>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  keywordSimilarity?: InputMaybe<Scalars['Float']['input']>;
  keywordSimilarityMobile?: InputMaybe<Scalars['Float']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeTriggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeUrlPatterns?: InputMaybe<Array<Scalars['String']['input']>>;
  nonBrandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  nonBrandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  optimized?: InputMaybe<Scalars['Boolean']['input']>;
  oses?: InputMaybe<Array<UpdateOSesInput>>;
  perDay?: InputMaybe<Scalars['Float']['input']>;
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price?: InputMaybe<Scalars['Numeric']['input']>;
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  segments?: InputMaybe<Array<UpdateSegmentInput>>;
  splitTestGroup?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<AdSetState>;
  totalMax?: InputMaybe<Scalars['Float']['input']>;
  triggerDomains?: InputMaybe<Array<Scalars['String']['input']>>;
  triggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  /** Temporarily nullable so the frontend does not break */
  id?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street1?: InputMaybe<Scalars['String']['input']>;
  street2?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdvertiserInput = {
  accountManagerId?: InputMaybe<Scalars['String']['input']>;
  additionalBillingEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Agreed to Terms And Conditions - Advertiser Facing Dashboard */
  agreed?: InputMaybe<Scalars['Boolean']['input']>;
  billingAddress?: InputMaybe<UpdateAddressInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  billingModelPrices?: InputMaybe<Array<AdvertiserPriceInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  marketingChannel?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ofacCompliant?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  selfServiceManageCampaign?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<UpdateUserInput>>;
};

export type UpdateCampaignInput = {
  accountManagerId?: InputMaybe<Scalars['String']['input']>;
  adSets?: InputMaybe<Array<UpdateAdSetInput>>;
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  brandedKeyword?: InputMaybe<Scalars['String']['input']>;
  brandedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  budget?: InputMaybe<Scalars['Numeric']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customFavicon?: InputMaybe<Scalars['String']['input']>;
  customSiteName?: InputMaybe<Scalars['String']['input']>;
  dailyBudget?: InputMaybe<Scalars['Numeric']['input']>;
  dailyCap?: InputMaybe<Scalars['Float']['input']>;
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  geoTargets?: InputMaybe<Array<GeocodeInput>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  pacingOverride?: InputMaybe<Scalars['Boolean']['input']>;
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  passThroughRate?: InputMaybe<Scalars['Float']['input']>;
  paymentType?: InputMaybe<PaymentType>;
  permitNonFamilyFriendly?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<CampaignState>;
  type?: InputMaybe<CampaignType>;
};

export type UpdateConversionsInput = {
  extractExternalId?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  observationWindow?: InputMaybe<Scalars['Float']['input']>;
  trailingAsteriskNotRequired?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  urlPattern?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCreativeInput = {
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  payloadInPage?: InputMaybe<InPagePayloadInput>;
  payloadInlineContent?: InputMaybe<InlineContentPayloadInput>;
  payloadNewTabPage?: InputMaybe<NewTabPagePayloadInput>;
  payloadNotification?: InputMaybe<NotificationPayloadInput>;
  payloadPromotedContent?: InputMaybe<PromotedContentPayloadInput>;
  payloadSearch?: InputMaybe<SearchPayloadInput>;
  payloadSearchHomepage?: InputMaybe<SearchHomepagePayloadInput>;
  queryStrings?: InputMaybe<Array<KeyValueInput>>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCurrentUserInput = {
  fullName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOSesInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSegmentInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type WallpaperInput = {
  conditionMatchers?: InputMaybe<Array<ConditionMatchersInput>>;
  focalPoint: FocalPointInput;
  imageUrl: Scalars['String']['input'];
};

export type UpdateAdvertiserMutationVariables = Exact<{
  input: AdsManagerUpdateAdvertiserInput;
}>;


export type UpdateAdvertiserMutation = { __typename?: 'Mutation', adsManagerUpdateAdvertiser: { __typename?: 'Advertiser', id: string, publicKey?: string | null } };

export type CopyCampaignMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CopyCampaignMutation = { __typename?: 'Mutation', copyCampaign: { __typename?: 'Campaign', id: string, state: CampaignState } };

export type ForceCampaignCompleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ForceCampaignCompleteMutation = { __typename?: 'Mutation', forceCampaignCompletionAndTransferFunds: string };

export type AdsManagerUpdateCreativeStateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  state: Scalars['String']['input'];
}>;


export type AdsManagerUpdateCreativeStateMutation = { __typename?: 'Mutation', adsManagerUpdateCreativeState: { __typename?: 'Creative', id: string } };

export type AdsManagerUpdateCreativePayloadMutationVariables = Exact<{
  input: AdsManagerUpdateCreativeInput;
}>;


export type AdsManagerUpdateCreativePayloadMutation = { __typename?: 'Mutation', adsManagerUpdateCreativePayload: { __typename?: 'Creative', id: string } };

export type UpdateAdSetStateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  state: AdSetState;
}>;


export type UpdateAdSetStateMutation = { __typename?: 'Mutation', adsManagerUpdateAdSetState: { __typename?: 'AdSet', id: string } };

export type CampaignTransferStatusQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CampaignTransferStatusQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean } | null };

export type AdSetFragment = { __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: AdSetState, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> };

export type AdFragment = { __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } };

export type AdSetWithDeletedAdsFragment = { __typename?: 'AdSet', id: string, createdAt: string, name: string, state: AdSetState, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> };

export type AdvertiserBillingAddressFragment = { __typename?: 'Advertiser', billingAddress?: { __typename?: 'Address', id: string, street1: string, street2?: string | null, city: string, country: string, state: string, zipcode: string } | null };

export type AdvertiserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, publicKey?: string | null } | null };

export type AdvertiserCampaignsFragment = { __typename?: 'Advertiser', id: string, name: string, selfServiceManageCampaign: boolean, selfServiceSetPrice: boolean, campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null, brandedKeywords?: Array<string> | null, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean, advertiser: { __typename?: 'Advertiser', id: string, name: string } }> };

export type AdvertiserCampaignsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  filter?: InputMaybe<AdvertiserCampaignFilter>;
}>;


export type AdvertiserCampaignsQuery = { __typename?: 'Query', advertiserCampaigns?: { __typename?: 'Advertiser', id: string, name: string, selfServiceManageCampaign: boolean, selfServiceSetPrice: boolean, campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null, brandedKeywords?: Array<string> | null, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean, advertiser: { __typename?: 'Advertiser', id: string, name: string } }> } | null };

export type AdvertiserImageFragment = { __typename?: 'AdvertiserImage', name: string, imageUrl: string, format: CampaignFormat, id: string, createdAt: string };

export type AdvertiserPriceFragment = { __typename?: 'AdvertiserPrice', billingModelPrice: string, billingType: BillingType, format: CampaignFormat };

export type AdvertiserImagesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserImagesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, images: Array<{ __typename?: 'AdvertiserImage', name: string, imageUrl: string, format: CampaignFormat, id: string, createdAt: string }> } | null };

export type AdvertiserPricesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserPricesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, prices: Array<{ __typename?: 'AdvertiserPrice', billingModelPrice: string, billingType: BillingType, format: CampaignFormat }> } | null };

export type AdvertiserBillingAddressQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserBillingAddressQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, billingAddress?: { __typename?: 'Address', id: string, street1: string, street2?: string | null, city: string, country: string, state: string, zipcode: string } | null } | null };

export type UploadAdvertiserImageMutationVariables = Exact<{
  input: CreateAdvertiserImageInput;
}>;


export type UploadAdvertiserImageMutation = { __typename?: 'Mutation', createAdvertiserImage: { __typename?: 'AdvertiserImage', id: string, name: string } };

export type CampaignMetricSummaryValuesFragment = { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string } };

export type CampaignMetricsQueryVariables = Exact<{
  campaignIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CampaignMetricsQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', campaign: { __typename?: 'Campaign', id: string } }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string } } }> } };

export type CampaignMetricDetailValuesFragment = { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } };

export type DailyValuesFragment = { __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', day: string }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } };

export type FetchDailyMetricsForCampaignQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type FetchDailyMetricsForCampaignQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', day: string }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } }>, total: { __typename?: 'PerformanceValues', metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } } } };

export type AdSetValuesFragment = { __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', adSet: { __typename?: 'AdSet', id: string, name: string, state: AdSetState, billingType?: string | null } }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } };

export type FetchAdSetMetricsForCampaignQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type FetchAdSetMetricsForCampaignQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', adSet: { __typename?: 'AdSet', id: string, name: string, state: AdSetState, billingType?: string | null } }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } }> } };

export type CampaignFragment = { __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, paymentType: PaymentType, dayProportion?: number | null, stripePaymentId?: string | null, hasPaymentIntent: boolean, dayPartings: Array<{ __typename?: 'DayParting', dow: string, startMinute: number, endMinute: number }>, geoTargets: Array<{ __typename?: 'Geocode', code: string, name: string }>, adSets: Array<{ __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: AdSetState, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }>, advertiser: { __typename?: 'Advertiser', id: string } };

export type CampaignSummaryFragment = { __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null, brandedKeywords?: Array<string> | null, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean, advertiser: { __typename?: 'Advertiser', id: string, name: string } };

export type CampaignAdsFragment = { __typename?: 'Campaign', id: string, name: string, state: CampaignState, startAt: string, endAt: string, source: CampaignSource, currency: string, format: CampaignFormat, advertiser: { __typename?: 'Advertiser', id: string }, adSets: Array<{ __typename?: 'AdSet', id: string, createdAt: string, name: string, state: AdSetState, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }> };

export type LoadCampaignQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, paymentType: PaymentType, dayProportion?: number | null, stripePaymentId?: string | null, hasPaymentIntent: boolean, dayPartings: Array<{ __typename?: 'DayParting', dow: string, startMinute: number, endMinute: number }>, geoTargets: Array<{ __typename?: 'Geocode', code: string, name: string }>, adSets: Array<{ __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: AdSetState, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }>, advertiser: { __typename?: 'Advertiser', id: string } } | null };

export type LoadCampaignAdsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignAdsQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: CampaignState, startAt: string, endAt: string, source: CampaignSource, currency: string, format: CampaignFormat, advertiser: { __typename?: 'Advertiser', id: string }, adSets: Array<{ __typename?: 'AdSet', id: string, createdAt: string, name: string, state: AdSetState, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }> } | null };

export type CreateCampaignMutationVariables = Exact<{
  input: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', id: string, paymentType: PaymentType } };

export type UpdateCampaignMutationVariables = Exact<{
  input: UpdateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'Campaign', id: string, paymentType: PaymentType, stripePaymentId?: string | null } };

export type GeocodeFragment = { __typename?: 'Geocode', code: string, name: string };

export type SegmentFragment = { __typename?: 'Segment', code: string, name: string };

export type ActiveGeocodesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveGeocodesQuery = { __typename?: 'Query', geocodes: Array<{ __typename?: 'Geocode', code: string, name: string }> };

export type SegmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type SegmentsQuery = { __typename?: 'Query', segments: { __typename?: 'SegmentsQueryDTO', data: Array<{ __typename?: 'Segment', code: string, name: string }> } };

export type CreativeFragment = { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null };

export type AdvertiserCreativesQueryVariables = Exact<{
  advertiserId: Scalars['String']['input'];
}>;


export type AdvertiserCreativesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, creatives: Array<{ __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null }> } | null };

export type CreateCreativeMutationVariables = Exact<{
  input: CreativeInput;
}>;


export type CreateCreativeMutation = { __typename?: 'Mutation', createCreative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } };

export type LoadCreativeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCreativeQuery = { __typename?: 'Query', creative?: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } | null };

export type CampaignsForCreativeQueryVariables = Exact<{
  creativeId: Scalars['String']['input'];
  advertiserId: Scalars['String']['input'];
}>;


export type CampaignsForCreativeQuery = { __typename?: 'Query', creativeCampaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: CampaignState, format: CampaignFormat }> };

export type DisplayedMetricsFragment = { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } };

export type DailyMetricValuesFragment = { __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', day: string }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } };

export type ValidateTargetUrlQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type ValidateTargetUrlQuery = { __typename?: 'Query', validateTargetUrl: { __typename?: 'TargetUrlValidation', isValid: boolean, redirects: Array<{ __typename?: 'Redirect', url: string, violations: Array<{ __typename?: 'ValidationDetail', summary: string, detail: string }> }> } };

export type UserFragment = { __typename?: 'User', email: string, fullName: string, id: string, role: string };

export type LoadUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadUserQuery = { __typename?: 'Query', user: { __typename?: 'User', email: string, fullName: string, id: string, role: string } };

export type CampaignAnalyticsQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type CampaignAnalyticsQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', total: { __typename?: 'PerformanceValues', metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }, values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', day: string }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }> } };

export type AdSetBreakdownQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type AdSetBreakdownQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', adSet: { __typename?: 'AdSet', id: string, name: string } }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }> } };

export type CreativeBreakdownQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type CreativeBreakdownQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', ad: { __typename?: 'Ad', id: string, creative: { __typename?: 'Creative', id: string, name: string } } }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }> } };

export type OsBreakdownQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type OsBreakdownQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', os: string }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }> } };

export type HourlyGraphQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type HourlyGraphQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', hour: string }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } }> } };

export type HourlyValuesFragment = { __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', hour: string }, metrics: { __typename?: 'Metrics', impression: string, click: string, siteVisit: string, conversion: string, viewThroughConversion: string, clickThroughConversion: string, dismiss: string, spendUsd: string, upvote: string, downvote: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, clickToSiteVisit: string, impressionToSiteVisit: string, impressionToDismiss: string, costPerAcquisition: string } } };

export type CurrentAdvertiserBalanceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CurrentAdvertiserBalanceQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, accountBalance: string } | null };

export type UpdateCurrentUserMutationVariables = Exact<{
  input: UpdateCurrentUserInput;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'User', email: string, fullName: string, id: string, role: string } };

export type AdsManagerUpdateCampaignMutationVariables = Exact<{
  input: AdsManagerUpdateCampaignInput;
}>;


export type AdsManagerUpdateCampaignMutation = { __typename?: 'Mutation', adsManagerUpdateCampaign: { __typename?: 'Campaign', id: string } };

export type LoadCampaignSummaryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignSummaryQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null, brandedKeywords?: Array<string> | null, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean, adSets: Array<{ __typename?: 'AdSet', id: string, conversions: Array<{ __typename?: 'Conversion', id: string, extractExternalId: boolean }> }>, advertiser: { __typename?: 'Advertiser', id: string, name: string } } | null };

export type CampaignOverviewFragment = { __typename?: 'Campaign', id: string, name: string, state: CampaignState, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null, brandedKeywords?: Array<string> | null, adsManagerCurrentBalance: string, hasInProcessOrCompleteTransfer: boolean, adSets: Array<{ __typename?: 'AdSet', id: string, conversions: Array<{ __typename?: 'Conversion', id: string, extractExternalId: boolean }> }>, advertiser: { __typename?: 'Advertiser', id: string, name: string } };

export type CreateSearchCampaignLandingPageListQueryVariables = Exact<{
  domain: Scalars['String']['input'];
  country: Scalars['String']['input'];
  offset: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
}>;


export type CreateSearchCampaignLandingPageListQuery = { __typename?: 'Query', searchProspects: { __typename?: 'SearchProspects', landingPagesWithStats: Array<{ __typename?: 'SearchLandingPageWithStats', url: string, rank: string, lastSeen: string, favicon: string, creatives: Array<{ __typename?: 'SearchLandingPageCreative', title: string, body?: string | null, lastSeen: string }> }> } };

export type SearchProspectsLandingPageListFragment = { __typename?: 'SearchLandingPageWithStats', url: string, rank: string, lastSeen: string, favicon: string, creatives: Array<{ __typename?: 'SearchLandingPageCreative', title: string, body?: string | null, lastSeen: string }> };

export type SearchProspectsLandingPageDetailQueryVariables = Exact<{
  domain: Scalars['String']['input'];
  country: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type SearchProspectsLandingPageDetailQuery = { __typename?: 'Query', searchProspects: { __typename?: 'SearchProspects', landingPage: { __typename?: 'SearchLandingPage', url: string, queries: Array<{ __typename?: 'SearchLandingPageQuery', query: string }> } } };

export type SearchProspectsLandingPageDetailFragment = { __typename?: 'SearchLandingPage', url: string, queries: Array<{ __typename?: 'SearchLandingPageQuery', query: string }> };

export const AdvertiserBillingAddressFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserBillingAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street1"}},{"kind":"Field","name":{"kind":"Name","value":"street2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]} as unknown as DocumentNode<AdvertiserBillingAddressFragment, unknown>;
export const CampaignSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"brandedKeywords"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CampaignSummaryFragment, unknown>;
export const AdvertiserCampaignsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserCampaigns"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceManageCampaign"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceSetPrice"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"brandedKeywords"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCampaignsFragment, unknown>;
export const AdvertiserImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<AdvertiserImageFragment, unknown>;
export const AdvertiserPriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserPrice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingModelPrice"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<AdvertiserPriceFragment, unknown>;
export const CampaignMetricSummaryValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricSummaryValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricSummaryValuesFragment, unknown>;
export const CampaignMetricDetailValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricDetailValuesFragment, unknown>;
export const DailyValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<DailyValuesFragment, unknown>;
export const AdSetValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<AdSetValuesFragment, unknown>;
export const CreativeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<CreativeFragment, unknown>;
export const AdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<AdFragment, unknown>;
export const AdSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]} as unknown as DocumentNode<AdSetFragment, unknown>;
export const CampaignFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Campaign"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}},{"kind":"Field","name":{"kind":"Name","value":"hasPaymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"dayPartings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dow"}},{"kind":"Field","name":{"kind":"Name","value":"startMinute"}},{"kind":"Field","name":{"kind":"Name","value":"endMinute"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoTargets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<CampaignFragment, unknown>;
export const AdSetWithDeletedAdsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]} as unknown as DocumentNode<AdSetWithDeletedAdsFragment, unknown>;
export const CampaignAdsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetWithDeletedAds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<CampaignAdsFragment, unknown>;
export const GeocodeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Geocode"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Geocode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GeocodeFragment, unknown>;
export const SegmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Segment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SegmentFragment, unknown>;
export const DisplayedMetricsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<DisplayedMetricsFragment, unknown>;
export const DailyMetricValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyMetricValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<DailyMetricValuesFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const HourlyValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HourlyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<HourlyValuesFragment, unknown>;
export const CampaignOverviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignOverview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"extractExternalId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"brandedKeywords"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CampaignOverviewFragment, unknown>;
export const SearchProspectsLandingPageListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspectsLandingPageList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPageWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}},{"kind":"Field","name":{"kind":"Name","value":"favicon"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]} as unknown as DocumentNode<SearchProspectsLandingPageListFragment, unknown>;
export const SearchProspectsLandingPageDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspectsLandingPageDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"queries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"query"}}]}}]}}]} as unknown as DocumentNode<SearchProspectsLandingPageDetailFragment, unknown>;
export const UpdateAdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdvertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdsManagerUpdateAdvertiserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adsManagerUpdateAdvertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adsManagerUpdateAdvertiserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]}}]} as unknown as DocumentNode<UpdateAdvertiserMutation, UpdateAdvertiserMutationVariables>;
export const CopyCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CopyCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"copyCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<CopyCampaignMutation, CopyCampaignMutationVariables>;
export const ForceCampaignCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForceCampaignComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forceCampaignCompletionAndTransferFunds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ForceCampaignCompleteMutation, ForceCampaignCompleteMutationVariables>;
export const AdsManagerUpdateCreativeStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdsManagerUpdateCreativeState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adsManagerUpdateCreativeState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdsManagerUpdateCreativeStateMutation, AdsManagerUpdateCreativeStateMutationVariables>;
export const AdsManagerUpdateCreativePayloadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdsManagerUpdateCreativePayload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdsManagerUpdateCreativeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adsManagerUpdateCreativePayload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adsManagerUpdateCreativeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdsManagerUpdateCreativePayloadMutation, AdsManagerUpdateCreativePayloadMutationVariables>;
export const UpdateAdSetStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdSetState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdSetState"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adsManagerUpdateAdSetState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAdSetStateMutation, UpdateAdSetStateMutationVariables>;
export const CampaignTransferStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignTransferStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}}]}}]}}]} as unknown as DocumentNode<CampaignTransferStatusQuery, CampaignTransferStatusQueryVariables>;
export const AdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Advertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]}}]} as unknown as DocumentNode<AdvertiserQuery, AdvertiserQueryVariables>;
export const AdvertiserCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserCampaignFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserCampaigns"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"brandedKeywords"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserCampaigns"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceManageCampaign"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceSetPrice"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCampaignsQuery, AdvertiserCampaignsQueryVariables>;
export const AdvertiserImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<AdvertiserImagesQuery, AdvertiserImagesQueryVariables>;
export const AdvertiserPricesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserPrices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserPrice"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserPrice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingModelPrice"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<AdvertiserPricesQuery, AdvertiserPricesQueryVariables>;
export const AdvertiserBillingAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserBillingAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserBillingAddress"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserBillingAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street1"}},{"kind":"Field","name":{"kind":"Name","value":"street2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]} as unknown as DocumentNode<AdvertiserBillingAddressQuery, AdvertiserBillingAddressQueryVariables>;
export const UploadAdvertiserImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAdvertiserImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdvertiserImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdvertiserImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UploadAdvertiserImageMutation, UploadAdvertiserImageMutationVariables>;
export const CampaignMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaignIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricSummaryValues"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricSummaryValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricsQuery, CampaignMetricsQueryVariables>;
export const FetchDailyMetricsForCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchDailyMetricsForCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DailyValues"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]} as unknown as DocumentNode<FetchDailyMetricsForCampaignQuery, FetchDailyMetricsForCampaignQueryVariables>;
export const FetchAdSetMetricsForCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchAdSetMetricsForCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetValues"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]} as unknown as DocumentNode<FetchAdSetMetricsForCampaignQuery, FetchAdSetMetricsForCampaignQueryVariables>;
export const LoadCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Campaign"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Campaign"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}},{"kind":"Field","name":{"kind":"Name","value":"hasPaymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"dayPartings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dow"}},{"kind":"Field","name":{"kind":"Name","value":"startMinute"}},{"kind":"Field","name":{"kind":"Name","value":"endMinute"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoTargets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LoadCampaignQuery, LoadCampaignQueryVariables>;
export const LoadCampaignAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaignAds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignAds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetWithDeletedAds"}}]}}]}}]} as unknown as DocumentNode<LoadCampaignAdsQuery, LoadCampaignAdsQueryVariables>;
export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const UpdateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}}]}}]}}]} as unknown as DocumentNode<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
export const ActiveGeocodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActiveGeocodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geocodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Geocode"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Geocode"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Geocode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ActiveGeocodesQuery, ActiveGeocodesQueryVariables>;
export const SegmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Segment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Segment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SegmentsQuery, SegmentsQueryVariables>;
export const AdvertiserCreativesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserCreatives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCreativesQuery, AdvertiserCreativesQueryVariables>;
export const CreateCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreativeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCreative"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creative"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<CreateCreativeMutation, CreateCreativeMutationVariables>;
export const LoadCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creative"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<LoadCreativeQuery, LoadCreativeQueryVariables>;
export const CampaignsForCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignsForCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creativeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creativeCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creativeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creativeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"advertiserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]}}]} as unknown as DocumentNode<CampaignsForCreativeQuery, CampaignsForCreativeQueryVariables>;
export const ValidateTargetUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateTargetUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateTargetUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"redirects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"violations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ValidateTargetUrlQuery, ValidateTargetUrlQueryVariables>;
export const LoadUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<LoadUserQuery, LoadUserQueryVariables>;
export const CampaignAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DailyMetricValues"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyMetricValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}}]} as unknown as DocumentNode<CampaignAnalyticsQuery, CampaignAnalyticsQueryVariables>;
export const AdSetBreakdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdSetBreakdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<AdSetBreakdownQuery, AdSetBreakdownQueryVariables>;
export const CreativeBreakdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreativeBreakdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<CreativeBreakdownQuery, CreativeBreakdownQueryVariables>;
export const OsBreakdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OSBreakdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"os"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<OsBreakdownQuery, OsBreakdownQueryVariables>;
export const HourlyGraphDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HourlyGraph"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HourlyValues"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DisplayedMetrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"viewThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickThroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToSiteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"impressionToDismiss"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HourlyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DisplayedMetrics"}}]}}]}}]} as unknown as DocumentNode<HourlyGraphQuery, HourlyGraphQueryVariables>;
export const CurrentAdvertiserBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentAdvertiserBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountBalance"}}]}}]}}]} as unknown as DocumentNode<CurrentAdvertiserBalanceQuery, CurrentAdvertiserBalanceQueryVariables>;
export const UpdateCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCurrentUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCurrentUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;
export const AdsManagerUpdateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdsManagerUpdateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdsManagerUpdateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adsManagerUpdateCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adsManagerUpdateCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdsManagerUpdateCampaignMutation, AdsManagerUpdateCampaignMutationVariables>;
export const LoadCampaignSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaignSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignOverview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"brandedKeywords"}},{"kind":"Field","name":{"kind":"Name","value":"adsManagerCurrentBalance"}},{"kind":"Field","name":{"kind":"Name","value":"hasInProcessOrCompleteTransfer"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignOverview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"extractExternalId"}}]}}]}}]}}]} as unknown as DocumentNode<LoadCampaignSummaryQuery, LoadCampaignSummaryQueryVariables>;
export const CreateSearchCampaignLandingPageListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateSearchCampaignLandingPageList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchProspects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"landingPagesWithStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchProspectsLandingPageList"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspectsLandingPageList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPageWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}},{"kind":"Field","name":{"kind":"Name","value":"favicon"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]} as unknown as DocumentNode<CreateSearchCampaignLandingPageListQuery, CreateSearchCampaignLandingPageListQueryVariables>;
export const SearchProspectsLandingPageDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchProspectsLandingPageDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchProspects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"landingPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchProspectsLandingPageDetail"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspectsLandingPageDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"queries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"query"}}]}}]}}]} as unknown as DocumentNode<SearchProspectsLandingPageDetailQuery, SearchProspectsLandingPageDetailQueryVariables>;