import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { CampaignForm } from "../user/views/adsManager/types";

export const PersistFormValues: React.FC = () => {
  const { values, setValues } = useFormikContext<CampaignForm>();

  // read the values from the query string on load
  useEffect(() => {
    const form = localStorage.getItem(`${values.draftId}`);
    if (form) {
      setValues(JSON.parse(form));
    }
  }, []);

  // save the values to the query string on update
  useEffect(() => {
    localStorage.setItem(`${values.draftId}`, JSON.stringify(values));
  }, [values]);

  return null;
};
