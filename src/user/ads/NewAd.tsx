import { CardContainer } from "components/Card/CardContainer";
import { Box, Button, Link } from "@mui/material";
import { useContext, useEffect } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { CreativeSpecificFields } from "components/Creatives/CreativeSpecificFields";
import { useField } from "formik";
import { Creative, initialCreative } from "user/views/adsManager/types";
import { FormContext } from "state/context";
import { AdsExistingAd } from "user/ads/AdsExistingAd";
import { CreativeSpecificPreview } from "components/Creatives/CreativeSpecificPreview";
import { useAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";

export function NewAd() {
  const { creatives } = useAdvertiserCreatives();
  const [, , newCreative] = useField<Creative | undefined>("newCreative");
  const [, meta, helper] = useField<boolean>("isCreating");
  const { isShowingAds, setIsShowingAds } = useContext(FormContext);

  useEffect(() => {
    if (!meta.value) {
      newCreative.setValue(initialCreative);
      newCreative.setTouched(false);
    }
  }, [meta.value]);

  return (
    <>
      <CardContainer header="New Ads">
        <CreativeSpecificPreview options={creatives}>
          <BoxContainer
            header={meta.value ? "Discard Ad" : "Create New Ad"}
            useTypography
          >
            <Box
              component={Button}
              height="80px"
              width="350px"
              borderRadius="13px"
              border="1px solid #e2e2e2"
              onClick={() => {
                helper.setValue(!meta.value);
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
        </CreativeSpecificPreview>
        {!isShowingAds && (
          <Link
            underline="none"
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setIsShowingAds(true);
              helper.setValue(false);
            }}
          >
            Use previously created Ads
          </Link>
        )}
      </CardContainer>
      {isShowingAds && <AdsExistingAd />}
      {meta.value && <CreativeSpecificFields />}
    </>
  );
}
