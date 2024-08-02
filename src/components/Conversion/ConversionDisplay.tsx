import { Conversion } from "@/user/views/adsManager/types";
import { ReviewField } from "@/user/views/adsManager/views/advanced/components/review/components/ReviewField";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { FormikErrors } from "formik";

interface Props {
  conversion?: Conversion;
  convErrors?: FormikErrors<Conversion>;
}

export function ConversionDisplay({ conversion, convErrors }: Props) {
  const { _: lingui } = useLingui();
  if (!conversion) {
    return (
      <ReviewField
        caption={msg`Conversion`}
        value={lingui(msg`No conversion URL setup`)}
      />
    );
  }

  return (
    <div>
      <ReviewField
        caption={msg`Conversion URL Pattern`}
        value={conversion.urlPattern}
        error={convErrors?.urlPattern}
      />
      <ReviewField
        caption={msg`Conversion Observation Window`}
        value={`${conversion.observationWindow} days`}
        error={convErrors?.observationWindow}
      />
    </div>
  );
}
