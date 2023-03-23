import { useFormikContext } from "formik";
import React, { useContext, useEffect } from "react";
import { CampaignForm } from "../user/views/adsManager/types";
import { DraftContext } from "../state/context";

interface Props {
  id: string;
}

export const PersistFormValues: React.FC<Props> = ({ id }) => {
  const { values, setValues } = useFormikContext<CampaignForm>();
  const { setDrafts } = useContext(DraftContext);

  const setForm = (id?: string) => {
    if (id) {
      const form = localStorage.getItem(id);
      if (form) {
        setValues(JSON.parse(form));
      }
    }
  };

  // read the values from the query string on load
  useEffect(() => {
    setForm(values.draftId);
  }, []);

  useEffect(() => {
    setForm(id);
  }, [id]);

  // save the values to the query string on update
  useEffect(() => {
    if (values.draftId) {
      localStorage.setItem(values.draftId, JSON.stringify(values));
    }
    setDrafts();
  }, [values]);

  return null;
};
