import { useFormikContext } from "formik";
import { useEffect } from "react";
import _ from "lodash";
import { CreativeInput } from "graphql/types";

export const PersistCreativeValues = () => {
  const { values, setValues, dirty } = useFormikContext<CreativeInput>();

  // read the values from localStorage on load
  useEffect(() => {
    const form = localStorage.getItem("creativeInProgress");
    if (form) {
      setValues(JSON.parse(form));
    }
  }, []);

  // save the values to localStorage on update
  useEffect(() => {
    if (!_.isEmpty(values) && dirty) {
      localStorage.setItem("creativeInProgress", JSON.stringify(values));
    }
  }, [values, dirty]);

  return null;
};

export const clearCreativeValues = () => {
  localStorage.removeItem("creativeInProgress");
};
