import React from "react";
import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import { CardContainer } from "components/Card/CardContainer";
import { useHistory } from "react-router-dom";
import { FormikTextField } from "form/FormikHelpers";
import { AdSetAds } from "user/views/adsManager/views/advanced/components/adSet/fields/AdSetAds";

interface Props {
  isEdit: boolean;
}

export function AdSetFields({ isEdit }: Props) {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const current = Number(params.get("current") ?? 0);
  const fakeCurrent = current + 1;

  return (
    <>
      <CardContainer header={`Ad Set ${fakeCurrent}`}>
        <FormikTextField
          name={`adSets.${current}.name`}
          label="Ad Set Name"
          margin="none"
        />
      </CardContainer>

      <PickerFields index={current} />

      {!isEdit && <ConversionField index={current} />}

      <AdSetAds index={current} />
    </>
  );
}
