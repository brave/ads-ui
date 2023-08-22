import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useField, useFormikContext } from "formik";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "user/views/adsManager/types";
import { useEffect, useState } from "react";
import _ from "lodash";

export const EditCreativeButton = () => {
  const { values } = useFormikContext<CampaignForm>();
  const [index, setIndex] = useState<number>();
  const [, , isCreating] = useField<boolean>("isCreating");
  const [, newMeta, newCreative] = useField<Creative>("newCreative");
  const [, , creative] = useField<Creative>(`creatives.${index}`);

  useEffect(() => {
    newCreative.setError(undefined);
    isCreating.setValue(true);
    if (newMeta.value.id) {
      const idx = _.findIndex(
        values.creatives,
        (c) => c.id === newMeta.value.id,
      );
      if (idx >= 0) {
        setIndex(idx);
      }
    }
  }, [newMeta.value, values.creatives]);

  return (
    <Button
      startIcon={<SaveIcon />}
      variant="outlined"
      onClick={(e) => {
        e.preventDefault();
        creative.setValue(newMeta.value);
        isCreating.setValue(false);
        newCreative.setValue(initialCreative);
        newCreative.setTouched(false);
      }}
      disabled={
        !newMeta.touched ||
        !_.isEmpty(newMeta.error) ||
        newMeta.value.targetUrlValid !== undefined
      }
    >
      Update
    </Button>
  );
};
