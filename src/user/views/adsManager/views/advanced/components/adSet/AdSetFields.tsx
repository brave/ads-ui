import React from "react";
import { DetailsField } from "./fields/DetailsField";
import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";

interface Props {
  tabValue: number;
  onRemove: () => void;
  onCreate: () => void;
  isEdit: boolean;
}

export function AdSetFields({ tabValue, onRemove, onCreate, isEdit }: Props) {
  const index = tabValue - 1;

  return (
    <>
      <DetailsField
        index={index}
        onCreate={onCreate}
        onRemove={onRemove}
        isEdit={isEdit}
      />

      <PickerFields index={index} />

      {!isEdit && <ConversionField index={index} />}
    </>
  );
}
