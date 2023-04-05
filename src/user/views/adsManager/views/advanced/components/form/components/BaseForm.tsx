import { Form, FormikValues } from "formik";
import { IconButton, Stack, Tab, Tabs, Tooltip } from "@mui/material";
import { CampaignFields } from "../../campaign/CampaignFields";
import { AdSetFields } from "../../adSet/AdSetFields";
import { AdField } from "../../ads/AdField";
import { Review } from "../../review/Review";
import React, { useContext, useState } from "react";
import { CampaignForm } from "../../../../../types";
import { IAdvertiser } from "../../../../../../../../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { DraftContext } from "../../../../../../../../state/context";
import { useHistory } from "react-router-dom";
import { DeleteDraft } from "./DeleteDraft";

interface Props {
  isEdit: boolean;
  values: CampaignForm;
  advertiser: IAdvertiser;
  draftId?: string;
}

export function BaseForm({ isEdit, values, advertiser, draftId }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const showCard = (values: FormikValues) => {
    return value > 0 && value !== values.adSets.length + 1;
  };

  return (
    <Form>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Campaign" value={0} />
          {values.adSets.map((a, index) => (
            <Tab label={`Ad Set ${index + 1}`} value={index + 1} />
          ))}
          <Tab label="Review" value={values.adSets.length + 1} />
        </Tabs>
        {draftId && !isEdit && <DeleteDraft draftId={draftId} />}
      </Stack>

      {value === 0 && (
        <CampaignFields
          onNext={() => setValue(value + 1)}
          isEdit={isEdit}
          advertiser={advertiser}
        />
      )}

      {showCard(values) && (
        <>
          <AdSetFields
            tabValue={value}
            onRemove={() => setValue(value - 1)}
            onCreate={() => setValue(value + 1)}
            isEdit={isEdit}
          />
          <AdField
            index={value - 1}
            onNext={() => setValue(values.adSets.length + 1)}
            isEdit={isEdit}
          />
        </>
      )}

      {value === values.adSets.length + 1 && <Review isEdit={isEdit} />}
    </Form>
  );
}
