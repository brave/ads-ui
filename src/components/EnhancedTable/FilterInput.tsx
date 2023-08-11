import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import _ from "lodash";

interface Props {
  filter: string;
  setFilter: (newValue: string) => void;
}

export const FilterInput = (props: Props) => {
  // to retain responsiveness of the form, whilst still not constantly re-filtering the list,
  // we keep our own state here that updates immediately, and debounce the updates to
  // the caller
  const [filterField, setFilterField] = useState(props.filter);

  // HT: https://dmitripavlutin.com/react-throttle-debounce/
  const debouncedChangeHandler = useMemo(
    () => _.debounce(props.setFilter, 300),
    [props.setFilter],
  );

  const onChangeHandler = (value: string) => {
    setFilterField(value);
    debouncedChangeHandler(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        label="Type to filter..."
        variant="standard"
        value={filterField}
        onChange={(e) => onChangeHandler(e.target.value)}
        spellCheck={false}
        autoFocus
        fullWidth
      />
    </Box>
  );
};
