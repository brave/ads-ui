import Typography from "@mui/material/Typography";
import { Link, Stack } from "@mui/material";
import { FormikCheckbox } from "form/FormikHelpers";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function AdvertiserAgreed(props: { requiresPaymentAgree: boolean }) {
  const { _ } = useLingui();

  return (
    <>
      <Stack mb={2} spacing={0.5}>
        <Typography sx={{ fontWeight: 600 }}>
          <Trans>Reporting</Trans>
        </Typography>
        <Typography>
          <Trans>
            Brave’s products are made to uphold user privacy. By default, the
            Brave browser blocks third-party tracking (scripts, tags, pixels,
            etc.) including those used by Google Analytics. This means that most
            standard website reporting won’t be compatible with Brave Ads. To
            ensure advertisers have visibility into performance of campaigns,
            we’ve detailed other effective privacy-first options for measurement
            in our{" "}
            <Link href="https://brave.com/brave-ads/reporting/" target="_blank">
              reporting guide
            </Link>
          </Trans>
          .
        </Typography>
        <FormikCheckbox
          name="tracking"
          label={_(
            msg`I understand that Brave Ads will not be compatible with Google Analytics and similar solutions that rely on third-party trackers`,
          )}
        />
      </Stack>
      {props.requiresPaymentAgree && (
        <Stack mb={2} spacing={0.5}>
          <Typography sx={{ fontWeight: 600 }}>
            <Trans>Payment</Trans>
          </Typography>
          <Typography>
            <Trans>
              To launch a campaign with Brave, you are required to prepay the
              full amount you intend to spend. Any remaining funds from your
              budget will be credited back to your original payment method upon
              request.
            </Trans>
          </Typography>
          <FormikCheckbox
            name="payment"
            label={_(
              msg`I understand that pre-payment is required to launch my campaigns`,
            )}
          />
        </Stack>
      )}

      <Stack mb={2} spacing={0.5}>
        <Typography sx={{ fontWeight: 600 }}>
          <Trans>Terms & Conditions</Trans>
        </Typography>
        <Typography>
          <Trans>
            By continuing, you acknowledge and agree to our{" "}
            <Link href="https://brave.com/privacy/advertiser" target="_blank">
              Privacy Policy
            </Link>{" "}
            and platform{" "}
            <Link href="https://brave.com/brave-ads/terms/" target="_blank">
              Terms and Conditions
            </Link>
          </Trans>
          .
        </Typography>
        <FormikCheckbox name="terms" label={_(msg`I agree`)} />
      </Stack>
    </>
  );
}
