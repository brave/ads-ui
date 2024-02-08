import { List, ListItemButton, Stack, Typography } from "@mui/material";
import { renderMonetaryAmount } from "components/Datagrid/renderers";
import { useIsEdit } from "form/FormikHelpers";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";
import { Billing } from "user/views/adsManager/types";
import { uiLabelsForCampaignFormat } from "util/campaign";
import { uiLabelsForBillingType } from "util/billingType";
import { LearnMoreButton } from "components/Button/LearnMoreButton";
import { Trans } from "@lingui/macro";

export function BillingModelSelect(props: { prices: AdvertiserPrice[] }) {
  const { isEdit } = useIsEdit();
  const [, , price] = useField<string>("price");
  const [, format] = useField<CampaignFormat>("format");
  const [, bMeta, billing] = useField<Billing>("billingType");
  const campaignFormat = uiLabelsForCampaignFormat(format.value);

  return (
    <Stack maxWidth={500}>
      <Typography variant="body2">
        <Trans>{campaignFormat} pricing configuration option(s)</Trans>
        <LearnMoreButton helpSection="account-management/billing" />
      </Typography>
      <List sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {props.prices
          .filter((p) => p.format === format.value)
          .map((p) => (
            <ListItemButton
              key={`billing_model_${p.format}_${p.billingType}`}
              disabled={isEdit}
              selected={bMeta.value === p.billingType}
              onClick={async () => {
                await price.setValue(p.billingModelPrice, true);
                await billing.setValue(p.billingType, true);
              }}
              sx={{
                p: 2,
                borderRadius: "16px",
                border: "1px solid #7c91ff",
              }}
            >
              {`${renderMonetaryAmount(Number(p.billingModelPrice), "USD")} ${
                uiLabelsForBillingType(p.billingType).longLabel
              }`}
            </ListItemButton>
          ))}
      </List>
    </Stack>
  );
}
