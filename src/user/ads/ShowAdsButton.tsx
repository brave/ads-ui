import { useContext } from "react";
import { FormContext } from "@/state/context";
import { Link } from "@mui/material";
import { useField } from "formik";
import { Trans } from "@lingui/macro";

export function ShowAdsButton() {
  const { isShowingAds, setIsShowingAds } = useContext(FormContext);
  const [, , helper] = useField<boolean>("isCreating");

  if (!isShowingAds) {
    return (
      <Link
        underline="none"
        variant="subtitle1"
        sx={{ cursor: "pointer" }}
        onClick={async () => {
          setIsShowingAds(true);
          await helper.setValue(false);
        }}
      >
        <Trans>Use existing ads</Trans>
      </Link>
    );
  }

  return null;
}
