import { Box, Link, Stack } from "@mui/material";
import { FormikCheckbox } from "@/form/FormikHelpers";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";

export function AdvertiserAgreed(props: { requiresPaymentAgree: boolean }) {
  return (
    <Box alignSelf="center" mt={5}>
      <Stack spacing={0.5} direction="row" alignItems="center">
        <FormikCheckbox
          name="tracking"
          label="I understand that first-party analytics are necessary for independent reporting."
          showErrorMessage={false}
        />
        <LearnMoreButton
          variant="body2"
          helpSection="/campaign-performance/reporting/"
        />
      </Stack>
      {props.requiresPaymentAgree && (
        <Stack spacing={0.5} direction="row" alignItems="center">
          <FormikCheckbox
            name="payment"
            label="I understand that payment is required before ad campaigns can be launched."
            showErrorMessage={false}
          />
          <LearnMoreButton
            variant="body2"
            helpSection="/account-management/billing"
          />
        </Stack>
      )}

      <Stack spacing={0.5}>
        <FormikCheckbox
          name="language"
          label="I understand that I can only run ad campaigns in English, Spanish, and Portuguese."
          showErrorMessage={false}
        />
      </Stack>

      <Stack spacing={0.5}>
        <FormikCheckbox
          name="terms"
          showErrorMessage={false}
          label={
            <>
              I have reviewed and agree to the{" "}
              <Link
                href="https://brave.com/advertiser-privacy/"
                target="_blank"
              >
                Advertiser Privacy Policy
              </Link>{" "}
              and platform{" "}
              <Link
                href="https://basicattentiontoken.org/advertiser-terms-of-service/"
                target="_blank"
              >
                Terms of Service
              </Link>{" "}
              applicable to Brave Ads.
            </>
          }
        />
      </Stack>
    </Box>
  );
}
