import { useState } from "react";

export interface Basket {
  isLandingPageSelected(url: string): boolean;
  toggleLandingPageSelection(url: string): void;

  creativeIndexForLandingPage(url: string): number;
  nextCreativeForLandingPage(url: string, numCreatives: number): void;
}

export function useBasket(): Basket {
  const [ignoredLandingPages, setIgnoredLandingPages] = useState<string[]>([]);
  const [creativeIndices, setCreativeIndices] = useState<{
    [url: string]: number;
  }>({});

  return {
    isLandingPageSelected(url: string) {
      return !ignoredLandingPages.includes(url);
    },
    toggleLandingPageSelection(url: string) {
      setIgnoredLandingPages((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url],
      );
    },
    creativeIndexForLandingPage(url) {
      return creativeIndices[url] ?? 0;
    },
    nextCreativeForLandingPage(url, numCreatives) {
      setCreativeIndices((prev) => ({
        ...prev,
        [url]: ((prev[url] ?? 0) + 1) % numCreatives,
      }));
    },
  };
}
