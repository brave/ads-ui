import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import { useIsEdit } from "form/FormikHelpers";
import { Billing } from "user/views/adsManager/types";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";
import ErrorIcon from "@mui/icons-material/Error";
import { CustomTooltip } from "components/Tooltip/CustomTooltip";
import { LearnMoreButton } from "components/Button/LearnMoreButton";
import { msg, Trans } from "@lingui/macro";
import { Trans as TransWithId } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";

interface PriceProps {
  prices: AdvertiserPrice[];
}

export function FormatField({ prices }: PriceProps) {
  const [, meta] = useField<CampaignFormat>("format");
  const path =
    meta.value === CampaignFormat.PushNotification ? "notification" : "news";

  return (
    <CardContainer header={<Trans>Format</Trans>}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body2">
          <Trans>Choose a format for the campaign you would like to run</Trans>
        <LearnMoreButton
          helpSection={`ad-placements/brave-browser/${path}`}
        />
        </Typography>
      </Stack>
      <List sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <FormatItemButton
          format={CampaignFormat.PushNotification}
          prices={prices}
          name={msg`Notification ads`}
        />
        <FormatItemButton
          format={CampaignFormat.NewsDisplayAd}
          prices={prices}
          name={msg`Newsfeed ads`}
        />
        <ProspectButton
          name="New tab takeovers"
          salesLink="https://contact.ads.brave.com/"
        />
        <ProspectButton
          name="Search keyword ads"
          salesLink="https://ads.brave.com/search"
        />
      </List>
    </CardContainer>
  );
}

const FormatItemButton = (
  props: { format: CampaignFormat; name: MessageDescriptor } & PriceProps,
) => {
  const { isEdit } = useIsEdit();
  const [, meta, format] = useField<CampaignFormat>("format");
  const [, , price] = useField<string>("price");
  const [, , billing] = useField<Billing>("billingType");
  const formatPrices = props.prices.filter((p) => p.format === props.format);

  return (
    <ListItemButton
      disabled={isEdit}
      selected={meta.value === props.format}
      onClick={async () => {
        await format.setValue(props.format);
        await price.setValue(formatPrices[0].billingModelPrice);
        await billing.setValue(formatPrices[0].billingType);
      }}
      sx={{
        width: "25%",
        p: 2,
        borderRadius: "16px",
        border: "1px solid #7c91ff",
      }}
    >
      <TransWithId id={props.name.id} />
    </ListItemButton>
  );
};

const ProspectButton = (props: { name: string; salesLink: string }) => {
  return (
    <ListItem
      sx={{
        width: "25%",
        borderRadius: "16px",
        border: "1px solid #CFCFCF",
        backgroundColor: "#EBEBEB",
      }}
    >
      <Typography color="text.secondary">{props.name}</Typography>
      <CustomTooltip
        arrow
        placement="top"
        title={
          <Stack p={1} spacing={1}>
            <Typography variant="caption">
              {props.name} are not available for self-managed campaigns. Please
              contact sales to inquire.
            </Typography>
            <Link
              underline="hover"
              onClick={() =>
                window.open(props.salesLink, "__blank", "noopener")
              }
              sx={{ alignSelf: "flex-end", cursor: "pointer" }}
            >
              Contact Sales →
            </Link>
          </Stack>
        }
      >
        <IconButton size="small" sx={{ ml: 1 }}>
          <ErrorIcon fontSize="small" />
        </IconButton>
      </CustomTooltip>
    </ListItem>
  );
};
