import {
  refetchAdvertiserCreativesQuery,
  useCreateNotificationCreativeMutation,
} from "graphql/creative.generated";
import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";
import {
  Box,
  Button,
  List,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField, useFormikContext } from "formik";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "user/views/adsManager/types";
import logo from "../../../brave_logo_icon.png";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { creativeInput } from "user/library";
import { useUser } from "auth/hooks/queries/useUser";
import { CreateNotificationCreativeInput } from "graphql/types";
import { BoxContainer } from "components/Box/BoxContainer";

export function NotificationAdForm() {
  const [, meta, newCreativeHelper] = useField<Creative>("newCreative");
  const [, creativesMeta, creativesHelper] = useField<string[]>("creatives");
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const creatives = useRecentlyCreatedAdvertiserCreatives();
  const [create, { loading }] = useCreateNotificationCreativeMutation({
    async onCompleted(data) {
      newCreativeHelper.setValue(initialCreative);
      newCreativeHelper.setTouched(false);
      creativesHelper.setValue([
        ...creativesMeta.value,
        data.createNotificationCreative.id,
      ]);
    },
    refetchQueries: [
      {
        ...refetchAdvertiserCreativesQuery({ advertiserId: advertiser.id }),
      },
    ],
  });

  return (
    <React.Fragment>
      <CardContainer header="New Ad">
        <FormikTextField name="newCreative.name" label="Ad Name" />

        <Stack direction="row" alignItems="center">
          <FormikTextField
            sx={{ mr: 0.5 }}
            name="newCreative.title"
            label="Ad Title"
            helperText="Max 30 Characters"
            maxLengthInstantFeedback={30}
          />

          <FormikTextField
            sx={{ ml: 0.5 }}
            name="newCreative.body"
            label="Ad Body"
            helperText="Max 60 Characters"
            maxLengthInstantFeedback={60}
          />
        </Stack>

        <Preview />

        <UrlResolver
          name="newCreative.targetUrl"
          validator="newCreative.targetUrlValidationResult"
          label="Ad Target URL"
          helperText="Example - https://brave.com/brave-rewards/"
        />

        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <LoadingButton
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={(e) => {
              e.preventDefault();
              const input = creativeInput(
                advertiser.id,
                meta.value,
                userId
              ) as CreateNotificationCreativeInput;
              create({ variables: { input } });
            }}
            disabled={
              !meta.value.body ||
              !meta.value.title ||
              !meta.value.name ||
              !meta.value.targetUrl ||
              !!meta.error ||
              loading
            }
            loading={loading}
          >
            Add
          </LoadingButton>
        </Stack>
      </CardContainer>
      {creatives.length > 0 && (
        <CardContainer header="Created Ads">
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            // todo: not a valid solution
            flexWrap="wrap"
          >
            {creatives.map((c) => (
              <BoxContainer header={c.name}>
                <Preview title={c.title} body={c.body} />
              </BoxContainer>
            ))}
          </Stack>
        </CardContainer>
      )}
    </React.Fragment>
  );
}

function Preview(props: { title?: string; body?: string }) {
  const [, meta] = useField<Creative>("newCreative");

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
              {props.title || meta.value.title || "Title Preview"}
            </Typography>
            <Typography variant="body2">
              {props.body || meta.value.body || "Body Preview"}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
