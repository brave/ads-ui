import { Box, IconButton, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { FormikTextField } from "@/form/FormikHelpers";
import { FieldArray, useFormikContext } from "formik";
import { SearchOptions } from "./form";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Section({ children, title }: { title: string } & PropsWithChildren) {
  return (
    <Box marginBottom={2}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function Finalize() {
  const { values } = useFormikContext<SearchOptions>();

  return (
    <Box>
      <Section title={"Notes"}>
        <FormikTextField
          fullWidth
          label={"Notes"}
          multiline
          rows={4}
          name="notes"
          helperText={
            "Your trial campaign will be reviewed by an Account Manager. Add any notes or questions for them here."
          }
        />
      </Section>
      <Section title={"Query string parameters"}>
        <Typography variant="body2">
          The following query string parameters will be added to your landing
          page URLs. This will allow you to track the performance of your ads.
        </Typography>

        <FieldArray name="queryParams">
          {({ remove, push }) => (
            <>
              {values.queryParams.map((q, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="baseline"
                >
                  <FormikTextField
                    label={"Query parameter"}
                    name={`queryParams.${idx}.key`}
                  />
                  {" = "}
                  <FormikTextField
                    label={"Value"}
                    name={`queryParams.${idx}.value`}
                  />
                  <IconButton
                    onClick={() => remove(idx)}
                    sx={{ alignSelf: "center" }}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </Box>
              ))}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                gap={1}
                alignItems="baseline"
              >
                <IconButton onClick={() => push({ key: "", value: "" })}>
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </>
          )}
        </FieldArray>
      </Section>
    </Box>
  );
}
