import { Box, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Creative } from "user/views/adsManager/types";
import { Status } from "components/Campaigns/Status";
import { useEffect, useState } from "react";

export const SelectCreativeHeader = (props: {
  creative: Creative;
  onSelectCreative: (c: Creative, selected: boolean) => void;
  showState?: boolean;
}) => {
  const [selected, setSelected] = useState<boolean>();
  useEffect(() => {
    setSelected(props.creative.included);
  }, [props.creative]);

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
