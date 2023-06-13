import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  index: number;
}

export function DetailsField({ index }: Props) {
  return (
    <CardContainer header={`Ad Set Name`}>
      <FormikTextField name={`adSets.${index}.name`} label="Ad Set Name" />
    </CardContainer>
  );
}
