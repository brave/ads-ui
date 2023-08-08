import React, { useContext, useState } from "react";
import _ from "lodash";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { setActiveAdvertiser } from "auth/util";
import { CardContainer } from "components/Card/CardContainer";
import { DraftContext } from "state/context";
import { NewKeyPairModal } from "user/settings/NewKeyPairModal";
import MiniSideBar from "components/Drawer/MiniSideBar";

const Settings = () => {
  const { advertiser: activeAdvertiser, advertisers } = useAdvertiser();
  const [advertiser, setAdvertiser] = useState(activeAdvertiser);
  const { setDrafts } = useContext(DraftContext);

  const setActiveAdvertiserWithId = (e: SelectChangeEvent) => {
    const id = e.target.value;
    const adv = _.find(advertisers, { id });

    if (adv) {
      setAdvertiser(adv);
      setActiveAdvertiser(adv?.id);
      setDrafts();
    }
  };

  return (
    <MiniSideBar>
      <Container>
        <Stack spacing={2} mt={1}>
          <NewKeyPairModal advertiser={advertiser} />

          <CardContainer header="Organization">
            <Typography>
              You may have access to multiple organisations. Switch between them
              here.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Select Organization</InputLabel>
                <Select
                  value={advertiser.id}
                  label="Select Organization"
                  onChange={(e) => setActiveAdvertiserWithId(e)}
                >
                  {advertisers.map((a) => (
                    <MenuItem key={a.id} value={a.id}>
                      {a.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContainer>
        </Stack>
      </Container>
    </MiniSideBar>
  );
};

export default Settings;
