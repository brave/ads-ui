import React from "react";
import { FormikErrors } from "formik";
import { Conversion } from "../../user/views/adsManager/types";

interface Props {
  errors?: FormikErrors<Conversion>;
}

export function ConversionError({ errors }: Props) {
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
