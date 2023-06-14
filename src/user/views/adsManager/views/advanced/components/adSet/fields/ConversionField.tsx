import { Divider, Link, Stack, Typography } from "@mui/material";
import { ConversionFields } from "components/Conversion/ConversionFields";
import React from "react";
import { FieldArray, useField } from "formik";
import { Conversion, initialConversion } from "../../../../../types";
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  index: number;
}

export function ConversionField({ index }: Props) {
  const [form, meta, helper] = useField<Conversion[]>(
    `adSets.${index}.conversions`
  );

  return (
    <CardContainer header="Conversion">
      <FieldArray name={`adSets.${index}.conversions`}>
        {({ remove, push }) => (
          <>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Define post-engagement analytics.
              </Typography>
              {meta.value.length === 0 && (
                <Link
                  underline="none"
                  variant="body2"
                  onClick={() => push(initialConversion)}
                  sx={{ cursor: "pointer" }}
                >
                  Add Conversion Tracking +
                </Link>
              )}
              {meta.value.length === 1 && (
                <Link
                  underline="none"
                  variant="body2"
                  onClick={() => remove(0)}
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
