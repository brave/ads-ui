/* eslint-disable lingui/no-unlocalized-strings */
import { CountryDomain } from "@/user/views/user/search/types";

export interface LandingPageInfo {
  url: string;
  favicon: string;
  lastSeen: string;
  creatives: Array<{
    title: string;
    body?: string | null;
  }>;
  queries: string[];
}

export interface SearchData {
  countryDomain: CountryDomain;
  fullCountryName: string;
  landingPages: LandingPageInfo[];
}

interface UseSearchDataReturn {
  data?: SearchData;
  loading: boolean;
}

export function useSearchData(slug: string): UseSearchDataReturn {
  if (slug === "loading") {
    return {
      loading: true,
    };
  }

  if (slug === "dummy") {
    return {
      loading: false,
      data: {
        countryDomain: {
          country: "us",
          domain: "example.com",
        },
        fullCountryName: "United States",
        landingPages: [
          {
            url: "https://example.com",
            lastSeen: "2021-01-01",
            favicon: "/favicon.png",
            queries: ["a", "b", "c"],
            creatives: [
              {
                title: "Title 1",
                body: "Body 1",
              },
              {
                title: "Title 2",
                body: "Body 2",
              },
            ],
          },
        ],
      },
    };
  }

  return {
    loading: false,
  };
}
