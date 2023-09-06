import {
  Alert,
  Box,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import {
  CreativeFragment,
  useAdvertiserCreativesQuery,
} from "graphql/creative.generated";
import { isCreativeTypeApplicableToCampaignFormat } from "user/library";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CampaignForm } from "user/views/adsManager/types";
import { CardContainer } from "components/Card/CardContainer";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef, useState } from "react";
import { CreativeSelect } from "components/Creatives/CreativeSelect";
import { FormContext } from "state/context";
import { useAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";

function filterCreativesBasedOnCampaignFormat(
  creatives: CreativeFragment[],
  campaignFormat: CampaignFormat | null,
): CreativeFragment[] {
  if (!campaignFormat) return creatives;

  return creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, campaignFormat),
  );
}

export function AdsExistingAd() {
  const { setIsShowingAds } = useContext(FormContext);
  const { creatives } = useAdvertiserCreatives();
  const { values } = useFormikContext<CampaignForm>();
  const { advertiser } = useAdvertiser();
  const original = useRef<CreativeFragment[]>([]);
  const [options, setOptions] = useState<CreativeFragment[]>();
  const { loading } = useAdvertiserCreativesQuery({
    variables: { advertiserId: advertiser.id },
    onCompleted(data) {
      const creativeOptionList = _.orderBy(
        filterCreativesBasedOnCampaignFormat(
          data.advertiser?.creatives ?? [],
          values.format,
        ),
        ["type.code", "createdAt"],
        ["asc", "desc"],
      ) as CreativeFragment[];

      const filtered = creativeOptionList.filter((c) => c.state === "active");
      const exludeExisting = filtered.filter((e) => {
        const associatedOptions = creatives ?? [];
        return associatedOptions.find((ao) => ao.id === e.id) === undefined;
      });
      original.current = exludeExisting;
      setOptions(exludeExisting);
    },
  });

  if (loading) {
    return <LinearProgress />;
  }

  if (options && options.length === 0) {
    return (
      <Alert severity="info" onClose={() => setIsShowingAds(false)}>
        No previous Ads available
      </Alert>
    );
  }

  return (
    <CardContainer header="Existing Ads">
      <Typography variant="h1" sx={{ mb: 2 }}>
        Add an existing Ad
      </Typography>

      <Typography variant="subtitle1" fontWeight={500}>
        Ads are modular building blocks that can be paired with ad sets to build
        unique combinations. Your previously approved ads will show here. Select
        by using the box next to the name. Use the &quot;Complete
        selection&quot; button to finish.
      </Typography>

      <Box display="flex" justifyContent="start" mt={2} mb={3}>
        <TextField
          placeholder="Filter ads by name..."
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

      <CreativeSpecificSelect options={options ?? []} format={values.format} />
    </CardContainer>
  );
}

const CreativeSpecificSelect = (props: {
  format: CampaignFormat;
  options: CreativeFragment[];
}) => {
  const { advertiser } = useAdvertiser();

  if (props.format === CampaignFormat.PushNotification)
    return (
      <CreativeSelect
        options={props.options.map((o) => ({
          ...o,
          advertiserId: advertiser.id,
          included: false,
        }))}
        useSelectedAdStyle={false}
        showState={false}
      />
    );

  return null;
};
