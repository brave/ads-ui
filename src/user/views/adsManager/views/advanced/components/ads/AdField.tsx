import {FieldArray, useFormikContext} from "formik";
import {Box, Button, Card, Divider, IconButton, Link, Typography} from "@mui/material";
import {FormikTextField} from "../../../../../../../form/FormikHelpers";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {AdSetForm, CampaignForm, Creative, initialCreative} from "../../../../types";

interface Props {
  index: number;
  onNext: () => void;
  isEdit: boolean;
}

export function AdField({ index, onNext, isEdit }: Props) {
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
                {values.adSets[index].creatives.length - 1 === idx && !isEdit && (
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

              <Ad
                adSetIdx={index}
                adIdx={idx}
                creative={ad}
                isEdit={isEdit}
              />

              {values.adSets[index].creatives.length - 1 === idx && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onNext}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Card>
          ))}
        </>
      )}
    </FieldArray>
  )
}

interface AdProps {
  adSetIdx: number;
  adIdx: number;
  creative: Creative;
  isEdit: boolean;
}

function Ad({adSetIdx, adIdx, isEdit, creative}: AdProps) {
  return (
    <>
      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.name`}
        label="Creative Name"
        disabled={isEdit && !!creative.id}
      />

      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.title`}
        label="Creative Title"
        helperText="Max 30 Characters"
        disabled={isEdit && !!creative.id}
      />

      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.body`}
        label="Creative Body"
        helperText="Max 60 Characters"
        disabled={isEdit && !!creative.id}
      />

      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.targetUrl`}
        label="Creative Target URL"
        disabled={isEdit && !!creative.id}
      />
    </>
  )
}
