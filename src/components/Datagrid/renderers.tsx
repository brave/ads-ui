import { Box, Tooltip } from "@mui/material";
import _ from "lodash";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ReactElement, ReactNode, useContext } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import {
  CampaignSummaryFragment,
  refetchLoadCampaignAdsQuery,
  refetchLoadCampaignQuery,
  useUpdateCampaignMutation,
} from "graphql/campaign.generated";
import { useUpdateAdSetMutation } from "graphql/ad-set.generated";
import { OnOff } from "components/Switch/OnOff";
import { displayFromCampaignState } from "util/displayState";
import { CampaignExtras } from "user/adSet/AdSetList";
import { FilterContext } from "state/context";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { UpdateAdSetInput } from "graphql/types";
import { toLocaleString } from "util/bignumber";
import BigNumber from "bignumber.js";

export type CellValueRenderer = (value: any) => ReactNode;
const ADS_DEFAULT_TIMEZONE = "America/New_York";
const TOOLTIP_FORMAT = "E d LLL yyyy HH:mm:ss zzz";

function formatDateForTooltip(dt: Date): ReactElement {
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
  value: BigNumber | number,
  currency: string,
) {
  const val = BigNumber(value);
  if (currency === "USD") {
    return `$${toLocaleString(val)}`;
  } else {
    return `${toLocaleString(val)} ${currency}`;
  }
}

export function campaignOnOffState(
  c: CampaignSummaryFragment & { advertiserId: string },
): ReactNode {
  const { fromDate } = useContext(FilterContext);
  const [updateCampaign, { loading }] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: c.advertiserId,
          filter: { from: fromDate },
        }),
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

export function adSetOnOffState(
  c: Omit<UpdateAdSetInput, "ads"> & CampaignExtras,
  isInline?: boolean,
): ReactNode {
  const [updateAdSet, { loading }] = useUpdateAdSetMutation({
    refetchQueries: [
      refetchLoadCampaignAdsQuery({ id: c.campaignId }),
      refetchLoadCampaignQuery({ id: c.campaignId }),
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
      isInline={isInline}
    />
  );
}
