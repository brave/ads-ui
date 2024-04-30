import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import { LinearProgress, List } from "@mui/material";
import { LandingPageListEntry } from "./LandingPageListEntry";
import { Basket } from "./basket";

interface Props {
  basket: Basket;
  landingPages: SearchProspects_LandingPageListFragment[] | undefined;
}

export function LandingPageList({ landingPages, basket }: Props) {
  if (!landingPages) {
    return <LinearProgress />;
  }

  return (
    <List dense>
      {landingPages.map((landingPage) => (
        <LandingPageListEntry
          key={landingPage.url}
          landingPage={landingPage}
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
