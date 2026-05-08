import { Status } from "@/components/Campaigns/Status";
import { Creative } from "@/user/views/adsManager/types";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export const SelectCreativeHeader = (props: {
  creative: Creative;
  selected: boolean;
  onSelectCreative: (c: Creative, selected: boolean) => void;
  showState?: boolean;
}) => {
  const [selected, setSelected] = useState(props.selected);

  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="center"
      gap="5px"
      mb={0.4}
    >
      <IconButton
        onClick={() => {
          const next = !selected;
          setSelected(next);
          props.onSelectCreative(props.creative, next);
        }}
        sx={{ p: 0 }}
      >
        {selected ? (
          <CheckBoxIcon color="primary" fontSize="small" />
        ) : (
          <CheckBoxOutlineBlankIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="subtitle2">{props.creative.name}</Typography>
      <div style={{ flexGrow: 1 }} />
      {props.showState !== false && (
        <Status state={props.creative.state} opaque={selected} />
      )}
    </Box>
  );
};
