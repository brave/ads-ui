import {useFormikContext} from "formik";
import {CampaignForm} from "../../../../types";
import {Box, Card, Divider, List, Typography} from "@mui/material";
import {CustomListItemText} from "../../../../../../../components/List/CustomListItemText";
import React from "react";
import {FormikSubmitButton} from "../../../../../../../form/FormikHelpers";

export function Review() {
  const { values, errors, setFieldTouched } = useFormikContext<CampaignForm>();

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <Box display="flex" flexDirection="column">
      <Card sx={{p: 2, mt: 2}}>
        <Typography variant="h6">
          Campaign
        </Typography>
        <List>
          <CustomListItemText primary="Name" secondary={values.name} />
          <CustomListItemText primary="Start Time" secondary={formatDate(values.startAt)} />
          <CustomListItemText primary="End Time" secondary={formatDate(values.endAt)} />
          <CustomListItemText primary="Lifetime Budget" secondary={`$${values.budget}`} />
          <CustomListItemText primary="Daily Budget" secondary={`$${values.dailyBudget}`} />
          <CustomListItemText primary="Locations" secondary={values.geoTargets.map((t) => t.name).join(", ")} />
        </List>
      </Card>
      {values.adSets.map((adSet, adSetIdx) => (
        <Card sx={{p: 2, mt: 2}}>
          <Typography variant="h6">
            Ad Set { adSetIdx + 1 }
          </Typography>
          <List>
            <CustomListItemText primary="Pricing Type" secondary={adSet.billingType} />
            <CustomListItemText primary="Price" secondary={adSet.billingType} />
            <CustomListItemText primary="Audiences" secondary={adSet.segments.map((s) => s.name).join(", ")} />
            <CustomListItemText primary="Platforms" secondary={adSet.oses.map((o) => o.name).join(", ")} />
            <CustomListItemText primary="Conversion" secondary={adSet.conversions[0].type} />
          </List>
          <Divider sx={{ mt: 2, mb: 2 }} />
          {adSet.creatives.map((ad, adIdx) => (
            <>
              <Typography variant="h6">
                Ad { adIdx + 1 }
              </Typography>
              <List>
                <CustomListItemText primary="Creative Name" secondary={ad.name} />
                <CustomListItemText primary="Creative Type" secondary="Notification Ad" />
                <CustomListItemText primary="Title" secondary={ad.title} />
                <CustomListItemText primary="Body" secondary={ad.body} />
                <CustomListItemText primary="Target Url" secondary={ad.targetUrl} />
              </List>
            </>
          ))}
        </Card>
      ))}

      <FormikSubmitButton isCreate={true} label="Publish Campaign" />
    </Box>
  )
}
