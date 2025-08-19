/* eslint-disable lingui/no-unlocalized-strings */
import {
  AppBar,
  Divider,
  Stack,
  Toolbar,
  Alert,
  IconButton,
  Link,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { Trans } from "@lingui/macro";

import { DraftMenu } from "@/components/Navigation/DraftMenu";
import ads from "@/assets/images/logo.svg";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { NewCampaignButton } from "@/components/Navigation/NewCampaignButton";
import { useHistory } from "react-router-dom";
import { NewCreativeButton } from "@/components/Navigation/NewCreativeButton";
import { AccountMenu } from "@/components/Navigation/AccountMenu";
import { useAuthContext } from "@/auth/context/auth.hook";

// Context for banner height
import { createContext, useContext } from "react";

interface BannerHeightContextType {
  bannerHeight: number;
  setBannerHeight: (height: number) => void;
}

const BannerHeightContext = createContext<BannerHeightContextType | undefined>(
  undefined,
);

export function useBannerHeight() {
  const context = useContext(BannerHeightContext);
  if (context === undefined) {
    throw new Error(
      "useBannerHeight must be used within a BannerHeightProvider",
    );
  }
  return context;
}

export function BannerHeightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bannerHeight, setBannerHeight] = useState(0);

  return (
    <BannerHeightContext.Provider value={{ bannerHeight, setBannerHeight }}>
      {children}
    </BannerHeightContext.Provider>
  );
}

export const NAVBAR_HEIGHT = 72;
const DISMISSED_MESSAGE_KEY = "brave_adv_message";

export function Navbar() {
  const { advertiser } = useAdvertiser();
  const history = useHistory();
  const [showBanner, setShowBanner] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { bannerHeight, setBannerHeight } = useBannerHeight();
  const { advertiserMessage } = useAuthContext();

  const buttons = [
    {
      route: "/user/main/campaign",
      component: <NewCampaignButton />,
    },
    {
      route: "/user/main/ads",
      component: <NewCreativeButton />,
    },
  ];

  // Check if banner should be shown based on local storage and message ID
  useEffect(() => {
    if (advertiserMessage) {
      const dismissedMessageId = localStorage.getItem(DISMISSED_MESSAGE_KEY);

      // Show banner if:
      // 1. No dismissed message stored, OR
      // 2. Current message ID is different from dismissed message ID
      if (!dismissedMessageId || dismissedMessageId !== advertiserMessage.id) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
  }, [advertiserMessage]);

  const handleDismissBanner = () => {
    if (advertiserMessage) {
      // Store the dismissed message ID in local storage
      localStorage.setItem(DISMISSED_MESSAGE_KEY, advertiserMessage.id);
      setShowBanner(false);
    }
  };

  // Measure banner height and update context
  useEffect(() => {
    if (showBanner && bannerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setBannerHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(bannerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      setBannerHeight(0);
    }
  }, [showBanner, setBannerHeight]);

  // Check if banner should be shown based on advertiserMessage and local storage
  const shouldShowBanner = showBanner && advertiserMessage;

  return (
    <>
      {shouldShowBanner && (
        <Alert
          ref={bannerRef}
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleDismissBanner}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 2,
            borderRadius: 0,
            padding: "0 12px",
            // Auto height - let content determine height
            height: "auto",
            minHeight: "48px", // Minimum height for consistency
          }}
        >
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {advertiserMessage.title}
            </div>
            <div>{advertiserMessage.message} </div>
            {advertiserMessage.actionUrl && (
              <>
                <Trans>Read more at</Trans>{" "}
                <Link
                  href={advertiserMessage.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "inherit",
                    textDecoration: "underline",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  {new URL(advertiserMessage.actionUrl).hostname}
                </Link>
              </>
            )}
          </div>
        </Alert>
      )}

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#ffffff",
          height: NAVBAR_HEIGHT,
          justifyContent: "center",
          boxShadow: "none",
          top: shouldShowBanner ? bannerHeight : 0,
          transition: "top 0.3s ease-in-out",
        }}
      >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <img src={ads} alt="Ads" height="31px" width="74px" />
            <Divider orientation="vertical" flexItem />
            {advertiser.selfServiceManageCampaign && <DraftMenu />}
          </Stack>
          <div style={{ flexGrow: 1 }} />
          {
            buttons.find((b) => history.location.pathname === b.route)
              ?.component
          }
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}
