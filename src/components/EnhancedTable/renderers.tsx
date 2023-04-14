import { Box, IconButton, Link, Stack, Tooltip } from "@mui/material";
import _ from "lodash";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { CellValue } from "./EnhancedTable";
import React, { ReactChild, ReactNode } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { updateCampaignState } from "../../user/library";
import {
  CampaignFragment,
  useUpdateCampaignMutation,
} from "../../graphql/campaign.generated";
import { AdvertiserCampaignsDocument } from "../../graphql/advertiser.generated";
import {
  AdSetFragment,
  useUpdateAdMutation,
  useUpdateAdSetMutation,
} from "../../graphql/ad-set.generated";
import { OnOff } from "../Switch/OnOff";
import { CreativeFragment } from "../../graphql/creative.generated";
import { IAdvertiser } from "../../actions";
import { CampaignFormat, CampaignSource } from "../../graphql/types";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";

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

export function campaignName(c: CampaignFragment, canEdit: boolean) {
  const history = useHistory();

  return (
    <Stack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      direction="row"
    >
      <Link
        href={
          c.state === "active" ||
          c.state === "daycomplete" ||
          c.state === "completed"
            ? `/user/main/campaign/${c.id}/analytics/overview`
            : undefined
        }
        underline="none"
      >
        {c.name}
      </Link>
      {canEdit &&
        c.format === CampaignFormat.PushNotification &&
        c.state !== "completed" && (
          <Tooltip title={`Edit ${c.name}`}>
            <IconButton
              onClick={() =>
                history.push(`/user/main/adsmanager/advanced/${c.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
    </Stack>
  );
}

export function campaignOnOffState(
  c: CampaignFragment & { fromDate: Date | null },
  advertiser: IAdvertiser
): ReactNode {
  const [updateCampaign, { loading }] = useUpdateCampaignMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: {
          id: advertiser.id,
          filter: {
            includeAds: true,
            includeCreativeSets: true,
            from: c.fromDate,
          },
        },
      },
    ],
  });

  if (c.source !== CampaignSource.SelfServe) return null;

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

export function adSetOnOffState(
  c: AdSetFragment & {
    campaignEnd: string;
    campaignId: string;
    campaignState: string;
    campaignSource: CampaignSource;
  },
  advertiser: IAdvertiser
): ReactNode {
  const [updateAdSet, { loading }] = useUpdateAdSetMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: advertiser.id },
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
  },
  advertiser: IAdvertiser
): ReactNode {
  const [updateAd, { loading }] = useUpdateAdMutation({
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: { id: advertiser.id },
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
