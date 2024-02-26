import { Box, Stack } from "@mui/material";
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
    <Box alignSelf="center" width="50%">
      {!address?.street1 && (
        <FormikTextField
          required
          name="address.street1"
          label={_(msg`Street address`)}
          autoComplete="address-line1"
          margin="dense"
          size="small"
          fullWidth
        />
      )}

      {!address?.city && (
        <FormikTextField
          required
          name="address.city"
          label={_(msg`City`)}
          autoComplete="address-level2"
          margin="dense"
          size="small"
        />
      )}

      {!address?.country && (
        <StackedFields>
          <CountryPicker name="address.country" />

          <FormikTextField
            required
            name="address.zipcode"
            label={_(msg`Zip / Postal Code`)}
            autoComplete="postal-code"
            margin="dense"
            size="small"
          />
        </StackedFields>
      )}
    </Box>
  );
}

function StackedFields(props: PropsWithChildren) {
  return <Stack direction="column">{props.children}</Stack>;
}
