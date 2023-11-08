export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Numeric` datatype represents a fixed-precision number, which does not suffer from the rounding errors of a javascript floating point number. It's always returned as a string, but for input types either a string or number can be used, though strings are preferred to avoid risk of inaccuracy. */
  Numeric: { input: string; output: string };
};

export type AdvertiserCampaignFilter = {
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** include ads */
  includeAds?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** include creative sets */
  includeCreativeSets?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AdvertiserPriceInput = {
  billingModelPrice: Scalars["Numeric"]["input"];
  billingType: BillingType;
  format: CampaignFormat;
};

export enum AdvertiserSource {
  Managed = "MANAGED",
  SelfServe = "SELF_SERVE",
}

export type ApproveCampaignInput = {
  campaignId: Scalars["String"]["input"];
};

export enum BillingType {
  Cpc = "CPC",
  Cpm = "CPM",
  Cpsv = "CPSV",
}

export type CampaignFilter = {
  /** only include campaigns for this format */
  format?: InputMaybe<CampaignFormat>;
  /** exclude all campaigns whose time range is completely before this time */
  from?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** only include campaigns with this source */
  source?: InputMaybe<CampaignSource>;
  /** only include campaigns with this state */
  state?: InputMaybe<Scalars["String"]["input"]>;
  /** exclude all campaigns whose time range is completely after this time */
  to?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum CampaignFormat {
  NewsDisplayAd = "NEWS_DISPLAY_AD",
  NtpSi = "NTP_SI",
  PushNotification = "PUSH_NOTIFICATION",
  Search = "SEARCH",
  SearchHomepage = "SEARCH_HOMEPAGE",
}

export enum CampaignPacingStrategies {
  ModelV1 = "MODEL_V1",
  Original = "ORIGINAL",
}

export enum CampaignRejection {
  InappropriateContent = "INAPPROPRIATE_CONTENT",
  InvalidLandingPage = "INVALID_LANDING_PAGE",
  Other = "OTHER",
  ProhibitedCategory = "PROHIBITED_CATEGORY",
}

export enum CampaignSource {
  Direct = "DIRECT",
  Managed = "MANAGED",
  Network = "NETWORK",
  SelfServe = "SELF_SERVE",
}

export type ChangeFilter = {
  /** exclude all changes whose time range is completely before this time */
  createdAfter?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** include changes made by system user */
  includeSystemUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** limit the amount of results returned */
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  /** only include changes for this reference id */
  referenceId?: InputMaybe<Scalars["String"]["input"]>;
  /** only include changes for this set of reference ids */
  referenceIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export enum ConfirmationType {
  Bookmark = "BOOKMARK",
  Click = "CLICK",
  ClientView = "CLIENT_VIEW",
  Conversion = "CONVERSION",
  Dismiss = "DISMISS",
  Downvote = "DOWNVOTE",
  Flag = "FLAG",
  Land30 = "LAND30",
  Land60 = "LAND60",
  Landclick = "LANDCLICK",
  Landed = "LANDED",
  Upvote = "UPVOTE",
  View = "VIEW",
}

export type CreateAdInput = {
  creative?: InputMaybe<CreativeInput>;
  creativeId?: InputMaybe<Scalars["String"]["input"]>;
  creativeSetId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  webhooks?: InputMaybe<Array<CreateWebhookInput>>;
};

export type CreateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  billingType: Scalars["String"]["input"];
  campaignId?: InputMaybe<Scalars["String"]["input"]>;
  channels?: InputMaybe<Array<CreateChannelInput>>;
  conversions?: InputMaybe<Array<CreateConversionInput>>;
  execution?: InputMaybe<Scalars["String"]["input"]>;
  keywordSimilarity?: InputMaybe<Scalars["Float"]["input"]>;
  keywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  negativeKeywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oses?: InputMaybe<Array<CreateOsInput>>;
  perDay: Scalars["Float"]["input"];
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price: Scalars["Numeric"]["input"];
  segments: Array<CreateSegmentInput>;
  splitTestGroup?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  targetingTerms?: InputMaybe<Array<Scalars["String"]["input"]>>;
  totalMax: Scalars["Float"]["input"];
};

export type CreateAddressInput = {
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  street1: Scalars["String"]["input"];
  street2?: InputMaybe<Scalars["String"]["input"]>;
  zipcode: Scalars["String"]["input"];
};

export type CreateAdvertiserImageInput = {
  advertiserId: Scalars["String"]["input"];
  format: CampaignFormat;
  imageUrl: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateAdvertiserInput = {
  additionalBillingEmails?: InputMaybe<Array<Scalars["String"]["input"]>>;
  billingAddress: CreateAddressInput;
  billingEmail?: InputMaybe<Scalars["String"]["input"]>;
  billingModelPrices?: InputMaybe<Array<AdvertiserPriceInput>>;
  mailingAddress: CreateAddressInput;
  name: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  referrer?: InputMaybe<Scalars["String"]["input"]>;
  selfServiceManageCampaign?: InputMaybe<Scalars["Boolean"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCampaignInput = {
  adSets?: InputMaybe<Array<CreateAdSetInput>>;
  advertiserId: Scalars["String"]["input"];
  brandedKeyword?: InputMaybe<Scalars["String"]["input"]>;
  budget: Scalars["Float"]["input"];
  currency: Scalars["String"]["input"];
  dailyBudget?: InputMaybe<Scalars["Float"]["input"]>;
  dailyCap: Scalars["Float"]["input"];
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars["Float"]["input"]>;
  endAt: Scalars["DateTime"]["input"];
  externalId?: InputMaybe<Scalars["String"]["input"]>;
  format: CampaignFormat;
  geoTargets: Array<GeocodeInput>;
  name: Scalars["String"]["input"];
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  paymentType?: InputMaybe<PaymentType>;
  priority?: InputMaybe<Scalars["Float"]["input"]>;
  source: Scalars["String"]["input"];
  startAt: Scalars["DateTime"]["input"];
  state: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateChannelInput = {
  channelId: Scalars["String"]["input"];
};

export type CreateCommentInput = {
  campaignId: Scalars["String"]["input"];
  note: Scalars["String"]["input"];
};

export type CreateConversionInput = {
  extractExternalId?: InputMaybe<Scalars["Boolean"]["input"]>;
  observationWindow: Scalars["Float"]["input"];
  trailingAsteriskNotRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  type: Scalars["String"]["input"];
  urlPattern: Scalars["String"]["input"];
};

export type CreateInPageCreativeInput = {
  advertiserId: Scalars["String"]["input"];
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  name: Scalars["String"]["input"];
  payload: InPagePayloadInput;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state: Scalars["String"]["input"];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateNewTabPageCreativeInput = {
  advertiserId: Scalars["String"]["input"];
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  name: Scalars["String"]["input"];
  payload: NewTabPagePayloadInput;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state: Scalars["String"]["input"];
  type: CreateTypeInput;
};

export type CreateNotificationCreativeInput = {
  advertiserId: Scalars["String"]["input"];
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  name: Scalars["String"]["input"];
  payload: NotificationPayloadInput;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state: Scalars["String"]["input"];
  type: CreateTypeInput;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateOsInput = {
  code: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateSegmentInput = {
  code: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateTypeInput = {
  code: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  emailVerified: Scalars["Boolean"]["input"];
  fullName: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  role: Scalars["String"]["input"];
};

export type CreativeFilter = {
  /** only include creatives with this state */
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreativeInput = {
  advertiserId: Scalars["String"]["input"];
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  name: Scalars["String"]["input"];
  payloadInPage?: InputMaybe<InPagePayloadInput>;
  payloadInlineContent?: InputMaybe<InlineContentPayloadInput>;
  payloadNewTabPage?: InputMaybe<NewTabPagePayloadInput>;
  payloadNotification?: InputMaybe<NotificationPayloadInput>;
  payloadPromotedContent?: InputMaybe<PromotedContentPayloadInput>;
  payloadSearch?: InputMaybe<SearchPayloadInput>;
  payloadSearchHomepage?: InputMaybe<SearchHomepagePayloadInput>;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state: Scalars["String"]["input"];
  type: CreateTypeInput;
};

export type CreativeTypeInput = {
  code: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type DayPartingInput = {
  dow: Scalars["String"]["input"];
  endMinute: Scalars["Float"]["input"];
  startMinute: Scalars["Float"]["input"];
};

export type DeleteAdInput = {
  id: Scalars["String"]["input"];
};

export type FocalPointInput = {
  x: Scalars["Float"]["input"];
  y: Scalars["Float"]["input"];
};

export type GeocodeInput = {
  code: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type InPagePayloadInput = {
  creativeUrl: Scalars["String"]["input"];
  /** size of the creative, e.g. 1024x768 */
  size: Scalars["String"]["input"];
  targetUrl: Scalars["String"]["input"];
};

export type InlineContentPayloadInput = {
  ctaText: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  dimensions: Scalars["String"]["input"];
  imageUrl: Scalars["String"]["input"];
  targetUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type LogoInput = {
  alt: Scalars["String"]["input"];
  companyName: Scalars["String"]["input"];
  destinationUrl: Scalars["String"]["input"];
  imageUrl: Scalars["String"]["input"];
};

export type NewTabPagePayloadInput = {
  logo?: InputMaybe<LogoInput>;
  wallpapers?: InputMaybe<Array<WallpaperInput>>;
};

export type NotificationPayloadInput = {
  body: Scalars["String"]["input"];
  targetUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export enum PaymentType {
  ManualBat = "MANUAL_BAT",
  Netsuite = "NETSUITE",
  Radom = "RADOM",
  Stripe = "STRIPE",
}

export type PromotedContentPayloadInput = {
  category: Scalars["String"]["input"];
  contentType: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  domain?: InputMaybe<Scalars["String"]["input"]>;
  feed: Scalars["String"]["input"];
  ogImages: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type RejectCampaignInput = {
  campaignId: Scalars["String"]["input"];
  message?: InputMaybe<Scalars["String"]["input"]>;
  option: CampaignRejection;
};

export enum RequestedDimensions {
  Ad = "AD",
}

export type SearchHomepagePayloadInput = {
  body: Scalars["String"]["input"];
  ctaText?: Scalars["String"]["input"];
  imageDarkModeUrl?: InputMaybe<Scalars["String"]["input"]>;
  imageUrl: Scalars["String"]["input"];
  targetUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type SearchPayloadInput = {
  body: Scalars["String"]["input"];
  targetUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type UpdateAdInput = {
  creativeId?: InputMaybe<Scalars["String"]["input"]>;
  creativeSetId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  webhooks?: InputMaybe<Array<CreateWebhookInput>>;
};

export type UpdateAdSetInput = {
  ads?: InputMaybe<Array<CreateAdInput>>;
  bannedKeywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  billingType?: InputMaybe<Scalars["String"]["input"]>;
  campaignId?: InputMaybe<Scalars["String"]["input"]>;
  channels?: InputMaybe<Array<CreateChannelInput>>;
  conversions?: InputMaybe<Array<UpdateConversionsInput>>;
  execution?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  keywordSimilarity?: InputMaybe<Scalars["Float"]["input"]>;
  keywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  negativeKeywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  optimized?: InputMaybe<Scalars["Boolean"]["input"]>;
  oses?: InputMaybe<Array<UpdateOSesInput>>;
  perDay?: InputMaybe<Scalars["Float"]["input"]>;
  /** The price in the owning campaign's currency for each single confirmation of the priceType specified. Note therefore that the caller is responsible for dividing cost-per-mille by 1000. */
  price?: InputMaybe<Scalars["Numeric"]["input"]>;
  segments?: InputMaybe<Array<UpdateSegmentInput>>;
  splitTestGroup?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  targetingTerms?: InputMaybe<Array<Scalars["String"]["input"]>>;
  totalMax?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  street1?: InputMaybe<Scalars["String"]["input"]>;
  street2?: InputMaybe<Scalars["String"]["input"]>;
  zipcode?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAdvertiserInput = {
  additionalBillingEmails?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Agreed to Terms And Conditions - Advertiser Facing Dashboard */
  agreed?: InputMaybe<Scalars["Boolean"]["input"]>;
  billingAddress?: InputMaybe<UpdateAddressInput>;
  billingEmail?: InputMaybe<Scalars["String"]["input"]>;
  billingModelPrices?: InputMaybe<Array<AdvertiserPriceInput>>;
  id: Scalars["String"]["input"];
  mailingAddress?: InputMaybe<UpdateAddressInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  publicKey?: InputMaybe<Scalars["String"]["input"]>;
  referrer?: InputMaybe<Scalars["String"]["input"]>;
  selfServiceManageCampaign?: InputMaybe<Scalars["Boolean"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<Array<UpdateUserInput>>;
};

export type UpdateCampaignInput = {
  adSets?: InputMaybe<Array<UpdateAdSetInput>>;
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  brandedKeyword?: InputMaybe<Scalars["String"]["input"]>;
  budget?: InputMaybe<Scalars["Float"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dailyBudget?: InputMaybe<Scalars["Float"]["input"]>;
  dailyCap?: InputMaybe<Scalars["Float"]["input"]>;
  dayPartings?: InputMaybe<Array<DayPartingInput>>;
  dayProportion?: InputMaybe<Scalars["Float"]["input"]>;
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  externalId?: InputMaybe<Scalars["String"]["input"]>;
  geoTargets?: InputMaybe<Array<GeocodeInput>>;
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  pacingOverride?: InputMaybe<Scalars["Boolean"]["input"]>;
  pacingStrategy?: InputMaybe<CampaignPacingStrategies>;
  passThroughRate?: InputMaybe<Scalars["Float"]["input"]>;
  paymentType?: InputMaybe<PaymentType>;
  priority?: InputMaybe<Scalars["Float"]["input"]>;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  stripePaymentId?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateConversionsInput = {
  extractExternalId?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  observationWindow?: InputMaybe<Scalars["Float"]["input"]>;
  trailingAsteriskNotRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  urlPattern?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateNotificationCreativeInput = {
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  creativeId?: InputMaybe<Scalars["String"]["input"]>;
  endAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  payload?: InputMaybe<NotificationPayloadInput>;
  startAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<CreateTypeInput>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateOSesInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSegmentInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  emailVerified?: InputMaybe<Scalars["Boolean"]["input"]>;
  fullName?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
};

export type WallpaperInput = {
  focalPoint: FocalPointInput;
  imageUrl: Scalars["String"]["input"];
};

export type CreateWebhookInput = {
  type: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};
