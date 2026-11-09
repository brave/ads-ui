import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { useCallback, useEffect } from "react";

interface TrackingProps {
  documentTitle: string;
  /**
   * Overrides the URL reported to Matomo, which defaults to
   * `window.location.href`. Use this on pages whose query params should not be
   * recorded in analytics.
   */
  href?: string;
}

export const useTrackWithMatomo = ({ documentTitle, href }: TrackingProps) => {
  useTrackMatomoPageView({ documentTitle, href });

  const { trackMatomoEvent } = useTrackMatomoEvent({ documentTitle, href });
  return { trackMatomoEvent };
};

export const useTrackMatomoPageView = ({
  documentTitle,
  href,
}: TrackingProps) => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ documentTitle, href });
  }, [documentTitle, href, trackPageView]);
};

export const useTrackMatomoEvent = ({
  documentTitle,
  href,
}: Partial<TrackingProps> = {}) => {
  const { trackEvent } = useMatomo();

  const trackMatomoEvent = useCallback(
    (category: string, action: string, name?: string) => {
      trackEvent({ documentTitle, href, category, action, name });
    },
    [documentTitle, href, trackEvent],
  );

  return { trackMatomoEvent };
};
