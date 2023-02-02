import * as React from 'react';
import { Select, SelectChangeEvent, Theme, useTheme, FormControl, MenuItem, OutlinedInput, InputLabel } from '@mui/material';
import {useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  initialValues: string[];
  options: string[];
}

export default function MultiSelect({ options, initialValues }: Props) {
  const [selectValue, setSelectValue] = useState<string[]>(initialValues);

  const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
    const {
      target: { value },
    } = event;
    setSelectValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Name</InputLabel>
      <Select
        multiple
        value={selectValue}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {options.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
