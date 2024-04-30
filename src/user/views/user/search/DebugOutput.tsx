/* eslint-disable lingui/no-unlocalized-strings */
import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import { Basket } from "./basket";
import { CountryDomain } from "./types";

interface Props {
  domain: CountryDomain;
  basket: Basket;
  landingPages: SearchProspects_LandingPageListFragment[] | undefined;
}

export function DebugOutput({ domain, basket, landingPages }: Props) {
  return (
    <div style={{ overflowX: "scroll" }}>
      <h1>Debug Output</h1>
      <h2>Domain</h2>
      <pre>{JSON.stringify(domain, null, 2)}</pre>
      <h2>Basket</h2>
      <pre>{JSON.stringify(basket.debugOutput(), null, 2)}</pre>
      <h2>Landing Pages</h2>
      <pre>{JSON.stringify(landingPages, null, 2)}</pre>
    </div>
  );
}
