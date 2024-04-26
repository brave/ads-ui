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

export type ActiveGeocodesEntry = {
  __typename?: 'ActiveGeocodesEntry';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ActiveGeocodesQueryDto = {
  __typename?: 'ActiveGeocodesQueryDTO';
  data: Array<ActiveGeocodesEntry>;
};

export type Ad = {
  __typename?: 'Ad';
  creative: Creative;
  id: Scalars['String']['output'];
  /** @deprecated price configuration has been moved to ad set */
  price: Scalars['Numeric']['output'];
  priceType: ConfirmationType;
  /** @deprecated rewardPaymentTokenValue has been moved to ad set */
  rewardPaymentTokenValue: Scalars['Numeric']['output'];
  state: Scalars['String']['output'];
  webhooks: Array<Webhook>;
};

export type AdSet = {
  __typename?: 'AdSet';
  ads: Array<Ad>;
  /** @deprecated has been moved to campaign level */
  bannedKeywords?: Maybe<Array<Scalars['String']['output']>>;
  billingType?: Maybe<Scalars['String']['output']>;
  brandedDesktopPrice?: Maybe<Scalars['Numeric']['output']>;
  brandedMobilePrice?: Maybe<Scalars['Numeric']['output']>;
  conversions: Array<Conversion>;
  createdAt: Scalars['DateTime']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  /** @deprecated price changes are now allowed */
  hasConfirmations: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  keywordSimilarity?: Maybe<Scalars['Float']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  negativeKeywords?: Maybe<Array<Scalars['String']['output']>>;
  negativeTriggerUrls?: Maybe<Array<Scalars['String']['output']>>;
  nonBrandedDesktopPrice?: Maybe<Scalars['Numeric']['output']>;
  nonBrandedMobilePrice?: Maybe<Scalars['Numeric']['output']>;
  optimized?: Maybe<Scalars['Boolean']['output']>;
  oses: Array<Os>;
  perDay: Scalars['Float']['output'];
  price: Scalars['Numeric']['output'];
  rewardPaymentTokenValue: Scalars['Numeric']['output'];
  segments: Array<Segment>;
  state: Scalars['String']['output'];
  targetingTerms?: Maybe<Array<Scalars['String']['output']>>;
  totalMax: Scalars['Float']['output'];
  triggerUrls?: Maybe<Array<Scalars['String']['output']>>;
};


export type AdSetAdsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  state: Scalars['String']['output'];
  street1: Scalars['String']['output'];
  street2?: Maybe<Scalars['String']['output']>;
  zipcode: Scalars['String']['output'];
};

