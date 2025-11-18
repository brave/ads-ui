import { SearchProspectsLandingPageListFragment } from "@/graphql-client/graphql";
import { LandingPageListEntry } from "./LandingPageListEntry";
import { Basket } from "./basket";

import { List } from "@mui/material";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { CountryDomain } from "./types";

interface Props {
  domain: CountryDomain;
  basket: Basket;
  landingPages: SearchProspectsLandingPageListFragment[] | undefined;
  allowSelection?: boolean;
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
    <List sx={{ overflowY: "auto", height: "100%" }}>
      {landingPages.map((landingPage) => (
        <LandingPageListEntry
          key={landingPage.url}
          domain={domain}
          landingPage={landingPage}
          allowSelection={allowSelection}
          hasMultipleCreatives={landingPage.creatives.length > 1}
          selected={basket.isLandingPageSelected(landingPage.url)}
          toggleSelection={() =>
            basket.toggleLandingPageSelection(landingPage.url)
          }
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
