import { LandingPageListEntry } from "./LandingPageListEntry";

import { List, type RowComponentProps } from "react-window";
import { Basket } from "@/user/views/user/search/basket";
import { LandingPageInfo } from "./data";

interface Props {
  basket: Basket;
  landingPages: LandingPageInfo[];
  allowSelection?: boolean;
}

function RowComponent({
  index,
  style,
  landingPages,
  basket,
  allowSelection,
}: RowComponentProps<{
  landingPages: LandingPageInfo[];
  basket: Basket;
  allowSelection: boolean;
}>) {
  const landingPage = landingPages[index];

  return (
    <LandingPageListEntry
      key={landingPage.url}
      style={style}
      landingPage={landingPage}
      allowSelection={allowSelection}
      hasMultipleCreatives={landingPage.creatives.length > 1}
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
  allowSelection = true,
}: Props) {
  return (
    <List
      rowComponent={RowComponent}
      rowCount={landingPages.length}
      rowHeight={200}
      rowProps={{
        landingPages,
        basket,
        allowSelection,
      }}
      style={{ overflowX: "scroll" }}
    />
  );
}
