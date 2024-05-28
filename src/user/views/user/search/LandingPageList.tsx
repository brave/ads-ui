import { SearchProspectsLandingPageListFragment } from "@/graphql-client/graphql";
import { LandingPageListEntry } from "./LandingPageListEntry";
import { Basket } from "./basket";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { CountryDomain } from "./types";

interface Props {
  domain: CountryDomain;
  basket: Basket;
  landingPages: SearchProspectsLandingPageListFragment[] | undefined;
}

export function LandingPageList({ landingPages, basket, domain }: Props) {
  if (!landingPages) {
    return <FullScreenProgress />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemSize={200}
          itemCount={landingPages.length}
          style={{ overflowX: "scroll" }}
        >
          {({ index, style }) => {
            const landingPage = landingPages[index];

            return (
              <LandingPageListEntry
                key={index}
                style={style}
                domain={domain}
                landingPage={landingPage}
                hasMultipleCreatives={landingPage.creatives.length > 1}
                selected={basket.isLandingPageSelected(landingPage.url)}
                toggleSelection={() =>
                  basket.toggleLandingPageSelection(landingPage.url)
                }
                creativeIndex={basket.creativeIndexForLandingPage(
                  landingPage.url,
                )}
                nextCreative={() =>
                  basket.nextCreativeForLandingPage(
                    landingPage.url,
                    landingPage.creatives.length,
                  )
                }
              />
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}
