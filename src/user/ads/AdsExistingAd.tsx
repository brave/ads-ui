import {
  Alert,
  Box,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useFormikContext } from "formik";
import {
  AdvertiserCreativesDocument,
  CampaignFormat,
  CreativeFragment,
} from "@/graphql-client/graphql";
import _ from "lodash";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { CampaignForm } from "@/user/views/adsManager/types";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef, useState } from "react";
import { CreativeSelect } from "@/components/Creatives/CreativeSelect";
import { FormContext } from "@/state/context";
import { useAdvertiserCreatives } from "@/user/hooks/useAdvertiserCreatives";
import { modalStyles } from "@/theme";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useQuery } from "@apollo/client";
import { filterCreativesByCampaignFormat } from "@/user/ads/filterCreativesByCampaignFormat";

interface Props {
  index: number;
}

export function AdsExistingAd({ index }: Props) {
  const { _: lingui } = useLingui();
  const { isShowingAds, setIsShowingAds } = useContext(FormContext);
  const { creatives } = useAdvertiserCreatives();
  const { values } = useFormikContext<CampaignForm>();
  const { advertiser } = useAdvertiser();
  const original = useRef<CreativeFragment[]>([]);
  const [options, setOptions] = useState<CreativeFragment[]>();
  const { loading } = useQuery(AdvertiserCreativesDocument, {
    variables: { advertiserId: advertiser.id },
    onCompleted(data) {
      const creativeOptionList = _.orderBy(
        filterCreativesByCampaignFormat(
          data.advertiser?.creatives ?? [],
          values.format,
        ),
        ["type.code", "createdAt"],
        ["asc", "desc"],
      ) as CreativeFragment[];

      const filtered = creativeOptionList.filter(
        (c) => c.state === "active" || c.state === "draft",
      );
      const excludeExisting = filtered.filter((e) => {
        const associatedOptions = creatives ?? [];
        return associatedOptions.find((ao) => ao.id === e.id) === undefined;
      });
      original.current = excludeExisting;
      setOptions(excludeExisting);
    },
  });

  if (loading) {
    return <LinearProgress />;
  }

  if (options && options.length === 0) {
    return (
      <Alert severity="info" onClose={() => setIsShowingAds(false)}>
        <Trans>No previous ads available</Trans>
      </Alert>
    );
  }

  return (
    <Modal open={isShowingAds} onClose={() => setIsShowingAds(false)}>
      <Box sx={modalStyles}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          <Trans>Add an existing ad</Trans>
        </Typography>

        <Typography variant="subtitle1" fontWeight={500}>
          <Trans>
            Ads are modular building blocks that can be paired with ad sets to
            build unique combinations. Your previously created ads will show
            here. Select by using the box next to the name. Use the
            &quot;Complete selection&quot; button to finish.
          </Trans>
        </Typography>

        <Box display="flex" justifyContent="start" mt={2} mb={3}>
          <TextField
            placeholder={lingui(msg`Filter ads by name...`)}
            size="small"
            variant="standard"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              if (!value || value.trim() !== "") {
                setOptions(
                  original.current.filter((co) =>
                    co.name.toLowerCase().includes(value),
                  ),
                );
              } else {
                setOptions(original.current);
              }
            }}
          />
        </Box>

        {[CampaignFormat.PushNotification].includes(values.format) && (
          <CreativeSelect
            options={(options ?? []).map((o) => ({
              ...o,
              advertiserId: advertiser.id,
              included: false,
            }))}
            index={index}
            useSelectedAdStyle={false}
            useButtonSelection
          />
        )}
      </Box>
    </Modal>
  );
}
