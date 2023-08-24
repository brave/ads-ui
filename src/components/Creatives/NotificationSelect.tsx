import { Box, Button, Stack, Typography } from "@mui/material";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import moment from "moment";
import { SelectCreativeHeader } from "components/Creatives/SelectCreativeHeader";
import { Creative } from "user/views/adsManager/types";
import _ from "lodash";
import { useField } from "formik";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "state/context";

export function NotificationSelect(props: {
  options: Creative[];
  fieldName: string;
  useSelectedAdStyle?: boolean;
  multiselect?: boolean;
  showState?: boolean;
}) {
  const { setIsShowingAds } = useContext(FormContext);
  const [, meta, helper] = useField<Creative[]>(props.fieldName);
  const [curr, setCurr] = useState<Creative[]>([]);

  useEffect(() => {
    setCurr(meta.value);
  }, [meta.value]);

  const onSelectCreative = (
    c: Creative,
    v: Creative[] | undefined,
    selected: boolean,
  ) => {
    let value;
    if (selected) {
      value = [...(v ?? []), c];
    } else {
      value = _.filter(v ?? [], (n) => n.id !== c.id);
    }

    if (!props.multiselect) {
      helper.setValue(value);
    }

    setCurr(_.uniqBy([...curr, ...value], "id"));
  };

  const isSelected = (co: Creative, c: Creative[]) => {
    return (
      props.useSelectedAdStyle === false ||
      c.find((c) => c.id === co.id) !== undefined
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack
        direction="row"
        justifyContent={"left"}
        alignItems="center"
        flexWrap="wrap"
        maxHeight={420}
        sx={{ overflowY: props.options.length > 3 ? "scroll" : "hidden" }}
      >
        {props.options.map((co, idx) => (
          <BoxContainer
            header={
              <SelectCreativeHeader
                creative={co}
                fieldName={props.fieldName}
                onSelectCreative={(c, s) => onSelectCreative(c, meta.value, s)}
                showState={props.showState}
              />
            }
            key={idx}
          >
            <NotificationPreview
              title={co.payloadNotification?.title}
              body={co.payloadNotification?.body}
              selected={isSelected(co, curr)}
            />
            <Typography
              variant="caption"
              marginLeft={1}
              color={
                isSelected(co, curr) ? "text.primary" : "rgba(0, 0, 0, 0.3)"
              }
              textAlign="right"
            >
              created {moment(co.createdAt).fromNow()}
            </Typography>
          </BoxContainer>
        ))}
      </Stack>
      {props.multiselect && (
        <Button
          variant="outlined"
          sx={{ maxWidth: "200px", alignSelf: "end", marginTop: 2 }}
          onClick={(e) => {
            e.preventDefault();

            if (curr.length > 0) {
              helper.setValue(curr);
            }

            setIsShowingAds(false);
          }}
        >
          Complete selection
        </Button>
      )}
    </Box>
  );
}
