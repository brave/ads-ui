import {Box, Divider, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import _ from "lodash";
import React from "react";
import {FormikValues, useFormikContext} from "formik";

export function ObjectiveField() {
  const { values, setFieldValue } = useFormikContext<FormikValues>()

  return (
    <Box>
      <Divider textAlign="left" sx={{fontSize: "24px", mb: 1}}>
        Campaign Objective
      </Divider>
      <Typography variant="body2">
        Choose a campaign objective that fits your business goals.
      </Typography>
      <List sx={{display: "flex", flexDirection: "row", mt: 2}}>
        {["awareness", "engagement", "conversion"].map((o) => (
          <ListItemButton
            sx={{border: "1px solid #e2e2e2", m: 1}}
            onClick={(e) => setFieldValue("objective", o)}
            selected={values.objective === o}
          >
            <ListItemText
              primary={_.capitalize(o)}
              primaryTypographyProps={{
                fontWeight: 'medium',
                variant: 'body2',
                textAlign: "center"
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
