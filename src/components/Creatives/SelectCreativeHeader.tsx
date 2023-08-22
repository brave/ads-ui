import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Creative } from "user/views/adsManager/types";
import { useField } from "formik";
import { Status } from "components/Campaigns/Status";

export const SelectCreativeHeader = (props: {
  creative: Creative;
  fieldName: string;
  onSelectCreative: (c: Creative, selected: boolean) => void;
  showState?: boolean;
}) => {
  const [, meta] = useField<Creative[]>(props.fieldName);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(
      (meta.value ?? []).find((c) => c.id === props.creative.id) !== undefined,
    );
  }, [meta.value]);

  return (
    <Box display="flex" justifyContent="left" alignItems="center" gap="5px">
      <IconButton
        onClick={() => {
          const s = !selected;
          setSelected(s);
          props.onSelectCreative(props.creative, s);
        }}
        sx={{ p: 0 }}
      >
        {selected ? (
          <CheckBoxIcon color="primary" fontSize="small" />
        ) : (
          <CheckBoxOutlineBlankIcon fontSize="small" />
        )}
      </IconButton>
      {props.creative.name}
      <div style={{ flexGrow: 1 }} />
      {props.showState !== false && (
        <Status state={props.creative.state} opaque={selected} />
      )}
    </Box>
  );
};
