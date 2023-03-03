import { Box, CircularProgress, Link, Switch, Tooltip } from "@mui/material";
import _ from "lodash";
import { formatDistanceToNow, format, parseISO, isPast } from "date-fns";
import { CellValue } from "./EnhancedTable";
import React, { ChangeEvent, ReactChild, ReactNode, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { updateCampaignState } from "../../user/library";
import {
  CampaignFragment,
  useUpdateCampaignMutation,
} from "../../graphql/campaign.generated";
import { AdvertiserCampaignsDocument } from "../../graphql/advertiser.generated";
import {
  AdFragment,
  useUpdateAdMutation,
} from "../../graphql/ad-set.generated";
import { OnOff } from "../Switch/OnOff";
import { Creative } from "../../user/views/adsManager/types";
import { CreativeFragment } from "../../graphql/creative.generated";

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
  c: CampaignFragment,
  advertiserId: string
): ReactNode {
  const [updateCampaign, { loading }] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: advertiserId },
      },
    ],
  });

  return (
    <OnOff
      onChange={(s) => {
        updateCampaign({
          variables: { input: updateCampaignState(c, s) },
        });
      }}
      loading={loading}
      state={c.state}
      end={c.endAt}
      type="Campaign"
    />
  );
}

export function adOnOffState(
  c: CreativeFragment & {
    creativeSetId: string;
    campaignEnd: string;
    creativeInstanceId: string;
  },
  advertiserId: string
): ReactNode {
  const [updateAd, { loading }] = useUpdateAdMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: advertiserId },
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
                // creativeSetId: c.creativeSetId,
                // creativeId: c.id,
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
