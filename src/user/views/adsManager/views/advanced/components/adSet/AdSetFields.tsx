import {FieldArray, FormikValues} from "formik";
import {Box, Card} from "@mui/material";
import React from "react";
import {DetailsField} from "./fields/DetailsField";
import {PickerFields} from "./fields/PickerFields";
import {ConversionField} from "./fields/ConversionField";
import {AdField} from "../ads/AdField";

interface Props {
  values: FormikValues;
}

export function AdSetFields({ values }: Props) {
  return (
    <FieldArray name="adSets">
      {({remove, push}) => (
        <>
          {values.adSets.map((ads, index) => (
            <>
              <Card sx={{mt: 2, p: 2}}>
                <Box>
                  <DetailsField index={index} />

                  <PickerFields index={index} />

                  <ConversionField index={index} />
                </Box>
              </Card>

              <AdField index={index} values={values} />
            </>
          ))}
        </>
      )}
    </FieldArray>
  )
}
