import { Box, Tooltip } from "@mui/material";
import _ from "lodash";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { CellValue } from "./EnhancedTable";
import React, { ReactChild, ReactNode } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import {
  CampaignSummaryFragment,
  LoadCampaignAdsDocument,
  useUpdateCampaignMutation,
} from "graphql/campaign.generated";
import { AdvertiserCampaignsDocument } from "graphql/advertiser.generated";
import {
  AdSetFragment,
  useUpdateAdMutation,
  useUpdateAdSetMutation,
} from "graphql/ad-set.generated";
import { OnOff } from "../Switch/OnOff";
import { CampaignSource } from "graphql/types";
import { AdDetails } from "user/ads/AdList";
import { displayFromCampaignState } from "util/displayState";
import { AdSetDetails } from "user/adSet/AdSetList";

export type CellValueRenderer = (value: CellValue) => React.ReactNode;
const ADS_DEFAULT_TIMEZONE = "America/New_York";
const TOOLTIP_FORMAT = "E d LLL yyyy HH:mm:ss zzz";

function formatDateForTooltip(dt: Date): ReactChild {
  return (
    <>
      <Box>
        {formatInTimeZone(dt, ADS_DEFAULT_TIMEZONE, TOOLTIP_FORMAT, {
          locale: enUS,
        })}
      </Box>
      <Box>
        {formatInTimeZone(dt, "Etc/UTC", TOOLTIP_FORMAT, {
          locale: enUS,
        })}
      </Box>
      <Box mt={1}>
        In your local time this is
        <br />
        {format(dt, TOOLTIP_FORMAT, { locale: enUS })}
      </Box>
    </>
  );
}

export const StandardRenderers: Record<string, CellValueRenderer> = {
  string: (v) => <Box>{v}</Box>,
  relativeDate: (v) => {
    if (_.isString(v)) {
      const d = parseISO(v);
      return (
        <Tooltip title={formatDateForTooltip(d)}>
          <Box whiteSpace="nowrap">
            {formatDistanceToNow(d, { addSuffix: true })}
          </Box>
        </Tooltip>
      );
    }

    return null;
  },
  date: (v) => {
    if (_.isString(v)) {
      const d = parseISO(v);
      return (
        <Tooltip title={formatDateForTooltip(d)}>
          <Box whiteSpace="nowrap">
            {formatInTimeZone(d, ADS_DEFAULT_TIMEZONE, "PP")}
          </Box>
        </Tooltip>
      );
    }

    return null;
  },
  yesno: (v) => <Box>{v ? "Yes" : "No"}</Box>,
};

export function renderMonetaryAmount(
  value: number,
  currency: string
): ReactNode {
  if (currency === "USD") {
    return `$${value.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else {
    return <span>{value.toLocaleString("en")}&nbsp;BAT</span>;
  }
}

export function campaignOnOffState(
  c: CampaignSummaryFragment & { fromDate: Date | null; advertiserId: string }
): ReactNode {
  const [updateCampaign, { loading }] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: {
          id: c.advertiserId,
          filter: { from: c.fromDate },
        },
      },
    ],
  });

  return (
    <OnOff
      onChange={(s) => {
        updateCampaign({
          variables: { input: { id: c.id, state: s } },
        });
      }}
      loading={loading}
      state={c.state}
      end={c.endAt}
      source={c.source}
      type="Campaign"
    />
  );
}

export function adSetOnOffState(c: AdSetDetails): ReactNode {
  const [updateAdSet, { loading }] = useUpdateAdSetMutation({
    refetchQueries: [
      {
        query: LoadCampaignAdsDocument,
        variables: { id: c.campaignId },
      },
    ],
  });

  const state = displayFromCampaignState(c);

  return (
    <OnOff
      onChange={(s) => {
        {
          updateAdSet({
            variables: {
              updateAdSetInput: {
                state: s,
                id: c.id,
                campaignId: c.campaignId,
                segments: c.segments?.map((s) => ({
                  code: s.code,
                  name: s.name,
                })),
              },
            },
          });
        }
      }}
      loading={loading}
      state={state}
      end={c.campaignEnd}
      source={c.campaignSource}
      type="Ad Set"
    />
  );
}

export function adOnOffState(c: AdDetails): ReactNode {
  const [updateAd, { loading }] = useUpdateAdMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: c.campaignId },
      },
    ],
  });

  return (
    <OnOff
      onChange={(s) => {
        {
          updateAd({
            variables: {
              updateAdInput: {
                id: c.id,
                state: s,
              },
            },
          });
        }
      }}
      loading={loading}
      state={c.state}
      end={c.campaignEnd}
      source={c.campaignSource}
      type="Ad"
    />
  );
}
