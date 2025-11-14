import { Conversion } from "@/user/views/adsManager/types";
import { ReviewField } from "@/user/views/adsManager/views/advanced/components/review/components/ReviewField";
import { FormikErrors } from "formik";

interface Props {
  conversion?: Conversion;
  convErrors?: FormikErrors<Conversion>;
}

export function ConversionDisplay({ conversion, convErrors }: Props) {
  if (!conversion) {
    return (
      <ReviewField caption={"Conversion"} value={"No conversion URL setup"} />
    );
  }

  return (
    <div>
      <ReviewField
        caption={"Conversion URL Pattern"}
        value={conversion.urlPattern}
        error={convErrors?.urlPattern}
      />
      <ReviewField
        caption={"Conversion Observation Window"}
        value={`${conversion.observationWindow} days`}
        error={convErrors?.observationWindow}
      />
    </div>
  );
}
