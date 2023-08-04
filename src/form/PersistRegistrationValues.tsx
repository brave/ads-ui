import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { RegistrationForm } from "auth/registration/types";
import _ from "lodash";

export const PersistRegistrationValues = () => {
  const { values, setValues, dirty } = useFormikContext<RegistrationForm>();

  const setForm = () => {
    const form = localStorage.getItem("registerInProgress");
    if (form) {
      setValues(JSON.parse(form));
    }
  };

  // read the values from localStorage on load
  useEffect(() => {
    setForm();
  }, []);

  // save the values to localStorage on update
  useEffect(() => {
    if (!_.isEmpty(values) && dirty) {
      localStorage.setItem("registerInProgress", JSON.stringify(values));
    }
  }, [values, dirty]);

  return null;
};

export const clearRegistrationValues = () => {
  localStorage.removeItem("registerInProgress");
};
