import {FieldArray, FormikValues} from "formik";
import {Box, Button, Card, Divider, IconButton, Typography} from "@mui/material";
import {FormikTextField} from "../../../../../../../form/FormikHelpers";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  values: FormikValues;
  index: number;
}

export function AdField({values, index}: Props) {
  return (
    <FieldArray name={`adSets.${index}.ads`}>
      {({remove, push}) => (
        <>
          {values.adSets[index].ads.map((ad, idx) => (
            <Card sx={{mt: 2, p: 2}}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 1, flexGrow: 1}}>
                  Ad {idx + 1}
                </Divider>
                {idx > 0 && (
                  <IconButton onClick={() => remove(idx)}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>

              <Ad ad={ad} idx={idx}/>

              {values.adSets[index].ads.length - 1 === idx && (
                <Button
                  variant="contained"
                  size="large"
                  sx={{mt: 2}}
                  onClick={() => push({
                    state: "under_review",
                    creativeId: "",
                  })}
                >
                  Add New Ad
                </Button>
              )}
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

function Ad({ad, idx}: AdProps) {
  return (
    <>
      <Typography variant="body2" sx={{mb: 2}}>
        Define the look and feel of your ads.
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
