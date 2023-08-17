import { useField } from "formik";
import { Box, Paper, Stack, Typography } from "@mui/material";
import logo from "../../../brave_logo_icon.png";
import { Creative } from "user/views/adsManager/types";

export function NotificationPreview(props: { title?: string; body?: string }) {
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
              {props.title || meta.value?.title || "Title Preview"}
            </Typography>
            <Typography variant="body2">
              {props.body || meta.value?.body || "Body Preview"}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
