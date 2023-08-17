import {
  FormControl,
  Box,
  FormLabel,
  ListItemButton,
  List,
} from "@mui/material";
import { useFormikContext } from "formik";
import { CreativeInput } from "graphql/types";
import { NotificationFields } from "./NotificationFields";
import { FormikTextField } from "form/FormikHelpers";

interface Props {
  allowTypeChange: boolean;
}

export function CreativeFields({ allowTypeChange }: Props) {
  const formik = useFormikContext<CreativeInput>();

  const supportedTypes = [
    {
      value: "notification_all_v1",
      label: "Push Notification",
    },
  ];

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
          <List>
            {supportedTypes.map((s) => (
              <ListItemButton
                selected={formik.values.type.code === s.value}
                disabled={formik.values.type.code === s.value}
                key={s.value}
                sx={{
                  borderRadius: "16px",
                  justifyContent: "center",
                  border: "1px solid #e2e2e2",
                }}
                onClick={() => formik.setFieldValue("type.code", s.value)}
              >
                {s.label}
              </ListItemButton>
            ))}
          </List>
        </FormControl>
      </Box>

      <CreativeTypeSpecificFields creativeType={formik.values.type.code} />
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
