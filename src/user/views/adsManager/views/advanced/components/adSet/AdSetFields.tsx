import React from "react";
import { DetailsField } from "./fields/DetailsField";
import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";

interface Props {
  isEdit: boolean;
}

export function AdSetFields({ isEdit }: Props) {
  return (
    <>
      <DetailsField index={0} />

      <PickerFields index={0} />

      {!isEdit && <ConversionField index={0} />}
    </>
  );
}
