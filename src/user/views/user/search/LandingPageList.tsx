import { SearchProspectsLandingPageListFragment } from "@/graphql-client/graphql";
import { LandingPageListEntry } from "./LandingPageListEntry";
import { Basket } from "./basket";

import { List, type RowComponentProps } from "react-window";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { CountryDomain } from "./types";

interface Props {
  domain: CountryDomain;
  basket: Basket;
  landingPages: SearchProspectsLandingPageListFragment[] | undefined;
  allowSelection?: boolean;
}

function RowComponent({
  index,
  style,
  landingPages,
  basket,
  domain,
  allowSelection,
}: RowComponentProps<{
  landingPages: SearchProspectsLandingPageListFragment[];
  basket: Basket;
  domain: CountryDomain;
  allowSelection: boolean;
}>) {
  const landingPage = landingPages[index];

  return (
    <LandingPageListEntry
      key={landingPage.url}
      style={style}
      domain={domain}
      landingPage={landingPage}
      allowSelection={allowSelection}
      hasMultipleCreatives={landingPage.creatives.length > 1}
      selected={basket.isLandingPageSelected(landingPage.url)}
      toggleSelection={() => basket.toggleLandingPageSelection(landingPage.url)}
      creativeIndex={basket.creativeIndexForLandingPage(landingPage.url)}
      nextCreative={() =>
        basket.nextCreativeForLandingPage(
          landingPage.url,
          landingPage.creatives.length,
        )
      }
    />
  );
}

export function LandingPageList({
  landingPages,
  basket,
  domain,
  allowSelection = true,
}: Props) {
  if (!landingPages) {
    return <FullScreenProgress />;
  }

  return (
    <List
      rowComponent={RowComponent}
      rowCount={landingPages.length}
      rowHeight={200}
      rowProps={{
        landingPages,
        basket,
        domain,
        allowSelection,
      }}
      style={{ overflowX: "scroll" }}
    />
  );
}
