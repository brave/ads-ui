import React from "react";
import { Box } from "@mui/material";
import _ from "lodash";
import {StatsMetric} from "../types";
interface CostMetrics {
  currency: string;
  budget: number;
}
import { Text } from "../../../../components/Text/Text";

interface LiveFeedProps {
  processed: StatsMetric;
  state: string;
  cost: CostMetrics;
}

interface Feed {
  label: string;
  value: string;
}

const FeedMetric = ({ label, value }: Feed) => {
  return (
    <Box
      width="100%"
      display="flex"
      marginLeft="28px"
      alignItems="center"
      marginTop="28px"
    >
      <Text
        style={{ marginRight: "14px" }}
        content={`${label}:`}
        fontFamily={"Poppins"}
        sizes={[18, 18, 42, 42, 14]}
      />
      <Text
        content={value}
        fontFamily={"Poppins"}
        sizes={[18, 18, 42, 42, 18]}
      />
    </Box>
  );
};

export default function LiveFeed({ cost, processed, state }: LiveFeedProps) {
  const realSpend =
    processed.spend > cost.budget ? cost.budget : processed.spend;

  const feedValues: Feed[] = [
    {
      label: "Click-through rate",
      value: `${processed.ctr.toFixed(2)}%`,
    },
    {
      label: "10s visit rate",
      value: `${processed.visitRate.toFixed(2)}%`,
    },
    {
      label: "Dismissal rate",
      value: `${processed.dismissRate.toFixed(2)}%`,
    },
    {
      label: "Click to 10s visit rate",
      value: `${processed.landingRate.toFixed(2)}%`,
    },
    { label: "Upvotes", value: `${processed.upvotes}` },
    { label: "Downvotes", value: `${processed.downvotes}` },
    {
      label: "Spend",
      value: `${realSpend.toLocaleString()} ${cost.currency}`,
    },
    {
      label: "Budget",
      value: `${cost.budget.toLocaleString()} ${cost.currency}`,
    },
    { label: "State", value: _.capitalize(state) },
  ];

  return (
    <Box width="25%">
      <Box
        marginTop="14px"
        border="1px solid #ededed"
        borderRadius="4px"
        height="608px"
        marginLeft="28px"
      >
        <Box
          width="100%"
          height="56px"
          bgcolor="white"
          borderBottom="1px solid #ededed"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            content={"Campaign Insights"}
            fontFamily={"Poppins"}
            sizes={[18, 18, 42, 42, 14]}
          />
        </Box>
        {feedValues.map((f, idx) => (
          <FeedMetric label={f.label} value={f.value} key={idx} />
        ))}
      </Box>
    </Box>
  );
}
