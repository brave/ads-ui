import { useFormikContext } from "formik";
import { useEffect } from "react";
import { RegistrationForm } from "auth/registration/types";
import _ from "lodash";

export const PersistRegistrationValues = () => {
  const { values, setValues, dirty } = useFormikContext<RegistrationForm>();

  // read the values from localStorage on load
  useEffect(() => {
    const form = localStorage.getItem("registerInProgress");
    if (form) {
      setValues(JSON.parse(form));
    }
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
