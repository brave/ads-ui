import {FieldArray, FormikValues} from "formik";
import {Card, Divider, Typography} from "@mui/material";
import {FormikTextField} from "../../../../../../../form/FormikHelpers";
import React from "react";

interface Props {
  values: FormikValues;
  index: number;
}

export function AdField({ values, index }: Props) {
  return (
    <FieldArray name={`adSets.${index}.ads`}>
      {({remove, push}) => (
        <>
          {values.adSets[index].ads.map((ad, idx) => (
            <Card sx={{mt: 2, p: 2}}>
              <Ad ad={ad} idx={idx} />
            </Card>
          ))}
        </>
      )}
    </FieldArray>
  )
}

interface AdProps {
  ad: any;
  idx: number;
}

function Ad({ ad, idx }: AdProps) {
  return (
    <>
      <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 1}}>
        Creative
      </Divider>
      <Typography variant="body2" sx={{mb: 2}}>
        Define the look and feel of your ads
      </Typography>
      <FormikTextField
        name="test"
        label="Creative Name"
      />

      <FormikTextField
        name="test"
        label="Creative Title"
        helperText="Max 30 Characters"
      />

      <FormikTextField
        name="test"
        label="Creative Body"
        helperText="Max 60 Characters"
      />

      <FormikTextField
        name="test"
        label="Creative Target URL"
      />
    </>
  )
}
