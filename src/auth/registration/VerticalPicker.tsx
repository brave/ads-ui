import { FormikSelect } from "@/form/FormikHelpers";
export function VerticalPicker(props: { name: string }) {
  return (
    <FormikSelect
      label="Verticals"
      name={props.name}
      margin="dense"
      size="small"
      inlineError
      options={[
        {
          label: "Automotive",
          value: "Automotive",
        },
        {
          label: "Beauty & Personal Care",
          value: "Beauty & Personal Care",
        },
        {
          label: "Consumer Goods (CPG)",
          value: "Consumer Goods (CPG)",
        },
        {
          label: "Cryptocurrency/NFT",
          value: "Cryptocurrency/NFT",
        },
        {
          label: "Education",
          value: "Education",
        },
        {
          label: "Energy and Utilities",
          value: "Energy and Utilities",
        },
        {
          label: "Entertainment",
          value: "Entertainment",
        },
        {
          label: "Fashion",
          value: "Fashion",
        },
        {
          label: "Finance",
          value: "Finance",
        },
        {
          label: "Food & Beverage",
          value: "Food & Beverage",
        },
        {
          label: "Gaming",
          value: "Gaming",
        },
        {
          label: "Healthcare",
          value: "Healthcare",
        },
        {
          label: "Home & Garden",
          value: "Home & Garden",
        },
        {
          label: "Legal and Professional Services",
          value: "Legal and Professional Services",
        },
        {
          label: "Manufacturing and Industrial",
          value: "Manufacturing and Industrial",
        },
        {
          label: "Non-Profit and NGOs",
          value: "Non-Profit and NGOs",
        },
        {
          label: "Real Estate",
          value: "Real Estate",
        },
        {
          label: "Retail",
          value: "Retail",
        },
        {
          label: "Sports",
          value: "Sports",
        },
        {
          label: "Technology/Software",
          value: "Technology/Software",
        },
        {
          label: "Telecommunications",
          value: "Telecommunications",
        },
        {
          label: "Travel & Hospitality",
          value: "Travel & Hospitality",
        },
        {
          label: "Other",
          value: "Other",
        },
      ]}
    />
  );
}
