import {
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import {Form, Formik, FormikValues} from "formik";
import React, {useState} from "react";
import {CampaignFields} from "../campaign/CampaignFields";
import {AdSetFields} from "../adSet/AdSetFields";
import {initialCampaign} from "../../../../types";
import {AdField} from "../ads/AdField";
import {Review} from "../review/Review";

export function CampaignFormV2() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const showCard = (values: FormikValues) => {
    return value > 0 && value !== values.adSets.length + 1;
  }

  return (
    <Container
      maxWidth={false}
    >
      <Formik
        initialValues={initialCampaign}
        onSubmit={(v) => console.log(v)}
        // validationSchema={CampaignSchema}
      >
        {({values}) => (
          <Form>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Campaign" value={0} />
              {values.adSets.map((a, index) => (
                <Tab label={`Ad Set ${index + 1}`} value={index + 1} />
              ))}
              <Tab label="Review" value={values.adSets.length + 1} />
            </Tabs>

            {value === 0 && <CampaignFields onNext={() => setValue(value + 1)} />}

            {showCard(values) && (
              <>
                <AdSetFields
                  tabValue={value}
                  onRemove={() => setValue(value - 1)}
                  onCreate={() => setValue(value + 1)}
                />
                <AdField
                  index={value - 1}
                  onNext={() => setValue(values.adSets.length + 1)}
                />
              </>
            )}

            {value === values.adSets.length + 1 && <Review />}
          </Form>
        )}
      </Formik>
    </Container>
  )
}
