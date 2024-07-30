import { Button, Stack, Typography } from "@mui/material";
import { ConversionFields } from "@/components/Conversion/ConversionFields";
import { useField } from "formik";
import { Conversion, initialConversion } from "../../../../../types";
import { CardContainer } from "@/components/Card/CardContainer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";
import { Trans } from "@lingui/macro";

interface Props {
  index: number;
}

export function ConversionField({ index }: Props) {
  const [, meta, form] = useField<Conversion | undefined>(
    `adSets.${index}.conversion`,
  );
  const hasConversion = !!meta.value;

  return (
    <CardContainer header={<Trans>Conversion</Trans>}>
      <Stack direction={hasConversion ? "row" : "column"} spacing={1}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <Trans>
            Enter a URL that indicates a desired action you want to measure,
            like a subscription or purchase confirmation page. Brave will count
            unique visits to that page as conversions if a user has seen or
            clicked your ad.
          </Trans>{" "}
          <LearnMoreButton helpSection="campaign-performance/reporting#conversion-reporting-in-brave-ads-manager" />
        </Typography>
        {!hasConversion && (
          <Button
            variant="contained"
            onClick={() => form.setValue(initialConversion)}
            sx={{
              maxWidth: 300,
              borderRadius: "10px",
            }}
            endIcon={<AddIcon />}
          >
            <Trans>Add Conversion tracking</Trans>
          </Button>
        )}
      </Stack>

      {hasConversion && (
        <ConversionFields name={`adSets.${index}.conversion`} />
      )}

      {hasConversion && (
        <Button
          variant="contained"
          onClick={() => form.setValue(undefined)}
          sx={{
            maxWidth: 300,
            borderRadius: "10px",
            mt: 1,
          }}
          endIcon={<RemoveIcon />}
        >
          <Trans>Remove Conversion tracking</Trans>
        </Button>
      )}
    </CardContainer>
  );
}
