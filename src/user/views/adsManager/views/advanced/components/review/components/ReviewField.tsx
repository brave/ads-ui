import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function DisplayError({ error }: { error: string | undefined }) {
  if (!error) return null;

  return (
    <Box color="error.main" display="flex" alignItems="center">
      <ErrorOutlineIcon sx={{ mx: 1 }} fontSize="small" />
      <Typography variant="body2">{error}</Typography>
    </Box>
  );
}

interface Props {
  caption: string;
  value: string;
  error?: string | undefined;
}

export function ReviewField({ caption, value, error }: Props) {
  const isError = !!error;

  return (
    <Box mb={2}>
      <Typography variant="body1" component="span" fontWeight={600}>
        {caption}
      </Typography>
      &nbsp;
      <Typography variant="body1" component="span">
        {value}
      </Typography>
      <DisplayError error={error} />
    </Box>
  );
}
