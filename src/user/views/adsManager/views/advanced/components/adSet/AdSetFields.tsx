import {FieldArray, FormikValues} from "formik";
import {Box, Button, Card, Divider, IconButton} from "@mui/material";
import React from "react";
import {DetailsField} from "./fields/DetailsField";
import {PickerFields} from "./fields/PickerFields";
import {ConversionField} from "./fields/ConversionField";
import {AdField} from "../ads/AdField";
import ClearIcon from "@mui/icons-material/Clear";

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
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, flexGrow: 1}}>
                      Ad Set { index + 1 } Details
                    </Divider>
                    {index > 0 && (
                      <IconButton onClick={() => remove(index)}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Box>

                  <DetailsField index={index} />

                  <PickerFields index={index} />

                  <ConversionField index={index} />
                </Box>

                <AdField index={index} values={values} />

                <Button
                  variant="contained"
                  size="large"
                  sx={{mt: 2}}
                  onClick={() => push({
                    name: "",
                    billingType: "",
                    segments: [{
                      code: "Svp7l-zGN",
                      name: "untargeted"
                    }],
                    oses: [],
                    conversions: [{
                      type: "",
                      observationWindow: "",
                    }],
                    ads: [{
                      state: "under_review",
                      creativeId: "",
                    }]
                  })}
                >
                  Add New Ad Set
                </Button>
              </Card>
            </>
          ))}
        </>
      )}
    </FieldArray>
  )
}
