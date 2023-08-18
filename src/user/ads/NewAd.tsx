import { CardContainer } from "components/Card/CardContainer";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AdsExistingAd } from "user/ads/AdsNewAd";
import { CreativeSpecificFields } from "components/Creatives/CreativeSpecificFields";
import { useFreshCreatives } from "user/hooks/useAdvertiserCreatives";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignFormat } from "graphql/types";
import { NotificationPreview } from "components/Creatives/NotificationPreview";

export function NewAd() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <CardContainer header="New Ads">
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          flexWrap="wrap"
        >
          <SpecificNewCreative />
          <BoxContainer header={showForm ? "Discard Ad" : "Create New Ad"}>
            <Box
              component={Button}
              height="80px"
              width="350px"
              borderRadius="13px"
              border="1px solid #e2e2e2"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              {showForm ? (
                <RemoveCircleOutlineIcon fontSize="large" />
              ) : (
                <AddCircleOutlineIcon fontSize="large" />
              )}
            </Box>
          </BoxContainer>
        </Stack>
      </CardContainer>
      {!showForm && <AdsExistingAd />}
      {showForm && (
        <CreativeSpecificFields onCreate={() => setShowForm(false)} />
      )}
    </>
  );
}

const SpecificNewCreative = () => {
  const { values } = useFormikContext<CampaignForm>();
  const creatives = useFreshCreatives();

  if (creatives.length === 0) {
    return null;
  }

  if (values.format === CampaignFormat.PushNotification) {
    return creatives.map((c, idx) => (
      <BoxContainer header={c.name} key={idx}>
        <NotificationPreview
          title={c.payloadNotification?.title}
          body={c.payloadNotification?.body}
        />
      </BoxContainer>
    ));
  }
};

// const RemoveHeader = (props: { creative: Creative }) => {
//   const { values, setFieldValue } = useFormikContext<CampaignForm>();
//
//   const onRemoveCreative = async (c: Creative, v: string[] | undefined) => {
//     const removed = _.filter(v ?? [], (n) => n !== c.id);
//     void setFieldValue("creatives", removed);
//   };
//
//   return (
//     <Box display="flex" justifyContent="space-between" alignItems="center">
//       {props.creative.name}
//       <IconButton
//         onClick={() => onRemoveCreative(props.creative, values.creatives)}
//         sx={{ p: 0 }}
//       >
//         <RemoveCircleOutlineIcon color="error" fontSize="small" />
//       </IconButton>
//     </Box>
//   );
// };
