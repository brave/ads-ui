import Typography from "@mui/material/Typography";
import { Link, Stack } from "@mui/material";
import { FormikCheckbox } from "form/FormikHelpers";

export function AdvertiserAgreed(props: { requiresPaymentAgree: boolean }) {
  return (
    <>
      <Stack mb={2} spacing={0.5}>
        <Typography sx={{ fontWeight: 600 }}>Reporting</Typography>
        <Typography>
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
          .
        </Typography>
        <FormikCheckbox
          name="tracking"
          label="I understand that Brave Ads will not be compatible with Google Analytics and similar solutions that rely on third-party trackers"
        />
      </Stack>

      {props.requiresPaymentAgree && (
        <Stack mb={2} spacing={0.5}>
          <Typography sx={{ fontWeight: 600 }}>Payment</Typography>
          <Typography>
            To launch a campaign with Brave, you are required to prepay the full
            amount you intend to spend. Any remaining funds from your budget
            will be credited back to your original payment method upon request.
          </Typography>
          <FormikCheckbox
            name="payment"
            label="I understand that pre-payment is required to launch my campaigns"
          />
        </Stack>
      )}

      <Stack mb={2} spacing={0.5}>
        <Typography sx={{ fontWeight: 600 }}>Terms & Conditions</Typography>
        <Typography>
          By continuing, you acknowledge and agree to our{" "}
          <Link href="https://brave.com/privacy/advertiser" target="_blank">
            Privacy Policy
          </Link>{" "}
          and platform{" "}
          <Link href="https://brave.com/brave-ads/terms/" target="_blank">
            Terms and Conditions
          </Link>
          .
        </Typography>
        <FormikCheckbox name="terms" label="I agree" />
      </Stack>
    </>
  );
}
