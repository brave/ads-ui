import { CampaignFormat } from "@/graphql-client/graphql";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { Dispatch } from "react";

type FieldSupport = "default" | "optional" | "not_supported";

type FieldDefinition = {
  name: string;
  push: FieldSupport;
  ntt: FieldSupport;
  search: FieldSupport;
};

type FieldDefinitions = {
  dimensions: FieldDefinition[];
  metrics: FieldDefinition[];
};

const availableFields: FieldDefinitions = {
  dimensions: [
    {
      name: "day",
      ntt: "not_supported",
      push: "default",
      search: "default",
    },
    {
      name: "hour",
      ntt: "not_supported",
      push: "optional",
      search: "optional",
    },
    {
      name: "advertiser_id",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "advertiser_name",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "campaign_id",
      ntt: "default",
      push: "default",
      search: "default",
    },
    {
      name: "campaign_name",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "adset_id",
      ntt: "default",
      push: "default",
      search: "default",
    },
    {
      name: "adset_name",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "ad_id",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "creative_body",
      ntt: "not_supported",
      push: "optional",
      search: "not_supported",
    },
    {
      name: "creative_title",
      ntt: "not_supported",
      push: "optional",
      search: "not_supported",
    },
    {
      name: "target_url",
      ntt: "default",
      push: "default",
      search: "default",
    },
    {
      name: "country",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "os",
      ntt: "optional",
      push: "optional",
      search: "optional",
    },
    {
      name: "branded",
      ntt: "not_supported",
      push: "not_supported",
      search: "optional",
    },
  ],
  metrics: [
    {
      name: "impressions",
      ntt: "default",
      push: "default",
      search: "default",
    },
    {
      name: "clicks",
      ntt: "default",
      push: "default",
      search: "default",
    },
    {
      name: "site_visits",
      ntt: "not_supported",
      push: "optional",
      search: "not_supported",
    },
    {
      name: "billable_spend_usd",
      ntt: "not_supported",
      push: "default",
      search: "default",
    },
    {
      name: "view_through_conversions",
      ntt: "not_supported",
      push: "optional",
      search: "not_supported",
    },
  ],
};

function fieldSupportForCampaignFormat(
  format: CampaignFormat,
  field: FieldDefinition,
): FieldSupport {
  if (format === CampaignFormat.NtpSi) {
    return field.ntt;
  }

  if (format === CampaignFormat.Search) {
    return field.search;
  }

  if (format === CampaignFormat.PushNotification) {
    return field.push;
  }

  return "not_supported";
}

function fieldsMatchingSupportForFormat(
  defs: FieldDefinition[],
  format: CampaignFormat,
  matches: (s: FieldSupport) => boolean,
): string[] {
  return defs
    .filter((f) => matches(fieldSupportForCampaignFormat(format, f)))
    .map((f) => f.name);
}

export interface V3ReportFields {
  dimensions: string[];
  metrics: string[];
}

export function defaultFieldsForFormat(format: CampaignFormat): V3ReportFields {
  return {
    dimensions: fieldsMatchingSupportForFormat(
      availableFields.dimensions,
      format,
      (s) => s === "default",
    ),
    metrics: fieldsMatchingSupportForFormat(
      availableFields.metrics,
      format,
      (s) => s === "default",
    ),
  };
}

interface Props {
  format: CampaignFormat;
  value: V3ReportFields;
  onValueChanged: Dispatch<V3ReportFields>;
}

export function ReportFields({ value, format, onValueChanged }: Props) {
  const toggleEntry = (existingValues: string[], valueToToggle: string) => {
    if (existingValues.includes(valueToToggle)) {
      return existingValues.filter((v) => v !== valueToToggle);
    } else {
      return [...existingValues, valueToToggle];
    }
  };
  const supportedDimensions = availableFields.dimensions.filter(
    (fd) => fieldSupportForCampaignFormat(format, fd) !== "not_supported",
  );
  const supportedMetrics = availableFields.metrics.filter(
    (fd) => fieldSupportForCampaignFormat(format, fd) !== "not_supported",
  );

  return (
    <Box marginBottom={1}>
      <FormLabel>Dimensions</FormLabel>
      <FormHelperText>
        The report will include one row per unique combination of these values
      </FormHelperText>
      <FormGroup row>
        {supportedDimensions.map((fd) => (
          <FormControlLabel
            key={fd.name}
            control={
              <Checkbox
                checked={value.dimensions.includes(fd.name)}
                onChange={() =>
                  onValueChanged({
                    ...value,
                    dimensions: toggleEntry(value.dimensions, fd.name),
                  })
                }
              />
            }
            label={fd.name}
          />
        ))}
      </FormGroup>
      <FormLabel>Metrics</FormLabel>
      <FormHelperText>
        Each row will contain values for these metrics
      </FormHelperText>
      <FormGroup row>
        {supportedMetrics.map((fd) => (
          <FormControlLabel
            key={fd.name}
            control={
              <Checkbox
                checked={value.metrics.includes(fd.name)}
                onChange={() =>
                  onValueChanged({
                    ...value,
                    metrics: toggleEntry(value.metrics, fd.name),
                  })
                }
              />
            }
            label={fd.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
