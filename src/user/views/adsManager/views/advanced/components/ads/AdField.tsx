import { FieldArray, useField, useFormikContext } from "formik";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FormikTextField } from "../../../../../../../form/FormikHelpers";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  AdSetForm,
  CampaignForm,
  Conversion,
  Creative,
  initialCreative,
} from "../../../../types";
import { UrlResolver } from "../../../../../../../components/Url/UrlResolver";

interface Props {
  index: number;
  onNext: () => void;
  isEdit: boolean;
}

export function AdField({ index, onNext, isEdit }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  const canRemove = (
    edit: boolean,
    ads: AdSetForm[],
    adIdx: number,
    adSetIdx: number
  ) => {
    return (
      !edit ||
      (edit &&
        ads.some((set) => set.creatives.some((a) => a.id === undefined)) &&
        adIdx === ads[adSetIdx].creatives.length - 1)
    );
  };

  return (
    <FieldArray name={`adSets.${index}.creatives`}>
      {({ remove, push }) => (
        <>
          {values.adSets[index].creatives.map((ad, idx) => (
            <Card sx={{ mt: 2, p: 2 }}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Divider
                  textAlign="left"
                  sx={{ fontSize: "24px", mb: 1, mt: 1, flexGrow: 1 }}
                >
                  Ad {idx + 1}
                </Divider>
                {idx > 0 && canRemove(isEdit, values.adSets, idx, index) && (
                  <IconButton onClick={() => remove(idx)}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Define the look and feel of your ads.
                </Typography>
                {values.adSets[index].creatives.length - 1 === idx &&
                  values.adSets[index].creatives.length <= 10 && (
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

              <Ad adSetIdx={index} adIdx={idx} creative={ad} isEdit={isEdit} />

              {values.adSets[index].creatives.length - 1 === idx && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" onClick={onNext}>
                    Next
                  </Button>
                </Box>
              )}
            </Card>
          ))}
        </>
      )}
    </FieldArray>
  );
}

interface AdProps {
  adSetIdx: number;
  adIdx: number;
  creative: Creative;
  isEdit: boolean;
}

function Ad({ adSetIdx, adIdx, isEdit, creative }: AdProps) {
  return (
    <>
      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.name`}
        label="Ad Name"
        disabled={isEdit && !!creative.id}
      />

      <Stack direction="row" alignItems="center">
        <FormikTextField
          sx={{ mr: 0.5 }}
          name={`adSets.${adSetIdx}.creatives.${adIdx}.title`}
          label="Ad Title"
          helperText="Max 30 Characters"
          maxLengthInstantFeedback={30}
          disabled={isEdit && !!creative.id}
        />

        <FormikTextField
          sx={{ ml: 0.5 }}
          name={`adSets.${adSetIdx}.creatives.${adIdx}.body`}
          label="Ad Body"
          helperText="Max 60 Characters"
          maxLengthInstantFeedback={60}
          disabled={isEdit && !!creative.id}
        />
      </Stack>

      <Preview name={`adSets.${adSetIdx}.creatives.${adIdx}`} />

      <UrlResolver
        name={`adSets.${adSetIdx}.creatives.${adIdx}.targetUrl`}
        validator={`adSets.${adSetIdx}.creatives.${adIdx}.targetUrlValid`}
        label="Ad Target URL"
        disabled={isEdit && !!creative.id}
      />
    </>
  );
}

interface PreviewProp {
  name: string;
}

function Preview({ name }: PreviewProp) {
  const [, meta] = useField<Creative>(name);

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          height: "80px",
          width: "350px",
          borderRadius: "13px",
          border: "1px solid #e2e2e2",
          bgcolor: "rgba(248, 248, 248, 0.82)",
          display: "flex",
          justifyContent: "left",
          flexDirection: "row",
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="center">
          <img
            src="/brave_logo_icon.png"
            style={{ height: "54px", width: "54px", marginTop: ".75rem" }}
          />
          <Stack direction="column" justifyContent="center">
            <Typography sx={{ fontWeight: 600 }} variant="body2">
              {meta.value.title || "Title Preview"}
            </Typography>
            <Typography variant="body2">
              {meta.value.body || "Body Preview"}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
