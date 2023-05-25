import { FieldArray, useField, useFormikContext } from "formik";
import {
  Box,
  Card,
  IconButton,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  AdSetForm,
  CampaignForm,
  Creative,
  initialCreative,
} from "../../../../types";
import { UrlResolver } from "components/Url/UrlResolver";
import logo from "../../../../../../../../brave_logo_icon.png";
import { Status } from "components/Campaigns/Status";

interface Props {
  index: number;
  isEdit: boolean;
}

export function AdField({ index, isEdit }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  const [selected, setSelected] = useState(0);

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
        <Card sx={{ mt: 2, p: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={selected}
              onChange={(e, nv) => setSelected(nv)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {values.adSets[index].creatives.map((ad, idx) => (
                <Tab value={idx} label={`Ad ${idx + 1}`} />
              ))}
            </Tabs>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Define the look and feel of your ads.
              </Typography>
              {values.adSets[index].creatives.length <= 9 && (
                <Link
                  underline="none"
                  variant="body2"
                  onClick={() => {
                    push(initialCreative);
                    setSelected(selected + 1);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  Create new Ad +
                </Link>
              )}
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center">
              <Status
                state={values.adSets[index].creatives[selected].state ?? "New"}
              />
              {selected > 0 &&
                canRemove(isEdit, values.adSets, selected, index) && (
                  <Tooltip title="Remove Ad">
                    <IconButton
                      onClick={() => {
                        remove(selected);
                        setSelected(selected - 1);
                      }}
                    >
                      <RemoveCircleOutlineIcon
                        fontSize="medium"
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                )}
            </Box>
          </Stack>

          <Ad
            adSetIdx={index}
            adIdx={selected}
            creative={values.adSets[index].creatives[selected]}
          />
        </Card>
      )}
    </FieldArray>
  );
}

interface AdProps {
  adSetIdx: number;
  adIdx: number;
  creative: Creative;
}

function Ad({ adSetIdx, adIdx, creative }: AdProps) {
  const cannotEdit = creative.state === "active" || creative.state === "paused";
  return (
    <>
      <FormikTextField
        name={`adSets.${adSetIdx}.creatives.${adIdx}.name`}
        label="Ad Name"
        disabled={cannotEdit}
      />

      <Stack direction="row" alignItems="center">
        <FormikTextField
          sx={{ mr: 0.5 }}
          name={`adSets.${adSetIdx}.creatives.${adIdx}.title`}
          label="Ad Title"
          helperText="Max 30 Characters"
          maxLengthInstantFeedback={30}
          disabled={cannotEdit}
        />

        <FormikTextField
          sx={{ ml: 0.5 }}
          name={`adSets.${adSetIdx}.creatives.${adIdx}.body`}
          label="Ad Body"
          helperText="Max 60 Characters"
          maxLengthInstantFeedback={60}
          disabled={cannotEdit}
        />
      </Stack>

      <Preview name={`adSets.${adSetIdx}.creatives.${adIdx}`} />

      <UrlResolver
        name={`adSets.${adSetIdx}.creatives.${adIdx}.targetUrl`}
        validator={`adSets.${adSetIdx}.creatives.${adIdx}.targetUrlValid`}
        label="Ad Target URL"
        disabled={cannotEdit}
        helperText={"Example - https://brave.com/brave-rewards/"}
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
            src={logo}
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
