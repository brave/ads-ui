import { SearchPreview } from "@/components/Creatives/SearchPreview";
import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

interface Props {
  landingPage: SearchProspects_LandingPageListFragment;
}

export function LandingPageListEntry({ landingPage }: Props) {
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox edge="start" checked={true} disableRipple />
      </ListItemIcon>
      <ListItemButton>
        <SearchPreview
          title={landingPage.creatives[0].title}
          body={landingPage.creatives[0].body ?? ""}
          targetUrl={landingPage.url}
        />
      </ListItemButton>
    </ListItem>
  );
}
