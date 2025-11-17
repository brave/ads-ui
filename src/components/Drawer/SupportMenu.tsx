import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { MouseEvent, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { Link, Menu, MenuItem } from "@mui/material";
import { ItemBox } from "@/components/Drawer/components/ItemBox";

interface SupportProps {
  usePlainLink?: boolean;
  linkColor?: string;
}

export function SupportMenu({ usePlainLink, linkColor }: SupportProps) {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useIsMobile();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    trackMatomoEvent("support-menu", "click");
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {!usePlainLink && (
        <ItemBox
          label={"Support"}
          href="#"
          icon={
            <HeadsetMicOutlinedIcon
              fontSize="large"
              sx={{ color: "text.secondary" }}
            />
          }
          onClick={handleClick}
        />
      )}
      {usePlainLink && (
        <Link
          variant={isMobile ? "body2" : "subtitle1"}
          underline="none"
          color={linkColor || "text.primary"}
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          Support
        </Link>
      )}
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            window.open("https://ads-help.brave.com/", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          Help Center
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("https://brave.com/brave-ads", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          About Brave Ads
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("mailto:selfserve@brave.com", "_self", "noopener");
            setAnchorEl(null);
          }}
        >
          Contact:{" "}
          <Link sx={{ ml: 1 }} underline="none">
            selfserve@brave.com
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
