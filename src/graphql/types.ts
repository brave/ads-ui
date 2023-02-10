export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ApproveCampaignInput = {
  campaignId: Scalars['String'];
};

export type CampaignFilter = {
  /** only include campaigns for this format */
  format?: InputMaybe<CampaignFormat>;
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars['DateTime']>;
  /** only include campaigns with this state */
  state?: InputMaybe<Scalars['String']>;
  /** exclude all campaigns whose time range is completely after this time */
  to?: InputMaybe<Scalars['DateTime']>;
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

export type ChangeFilter = {
  /** exclude all changes whose time range is completely before this time */
  created?: InputMaybe<Scalars['DateTime']>;
  /** include changes made by system user */
  includeSystemUser?: InputMaybe<Scalars['Boolean']>;
  /** limit the amount of results returned */
  limit?: InputMaybe<Scalars['Float']>;
  /** only include changes for this reference id */
  referenceId?: InputMaybe<Scalars['String']>;
};

export type CreateAdInput = {
  creativeId: Scalars['String'];
  creativeSetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  prices: Array<CreatePriceInput>;
  state?: InputMaybe<Scalars['String']>;
  webhooks: Array<CreateWebhookInput>;
};

export type CreateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']>>;
  billingType: Scalars['String'];
  campaignId?: InputMaybe<Scalars['String']>;
  channels?: InputMaybe<Array<CreateChannelInput>>;
  conversions?: InputMaybe<Array<CreateConversionInput>>;
  execution: Scalars['String'];
  keywordSimilarity?: InputMaybe<Scalars['Float']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']>>;
  oses?: InputMaybe<Array<CreateOsInput>>;
  perDay: Scalars['Float'];
  segments: Array<CreateSegmentInput>;
  splitTestGroup?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  targetingTerms?: InputMaybe<Array<Scalars['String']>>;
  totalMax: Scalars['Float'];
};

export type CreateAddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: InputMaybe<Scalars['String']>;
  zipcode: Scalars['String'];
};

