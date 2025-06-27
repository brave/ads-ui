import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { BoxContainer } from "@/components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useField } from "formik";
import { Creative, initialCreative } from "@/user/views/adsManager/types";
import { FormContext } from "@/state/context";
import { Trans } from "@lingui/macro";

export function NewAd() {
  const [, , newCreative] = useField<Creative | undefined>("newCreative");
  const [, meta, helper] = useField<boolean>("isCreating");
  const { setIsShowingAds } = useContext(FormContext);

  useEffect(() => {
    if (!meta.value) {
      newCreative.setValue(initialCreative);
      newCreative.setTouched(false);
    }
  }, [meta.value]);

  return (
    <BoxContainer
      header={
        meta.value ? <Trans>Discard ad</Trans> : <Trans>Create new ad</Trans>
      }
    >
      <Box
        component={Button}
        height={"200px"}
        width={"300px"}
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
      <Typography
        variant="caption"
        marginLeft={1}
        color={"text.primary"}
        textAlign="right"
      >
        <Trans>create now</Trans>
      </Typography>
    </BoxContainer>
  );
}
