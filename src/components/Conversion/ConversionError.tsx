import React from "react";
import { FormikErrors } from "formik";
import { Conversion } from "user/views/adsManager/types";

interface Props {
  errors?: FormikErrors<Conversion> | string;
}

export function ConversionError({ errors }: Props) {
  if (typeof errors === "string") {
    return <>{errors}</>;
  }

  const errs: (string | undefined)[] = [
    errors?.type,
    errors?.observationWindow,
    errors?.urlPattern,
  ];

  return (
    <>
      {errs.map((e) => (
        <>
          {e && (
            <>
              {e} <br />
            </>
          )}
        </>
      ))}
    </>
  );
}
