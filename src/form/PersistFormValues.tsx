import { useFormikContext } from "formik";
import { useContext, useEffect } from "react";
import { CampaignForm } from "@/user/views/adsManager/types";
import { DraftContext } from "@/state/context";

export const PersistFormValues = () => {
  const { values, setValues, dirty } = useFormikContext<CampaignForm>();
  const { setDrafts } = useContext(DraftContext);

  const setForm = (id?: string) => {
    if (id) {
      const form = localStorage.getItem(id);
      if (form) {
        setValues(JSON.parse(form));
      }
    }
  };

  // read the values from localStorage on load
  useEffect(() => {
    setForm(values.draftId);
  }, []);

  // save the values to localStorage on update
  useEffect(() => {
    if (values.draftId && dirty) {
      localStorage.setItem(values.draftId, JSON.stringify(values));
    }
    setDrafts();
  }, [values, dirty]);

  return null;
};
