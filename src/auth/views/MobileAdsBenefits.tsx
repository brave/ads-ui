import { Card, CardMedia, List, ListItem, Typography } from "@mui/material";

import allSizes from "../../../all_sizes_frame.svg";
import powerfulFormats from "../../../powerful_format_frame.svg";
import privacyFocused from "../../../privacy_focused_frame.svg";

export function MobileAdsBenefits() {
  return (
    <List disablePadding>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary="For all business sizes"
          secondary="Start a Brave Ads campaign with as little as $100."
          image={allSizes}
        />
      </ListItem>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary="Powerful Ad Formats"
          secondary="Browser-based delivery offers a new way to reach audiences on the Web."
          image={powerfulFormats}
        />
      </ListItem>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary="Unparalleled privacy"
          secondary="All targeting and reporting is strictly designed to be anonymous and privacy-preserving."
          image={privacyFocused}
        />
      </ListItem>
    </List>
  );
}

const ItemCard = (props: {
  primary: string;
  secondary: string;
  image: string;
}) => {
  return (
    <Card sx={{ padding: "4px", borderRadius: "12px", width: "100%" }}>
      <CardMedia
        component="img"
        height="150px"
        sx={{ borderRadius: "12px" }}
        image={props.image}
      />
      <Typography
        fontWeight={500}
        textAlign="left"
        fontSize="22px"
        letterSpacing="0em"
      >
        {props.primary}
      </Typography>
      <Typography
        fontWeight={300}
        textAlign="left"
        fontSize="14px"
        letterSpacing="0.02em"
      >
        {props.secondary}
      </Typography>
    </Card>
  );
};
