/* eslint-disable lingui/no-unlocalized-strings */
import { CountryDomain } from "@/user/views/user/search/types";
import { buildAdServerEndpoint } from "@/util/environment";
import useSWR from "swr";

/* this is the data we get back from the server */
interface ServerSearchData {
  countryDomain: CountryDomain;
  fullCountryName: string;
  landingPages: ServerLandingPageInfo[];
  estimates: {
    qpw: {
      min: number;
      max: number;
    };
    cpw: {
      min: number;
      max: number;
    };
    trialBudget: number;
  };
}

interface ServerLandingPageInfo {
  url: string;
  favicon: string;
  lastSeen: string;
  creatives: Array<{
    title: string;
    body?: string | null;
  }>;
}

/* and it's very convenient to have the slug in the data structures we pass round internally */
export interface SearchData extends ServerSearchData {
  landingPages: LandingPageInfo[];
}

export interface LandingPageInfo extends ServerLandingPageInfo {
  slug: string;
}

interface UseSearchDataReturn<T> {
  data?: T;
  loading: boolean;
}

const fetcher = (suffix: string) =>
  fetch(`${buildAdServerEndpoint("/search/preview/")}${suffix}`).then((r) => {
    if (!r.ok) {
      throw new Error(`Error fetching search data: ${r.status}`);
    }

    return r.json();
  });

export function useLandingPageData(
  slug: string,
): UseSearchDataReturn<SearchData> {
  const { data, isLoading } = useSWR<ServerSearchData>(slug, fetcher);

  if (!data) {
    return { loading: isLoading };
  }

  return {
    loading: isLoading,
    data: {
      ...data,
      landingPages: data?.landingPages.map((lp) => ({
        ...lp,
        slug,
      })),
    },
  };
}

export function useKeywordData(
  slug: string,
  landingPageUrl: string,
): UseSearchDataReturn<string[]> {
  const qs = new URLSearchParams({ url: landingPageUrl });
  const { data, isLoading } = useSWR<string[]>(
    `${slug}/keywords?${qs}`,
    fetcher,
  );

  return {
    loading: isLoading,
    data,
  };
}
