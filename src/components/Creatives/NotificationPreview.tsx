import { Box, Paper, Stack, Typography } from "@mui/material";
import logo from "@/assets/images/brave_logo_icon.png";
import { useField, useFormikContext } from "formik";
import { CreativeInput } from "@/graphql-client/graphql";

export function NotificationPreview(props: {
  title?: string;
  body?: string;
  selected?: boolean;
}) {
  const { values } = useFormikContext<CreativeInput>();
  const [, meta, ,] = useField<CreativeInput>("newCreative");

  const value = values.payloadNotification ?? meta.value.payloadNotification;
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
          opacity: props.selected === false ? 0.5 : 1,
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="center">
          <img
            src={logo}
            style={{ height: "54px", width: "54px", marginTop: ".75rem" }}
          />
          <Stack direction="column" justifyContent="center">
            <Typography sx={{ fontWeight: 600 }} variant="body2">
              {props.title || value?.title || "Title Preview"}
            </Typography>
            <Typography variant="body2">
              {props.body || value?.body || "Body Preview"}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
