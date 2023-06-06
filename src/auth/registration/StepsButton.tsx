import { Button, Stack } from "@mui/material";
import React from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
  showBack: boolean;
  showNext: boolean;
}

export function StepsButton({ onBack, onNext, showNext, showBack }: Props) {
  return (
    <Stack direction="row" spacing={1} mt={2} justifyContent="left">
      {showBack && (
        <Button
          size="large"
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          Back
        </Button>
      )}
      {showNext && (
        <Button
          size="large"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          Next
        </Button>
      )}
    </Stack>
  );
}
