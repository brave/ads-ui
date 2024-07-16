import { LandingPageListEntry } from "./LandingPageListEntry";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Basket } from "@/user/views/user/search/basket";
import { LandingPageInfo } from "./data";

interface Props {
  basket: Basket;
  landingPages: LandingPageInfo[];
  allowSelection?: boolean;
}

export function LandingPageList({
  landingPages,
  basket,
  allowSelection = true,
}: Props) {
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
                landingPage={landingPage}
                allowSelection={allowSelection}
                hasMultipleCreatives={landingPage.creatives.length > 1}
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
