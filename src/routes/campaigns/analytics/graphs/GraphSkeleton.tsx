import { Skeleton } from "@mui/material";

export const GraphSkeleton = () => (
  <Skeleton
    variant="rectangular"
    animation="pulse"
    height="100%"
    sx={{ maxHeight: "625px" }}
  />
);
