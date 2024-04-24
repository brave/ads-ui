import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { MouseEvent, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { msg, Trans } from "@lingui/macro";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { Link, Menu, MenuItem } from "@mui/material";
import { ItemBox } from "@/components/Drawer/components/ItemBox";

interface SupportProps {
  usePlainLink?: boolean;
}

export function SupportMenu({ usePlainLink }: SupportProps) {
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
          label={msg`Support`}
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
          color="text.primary"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <Trans>Support</Trans>
        </Link>
      )}
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            window.open("https://ads-help.brave.com/", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>Help Center</Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("https://brave.com/brave-ads", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>About Brave Ads</Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("mailto:selfserve@brave.com", "_self", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>Contact</Trans>:{" "}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <Link sx={{ ml: 1 }} underline="none">
            selfserve@brave.com
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
