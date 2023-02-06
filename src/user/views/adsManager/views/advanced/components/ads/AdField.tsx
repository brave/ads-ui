import {FieldArray, FormikValues, useFormikContext} from "formik";
import {Box, Button, Card, Divider, IconButton, Link, Typography} from "@mui/material";
import {FormikTextField} from "../../../../../../../form/FormikHelpers";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {CampaignForm, initialCreative} from "../../../../types";

interface Props {
  index: number;
  onBack: () => void;
}

export function AdField({ index, onBack }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  return (
    <FieldArray name={`adSets.${index}.creatives`}>
      {({remove, push}) => (
        <>
          {values.adSets[index].creatives.map((ad, idx) => (
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

              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="body2" sx={{mr: 1}}>
                  Define the look and feel of your ads.
                </Typography>
                {values.adSets[index].creatives.length - 1 === idx && (
                  <Link
                    underline="none"
                    variant="body2"
                    onClick={() => push(initialCreative)}
                    sx={{ cursor: "pointer" }}
                  >
                    Create new Ad +
                  </Link>
                )}
              </Box>

              <Ad ad={ad} idx={idx}/>

              {values.adSets[index].creatives.length - 1 === idx && (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={onBack}
                >
                  Back
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
