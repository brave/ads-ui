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
import {CampaignFields} from "../campaign/CampaignFields";
import {AdSetFields} from "../adSet/AdSetFields";

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
            <CampaignFields />

            <AdSetFields values={values} />
          </Form>
        )}
      </Formik>
    </Container>
  )
}
