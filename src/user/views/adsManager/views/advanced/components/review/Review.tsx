import {useFormikContext} from "formik";
import {AdSetForm, CampaignForm} from "../../../../types";
import {Box} from "@mui/material";
import React, {useEffect} from "react";
import {FormikSubmitButton} from "../../../../../../../form/FormikHelpers";
import _ from "lodash";
import {CampaignReview} from "./components/CampaignReview";
import {AdSetReview} from "./components/AdSetReview";

export function Review() {
  const { values, errors, setFieldTouched } = useFormikContext<CampaignForm>();

  const touch = (keys: string[]) => {
    keys.forEach((k) => {
      setFieldTouched(k, true, true);
    })
  }

  useEffect(() => {
    const campaign: Omit<CampaignForm, "adSets"> = { ..._.omit(values, "adSets")};
    touch(Object.keys(campaign));

    const adSet: AdSetForm[] = values.adSets
    adSet.forEach((s) => {
      const noCreative = _.omit(s, "creatives");
      touch(Object.keys(noCreative));
      s.creatives.forEach((c) => {
        touch(Object.keys(c));
      })
    })
  }, [values])

  return (
    <Box display="flex" flexDirection="column">
      <CampaignReview values={values} errors={errors} />

      {values.adSets.map((adSet, adSetIdx) => (
        <AdSetReview idx={adSetIdx} adSet={adSet} errors={errors.adSets?.[adSetIdx]} />
      ))}

      <FormikSubmitButton
        isCreate={true}
        label="Publish Campaign"
        allowNavigation={true}
      />
    </Box>
  )
}
