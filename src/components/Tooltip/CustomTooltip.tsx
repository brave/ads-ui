import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#e9e8fd",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    border: "1px solid #7c91ff",
    mb: 2,
    borderRadius: "16px",
  },
}));
