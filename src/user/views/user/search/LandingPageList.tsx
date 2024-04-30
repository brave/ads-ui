import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import { LinearProgress } from "@mui/material";
import { LandingPageListEntry } from "./LandingPageListEntry";
import { Basket } from "./basket";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface Props {
  basket: Basket;
  landingPages: SearchProspects_LandingPageListFragment[] | undefined;
}

export function LandingPageList({ landingPages, basket }: Props) {
  if (!landingPages) {
    return <LinearProgress />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemSize={200}
          itemCount={landingPages.length}
        >
          {({ index, style }) => {
            const landingPage = landingPages[index];

            return (
              <LandingPageListEntry
                key={index}
                style={style}
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

  /*
  return landingPages.map((landingPage) => (
    <LandingPageListEntry
      key={landingPage.url}
      landingPage={landingPage}
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
  ));
  */
}
