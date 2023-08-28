import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export function MobileAdsBenefits() {
  return (
    <Box>
      <Typography variant="h6">Why Brave Ads?</Typography>
      <List>
        <ListItem
          alignItems="center"
          disableGutters
          sx={{ flexDirection: "row" }}
        >
          <ListItemAvatar>
            <Avatar alt="One" src="/One.svg" />
          </ListItemAvatar>
          <ItemText
            primary="For all business sizes"
            secondary="Start a Brave Ads campaign with as little as $100."
          />
        </ListItem>
        <ListItem
          alignItems="center"
          disableGutters
          sx={{ flexDirection: "row" }}
        >
          <ListItemAvatar>
            <Avatar alt="Two" src="/Two.svg" />
          </ListItemAvatar>
          <ItemText
            primary="Powerful Ad Formats"
            secondary="Browser-based delivery offers a new way to reach audiences on the Web."
          />
        </ListItem>
        <ListItem
          alignItems="center"
          disableGutters
          sx={{ flexDirection: "row" }}
        >
          <ListItemAvatar>
            <Avatar alt="Three" src="/Three.svg" />
          </ListItemAvatar>
          <ItemText
            primary="Unparalleled privacy"
            secondary="All targeting and reporting is strictly designed to be anonymous and privacy-preserving."
          />
        </ListItem>
      </List>
    </Box>
  );
}

const ItemText = (props: { primary: string; secondary: string }) => {
  return (
    <ListItemText
      primary={props.primary}
      secondary={props.secondary}
      primaryTypographyProps={{
        fontWeight: 600,
      }}
      secondaryTypographyProps={{
        color: "text.primary",
      }}
    />
  );
};
