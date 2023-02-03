import {
  Box,
  Card,
  Container,
  Divider, InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import _ from "lodash";
import {CampaignFormat, CampaignPacingStrategies} from "../../../../../../../graphql/types";
import {FieldArray, Form, Formik} from "formik";
import {FormikRadioControl, FormikTextField} from "../../../../../../../form/FormikHelpers";
import {CampaignDateRange} from "../../../../../../../components/Campaigns/CampaignDateRange";
import {defaultEndDate, defaultStartDate} from "../../../../../../../form/DateFieldHelpers";
import {LocationPicker} from "../../../../../../../components/Location/LocationPicker";
import React from "react";
import {SegmentPicker} from "../../../../../../../components/Segment/SegmentPicker";
import {PlatformPicker} from "../../../../../../../components/Platform/PlatformPicker";
import {ConversionFields} from "../../../../../../../components/Conversion/ConversionFields";

export function CampaignFormV2() {
  const defaultValues = {
    startAt: defaultStartDate(),
    endAt: defaultEndDate(),
    budget: "",
    currency: "USD",
    dailyBudget: "",
    dailyCap: 1,
    geoTargets: [],
    adSets: [{
      name: "",
      billingType: "",
      segments: [{
        code: "Svp7l-zGN",
        name: "untargeted"
      }],
      oses: [],
      conversions: [{
        type: "",
        observationWindow: "",
      }],
      ads: [{
        state: "under_review",
        creativeId: "",
      }]
    }],
    format: CampaignFormat.PushNotification,
    name: "",
    state: "under_review",
    type: "paid",
    pacingStrategy: CampaignPacingStrategies.Original,
    objective: "",
  };


  return (
    <Container
      maxWidth={false}
    >
      <Formik
        initialValues={defaultValues}
        onSubmit={(v) => console.log(v)}
        // validationSchema={CampaignSchema}
      >
        {({values}) => (
          <Form>
            <Card sx={{p: 2, mt: 2}}>
              <Box>
                <Divider textAlign="left" sx={{fontSize: "24px", mb: 1}}>
                  Campaign Objective
                </Divider>
                <Typography variant="body2">
                  Choose a campaign objective that fits your business goals.
                </Typography>
                <List sx={{display: "flex", flexDirection: "row", mt: 2}}>
                  {["awareness", "engagement", "conversion"].map((o) => (
                    <ListItemButton sx={{border: "1px solid #e2e2e2", m: 1}}>
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
              <Box>
                <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 2}}>
                  Campaign Details
                </Divider>
                <Typography variant="body2" sx={{mb: 2}}>
                  Campaigns are used to define your budgets and advertising objectives.
                </Typography>
                <FormikTextField name="name" label="Campaign Name" sx={{mb: 3}}/>
                <CampaignDateRange/>
              </Box>
              <Box>
                <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 2}}>
                  Budget
                </Divider>
                <Typography variant="body2" sx={{mb: 5}}>
                  Set a limit on how much your campaign will spend.
                </Typography>
                <Stack direction="column" spacing={5}>
                  <FormikTextField
                    name="budget"
                    label="Lifetime Budget"
                    margin="none"
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />

                  <FormikTextField
                    name="dailyBudget"
                    label="Daily Budget"
                    type="number"
                    margin="none"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Stack>
              </Box>
              <Box mb={5}>
                <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 2}}>
                  Location
                </Divider>
                <Typography variant="body2" sx={{mb: 5}}>
                  Select the geographic regions where your ads will be shown.
                </Typography>
                <LocationPicker states={true}/>
              </Box>
            </Card>
            <FieldArray name="adSets">
              {({insert, remove, push}) => (
                <>
                  {values.adSets.map((ads, index) => (
                    <Card sx={{mt: 2, p: 2}}>
                      <Box>
                        <Divider textAlign="left" sx={{fontSize: "24px", mb: 1}}>
                          Ad Set Details
                        </Divider>
                        <Typography variant="body2" sx={{mb: 2}}>
                          Ad sets are used to define your audience and how budget is spent
                        </Typography>
                        <FormikTextField name={`adSets.${index}.name`} label="AdSet Name"/>
                        <FormikRadioControl
                          name="billingType"
                          label="Pricing Type"
                          options={[
                            {value: "cpm", label: "CPM (Impressions)"},
                            {value: "cpc", label: "CPC (Clicks)"},
                          ]}
                        />

                        <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 3}}>
                          Categories
                        </Divider>
                        <Typography variant="body2" sx={{mb: 2}}>
                          Select the audience you would like to advertise to by interests.
                        </Typography>
                        <SegmentPicker idx={index}/>

                        <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 3}}>
                          Platforms
                        </Divider>
                        <Typography variant="body2" sx={{mb: 2}}>
                          Select the devices and platforms you would like to advertise to.
                        </Typography>
                        <PlatformPicker idx={index}/>

                        <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 3}}>
                          Conversion
                        </Divider>
                        <Typography variant="body2" sx={{mb: 2}}>
                          Define post-engagement analytics.
                        </Typography>
                        <ConversionFields idx={index}/>
                      </Box>

                      <Card>

                      </Card>
                    </Card>
                  ))}
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