export type Advertiser = {
  __typename?: 'Advertiser';
  accountManager?: Maybe<User>;
  additionalBillingEmails?: Maybe<Array<Scalars['String']['output']>>;
  agreed: Scalars['Boolean']['output'];
  billingAddress?: Maybe<Address>;
  billingEmail?: Maybe<Scalars['String']['output']>;
  campaigns: Array<Campaign>;
  createdAt: Scalars['DateTime']['output'];
  createdSource: AdvertiserSource;
  creatives: Array<Creative>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images: Array<AdvertiserImage>;
  marketingChannel?: Maybe<Scalars['String']['output']>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  prices: Array<AdvertiserPrice>;
  publicKey?: Maybe<Scalars['String']['output']>;
  referrer?: Maybe<Scalars['String']['output']>;
  selfServiceManageCampaign: Scalars['Boolean']['output'];
  selfServiceSetPrice: Scalars['Boolean']['output'];
  state: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  users: Array<User>;
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

export type AdvertiserImage = {
  __typename?: 'AdvertiserImage';
  createdAt: Scalars['DateTime']['output'];
  format: CampaignFormat;
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type AdvertiserPrice = {
  __typename?: 'AdvertiserPrice';
  billingModelPrice: Scalars['Numeric']['output'];
  billingType: BillingType;
  format: CampaignFormat;
  isDefault: Scalars['Boolean']['output'];
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
  Cpsv = 'CPSV'
}

export type Campaign = {
  __typename?: 'Campaign';
  accountManager?: Maybe<User>;
  adSets: Array<AdSet>;
  advertiser: Advertiser;
  /** For Search campaigns, keywords the campaign must not be shown against */
  bannedKeywords?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * For Search campaigns, the keyword that matches the 'brand'
   * @deprecated use brandedKeywords instead
   */
  brandedKeyword?: Maybe<Scalars['String']['output']>;
  /** For Search campaigns, the keywords that match the 'brand' */
  brandedKeywords?: Maybe<Array<Scalars['String']['output']>>;
  budget: Scalars['Float']['output'];
  comments: Array<CampaignComment>;
  confirmationsSummary: ConfirmationsSummaryQueryDto;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  dailyBudget: Scalars['Float']['output'];
  dailyCap: Scalars['Float']['output'];
  dailyPacingIndex: Scalars['Float']['output'];
  dailySpend: Scalars['Float']['output'];
  dayPartings: Array<DayParting>;
  /** For NTP SI campaigns, the proportion of day allocated from 0 (none) to 1 (dedicated) */
  dayProportion?: Maybe<Scalars['Float']['output']>;
  endAt: Scalars['DateTime']['output'];
  engagements: Array<Engagement>;
  engagementsByCountry: Array<CountryEngagement>;
  externalId?: Maybe<Scalars['String']['output']>;
  format: CampaignFormat;
  geoTargets: Array<Geocode>;
  hasPaymentIntent: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  pacingIndex?: Maybe<Scalars['Float']['output']>;
  pacingOverride: Scalars['Boolean']['output'];
  pacingStrategy: CampaignPacingStrategies;
  passThroughRate: Scalars['Float']['output'];
  paymentType: PaymentType;
  performance: PerformanceResults;
  priority: Scalars['Float']['output'];
  radomPaymentId?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Float']['output'];
  source: CampaignSource;
  spent: Scalars['Float']['output'];
  startAt: Scalars['DateTime']['output'];
  state: Scalars['String']['output'];
  stripePaymentId?: Maybe<Scalars['String']['output']>;
  type: CampaignType;
};


export type CampaignPerformanceArgs = {
  filter?: CampaignPerformanceFilter;
};

export type CampaignComment = {
  __typename?: 'CampaignComment';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  note: Scalars['String']['output'];
  user: User;
};

export type CampaignFilter = {
  /** only include campaigns for this format */
  format?: InputMaybe<CampaignFormat>;
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** only include campaigns with this source */
  source?: InputMaybe<CampaignSource>;
  /** only include campaigns with this state */
  state?: InputMaybe<Scalars['String']['input']>;
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

export enum CampaignType {
  Barter = 'BARTER',
  Cause = 'CAUSE',
  Fixed = 'FIXED',
  Free = 'FREE',
  House = 'HOUSE',
  MakeGood = 'MAKE_GOOD',
  Paid = 'PAID',
  Preemptive = 'PREEMPTIVE',
  Trial = 'TRIAL'
}

export type CampaignsPerCountryEntry = {
  __typename?: 'CampaignsPerCountryEntry';
  count: Scalars['Int']['output'];
  country: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CampaignsPerCountryQueryDto = {
  __typename?: 'CampaignsPerCountryQueryDTO';
  data: Array<CampaignsPerCountryEntry>;
};

export type CampaignsPerCurrencyEntry = {
  __typename?: 'CampaignsPerCurrencyEntry';
  count: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
};

export type CampaignsPerCurrencyQueryDto = {
  __typename?: 'CampaignsPerCurrencyQueryDTO';
  data: Array<CampaignsPerCurrencyEntry>;
};

export type Change = {
  __typename?: 'Change';
  createdAt: Scalars['DateTime']['output'];
  currentValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  previousValue?: Maybe<Scalars['String']['output']>;
  referenceColumnName: Scalars['String']['output'];
  referenceId: Scalars['String']['output'];
  referenceTableName: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

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

export enum ConfirmationType {
  Bookmark = 'BOOKMARK',
  Click = 'CLICK',
  ClientView = 'CLIENT_VIEW',
  Conversion = 'CONVERSION',
  Dismiss = 'DISMISS',
  Downvote = 'DOWNVOTE',
  Flag = 'FLAG',
  Land30 = 'LAND30',
  Land60 = 'LAND60',
  Landclick = 'LANDCLICK',
  Landed = 'LANDED',
  Media_25 = 'MEDIA_25',
  Media_100 = 'MEDIA_100',
  MediaPlay = 'MEDIA_PLAY',
  Upvote = 'UPVOTE',
  View = 'VIEW'
}

export type ConfirmationsSummaryEntry = {
  __typename?: 'ConfirmationsSummaryEntry';
  android: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  iOS: Scalars['Int']['output'];
  linux: Scalars['Int']['output'];
  macOS: Scalars['Int']['output'];
  other: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  windows: Scalars['Int']['output'];
};

export type ConfirmationsSummaryQueryDto = {
  __typename?: 'ConfirmationsSummaryQueryDTO';
  data: Array<ConfirmationsSummaryEntry>;
};

export type Conversion = {
  __typename?: 'Conversion';
  createdAt: Scalars['DateTime']['output'];
  extractExternalId: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  observationWindow: Scalars['Float']['output'];
  trailingAsteriskNotRequired: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  urlPattern: Scalars['String']['output'];
};

export type CountryEngagement = {
  __typename?: 'CountryEngagement';
  click: Scalars['Float']['output'];
  conversion: Scalars['Float']['output'];
  country: Scalars['String']['output'];
  dismiss: Scalars['Float']['output'];
  landed: Scalars['Float']['output'];
  spend?: Maybe<Scalars['Float']['output']>;
  view: Scalars['Float']['output'];
};

export type CreateAdInput = {
  creative?: InputMaybe<CreativeInput>;
  creativeId?: InputMaybe<Scalars['String']['input']>;
  creativeSetId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  webhooks?: InputMaybe<Array<CreateWebhookInput>>;
};

export type CreateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  billingType: Scalars['String']['input'];
  brandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  brandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  campaignId?: InputMaybe<Scalars['String']['input']>;
  conversions?: InputMaybe<Array<CreateConversionInput>>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  keywordSimilarity?: InputMaybe<Scalars['Float']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeTriggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  nonBrandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  nonBrandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  oses?: InputMaybe<Array<CreateOsInput>>;
  perDay: Scalars['Float']['input'];
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price: Scalars['Numeric']['input'];
  segments: Array<CreateSegmentInput>;
  splitTestGroup?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  targetingTerms?: InputMaybe<Array<Scalars['String']['input']>>;
  totalMax: Scalars['Float']['input'];
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
  userId?: InputMaybe<Scalars['String']['input']>;
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
  dailyBudget?: InputMaybe<Scalars['Numeric']['input']>;
  dailyCap?: Scalars['Float']['input'];
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']['input']>;
  endAt: Scalars['DateTime']['input'];
  externalId?: InputMaybe<Scalars['String']['input']>;
  format: CampaignFormat;
  geoTargets: Array<GeocodeInput>;
  name: Scalars['String']['input'];
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  paymentType?: InputMaybe<PaymentType>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  source: Scalars['String']['input'];
  startAt: Scalars['DateTime']['input'];
  state: Scalars['String']['input'];
  type?: CampaignType;
  userId?: InputMaybe<Scalars['String']['input']>;
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

export type CreateInPageCreativeInput = {
  advertiserId: Scalars['String']['input'];
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  payload: InPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state: Scalars['String']['input'];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNewTabPageCreativeInput = {
  advertiserId: Scalars['String']['input'];
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  payload: NewTabPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state: Scalars['String']['input'];
  type: CreateTypeInput;
};

export type CreateNotificationCreativeInput = {
  advertiserId: Scalars['String']['input'];
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  payload: NotificationPayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state: Scalars['String']['input'];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOsInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSegmentInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTypeInput = {
  code: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  emailVerified: Scalars['Boolean']['input'];
  fullName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
};

export type Creative = {
  __typename?: 'Creative';
  advertiser: Advertiser;
  createdAt: Scalars['DateTime']['output'];
  endAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  /** @deprecated use one of the specific payload types instead */
  payload: Payload;
  /** populated for in_page creatives only */
  payloadInPage?: Maybe<InPagePayload>;
  /** populated for inline_content creatives only */
  payloadInlineContent?: Maybe<InlineContentPayload>;
  /** populated for new_tab_page creatives only */
  payloadNewTabPage?: Maybe<NewTabPagePayload>;
  /** populated for notification creatives only */
  payloadNotification?: Maybe<NotificationPayload>;
  /** populated for promoted_content creatives only */
  payloadPromotedContent?: Maybe<PromotedContentPayload>;
  /** populated for search SERP creatives only */
  payloadSearch?: Maybe<SearchPayload>;
  /** populated for search homepage creatives only */
  payloadSearchHomepage?: Maybe<SearchHomepagePayload>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  state: Scalars['String']['output'];
  type: CreativeType;
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
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state: Scalars['String']['input'];
  type: CreateTypeInput;
};

export type CreativeType = {
  __typename?: 'CreativeType';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreativeTypeInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DayParting = {
  __typename?: 'DayParting';
  dow: Scalars['String']['output'];
  endMinute: Scalars['Float']['output'];
  startMinute: Scalars['Float']['output'];
};

export type DayPartingInput = {
  dow: Scalars['String']['input'];
  endMinute: Scalars['Float']['input'];
  startMinute: Scalars['Float']['input'];
};

export type DeleteAdInput = {
  id: Scalars['String']['input'];
};

export type Dimensions = {
  __typename?: 'Dimensions';
  ad: Ad;
  adSet: AdSet;
  campaign: Campaign;
  country: Scalars['String']['output'];
  day: Scalars['DateTime']['output'];
  hour: Scalars['DateTime']['output'];
  os: Scalars['String']['output'];
  segment?: Maybe<Scalars['String']['output']>;
};

export type Engagement = {
  __typename?: 'Engagement';
  android: Scalars['Float']['output'];
  click: Scalars['Numeric']['output'];
  clickthroughConversion: Scalars['Numeric']['output'];
  conversion: Scalars['Numeric']['output'];
  cost: Scalars['Float']['output'];
  count: Scalars['Float']['output'];
  createdat: Scalars['DateTime']['output'];
  creativeid: Scalars['String']['output'];
  creativeinstanceid: Scalars['String']['output'];
  creativename: Scalars['String']['output'];
  creativepayload: Scalars['String']['output'];
  creativesetid: Scalars['String']['output'];
  creativesetname?: Maybe<Scalars['String']['output']>;
  creativestate: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  dismiss: Scalars['Numeric']['output'];
  downvote: Scalars['Numeric']['output'];
  ios: Scalars['Float']['output'];
  landed: Scalars['Numeric']['output'];
  linux: Scalars['Float']['output'];
  macos: Scalars['Float']['output'];
  other: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  pricetype: Scalars['String']['output'];
  spend: Scalars['Numeric']['output'];
  type: Scalars['String']['output'];
  upvote: Scalars['Numeric']['output'];
  view: Scalars['Numeric']['output'];
  viewthroughConversion: Scalars['Numeric']['output'];
  windows: Scalars['Float']['output'];
};

export type EngagementOverview = {
  __typename?: 'EngagementOverview';
  campaignId: Scalars['String']['output'];
  click: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  landed: Scalars['Float']['output'];
  spend?: Maybe<Scalars['Float']['output']>;
  view: Scalars['Float']['output'];
};

export type FocalPoint = {
  __typename?: 'FocalPoint';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type FocalPointInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type Geocode = {
  __typename?: 'Geocode';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GeocodeInput = {
  code: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InPagePayload = {
  __typename?: 'InPagePayload';
  creativeUrl: Scalars['String']['output'];
  /** size of the creative, e.g. 1024x768 */
  size: Scalars['String']['output'];
  targetUrl: Scalars['String']['output'];
};

export type InPagePayloadInput = {
  creativeUrl: Scalars['String']['input'];
  /** size of the creative, e.g. 1024x768 */
  size: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
};

export type InlineContentPayload = {
  __typename?: 'InlineContentPayload';
  ctaText: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dimensions: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  targetUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type InlineContentPayloadInput = {
  ctaText: Scalars['String']['input'];
  description: Scalars['String']['input'];
  dimensions: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Logo = {
  __typename?: 'Logo';
  alt: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  destinationUrl: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
};

export type LogoInput = {
  alt: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  destinationUrl: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

/** Rates calculated from metrics. Multiply by 100 to see as a percentage. */
export type MetricRates = {
  __typename?: 'MetricRates';
  /** Number of clicks for every impression */
  clickThrough: Scalars['Numeric']['output'];
  /** Number of conversions for every click */
  clickToConversion: Scalars['Numeric']['output'];
  /** Number of site vists for every click */
  clickToSiteVisit: Scalars['Numeric']['output'];
  /** Spend for every impression */
  costPerAcquisition: Scalars['Numeric']['output'];
  /** Number of dismissals for every impression */
  impressionToDismiss: Scalars['Numeric']['output'];
  /** Number of site vists for every impression */
  impressionToSiteVisit: Scalars['Numeric']['output'];
};

export type Metrics = {
  __typename?: 'Metrics';
  click: Scalars['Numeric']['output'];
  clickThroughConversion: Scalars['Numeric']['output'];
  conversion: Scalars['Numeric']['output'];
  dismiss: Scalars['Numeric']['output'];
  downvote: Scalars['Numeric']['output'];
  impression: Scalars['Numeric']['output'];
  /** @deprecated use siteVisit instead */
  land: Scalars['Numeric']['output'];
  nominalSpendUsd: Scalars['Numeric']['output'];
  rates: MetricRates;
  siteVisit: Scalars['Numeric']['output'];
  spendUsd: Scalars['Numeric']['output'];
  upvote: Scalars['Numeric']['output'];
  /** @deprecated use impression instead */
  view: Scalars['Numeric']['output'];
  viewThroughConversion: Scalars['Numeric']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveAdvertiser: Advertiser;
  approveAdvertiserRegistration: Advertiser;
  approveCampaign: Campaign;
  createAdSet: AdSet;
  createAdvertiser: Advertiser;
  createAdvertiserImage: AdvertiserImage;
  createCampaign: Campaign;
  createComment: CampaignComment;
  createCreative: Creative;
  /** @deprecated use createCreative instead */
  createInPageCreative: Creative;
  /** @deprecated use createCreative instead */
  createNewTabPageCreative: Creative;
  createNotificationCreative: Creative;
  createUser: User;
  /** Logically deletes the ad */
  deleteAd: Ad;
  rejectAdvertiser: Advertiser;
  rejectAdvertiserRegistration: Registration;
  rejectCampaign: Campaign;
  rejectCreative: Creative;
  /** @deprecated This actually updates the state of the creative, not the ad as its name suggests! */
  updateAd: Ad;
  updateAdSet: AdSet;
  updateAdvertiser: Advertiser;
  updateCampaign: Campaign;
  updateCreative: Creative;
  updateNotificationCreative: Creative;
  updateUser: User;
};


export type MutationApproveAdvertiserArgs = {
  id: Scalars['String']['input'];
};


export type MutationApproveAdvertiserRegistrationArgs = {
  id: Scalars['String']['input'];
};


export type MutationApproveCampaignArgs = {
  approveCampaignInput: ApproveCampaignInput;
};


export type MutationCreateAdSetArgs = {
  createAdSetInput: CreateAdSetInput;
};


export type MutationCreateAdvertiserArgs = {
  createAdvertiserInput: CreateAdvertiserInput;
};


export type MutationCreateAdvertiserImageArgs = {
  createImageInput: CreateAdvertiserImageInput;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateCreativeArgs = {
  creative: CreativeInput;
};


export type MutationCreateInPageCreativeArgs = {
  createInPageCreativeInput: CreateInPageCreativeInput;
};


export type MutationCreateNewTabPageCreativeArgs = {
  createNewTabPageCreativeInput: CreateNewTabPageCreativeInput;
};


export type MutationCreateNotificationCreativeArgs = {
  createNotificationCreativeInput: CreateNotificationCreativeInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAdArgs = {
  deleteAdInput: DeleteAdInput;
};


export type MutationRejectAdvertiserArgs = {
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRejectAdvertiserRegistrationArgs = {
  id: Scalars['String']['input'];
  ignore?: Scalars['Boolean']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRejectCampaignArgs = {
  rejectCampaignInput: RejectCampaignInput;
};


export type MutationRejectCreativeArgs = {
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationUpdateAdArgs = {
  updateAdInput: UpdateAdInput;
};


export type MutationUpdateAdSetArgs = {
  updateAdSetInput: UpdateAdSetInput;
};


export type MutationUpdateAdvertiserArgs = {
  updateAdvertiserInput: UpdateAdvertiserInput;
};


export type MutationUpdateCampaignArgs = {
  updateCampaignInput: UpdateCampaignInput;
};


export type MutationUpdateCreativeArgs = {
  creative: CreativeInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateNotificationCreativeArgs = {
  updateNotificationCreativeInput: UpdateNotificationCreativeInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type NewTabPagePayload = {
  __typename?: 'NewTabPagePayload';
  logo?: Maybe<Logo>;
  wallpapers?: Maybe<Array<Wallpaper>>;
};

export type NewTabPagePayloadInput = {
  logo?: InputMaybe<LogoInput>;
  wallpapers?: InputMaybe<Array<WallpaperInput>>;
};

export type NotificationPayload = {
  __typename?: 'NotificationPayload';
  body: Scalars['String']['output'];
  targetUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type NotificationPayloadInput = {
  body: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Os = {
  __typename?: 'OS';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type Payload = {
  __typename?: 'Payload';
  body?: Maybe<Scalars['String']['output']>;
  creativeUrl?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Logo>;
  size?: Maybe<Scalars['String']['output']>;
  targetUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  wallpapers?: Maybe<Array<Wallpaper>>;
};

export enum PaymentType {
  ManualBat = 'MANUAL_BAT',
  Netsuite = 'NETSUITE',
  Radom = 'RADOM',
  Stripe = 'STRIPE'
}

/** For NTT campaigns, metric values are ranged with min and max values. In this case, metrics is equivalent to `min`, though the min-max range should usually be shown in preference. For other campaign formats, `metrics` `min` and `max` are all set to the same values.  */
export type Performance = {
  __typename?: 'Performance';
  dimensions: Dimensions;
  max: Metrics;
  metrics: Metrics;
  min: Metrics;
};

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

export type PerformanceResults = {
  __typename?: 'PerformanceResults';
  total: PerformanceValues;
  values: Array<Performance>;
};

export type PerformanceValues = {
  __typename?: 'PerformanceValues';
  max: Metrics;
  metrics: Metrics;
  min: Metrics;
};

export type PromotedContentPayload = {
  __typename?: 'PromotedContentPayload';
  category: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  description: Scalars['String']['output'];
  domain?: Maybe<Scalars['String']['output']>;
  feed: Scalars['String']['output'];
  ogImages: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
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

export type Query = {
  __typename?: 'Query';
  /** @deprecated use geocodes instead */
  activeGeocodes: ActiveGeocodesQueryDto;
  ad?: Maybe<Ad>;
  adSet?: Maybe<AdSet>;
  advertiser?: Maybe<Advertiser>;
  advertiserCampaigns?: Maybe<Advertiser>;
  advertiserCount: Scalars['Float']['output'];
  advertisers: Array<Advertiser>;
  campaign?: Maybe<Campaign>;
  campaignCount: Scalars['Int']['output'];
  campaigns: Array<Campaign>;
  campaignsPerCountry: CampaignsPerCountryQueryDto;
  campaignsPerCurrency: CampaignsPerCurrencyQueryDto;
  changes: Array<Change>;
  confirmationCount: Scalars['Float']['output'];
  creative?: Maybe<Creative>;
  creativeCampaigns: Array<Campaign>;
  creatives: Array<Creative>;
  creativesCount: Scalars['Int']['output'];
  engagementsOverview?: Maybe<Array<EngagementOverview>>;
  geocodes: Array<Geocode>;
  performance: PerformanceResults;
  registrations: Registrations;
  searchProspects: SearchProspects;
  segments: SegmentsQueryDto;
  targetingTerms: Array<Scalars['String']['output']>;
  user: User;
  userCount: Scalars['Int']['output'];
  users: Array<User>;
  validateTargetUrl: TargetUrlValidation;
};


export type QueryAdArgs = {
  id: Scalars['String']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdSetArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdvertiserArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdvertiserCampaignsArgs = {
  filter?: InputMaybe<AdvertiserCampaignFilter>;
  id: Scalars['String']['input'];
};


export type QueryAdvertiserCountArgs = {
  filter?: InputMaybe<AdvertiserFilter>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdvertisersArgs = {
  filter?: InputMaybe<AdvertiserFilter>;
};


export type QueryCampaignArgs = {
  id: Scalars['String']['input'];
};


export type QueryCampaignCountArgs = {
  filter?: InputMaybe<CampaignFilter>;
};


export type QueryCampaignsArgs = {
  filter?: InputMaybe<CampaignFilter>;
};


export type QueryChangesArgs = {
  filter: ChangeFilter;
};


export type QueryCreativeArgs = {
  id: Scalars['String']['input'];
};


export type QueryCreativeCampaignsArgs = {
  advertiserId: Scalars['String']['input'];
  creativeId: Scalars['String']['input'];
};


export type QueryCreativesArgs = {
  filter?: InputMaybe<CreativeFilter>;
};


export type QueryCreativesCountArgs = {
  filter?: InputMaybe<CreativeFilter>;
};


export type QueryEngagementsOverviewArgs = {
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  campaignIds?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<CampaignFilter>;
};


export type QueryPerformanceArgs = {
  filter?: PerformanceFilter;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryValidateTargetUrlArgs = {
  targetUrl: Scalars['String']['input'];
};

export type Redirect = {
  __typename?: 'Redirect';
  /** @deprecated use violations and warnings instead */
  errors: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  violations: Array<ValidationDetail>;
  warnings: Array<ValidationDetail>;
};

export type Registration = {
  __typename?: 'Registration';
  businessName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  marketingChannel?: Maybe<Scalars['String']['output']>;
  state: RegistrationState;
  url: Scalars['String']['output'];
};

export type RegistrationFilter = {
  state?: InputMaybe<Scalars['String']['input']>;
};

export enum RegistrationState {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  UnderReview = 'UNDER_REVIEW'
}

export type Registrations = {
  __typename?: 'Registrations';
  all: Array<Registration>;
  count: Scalars['Float']['output'];
};


export type RegistrationsAllArgs = {
  filter?: InputMaybe<RegistrationFilter>;
};


export type RegistrationsCountArgs = {
  filter?: InputMaybe<RegistrationFilter>;
};

export type RejectCampaignInput = {
  campaignId: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  option: CampaignRejection;
};

export type SearchDomain = {
  __typename?: 'SearchDomain';
  country: Scalars['String']['output'];
  domain: Scalars['String']['output'];
};

export type SearchDomainEligibility = {
  __typename?: 'SearchDomainEligibility';
  entries: Scalars['String']['output'];
  estimatedClicks: Scalars['String']['output'];
  estimatedQpw: Scalars['String']['output'];
  status: Scalars['String']['output'];
  trialBudget: Scalars['String']['output'];
};

export type SearchHomepagePayload = {
  __typename?: 'SearchHomepagePayload';
  body: Scalars['String']['output'];
  ctaText: Scalars['String']['output'];
  imageDarkModeUrl?: Maybe<Scalars['String']['output']>;
  imageUrl: Scalars['String']['output'];
  targetUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SearchHomepagePayloadInput = {
  body: Scalars['String']['input'];
  ctaText?: Scalars['String']['input'];
  imageDarkModeUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl: Scalars['String']['input'];
  targetUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type SearchLandingPage = {
  __typename?: 'SearchLandingPage';
  country: Scalars['String']['output'];
  creatives: Array<SearchLandingPageCreative>;
  domain: Scalars['String']['output'];
  queries: Array<SearchLandingPageQuery>;
  url: Scalars['String']['output'];
};

export type SearchLandingPageCreative = {
  __typename?: 'SearchLandingPageCreative';
  body?: Maybe<Scalars['String']['output']>;
  count: Scalars['Numeric']['output'];
  lastSeen: Scalars['DateTime']['output'];
  rank: Scalars['Numeric']['output'];
  title: Scalars['String']['output'];
};

export type SearchLandingPageQuery = {
  __typename?: 'SearchLandingPageQuery';
  count: Scalars['Numeric']['output'];
  lastSeen: Scalars['DateTime']['output'];
  query: Scalars['String']['output'];
  rank: Scalars['Numeric']['output'];
};

export type SearchLandingPageWithStats = {
  __typename?: 'SearchLandingPageWithStats';
  count: Scalars['Numeric']['output'];
  country: Scalars['String']['output'];
  creatives: Array<SearchLandingPageCreative>;
  domain: Scalars['String']['output'];
  lastSeen: Scalars['DateTime']['output'];
  queries: Array<SearchLandingPageQuery>;
  rank: Scalars['Numeric']['output'];
  url: Scalars['String']['output'];
};

export type SearchPayload = {
  __typename?: 'SearchPayload';
  body: Scalars['String']['output'];
  /** ad-hoc parameters passed to search */
  meta?: Maybe<Scalars['JSONObject']['output']>;
  /** optionally, how this creative should be rendered with the SERP */
  style?: Maybe<Scalars['String']['output']>;
  targetUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
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

export type SearchProspects = {
  __typename?: 'SearchProspects';
  domains: Array<SearchDomain>;
  eligibilityStats: SearchDomainEligibility;
  landingPage: SearchLandingPage;
  landingPages: Array<SearchLandingPage>;
  landingPagesWithStats: Array<SearchLandingPageWithStats>;
};


export type SearchProspectsDomainsArgs = {
  country: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  partialDomain: Scalars['String']['input'];
};


export type SearchProspectsEligibilityStatsArgs = {
  country: Scalars['String']['input'];
  domain: Scalars['String']['input'];
};


export type SearchProspectsLandingPageArgs = {
  country: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type SearchProspectsLandingPagesArgs = {
  country: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  urls: Array<Scalars['String']['input']>;
};


export type SearchProspectsLandingPagesWithStatsArgs = {
  country: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  limit?: Scalars['Float']['input'];
  offset?: Scalars['Float']['input'];
};

export type Segment = {
  __typename?: 'Segment';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type SegmentsEntry = {
  __typename?: 'SegmentsEntry';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SegmentsQueryDto = {
  __typename?: 'SegmentsQueryDTO';
  data: Array<SegmentsEntry>;
};

export type TargetUrlValidation = {
  __typename?: 'TargetUrlValidation';
  /** @deprecated use redirects.violations and redirects.warnings instead */
  errors: Array<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
  redirects: Array<Redirect>;
};

export type UpdateAdInput = {
  creativeId?: InputMaybe<Scalars['String']['input']>;
  creativeSetId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  webhooks?: InputMaybe<Array<CreateWebhookInput>>;
};

export type UpdateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  billingType?: InputMaybe<Scalars['String']['input']>;
  brandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  brandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  campaignId?: InputMaybe<Scalars['String']['input']>;
  conversions?: InputMaybe<Array<UpdateConversionsInput>>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  keywordSimilarity?: InputMaybe<Scalars['Float']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  negativeTriggerUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  nonBrandedDesktopPrice?: InputMaybe<Scalars['Numeric']['input']>;
  nonBrandedMobilePrice?: InputMaybe<Scalars['Numeric']['input']>;
  optimized?: InputMaybe<Scalars['Boolean']['input']>;
  oses?: InputMaybe<Array<UpdateOSesInput>>;
  perDay?: InputMaybe<Scalars['Float']['input']>;
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price?: InputMaybe<Scalars['Numeric']['input']>;
  segments?: InputMaybe<Array<UpdateSegmentInput>>;
  splitTestGroup?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  targetingTerms?: InputMaybe<Array<Scalars['String']['input']>>;
  totalMax?: InputMaybe<Scalars['Float']['input']>;
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
  phone?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  selfServiceManageCampaign?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
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
  dailyBudget?: InputMaybe<Scalars['Numeric']['input']>;
  dailyCap?: InputMaybe<Scalars['Float']['input']>;
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  geoTargets?: InputMaybe<Array<GeocodeInput>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pacingOverride?: InputMaybe<Scalars['Boolean']['input']>;
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  passThroughRate?: InputMaybe<Scalars['Float']['input']>;
  paymentType?: InputMaybe<PaymentType>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  stripePaymentId?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateNotificationCreativeInput = {
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  creativeId?: InputMaybe<Scalars['String']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payload?: InputMaybe<NotificationPayloadInput>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CreateTypeInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
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
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  advertisers: Array<Advertiser>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type ValidationDetail = {
  __typename?: 'ValidationDetail';
  detail: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type Wallpaper = {
  __typename?: 'Wallpaper';
  focalPoint: FocalPoint;
  imageUrl: Scalars['String']['output'];
};

export type WallpaperInput = {
  focalPoint: FocalPointInput;
  imageUrl: Scalars['String']['input'];
};

export type Webhook = {
  __typename?: 'Webhook';
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CreateWebhookInput = {
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type AdSetFragment = { __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: string, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> };

export type AdFragment = { __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } };

export type AdSetWithDeletedAdsFragment = { __typename?: 'AdSet', id: string, createdAt: string, name: string, state: string, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> };

export type CreateAdSetMutationVariables = Exact<{
  createAdSetInput: CreateAdSetInput;
}>;


export type CreateAdSetMutation = { __typename?: 'Mutation', createAdSet: { __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: string, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> } };

export type UpdateAdSetMutationVariables = Exact<{
  updateAdSetInput: UpdateAdSetInput;
}>;


export type UpdateAdSetMutation = { __typename?: 'Mutation', updateAdSet: { __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: string, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> } };

export type AdvertiserSummaryFragment = { __typename?: 'Advertiser', id: string, name: string, state: string, billingEmail?: string | null, additionalBillingEmails?: Array<string> | null, createdAt: string, modifiedAt: string, publicKey?: string | null };

export type AdvertiserBillingAddressFragment = { __typename?: 'Advertiser', billingAddress?: { __typename?: 'Address', id: string, street1: string, street2?: string | null, city: string, country: string, state: string, zipcode: string } | null };

export type AdvertiserFragment = { __typename?: 'Advertiser', referrer?: string | null, phone?: string | null, selfServiceManageCampaign: boolean, selfServiceSetPrice: boolean, id: string, name: string, state: string, billingEmail?: string | null, additionalBillingEmails?: Array<string> | null, createdAt: string, modifiedAt: string, publicKey?: string | null };

export type AdvertiserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, publicKey?: string | null } | null };

export type UpdateAdvertiserMutationVariables = Exact<{
  updateAdvertiserInput: UpdateAdvertiserInput;
}>;


export type UpdateAdvertiserMutation = { __typename?: 'Mutation', updateAdvertiser: { __typename?: 'Advertiser', id: string, publicKey?: string | null } };

export type AdvertiserCampaignsFragment = { __typename?: 'Advertiser', id: string, name: string, selfServiceManageCampaign: boolean, selfServiceSetPrice: boolean, campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null }> };

export type AdvertiserCampaignsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  filter?: InputMaybe<AdvertiserCampaignFilter>;
}>;


export type AdvertiserCampaignsQuery = { __typename?: 'Query', advertiserCampaigns?: { __typename?: 'Advertiser', id: string, name: string, selfServiceManageCampaign: boolean, selfServiceSetPrice: boolean, campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null }> } | null };

export type AdvertiserImageFragment = { __typename?: 'AdvertiserImage', name: string, imageUrl: string, format: CampaignFormat, id: string, createdAt: string };

export type AdvertiserPriceFragment = { __typename?: 'AdvertiserPrice', billingModelPrice: string, billingType: BillingType, format: CampaignFormat };

export type AdvertiserImagesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserImagesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', images: Array<{ __typename?: 'AdvertiserImage', name: string, imageUrl: string, format: CampaignFormat, id: string, createdAt: string }> } | null };

export type AdvertiserPricesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserPricesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', prices: Array<{ __typename?: 'AdvertiserPrice', billingModelPrice: string, billingType: BillingType, format: CampaignFormat }> } | null };

export type AdvertiserBillingAddressQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdvertiserBillingAddressQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, billingAddress?: { __typename?: 'Address', id: string, street1: string, street2?: string | null, city: string, country: string, state: string, zipcode: string } | null } | null };

export type UploadAdvertiserImageMutationVariables = Exact<{
  input: CreateAdvertiserImageInput;
}>;


export type UploadAdvertiserImageMutation = { __typename?: 'Mutation', createAdvertiserImage: { __typename?: 'AdvertiserImage', name: string } };

export type EngagementFragment = { __typename?: 'Engagement', creativeinstanceid: string, createdat: string, type: string, pricetype: string, creativesetname?: string | null, creativesetid: string, creativename: string, creativeid: string, creativestate: string, creativepayload: string, view: string, click: string, viewthroughConversion: string, clickthroughConversion: string, conversion: string, dismiss: string, downvote: string, landed: string, spend: string, upvote: string, price: number, android: number, ios: number, linux: number, macos: number, windows: number };

export type CampaignWithEngagementsFragment = { __typename?: 'Campaign', id: string, name: string, state: string, budget: number, spent: number, currency: string, createdAt: string, startAt: string, endAt: string, pacingIndex?: number | null, format: CampaignFormat, adSets: Array<{ __typename?: 'AdSet', id: string, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, extractExternalId: boolean }> }>, engagements: Array<{ __typename?: 'Engagement', creativeinstanceid: string, createdat: string, type: string, pricetype: string, creativesetname?: string | null, creativesetid: string, creativename: string, creativeid: string, creativestate: string, creativepayload: string, view: string, click: string, viewthroughConversion: string, clickthroughConversion: string, conversion: string, dismiss: string, downvote: string, landed: string, spend: string, upvote: string, price: number, android: number, ios: number, linux: number, macos: number, windows: number }> };

export type AnalyticOverviewQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AnalyticOverviewQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: string, budget: number, spent: number, currency: string, createdAt: string, startAt: string, endAt: string, pacingIndex?: number | null, format: CampaignFormat, adSets: Array<{ __typename?: 'AdSet', id: string, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, extractExternalId: boolean }> }>, engagements: Array<{ __typename?: 'Engagement', creativeinstanceid: string, createdat: string, type: string, pricetype: string, creativesetname?: string | null, creativesetid: string, creativename: string, creativeid: string, creativestate: string, creativepayload: string, view: string, click: string, viewthroughConversion: string, clickthroughConversion: string, conversion: string, dismiss: string, downvote: string, landed: string, spend: string, upvote: string, price: number, android: number, ios: number, linux: number, macos: number, windows: number }> } | null };

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

export type AdSetValuesFragment = { __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', adSet: { __typename?: 'AdSet', id: string, name: string, state: string, billingType?: string | null } }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } };

export type FetchAdSetMetricsForCampaignQueryVariables = Exact<{
  filter: PerformanceFilter;
}>;


export type FetchAdSetMetricsForCampaignQuery = { __typename?: 'Query', performance: { __typename?: 'PerformanceResults', values: Array<{ __typename?: 'Performance', dimensions: { __typename?: 'Dimensions', adSet: { __typename?: 'AdSet', id: string, name: string, state: string, billingType?: string | null } }, metrics: { __typename?: 'Metrics', click: string, impression: string, siteVisit: string, conversion: string, dismiss: string, spendUsd: string, rates: { __typename?: 'MetricRates', clickThrough: string, clickToConversion: string, costPerAcquisition: string } } }> } };

export type CampaignFragment = { __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, paymentType: PaymentType, dayProportion?: number | null, stripePaymentId?: string | null, hasPaymentIntent: boolean, dayPartings: Array<{ __typename?: 'DayParting', dow: string, startMinute: number, endMinute: number }>, geoTargets: Array<{ __typename?: 'Geocode', code: string, name: string }>, adSets: Array<{ __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: string, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }>, advertiser: { __typename?: 'Advertiser', id: string } };

export type CampaignSummaryFragment = { __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null };

export type CampaignAdsFragment = { __typename?: 'Campaign', id: string, name: string, state: string, startAt: string, endAt: string, source: CampaignSource, currency: string, format: CampaignFormat, advertiser: { __typename?: 'Advertiser', id: string }, adSets: Array<{ __typename?: 'AdSet', id: string, createdAt: string, name: string, state: string, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }> };

export type LoadCampaignQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, paymentType: PaymentType, dayProportion?: number | null, stripePaymentId?: string | null, hasPaymentIntent: boolean, dayPartings: Array<{ __typename?: 'DayParting', dow: string, startMinute: number, endMinute: number }>, geoTargets: Array<{ __typename?: 'Geocode', code: string, name: string }>, adSets: Array<{ __typename?: 'AdSet', id: string, price: string, createdAt: string, billingType?: string | null, name: string, totalMax: number, perDay: number, state: string, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, oses: Array<{ __typename?: 'OS', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string, type: string, urlPattern: string, observationWindow: number }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }>, advertiser: { __typename?: 'Advertiser', id: string } } | null };

export type LoadCampaignAdsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignAdsQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: string, startAt: string, endAt: string, source: CampaignSource, currency: string, format: CampaignFormat, advertiser: { __typename?: 'Advertiser', id: string }, adSets: Array<{ __typename?: 'AdSet', id: string, createdAt: string, name: string, state: string, billingType?: string | null, oses: Array<{ __typename?: 'OS', code: string, name: string }>, segments: Array<{ __typename?: 'Segment', code: string, name: string }>, conversions: Array<{ __typename?: 'Conversion', id: string }>, ads: Array<{ __typename?: 'Ad', id: string, state: string, price: string, priceType: ConfirmationType, creative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } }> }> } | null };

export type LoadCampaignSummaryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCampaignSummaryQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, state: string, dailyCap: number, priority: number, passThroughRate: number, pacingOverride: boolean, pacingStrategy: CampaignPacingStrategies, externalId?: string | null, currency: string, budget: number, paymentType: PaymentType, spent: number, createdAt: string, startAt: string, endAt: string, source: CampaignSource, type: CampaignType, format: CampaignFormat, dayProportion?: number | null } | null };

export type CreateCampaignMutationVariables = Exact<{
  input: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', id: string, paymentType: PaymentType } };

export type UpdateCampaignMutationVariables = Exact<{
  input: UpdateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'Campaign', id: string, paymentType: PaymentType, stripePaymentId?: string | null } };

export type GeocodeFragment = { __typename?: 'Geocode', code: string, name: string };

export type SegmentFragment = { __typename?: 'SegmentsEntry', code: string, name: string };

export type ActiveGeocodesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveGeocodesQuery = { __typename?: 'Query', geocodes: Array<{ __typename?: 'Geocode', code: string, name: string }> };

export type SegmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type SegmentsQuery = { __typename?: 'Query', segments: { __typename?: 'SegmentsQueryDTO', data: Array<{ __typename?: 'SegmentsEntry', code: string, name: string }> } };

export type CreativeFragment = { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null };

export type AdvertiserCreativesQueryVariables = Exact<{
  advertiserId: Scalars['String']['input'];
}>;


export type AdvertiserCreativesQuery = { __typename?: 'Query', advertiser?: { __typename?: 'Advertiser', id: string, creatives: Array<{ __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null }> } | null };

export type CreateCreativeMutationVariables = Exact<{
  input: CreativeInput;
}>;


export type CreateCreativeMutation = { __typename?: 'Mutation', createCreative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } };

export type UpdateCreativeMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: CreativeInput;
}>;


export type UpdateCreativeMutation = { __typename?: 'Mutation', updateCreative: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } };

export type LoadCreativeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadCreativeQuery = { __typename?: 'Query', creative?: { __typename?: 'Creative', id: string, createdAt: string, modifiedAt: string, name: string, state: string, type: { __typename?: 'CreativeType', code: string }, payloadNotification?: { __typename?: 'NotificationPayload', body: string, title: string, targetUrl: string } | null, payloadNewTabPage?: { __typename?: 'NewTabPagePayload', logo?: { __typename?: 'Logo', imageUrl: string, alt: string, companyName: string, destinationUrl: string } | null, wallpapers?: Array<{ __typename?: 'Wallpaper', imageUrl: string, focalPoint: { __typename?: 'FocalPoint', x: number, y: number } }> | null } | null, payloadInlineContent?: { __typename?: 'InlineContentPayload', title: string, ctaText: string, imageUrl: string, targetUrl: string, dimensions: string, description: string } | null, payloadSearch?: { __typename?: 'SearchPayload', body: string, title: string, targetUrl: string } | null, payloadSearchHomepage?: { __typename?: 'SearchHomepagePayload', body: string, imageUrl: string, imageDarkModeUrl?: string | null, targetUrl: string, title: string, ctaText: string } | null } | null };

export type CampaignsForCreativeQueryVariables = Exact<{
  creativeId: Scalars['String']['input'];
  advertiserId: Scalars['String']['input'];
}>;


export type CampaignsForCreativeQuery = { __typename?: 'Query', creativeCampaigns: Array<{ __typename?: 'Campaign', id: string, name: string, state: string, format: CampaignFormat }> };

export type ValidateTargetUrlQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type ValidateTargetUrlQuery = { __typename?: 'Query', validateTargetUrl: { __typename?: 'TargetUrlValidation', isValid: boolean, redirects: Array<{ __typename?: 'Redirect', url: string, violations: Array<{ __typename?: 'ValidationDetail', summary: string, detail: string }> }> } };

export type UserFragment = { __typename?: 'User', email: string, fullName: string, id: string, role: string };

export type LoadUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoadUserQuery = { __typename?: 'Query', user: { __typename?: 'User', email: string, fullName: string, id: string, role: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, fullName: string, id: string, role: string } };

export type CreateSearchCampaign_LandingPageListQueryVariables = Exact<{
  domain: Scalars['String']['input'];
  country: Scalars['String']['input'];
  offset: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
}>;


export type CreateSearchCampaign_LandingPageListQuery = { __typename?: 'Query', searchProspects: { __typename?: 'SearchProspects', landingPagesWithStats: Array<{ __typename?: 'SearchLandingPageWithStats', url: string, rank: string, lastSeen: string, creatives: Array<{ __typename?: 'SearchLandingPageCreative', title: string, body?: string | null, lastSeen: string }> }> } };

export type SearchProspects_LandingPageListFragment = { __typename?: 'SearchLandingPageWithStats', url: string, rank: string, lastSeen: string, creatives: Array<{ __typename?: 'SearchLandingPageCreative', title: string, body?: string | null, lastSeen: string }> };

export const AdvertiserBillingAddressFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserBillingAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street1"}},{"kind":"Field","name":{"kind":"Name","value":"street2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]} as unknown as DocumentNode<AdvertiserBillingAddressFragment, unknown>;
export const AdvertiserSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingEmail"}},{"kind":"Field","name":{"kind":"Name","value":"additionalBillingEmails"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<AdvertiserSummaryFragment, unknown>;
export const AdvertiserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Advertiser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserSummary"}},{"kind":"Field","name":{"kind":"Name","value":"referrer"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceManageCampaign"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceSetPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingEmail"}},{"kind":"Field","name":{"kind":"Name","value":"additionalBillingEmails"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<AdvertiserFragment, unknown>;
export const CampaignSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}}]}}]} as unknown as DocumentNode<CampaignSummaryFragment, unknown>;
export const AdvertiserCampaignsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserCampaigns"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceManageCampaign"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceSetPrice"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}}]}}]} as unknown as DocumentNode<AdvertiserCampaignsFragment, unknown>;
export const AdvertiserImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<AdvertiserImageFragment, unknown>;
export const AdvertiserPriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserPrice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingModelPrice"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<AdvertiserPriceFragment, unknown>;
export const EngagementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Engagement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Engagement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creativeinstanceid"}},{"kind":"Field","name":{"kind":"Name","value":"createdat"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"pricetype"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetname"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetid"}},{"kind":"Field","name":{"kind":"Name","value":"creativename"}},{"kind":"Field","name":{"kind":"Name","value":"creativeid"}},{"kind":"Field","name":{"kind":"Name","value":"creativestate"}},{"kind":"Field","name":{"kind":"Name","value":"creativepayload"}},{"kind":"Field","name":{"kind":"Name","value":"view"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"viewthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"landed"}},{"kind":"Field","name":{"kind":"Name","value":"spend"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"android"}},{"kind":"Field","name":{"kind":"Name","value":"ios"}},{"kind":"Field","name":{"kind":"Name","value":"linux"}},{"kind":"Field","name":{"kind":"Name","value":"macos"}},{"kind":"Field","name":{"kind":"Name","value":"windows"}}]}}]} as unknown as DocumentNode<EngagementFragment, unknown>;
export const CampaignWithEngagementsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignWithEngagements"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"pacingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"extractExternalId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"engagements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Engagement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Engagement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Engagement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creativeinstanceid"}},{"kind":"Field","name":{"kind":"Name","value":"createdat"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"pricetype"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetname"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetid"}},{"kind":"Field","name":{"kind":"Name","value":"creativename"}},{"kind":"Field","name":{"kind":"Name","value":"creativeid"}},{"kind":"Field","name":{"kind":"Name","value":"creativestate"}},{"kind":"Field","name":{"kind":"Name","value":"creativepayload"}},{"kind":"Field","name":{"kind":"Name","value":"view"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"viewthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"landed"}},{"kind":"Field","name":{"kind":"Name","value":"spend"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"android"}},{"kind":"Field","name":{"kind":"Name","value":"ios"}},{"kind":"Field","name":{"kind":"Name","value":"linux"}},{"kind":"Field","name":{"kind":"Name","value":"macos"}},{"kind":"Field","name":{"kind":"Name","value":"windows"}}]}}]} as unknown as DocumentNode<CampaignWithEngagementsFragment, unknown>;
export const CampaignMetricSummaryValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricSummaryValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricSummaryValuesFragment, unknown>;
export const CampaignMetricDetailValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricDetailValuesFragment, unknown>;
export const DailyValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<DailyValuesFragment, unknown>;
export const AdSetValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}}]} as unknown as DocumentNode<AdSetValuesFragment, unknown>;
export const CreativeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<CreativeFragment, unknown>;
export const AdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<AdFragment, unknown>;
export const AdSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]} as unknown as DocumentNode<AdSetFragment, unknown>;
export const CampaignFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Campaign"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"hasPaymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"dayPartings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dow"}},{"kind":"Field","name":{"kind":"Name","value":"startMinute"}},{"kind":"Field","name":{"kind":"Name","value":"endMinute"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoTargets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<CampaignFragment, unknown>;
export const AdSetWithDeletedAdsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]} as unknown as DocumentNode<AdSetWithDeletedAdsFragment, unknown>;
export const CampaignAdsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetWithDeletedAds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<CampaignAdsFragment, unknown>;
export const GeocodeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Geocode"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Geocode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GeocodeFragment, unknown>;
export const SegmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Segment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SegmentsEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SegmentFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const SearchProspects_LandingPageListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspects_LandingPageList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPageWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]} as unknown as DocumentNode<SearchProspects_LandingPageListFragment, unknown>;
export const CreateAdSetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAdSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAdSetInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAdSetInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAdSetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<CreateAdSetMutation, CreateAdSetMutationVariables>;
export const UpdateAdSetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAdSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAdSetInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateAdSetInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAdSetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}}]} as unknown as DocumentNode<UpdateAdSetMutation, UpdateAdSetMutationVariables>;
export const AdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]}}]} as unknown as DocumentNode<AdvertiserQuery, AdvertiserQueryVariables>;
export const UpdateAdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAdvertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAdvertiserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdvertiserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdvertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateAdvertiserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAdvertiserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]}}]} as unknown as DocumentNode<UpdateAdvertiserMutation, UpdateAdvertiserMutationVariables>;
export const AdvertiserCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiserCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserCampaignFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserCampaigns"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserCampaigns"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceManageCampaign"}},{"kind":"Field","name":{"kind":"Name","value":"selfServiceSetPrice"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCampaignsQuery, AdvertiserCampaignsQueryVariables>;
export const AdvertiserImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiserImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<AdvertiserImagesQuery, AdvertiserImagesQueryVariables>;
export const AdvertiserPricesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiserPrices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserPrice"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserPrice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingModelPrice"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<AdvertiserPricesQuery, AdvertiserPricesQueryVariables>;
export const AdvertiserBillingAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiserBillingAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdvertiserBillingAddress"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdvertiserBillingAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Advertiser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street1"}},{"kind":"Field","name":{"kind":"Name","value":"street2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]} as unknown as DocumentNode<AdvertiserBillingAddressQuery, AdvertiserBillingAddressQueryVariables>;
export const UploadAdvertiserImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadAdvertiserImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdvertiserImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdvertiserImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UploadAdvertiserImageMutation, UploadAdvertiserImageMutationVariables>;
export const AnalyticOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"analyticOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignWithEngagements"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Engagement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Engagement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creativeinstanceid"}},{"kind":"Field","name":{"kind":"Name","value":"createdat"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"pricetype"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetname"}},{"kind":"Field","name":{"kind":"Name","value":"creativesetid"}},{"kind":"Field","name":{"kind":"Name","value":"creativename"}},{"kind":"Field","name":{"kind":"Name","value":"creativeid"}},{"kind":"Field","name":{"kind":"Name","value":"creativestate"}},{"kind":"Field","name":{"kind":"Name","value":"creativepayload"}},{"kind":"Field","name":{"kind":"Name","value":"view"}},{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"viewthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"clickthroughConversion"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"landed"}},{"kind":"Field","name":{"kind":"Name","value":"spend"}},{"kind":"Field","name":{"kind":"Name","value":"upvote"}},{"kind":"Field","name":{"kind":"Name","value":"downvote"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"android"}},{"kind":"Field","name":{"kind":"Name","value":"ios"}},{"kind":"Field","name":{"kind":"Name","value":"linux"}},{"kind":"Field","name":{"kind":"Name","value":"macos"}},{"kind":"Field","name":{"kind":"Name","value":"windows"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignWithEngagements"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"pacingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"extractExternalId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"engagements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Engagement"}}]}}]}}]} as unknown as DocumentNode<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>;
export const CampaignMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"campaignMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaignIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricSummaryValues"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricSummaryValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}}]}}]}}]} as unknown as DocumentNode<CampaignMetricsQuery, CampaignMetricsQueryVariables>;
export const FetchDailyMetricsForCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchDailyMetricsForCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DailyValues"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]} as unknown as DocumentNode<FetchDailyMetricsForCampaignQuery, FetchDailyMetricsForCampaignQueryVariables>;
export const FetchAdSetMetricsForCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchAdSetMetricsForCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PerformanceFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetValues"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignMetricDetailValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metrics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"click"}},{"kind":"Field","name":{"kind":"Name","value":"impression"}},{"kind":"Field","name":{"kind":"Name","value":"siteVisit"}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"dismiss"}},{"kind":"Field","name":{"kind":"Name","value":"spendUsd"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clickThrough"}},{"kind":"Field","name":{"kind":"Name","value":"clickToConversion"}},{"kind":"Field","name":{"kind":"Name","value":"costPerAcquisition"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Performance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignMetricDetailValues"}}]}}]}}]} as unknown as DocumentNode<FetchAdSetMetricsForCampaignQuery, FetchAdSetMetricsForCampaignQueryVariables>;
export const LoadCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Campaign"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalMax"}},{"kind":"Field","name":{"kind":"Name","value":"perDay"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"urlPattern"}},{"kind":"Field","name":{"kind":"Name","value":"observationWindow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Campaign"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"hasPaymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"dayPartings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dow"}},{"kind":"Field","name":{"kind":"Name","value":"startMinute"}},{"kind":"Field","name":{"kind":"Name","value":"endMinute"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoTargets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LoadCampaignQuery, LoadCampaignQueryVariables>;
export const LoadCampaignAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaignAds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignAds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}},{"kind":"Field","name":{"kind":"Name","value":"creative"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdSetWithDeletedAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"billingType"}},{"kind":"Field","name":{"kind":"Name","value":"oses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeleted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignAds"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdSetWithDeletedAds"}}]}}]}}]} as unknown as DocumentNode<LoadCampaignAdsQuery, LoadCampaignAdsQueryVariables>;
export const LoadCampaignSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadCampaignSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCap"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"passThroughRate"}},{"kind":"Field","name":{"kind":"Name","value":"pacingOverride"}},{"kind":"Field","name":{"kind":"Name","value":"pacingStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"dayProportion"}}]}}]} as unknown as DocumentNode<LoadCampaignSummaryQuery, LoadCampaignSummaryQueryVariables>;
export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const UpdateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentId"}}]}}]}}]} as unknown as DocumentNode<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
export const ActiveGeocodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActiveGeocodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geocodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Geocode"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Geocode"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Geocode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ActiveGeocodesQuery, ActiveGeocodesQueryVariables>;
export const SegmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Segment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Segment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SegmentsEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SegmentsQuery, SegmentsQueryVariables>;
export const AdvertiserCreativesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"advertiserCreatives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCreativesQuery, AdvertiserCreativesQueryVariables>;
export const CreateCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreativeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCreative"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creative"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<CreateCreativeMutation, CreateCreativeMutationVariables>;
export const UpdateCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreativeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCreative"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"creative"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<UpdateCreativeMutation, UpdateCreativeMutationVariables>;
export const LoadCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"loadCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creative"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Creative"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Creative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Creative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNewTabPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focalPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadInlineContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payloadSearchHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkModeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"targetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ctaText"}}]}}]}}]} as unknown as DocumentNode<LoadCreativeQuery, LoadCreativeQueryVariables>;
export const CampaignsForCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"campaignsForCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creativeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creativeCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creativeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creativeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"advertiserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]}}]} as unknown as DocumentNode<CampaignsForCreativeQuery, CampaignsForCreativeQueryVariables>;
export const ValidateTargetUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"validateTargetUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateTargetUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"redirects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"violations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ValidateTargetUrlQuery, ValidateTargetUrlQueryVariables>;
export const LoadUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<LoadUserQuery, LoadUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateSearchCampaign_LandingPageListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateSearchCampaign_LandingPageList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchProspects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"landingPagesWithStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchProspects_LandingPageList"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchProspects_LandingPageList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLandingPageWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}},{"kind":"Field","name":{"kind":"Name","value":"creatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]} as unknown as DocumentNode<CreateSearchCampaign_LandingPageListQuery, CreateSearchCampaign_LandingPageListQueryVariables>;