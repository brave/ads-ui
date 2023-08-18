import { LinearProgress, Stack, Typography } from "@mui/material";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import moment from "moment";
import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";
import { CreativeFragment } from "graphql/creative.generated";
import { SelectCreativeHeader } from "components/Creatives/SelectCreativeHeader";

export function NotificationSelect(props: {
  options: CreativeFragment[];
  fieldName: string;
  loading?: boolean;
}) {
  const [, meta] = useField<Creative[]>(props.fieldName);
  const mapped = meta.value.map((m) => m.id);
  const sorted = props.options.sort((a, b) => {
    if (mapped.includes(a.id) && !mapped.includes(b.id)) return -1;
    if (!mapped.includes(a.id) && mapped.includes(b.id)) return 1;

    return a.createdAt - b.createdAt;
  });

  if (props.loading) {
    return <LinearProgress />;
  }

  return (
    <Stack
      direction="row"
      justifyContent={"left"}
      alignItems="center"
      flexWrap="wrap"
      maxHeight={420}
      sx={{ overflowY: props.options.length > 3 ? "scroll" : "hidden" }}
    >
      {sorted.map((co, idx) => (
        <BoxContainer
          header={
            <SelectCreativeHeader creative={co} fieldName={props.fieldName} />
          }
          key={idx}
        >
          <NotificationPreview
            title={co.payloadNotification?.title}
            body={co.payloadNotification?.body}
          />
          <Typography
            variant="caption"
            marginLeft={1}
            color="GrayText"
            textAlign="right"
          >
            created {moment(co.createdAt).fromNow()}
          </Typography>
        </BoxContainer>
      ))}
    </Stack>
  );
}
