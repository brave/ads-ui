import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useField, useFormikContext } from "formik";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "user/views/adsManager/types";
import { FormContext } from "state/context";
import { CampaignFormat } from "graphql/types";

export function NewAd() {
  const { values } = useFormikContext<CampaignForm>();
  const [, , newCreative] = useField<Creative | undefined>("newCreative");
  const [, meta, helper] = useField<boolean>("isCreating");
  const { setIsShowingAds } = useContext(FormContext);

  useEffect(() => {
    if (!meta.value) {
      void newCreative.setValue(initialCreative);
      void newCreative.setTouched(false);
    }
  }, [meta.value]);

  return (
    <BoxContainer header={meta.value ? "Discard ad" : "Create new ad"}>
      <Box
        component={Button}
        height={
          values.format !== CampaignFormat.NewsDisplayAd ? "80px" : "200px"
        }
        width={
          values.format !== CampaignFormat.NewsDisplayAd ? "350px" : "300px"
        }
        borderRadius="13px"
        border="1px solid #e2e2e2"
        onClick={() => {
          void helper.setValue(!meta.value);
          setIsShowingAds(false);
        }}
      >
        {meta.value ? (
          <RemoveCircleOutlineIcon fontSize="large" />
        ) : (
          <AddCircleOutlineIcon fontSize="large" />
        )}
      </Box>
    </BoxContainer>
  );
}
