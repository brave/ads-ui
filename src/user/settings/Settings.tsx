import { useContext, useState } from "react";
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
import { useTrackWithMatomo } from "hooks/useTrackWithMatomo";
import { Trans } from "@lingui/macro";

const Settings = () => {
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: "Advertiser Settings",
  });
  const { advertiser: activeAdvertiser, advertisers } = useAdvertiser();
  const [advertiser, setAdvertiser] = useState(activeAdvertiser);
  const { setDrafts } = useContext(DraftContext);

  const setActiveAdvertiserWithId = (e: SelectChangeEvent) => {
    const id = e.target.value;
    const adv = _.find(advertisers, { id });

    if (adv) {
      trackMatomoEvent("advertiser", "switched-advertiser");
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

          <CardContainer header={<Trans>Organization</Trans>}>
            <Typography>
              <Trans>
                You may have access to multiple organisations. Switch between
                them here.
              </Trans>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>
                  <Trans>Select Organization</Trans>
                </InputLabel>
                <Select
                  value={advertiser.id}
                  label={<Trans>Select Organization</Trans>}
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
