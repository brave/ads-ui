import { graphql } from "@/graphql-client";
import {
  AdSetBreakdownQuery,
  AdSetBreakdownQueryVariables,
  CampaignSummaryFragment,
  CreativeBreakdownQuery,
  CreativeBreakdownQueryVariables,
  DisplayedMetricsFragment,
  Exact,
  OsBreakdownQuery,
  OsBreakdownQueryVariables,
  PerformanceFilter,
  SegmentBreakdownQuery,
  SegmentBreakdownQueryVariables,
} from "@/graphql-client/graphql";
import { MessageDescriptor, i18n } from "@lingui/core";
import { msg } from "@lingui/macro";
import { TypedDocumentNode } from "@apollo/client";

type GqlQueryParams = Exact<{
  filter: PerformanceFilter;
}>;

type GqlRequiredResponse<Dims> = {
  performance: {
    values: {
      dimensions: Dims;
      metrics: DisplayedMetricsFragment;
    }[];
  };
};

const AdSet_Breakdown_Load = graphql(`
  query AdSetBreakdown($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        dimensions {
          adSet {
            id
            name
          }
        }
        metrics {
          ...DisplayedMetrics
        }
      }
    }
  }
`);

const Creative_Breakdown_Load = graphql(`
  query CreativeBreakdown($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        dimensions {
          ad {
            id
            creative {
              id
              name
            }
          }
        }
        metrics {
          ...DisplayedMetrics
        }
      }
    }
  }
`);

const OS_Breakdown_Load = graphql(`
  query OSBreakdown($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        dimensions {
          os
        }
        metrics {
          ...DisplayedMetrics
        }
      }
    }
  }
`);

const Segment_Breakdown_Load = graphql(`
  query SegmentBreakdown($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        dimensions {
          segment
        }
        metrics {
          ...DisplayedMetrics
        }
      }
    }
  }
`);

interface BreakdownDefinition {
  id: string;
  label: MessageDescriptor;
}

export interface LocalizedBreakdown {
  label: string;
  id: string;
}

interface BreakdownDefinitionWithQuery<
  R extends GqlRequiredResponse<D>,
  V extends GqlQueryParams,
  D,
> extends BreakdownDefinition {
  query: TypedDocumentNode<R, V>;
  extractId: (dims: D) => string | undefined | null;
  extractName: (dims: D) => string | undefined | null;
  renderCell: (
    row: { id: string; name: string },
    campaignOverview: CampaignSummaryFragment,
  ) => React.ReactNode;
}

const DAY_BREAKDOWN = { id: "day", label: msg`Daily Graph` };
const HOUR_BREAKDOWN = { id: "hour", label: msg`Hourly Graph` };

const ADSET_BREAKDOWN: BreakdownDefinitionWithQuery<
  AdSetBreakdownQuery,
  AdSetBreakdownQueryVariables,
  AdSetBreakdownQuery["performance"]["values"][0]["dimensions"]
> = {
  id: "adset",
  label: msg`AdSet Performance`,
  query: AdSet_Breakdown_Load,
  extractId: (dims) => dims.adSet?.id ?? "",
  extractName: (dims) => dims.adSet?.name ?? "",
  renderCell: (row) => row.name,
};

const OS_BREAKDOWN: BreakdownDefinitionWithQuery<
  OsBreakdownQuery,
  OsBreakdownQueryVariables,
  OsBreakdownQuery["performance"]["values"][0]["dimensions"]
> = {
  id: "os",
  label: msg`OS Performance`,
  query: OS_Breakdown_Load,
  extractId: (dims) => dims.os,
  extractName: (dims) => dims.os,
  renderCell: (row) => row.name,
};

const SEGMENT_BREAKDOWN: BreakdownDefinitionWithQuery<
  SegmentBreakdownQuery,
  SegmentBreakdownQueryVariables,
  SegmentBreakdownQuery["performance"]["values"][0]["dimensions"]
> = {
  id: "segment",
  label: msg`Segment Performance`,
  query: Segment_Breakdown_Load,
  extractId: (dims) => dims.segment ?? "unknown",
  extractName: (dims) => dims.segment ?? "(unknown)",
  renderCell: (row) => row.name,
};

const CREATIVE_BREAKDOWN: BreakdownDefinitionWithQuery<
  CreativeBreakdownQuery,
  CreativeBreakdownQueryVariables,
  CreativeBreakdownQuery["performance"]["values"][0]["dimensions"]
> = {
  id: "creative",
  label: msg`Creative Performance`,
  query: Creative_Breakdown_Load,
  extractId: (dims) => dims.ad.creative.id ?? "unknown",
  extractName: (dims) => dims.ad.creative.name ?? "(unknown)",
  renderCell: (row) => row.name,
};

export const BREAKDOWNS = [
  DAY_BREAKDOWN,
  HOUR_BREAKDOWN,
  ADSET_BREAKDOWN,
  OS_BREAKDOWN,
  SEGMENT_BREAKDOWN,
  CREATIVE_BREAKDOWN,
];

const breakdownLookup = new Map<string, BreakdownDefinition>(
  BREAKDOWNS.map((b) => [b.id, b]),
);

export function getBreakdownDefinition(
  id: string | undefined | null,
): LocalizedBreakdown | undefined {
  if (!id) return undefined;
  const breakdown = breakdownLookup.get(id);
  if (!breakdown) return undefined;
  return { ...breakdown, label: i18n._(breakdown.label) };
}

export function isBreakdownWithQuery(
  b: BreakdownDefinition | LocalizedBreakdown,
): b is BreakdownDefinitionWithQuery<any, any, any> {
  return "query" in b;
}
