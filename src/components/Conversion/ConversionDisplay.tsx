import { Conversion } from "user/views/adsManager/types";
import React from "react";
import { FormikErrors } from "formik";
import { ReviewField } from "user/views/adsManager/views/advanced/components/review/components/ReviewField";
import _ from "lodash";

interface Props {
  conversions: Conversion[];
  convErrors?: FormikErrors<Conversion>[] | string[] | string;
}

export function ConversionDisplay({ conversions, convErrors }: Props) {
  if (conversions.length === 0) {
    return (
      <ReviewField caption="Conversion" value="No conversion metrics set" />
    );
  }

  function extractConversionError(
    idx: number,
    field: keyof Conversion,
  ): string | undefined {
    const errorObj = convErrors?.[idx];

    if (!errorObj) {
      return undefined;
    }

    if (_.isString(errorObj)) {
      return errorObj;
    }

    return errorObj[field];
  }

  return (
    <>
      {conversions.map((c, idx) => (
        <React.Fragment key={idx}>
          <ReviewField
            caption="Conversion Type"
            value={c.type}
            error={extractConversionError(idx, "type")}
          />
          <ReviewField
            caption="Observation Window"
            value={`${c.observationWindow} days`}
            error={extractConversionError(idx, "observationWindow")}
          />
          <ReviewField
            caption="Conversion URL Pattern"
            value={c.urlPattern}
            error={extractConversionError(idx, "urlPattern")}
          />
        </React.Fragment>
      ))}
    </>
  );
}
