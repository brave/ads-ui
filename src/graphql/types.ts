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

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Scalars = {ID: string,String: string,Boolean: boolean,Int: number,Float: number}