export type CreateAdvertiserInput = {
  additionalBillingEmails?: InputMaybe<Array<Scalars['String']>>;
  agreed?: InputMaybe<Scalars['Boolean']>;
  billingAddress: CreateAddressInput;
  billingEmail?: InputMaybe<Scalars['String']>;
  mailingAddress: CreateAddressInput;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  referrer?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateCampaignInput = {
  adSets?: InputMaybe<Array<CreateAdSetInput>>;
  advertiserId: Scalars['String'];
  budget: Scalars['Float'];
  currency: Scalars['String'];
  dailyBudget: Scalars['Float'];
  dailyCap: Scalars['Float'];
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']>;
  endAt: Scalars['DateTime'];
  externalId: Scalars['String'];
  format: CampaignFormat;
  geoTargets: Array<GeocodeInput>;
  name: Scalars['String'];
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  source: Scalars['String'];
  startAt: Scalars['DateTime'];
  state: Scalars['String'];
  type: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateChannelInput = {
  channelId: Scalars['String'];
};

export type CreateCommentInput = {
  campaignId: Scalars['String'];
  note: Scalars['String'];
};

export type CreateConversionInput = {
  extractExternalId?: InputMaybe<Scalars['Boolean']>;
  observationWindow: Scalars['Float'];
  trailingAsteriskNotRequired?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  urlPattern: Scalars['String'];
};

export type CreateInPageCreativeInput = {
  advertiserId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payload: InPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateNewTabPageCreativeInput = {
  advertiserId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payload: NewTabPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
};

export type CreateNotificationCreativeInput = {
  advertiserId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payload: NotificationPayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateOsInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type CreateSegmentInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTypeInput = {
  code: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type CreateUserAdvertiserInput = {
  advertiserId: Scalars['String'];
  user?: InputMaybe<CreateUserInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type CreativeFilter = {
  /** only include creatives with this state */
  state?: InputMaybe<Scalars['String']>;
};

export type CreativeInput = {
  advertiserId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payloadInPage?: InputMaybe<InPagePayloadInput>;
  payloadInlineContent?: InputMaybe<InlineContentPayloadInput>;
  payloadNewTabPage?: InputMaybe<NewTabPagePayloadInput>;
  payloadNotification?: InputMaybe<NotificationPayloadInput>;
  payloadPromotedContent?: InputMaybe<PromotedContentPayloadInput>;
  payloadSearch?: InputMaybe<SearchPayloadInput>;
  payloadSearchHomepage?: InputMaybe<SearchHompagePayloadInput>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
};

export type CreativeTypeInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type DayPartingInput = {
  dow: Scalars['String'];
  endMinute: Scalars['Float'];
  startMinute: Scalars['Float'];
};

export type DeleteAdInput = {
  id: Scalars['String'];
};

export type FocalPointInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeocodeInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type InPagePayloadInput = {
  creativeUrl: Scalars['String'];
  /** size of the creative, e.g. 1024x768 */
  size: Scalars['String'];
  targetUrl: Scalars['String'];
};

export type InlineContentPayloadInput = {
  ctaText: Scalars['String'];
  description: Scalars['String'];
  dimensions: Scalars['String'];
  imageUrl: Scalars['String'];
  targetUrl: Scalars['String'];
  title: Scalars['String'];
};

export type LogoInput = {
  alt: Scalars['String'];
  companyName: Scalars['String'];
  destinationUrl: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type NewTabPagePayloadInput = {
  logo?: InputMaybe<LogoInput>;
  wallpapers?: InputMaybe<Array<WallpaperInput>>;
};

export type NotificationPayloadInput = {
  body: Scalars['String'];
  targetUrl: Scalars['String'];
  title: Scalars['String'];
};

export type PromotedContentPayloadInput = {
  category: Scalars['String'];
  contentType: Scalars['String'];
  description: Scalars['String'];
  domain?: InputMaybe<Scalars['String']>;
  feed: Scalars['String'];
  ogImages: Scalars['Boolean'];
  title: Scalars['String'];
};

export type RejectCampaignInput = {
  campaignId: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  option: Scalars['String'];
};

export type SearchHompagePayloadInput = {
  body: Scalars['String'];
  imageDarkModeUrl?: InputMaybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  targetUrl: Scalars['String'];
  title: Scalars['String'];
};

export type SearchPayloadInput = {
  body: Scalars['String'];
  targetUrl: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateAdInput = {
  creativeId?: InputMaybe<Scalars['String']>;
  creativeSetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  prices?: InputMaybe<Array<CreatePriceInput>>;
  state?: InputMaybe<Scalars['String']>;
  webhooks?: InputMaybe<Array<CreateWebhookInput>>;
};

export type UpdateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars['String']>>;
  billingType?: InputMaybe<Scalars['String']>;
  campaignId?: InputMaybe<Scalars['String']>;
  channels?: InputMaybe<Array<UpdateChannelsInput>>;
  conversions?: InputMaybe<Array<UpdateConversionsInput>>;
  execution?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywordSimilarity?: InputMaybe<Scalars['Float']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  negativeKeywords?: InputMaybe<Array<Scalars['String']>>;
  oses?: InputMaybe<Array<UpdateOSesInput>>;
  perDay?: InputMaybe<Scalars['Float']>;
  segments?: InputMaybe<Array<UpdateSegmentInput>>;
  splitTestGroup?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  targetingTerms?: InputMaybe<Array<Scalars['String']>>;
  totalMax?: InputMaybe<Scalars['Float']>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street1?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type UpdateAdvertiserInput = {
  additionalBillingEmails?: InputMaybe<Array<Scalars['String']>>;
  billingAddress?: InputMaybe<UpdateAddressInput>;
  billingEmail?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  mailingAddress?: InputMaybe<UpdateAddressInput>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  publicKey?: InputMaybe<Scalars['String']>;
  referrer?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UpdateCampaignInput = {
  adSets?: InputMaybe<Array<UpdateAdSetInput>>;
  budget: Scalars['Float'];
  currency: Scalars['String'];
  dailyBudget: Scalars['Float'];
  dailyCap: Scalars['Float'];
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars['Float']>;
  endAt: Scalars['DateTime'];
  externalId?: InputMaybe<Scalars['String']>;
  geoTargets: Array<GeocodeInput>;
  id: Scalars['String'];
  name: Scalars['String'];
  pacingOverride?: InputMaybe<Scalars['Boolean']>;
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  passThroughRate?: InputMaybe<Scalars['Float']>;
  priority?: InputMaybe<Scalars['Float']>;
  startAt: Scalars['DateTime'];
  state: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateChannelsInput = {
  channelId: Scalars['String'];
};

export type UpdateConversionsInput = {
  extractExternalId?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  observationWindow: Scalars['Float'];
  trailingAsteriskNotRequired?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  urlPattern: Scalars['String'];
};

export type UpdateInPageCreativeInput = {
  advertiserId: Scalars['String'];
  creativeId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payload: InPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
  userId: Scalars['String'];
};

export type UpdateNewTabPageCreativeInput = {
  advertiserId: Scalars['String'];
  creativeId: Scalars['String'];
  endAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  payload: NewTabPagePayloadInput;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  type: CreateTypeInput;
  userId: Scalars['String'];
};

export type UpdateNotificationCreativeInput = {
  advertiserId?: InputMaybe<Scalars['String']>;
  creativeId?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  payload?: InputMaybe<NotificationPayloadInput>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CreateTypeInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateOSesInput = {
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateSegmentInput = {
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  fullName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type WallpaperInput = {
  focalPoint: FocalPointInput;
  imageUrl: Scalars['String'];
};

export type CreatePriceInput = {
  amount: Scalars['Float'];
  type: Scalars['String'];
};

export type CreateWebhookInput = {
  type: Scalars['String'];
  url: Scalars['String'];
};
