import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import { LinearProgress, List } from "@mui/material";
import { LandingPageListEntry } from "./LandingPageListEntry";

interface Props {
  landingPages: SearchProspects_LandingPageListFragment[] | undefined;
}

export function LandingPageList({ landingPages }: Props) {
  if (!landingPages) {
    return <LinearProgress />;
  }

  return (
    <List>
      {landingPages.map((landingPage) => (
        <LandingPageListEntry key={landingPage.url} landingPage={landingPage} />
      ))}
    </List>
  );
}
