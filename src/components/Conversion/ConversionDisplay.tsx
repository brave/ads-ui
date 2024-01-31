import { Conversion } from "user/views/adsManager/types";
import { FormikErrors } from "formik";
import { ReviewField } from "user/views/adsManager/views/advanced/components/review/components/ReviewField";
import _ from "lodash";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface Props {
  conversions: Conversion[];
  convErrors?: FormikErrors<Conversion>[] | string[] | string;
}

export function ConversionDisplay({ conversions, convErrors }: Props) {
  const lingui = useLingui();
  if (conversions.length === 0) {
    return (
      <ReviewField
        caption={msg`Conversion`}
        value={lingui._(msg`No conversion URL setup`)}
      />
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
        <div key={idx}>
          <ReviewField
            caption={msg`Conversion Type`}
            value={c.type}
            error={extractConversionError(idx, "type")}
          />
          <ReviewField
            caption={msg`Observation Window`}
            value={`${c.observationWindow} days`}
            error={extractConversionError(idx, "observationWindow")}
          />
          <ReviewField
            caption={msg`Conversion URL Pattern`}
            value={c.urlPattern}
            error={extractConversionError(idx, "urlPattern")}
          />
        </div>
      ))}
    </>
  );
}
