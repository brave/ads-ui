import { List, ListItemButton, Stack, Typography } from "@mui/material";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import { useIsEdit } from "form/FormikHelpers";
import { Billing } from "user/views/adsManager/types";
import { FormatHelp } from "components/Button/FormatHelp";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";

interface PriceProps {
  prices: AdvertiserPrice[];
}

export function FormatField({ prices }: PriceProps) {
  return (
    <CardContainer header="Format">
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body2">
          Choose a format for the campaign you would like to run
        </Typography>
        <FormatHelp />
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
        p: 2,
        borderRadius: "16px",
        border: "1px solid #7c91ff",
      }}
    >
      {_.startCase(_.lowerCase(props.format))}
    </ListItemButton>
  );
};
