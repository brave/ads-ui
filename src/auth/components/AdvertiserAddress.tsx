import { Box, Divider, Stack } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import { CountryPicker } from "components/Country/CountryPicker";
import { PropsWithChildren } from "react";
import { AdvertiserBillingAddressFragment } from "graphql/advertiser.generated";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface Props {
  address: AdvertiserBillingAddressFragment["billingAddress"];
}

export function AdvertiserAddress({ address }: Props) {
  const { _ } = useLingui();
  if (address?.street1 && address?.country && address?.city) {
    return null;
  }

  return (
    <Box flexGrow={1}>
      <Divider sx={{ mt: 1, mb: 1 }} />
      {!address?.street1 && (
        <StackedFields>
          <FormikTextField
            required
            name="address.street1"
            label={_(msg`Street address`)}
            autoComplete="address-line1"
            margin="dense"
          />

          <FormikTextField
            name="address.street2"
            label={_(msg`Street address line 2`)}
            autoComplete="address-line2"
            margin="dense"
          />
        </StackedFields>
      )}

      {!address?.city && (
        <StackedFields>
          <FormikTextField
            required
            name="address.city"
            label={_(msg`City`)}
            autoComplete="address-level2"
            margin="dense"
          />

          <FormikTextField
            required
            name="address.state"
            label={_(msg`State / Province`)}
            autoComplete="address-level1"
            margin="dense"
          />
        </StackedFields>
      )}

      {!address?.country && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0, md: 1 }}
        >
          <CountryPicker name="address.country" />

          <FormikTextField
            required
            name="address.zipcode"
            label={_(msg`Zip / Postal Code`)}
            autoComplete="postal-code"
            margin="dense"
            fullWidth
          />
        </Stack>
      )}
    </Box>
  );
}

function StackedFields(props: PropsWithChildren) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 0, md: 1 }}>
      {props.children}
    </Stack>
  );
}
