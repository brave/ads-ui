import { Box, ListItemButton, List, Typography, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import { CreativeInput } from "graphql/types";
import { FormatHelp } from "components/Button/FormatHelp";
import { msg, Trans } from "@lingui/macro";
import { Trans as TransWithId } from "@lingui/react";

export function CreativeType(props: { allowTypeChange?: boolean }) {
  const formik = useFormikContext<CreativeInput>();

  const supportedTypes = [
    {
      value: "notification_all_v1",
      label: msg`Notification ads`,
    },
    {
      value: "inline_content_all_v1",
      label: msg`Newsfeed ads`,
    },
  ];

  return (
    <Box maxWidth={500} display="flex" flexDirection="column" mt={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>
          <Trans>Ad Format</Trans>
        </Typography>
        <FormatHelp />
      </Stack>
      <List sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {supportedTypes.map((s) => (
          <ListItemButton
            selected={formik.values.type.code === s.value}
            disabled={
              formik.values.type.code === s.value ||
              props.allowTypeChange === false
            }
            key={s.value}
            sx={{
              borderRadius: "16px",
              justifyContent: "center",
              border: "1px solid #e2e2e2",
            }}
            onClick={() => formik.setFieldValue("type.code", s.value)}
          >
            <TransWithId id={s.label.id} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
