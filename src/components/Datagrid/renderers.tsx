import { Box, Tooltip } from "@mui/material";
import _ from "lodash";
import { ReactElement, ReactNode, useContext } from "react";

import { OnOff } from "@/components/Switch/OnOff";
import { displayFromCampaignState } from "@/util/displayState";
import { CampaignExtras } from "@/user/adSet/AdSetList";
import { FilterContext } from "@/state/context";
import {
  AdvertiserCampaignsDocument,
  CampaignSummaryFragment,
  LoadCampaignAdsDocument,
  LoadCampaignDocument,
  UpdateAdSetInput,
  UpdateCampaignDocument,
} from "@/graphql-client/graphql";
import { toLocaleString } from "@/util/bignumber";
import BigNumber from "bignumber.js";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { UpdateAdSetDocument } from "@/graphql-client/graphql";

type CellValueRenderer = (value: any) => ReactNode;
const ADS_DEFAULT_TIMEZONE = "America/New_York";
const TOOLTIP_FORMAT = "ddd D MMM YYYY HH:mm:ss z";

function formatDateForTooltip(d: dayjs.Dayjs): ReactElement {
  return (
    <>
      <Box>{d.tz(ADS_DEFAULT_TIMEZONE).format(TOOLTIP_FORMAT)}</Box>
      <Box>{d.utc().format(TOOLTIP_FORMAT)}</Box>
      <Box mt={1}>
        <Trans>In your local time this is</Trans>
        <br />
        {d.format(TOOLTIP_FORMAT)}
      </Box>
    </>
  );
}

export const StandardRenderers: Record<string, CellValueRenderer> = {
  string: (v) => <Box>{v}</Box>,
  relativeDate: (v) => {
    if (_.isString(v)) {
      const d = dayjs(v);
      return (
        <Tooltip title={formatDateForTooltip(d)}>
          <Box whiteSpace="nowrap">{d.fromNow()}</Box>
        </Tooltip>
      );
    }

    return null;
  },
  date: (v) => {
    if (_.isString(v)) {
      const d = dayjs(v);
      return (
        <Tooltip title={formatDateForTooltip(d)}>
          <Box whiteSpace="nowrap">
            {d.tz(ADS_DEFAULT_TIMEZONE).format("ll")}
          </Box>
        </Tooltip>
      );
    }

    return null;
  },
  yesno: (v) => <Box>{v ? <Trans>Yes</Trans> : <Trans>No</Trans>}</Box>,
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
  const [updateCampaign, { loading }] = useMutation(UpdateCampaignDocument, {
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: {
          id: c.advertiserId,
          filter: { from: fromDate?.toISOString() },
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

export function adSetOnOffState(
  c: Omit<UpdateAdSetInput, "ads"> & CampaignExtras,
  isInline?: boolean,
): ReactNode {
  const [updateAdSet, { loading }] = useMutation(UpdateAdSetDocument, {
    refetchQueries: [
      {
        query: LoadCampaignAdsDocument,
        variables: { id: c.campaignId },
      },
      {
        query: LoadCampaignDocument,
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
              },
            },
          });
        }
      }}
      loading={loading}
      state={state}
      end={c.campaignEnd}
      source={c.campaignSource}
      type="Ad set"
      isInline={isInline}
    />
  );
}
