/* eslint-disable lingui/no-unlocalized-strings */
import { FormikSelect } from "@/form/FormikHelpers";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
export function VerticalPicker(props: { name: string }) {
  const { _ } = useLingui();

  return (
    <FormikSelect
      label={_(msg`Verticals`)}
      name={props.name}
      margin="dense"
      size="small"
      inlineError
      options={[
        {
          label: _(msg`Automotive`),
          value: "Automotive",
        },
        {
          label: _(msg`Beauty & Personal Care`),
          value: "beauty & Personal Care",
        },
        {
          label: _(msg`Consumer Goods (CPG)`),
          value: "Consumer Goods (CPG)",
        },
        {
          label: _(msg`Cryptocurrency/NFT`),
          value: "Cryptocurrency/NFT",
        },
        {
          label: _(msg`Education`),
          value: "Education",
        },
        {
          label: _(msg`Energy and Utilities`),
          value: "Energy and Utilities",
        },
        {
          label: _(msg`Entertainment`),
          value: "Entertainment",
        },
        {
          label: _(msg`Fashion`),
          value: "Fashion",
        },
        {
          label: _(msg`Finance`),
          value: "Finance",
        },
        {
          label: _(msg`Food & Beverage`),
          value: "Food & Beverage",
        },
        {
          label: _(msg`Gaming`),
          value: "Gaming",
        },
        {
          label: _(msg`Healthcare`),
          value: "Healthcare",
        },
        {
          label: _(msg`Home & Garden`),
          value: "Home & Garden",
        },
        {
          label: _(msg`Legal and Professional Services`),
          value: "Legal and Professional Services",
        },
        {
          label: _(msg`Manufacturing and Industrial`),
          value: "Manufacturing and Industrial",
        },
        {
          label: _(msg`Non-Profit and NGOs`),
          value: "Non-Profit and NGOs",
        },
        {
          label: _(msg`Real Estate`),
          value: "Real Estate",
        },
        {
          label: _(msg`Retail`),
          value: "Retail",
        },
        {
          label: _(msg`Sports`),
          value: "Sports",
        },
        {
          label: _(msg`Technology/Software`),
          value: "Technology/Software",
        },
        {
          label: _(msg`Telecommunications`),
          value: "Telecommunications",
        },
        {
          label: _(msg`Travel & Hospitality`),
          value: "Travel & Hospitality",
        },
        {
          label: _(msg`Other`),
          value: "Other",
        },
      ]}
    />
  );
}
