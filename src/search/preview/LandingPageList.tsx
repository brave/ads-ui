import { LandingPageListEntry } from "./LandingPageListEntry";

import { List } from "@mui/material";
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
    <List
      sx={{
        overflowY: "auto",
        height: "100%",
      }}
    >
      {landingPages.map((landingPage) => (
        <LandingPageListEntry
          key={landingPage.url}
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
      ))}
    </List>
  );
}
