import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import { CardContainer } from "components/Card/CardContainer";
import { useHistory } from "react-router-dom";
import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { AdSetAds } from "user/views/adsManager/views/advanced/components/adSet/fields/AdSetAds";

export function AdSetFields() {
  const history = useHistory();
  const { isDraft } = useIsEdit();
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

      {isDraft && <ConversionField index={current} />}

      <AdSetAds index={current} />
    </>
  );
}
