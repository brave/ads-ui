import { useContext } from "react";
import { FormContext } from "state/context";
import { Link } from "@mui/material";
import { useField } from "formik";

export function ShowAdsButton() {
  const { isShowingAds, setIsShowingAds } = useContext(FormContext);
  const [, , helper] = useField<boolean>("isCreating");

  if (!isShowingAds) {
    return (
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
    );
  }

  return null;
}
