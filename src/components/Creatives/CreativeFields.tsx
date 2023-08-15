import {
  FormControl,
  Box,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormikContext } from "formik";
import { CreativeInput } from "graphql/types";
import { NotificationFields } from "./NotificationFields";
import { FormikRadioGroup, FormikTextField } from "form/FormikHelpers";

interface Props {
  allowTypeChange: boolean;
}

export function CreativeFields({ allowTypeChange }: Props) {
  const formik = useFormikContext<CreativeInput>();
  const creativeType = formik.values.type?.code;

  return (
    <>
      <FormikTextField name="name" label="Creative Name" />

      <Box>
        <FormControl
          component="fieldset"
          margin="normal"
          disabled={!allowTypeChange}
        >
          <FormLabel component="legend" color="secondary">
            Creative Type
          </FormLabel>
          <FormikRadioGroup row name="type.code">
            <FormControlLabel
              value="notification_all_v1"
              control={<Radio />}
              label="Push Notification"
            />
          </FormikRadioGroup>
        </FormControl>
      </Box>

      <CreativeTypeSpecificFields creativeType={creativeType} />
    </>
  );
}

const CreativeTypeSpecificFields = ({
  creativeType,
}: {
  creativeType?: string;
}) => {
  if (creativeType === "notification_all_v1") return <NotificationFields />;

  return null;
};
