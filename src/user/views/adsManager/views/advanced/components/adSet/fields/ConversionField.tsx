import { Button, Link, Stack, Typography } from "@mui/material";
import { ConversionFields } from "components/Conversion/ConversionFields";
import { FieldArray, FieldArrayRenderProps, useField } from "formik";
import { Conversion, initialConversion } from "../../../../../types";
import { CardContainer } from "components/Card/CardContainer";
import { Add } from "@mui/icons-material";

interface Props {
  index: number;
}

export function ConversionField({ index }: Props) {
  const [, meta] = useField<Conversion[]>(`adSets.${index}.conversions`);
  const conversions = meta.value ?? [];
  const hasConversions = conversions.length > 0;

  return (
    <CardContainer header="Conversion">
      <FieldArray name={`adSets.${index}.conversions`}>
        {(helper: FieldArrayRenderProps) => (
          <>
            <Stack direction={hasConversions ? "row" : "column"} spacing={1}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Define post-engagement analytics.
              </Typography>
              {!hasConversions && (
                <Button
                  variant="contained"
                  onClick={() => helper.push(initialConversion)}
                  sx={{
                    maxWidth: 300,
                    borderRadius: "16px",
                  }}
                  endIcon={<Add />}
                >
                  Add Conversion tracking
                </Button>
              )}
              {hasConversions && (
                <Link
                  underline="none"
                  variant="body2"
                  onClick={() => helper.remove(0)}
                  sx={{ cursor: "pointer" }}
                >
                  Remove Conversion Tracking -
                </Link>
              )}
            </Stack>

            {(meta.value ?? []).map((v, idx) => (
              <ConversionFields
                key={`conversion-${idx}`}
                name={`adSets.${index}.conversions.${idx}`}
              />
            ))}
          </>
        )}
      </FieldArray>
    </CardContainer>
  );
}
