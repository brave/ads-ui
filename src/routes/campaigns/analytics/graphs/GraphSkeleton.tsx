import { Skeleton } from "@mui/material";

export const GraphSkeleton = () => (
  <Skeleton
    variant="rounded"
    animation="wave"
    height="100%"
    width="100%"
    sx={{ maxHeight: "625px" }}
  />
);
