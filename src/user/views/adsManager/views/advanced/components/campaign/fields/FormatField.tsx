import {
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import HelpIcon from "@mui/icons-material/Help";
import { useIsEdit } from "form/FormikHelpers";
import { Billing } from "user/views/adsManager/types";
import { AdvertiserPriceFragment } from "graphql/advertiser.generated";

interface PriceProps {
  prices: AdvertiserPriceFragment[];
}

export function FormatField({ prices }: PriceProps) {
  return (
    <CardContainer header="Format">
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body2">
          Choose a format for the campaign you would like to run
        </Typography>
        <IconButton
          size="small"
          onClick={() =>
            window.open(
              "https://brave.com/brave-ads/ad-formats/",
              "__blank",
              "noopener",
            )
          }
        >
          <HelpIcon fontSize="small" />
        </IconButton>
      </Stack>
      <List sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <FormatItemButton
          format={CampaignFormat.PushNotification}
          prices={prices}
        />
        <FormatItemButton
          format={CampaignFormat.NewsDisplayAd}
          prices={prices}
        />
      </List>
    </CardContainer>
  );
}

const FormatItemButton = (props: { format: CampaignFormat } & PriceProps) => {
  const { isEdit } = useIsEdit();
  const [, meta, format] = useField<CampaignFormat>("format");
  const [, , price] = useField<string>("price");
  const [, bMeta, billing] = useField<Billing>("billingType");

  return (
    <ListItemButton
      disabled={isEdit}
      selected={meta.value === props.format}
      onClick={() => {
        format.setValue(props.format);
        const found = props.prices.find((p) => {
          return (
            p.format === props.format &&
            p.billingType === bMeta.value.toUpperCase()
          );
        });
        console.log(found);
        if (props.format === CampaignFormat.NewsDisplayAd) {
          price.setValue(found?.billingModelPrice ?? "10");
          billing.setValue("cpm");
        } else {
          price.setValue(found?.billingModelPrice ?? "6");
        }
      }}
      sx={{
        p: 2,
        borderRadius: "16px",
        border: "1px solid #7c91ff",
      }}
    >
      {_.startCase(_.lowerCase(props.format))}
    </ListItemButton>
  );
};
