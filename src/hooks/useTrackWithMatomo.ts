import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { useCallback, useEffect } from "react";

interface TrackingProps {
  documentTitle: string;
}

export const useTrackWithMatomo = ({ documentTitle }: TrackingProps) => {
  useTrackMatomoPageView({ documentTitle });

  const { trackMatomoEvent } = useTrackMatomoEvent({ documentTitle });
  return { trackMatomoEvent };
};

export const useTrackMatomoPageView = ({ documentTitle }: TrackingProps) => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ documentTitle });
  }, [documentTitle]);
};

export const useTrackMatomoEvent = ({
  documentTitle,
}: Partial<TrackingProps> = {}) => {
  const { trackEvent } = useMatomo();

  const trackMatomoEvent = useCallback(
    (category: string, action: string, name?: string) => {
      trackEvent({ documentTitle, category, action, name });
    },
    [documentTitle],
  );

  return { trackMatomoEvent };
};
