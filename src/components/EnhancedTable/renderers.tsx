import { Box, Tooltip } from "@mui/material";
import _ from "lodash";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { CellValue } from "./EnhancedTable";
import React, { ReactChild, ReactNode } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { populateFilter } from "user/library";
import {
  CampaignFragment,
  CampaignSummaryFragment,
  useUpdateCampaignMutation,
} from "graphql/campaign.generated";
import { AdvertiserCampaignsDocument } from "graphql/advertiser.generated";
import {
  AdSetFragment,
  useUpdateAdMutation,
  useUpdateAdSetMutation,
} from "graphql/ad-set.generated";
import { OnOff } from "../Switch/OnOff";
import { CreativeFragment } from "graphql/creative.generated";
import { CampaignSource } from "graphql/types";

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
          filter: populateFilter(c.fromDate),
        },
      },
    ],
  });

  if (c.source !== CampaignSource.SelfServe) return null;

  return (
    <OnOff
      onChange={(s) => {
        updateCampaign({
          variables: { input: { id: c.id, state: c.state } },
        });
      }}
      loading={loading}
      state={c.state}
      end={c.endAt}
      type="Campaign"
    />
  );
}

export function adSetOnOffState(
  c: AdSetFragment & {
    campaignEnd: string;
    campaignId: string;
    campaignState: string;
    campaignSource: CampaignSource;
    advertiserId: string;
    fromDate: Date | null;
  }
): ReactNode {
  const [updateAdSet, { loading }] = useUpdateAdSetMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: c.advertiserId, filter: populateFilter(c.fromDate) },
      },
    ],
  });

  if (c.campaignSource !== CampaignSource.SelfServe) return null;

  const state =
    c.campaignState === "under_review"
      ? "under_review"
      : c.state === "suspended"
      ? "paused"
      : c.state;

  return (
    <OnOff
      onChange={(s) => {
        {
          updateAdSet({
            variables: {
              updateAdSetInput: {
                state: s === "paused" ? "suspended" : s,
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
      type="Ad Set"
    />
  );
}

export function adOnOffState(
  c: CreativeFragment & {
    creativeSetId: string;
    campaignEnd: string;
    creativeInstanceId: string;
    campaignSource: CampaignSource;
    advertiserId: string;
    fromDate: Date | null;
  }
): ReactNode {
  const [updateAd, { loading }] = useUpdateAdMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: c.advertiserId, filter: populateFilter(c.fromDate) },
      },
    ],
  });

  if (c.campaignSource !== CampaignSource.SelfServe) return null;

  return (
    <OnOff
      onChange={(s) => {
        {
          updateAd({
            variables: {
              updateAdInput: {
                id: c.creativeInstanceId,
                state: s,
              },
            },
          });
        }
      }}
      loading={loading}
      state={c.state}
      end={c.campaignEnd}
      type="Ad"
    />
  );
}
