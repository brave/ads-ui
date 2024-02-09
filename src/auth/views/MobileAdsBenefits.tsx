import { Card, CardMedia, List, ListItem, Typography } from "@mui/material";

import allSizes from "../../../all_sizes_frame.svg";
import powerfulFormats from "../../../powerful_format_frame.svg";
import privacyFocused from "../../../privacy_focused_frame.svg";
import { msg } from "@lingui/macro";
import { MessageDescriptor } from "@lingui/core";
import { Trans } from "@lingui/react";

export function MobileAdsBenefits() {
  return (
    <List disablePadding>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary={msg`For all business sizes`}
          secondary={msg`Start a Brave Ads campaign with as little as $500.`}
          image={allSizes}
        />
      </ListItem>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary={msg`Powerful ad formats`}
          secondary={msg`Browser-based delivery offers a new way to reach audiences on the Web.`}
          image={powerfulFormats}
        />
      </ListItem>
      <ListItem alignItems="center" disableGutters>
        <ItemCard
          primary={msg`Unparalleled privacy`}
          secondary={msg`All targeting and reporting is strictly designed to be anonymous and privacy-preserving.`}
          image={privacyFocused}
        />
      </ListItem>
    </List>
  );
}

const ItemCard = (props: {
  primary: MessageDescriptor;
  secondary: MessageDescriptor;
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
        <Trans id={props.primary.id} />
      </Typography>
      <Typography
        fontWeight={300}
        textAlign="left"
        fontSize="14px"
        letterSpacing="0.02em"
      >
        <Trans id={props.secondary.id} />
      </Typography>
    </Card>
  );
};
