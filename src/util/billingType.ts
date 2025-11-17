interface BillingTypeLabels {
  value: string;
  shortLabel: string;
  longLabel: string;
}

export function uiLabelsForBillingType(
  billingType: string | undefined | null,
): BillingTypeLabels {
  if (!billingType) {
    return { value: "N/A", shortLabel: "N/A", longLabel: "Unknown" };
  }

  const BILLING_TYPES = [
    { value: "cpm", shortLabel: "CPM", longLabel: "CPM (Impressions)" },
    { value: "cpc", shortLabel: "CPC", longLabel: "CPC (Clicks)" },
    { value: "cpsv", shortLabel: "CPSV", longLabel: "CPSV (Site Visits)" },
  ];

  const entry = BILLING_TYPES.find(
    (bt) => bt.value === billingType || bt.shortLabel === billingType,
  );
  return (
    entry ?? {
      value: billingType,
      shortLabel: billingType.toUpperCase(),
      longLabel: billingType.toUpperCase(),
    }
  );
}
