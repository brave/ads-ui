import {
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import {Form, Formik} from "formik";
import React, {useState} from "react";
import {CampaignFields} from "../campaign/CampaignFields";
import {AdSetFields} from "../adSet/AdSetFields";
import {initialCampaign} from "../../../../types";
import {AdField} from "../ads/AdField";

export function CampaignFormV2() {
  const [value, setValue] = useState(0);
  const [showAd, setShowAd] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            </Tabs>

            {value === 0 && <CampaignFields onNext={() => setValue(value + 1)} />}

            {value > 0 && !showAd && (
              <AdSetFields
                tabValue={value}
                onRemove={() => {
                  setValue(value - 1);
                  setShowAd(false);
                }}
                onNext={() => setShowAd(true)}
              />
            )}

            {value > 0 && showAd && (
              <AdField
                index={value - 1}
                onBack={() => setShowAd(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </Container>
  )
}
