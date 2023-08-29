import {
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import HelpIcon from "@mui/icons-material/Help";

export function FormatField() {
  return (
    <CardContainer header="Format">
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body2">
          Choose what tye of campaign you would like to run
        </Typography>
        <IconButton
          size="small"
          onClick={() =>
            window.open(
              "https://brave.com/brave-ads/ad-formats/",
              "__blank",
              "noopener",
            )
          }
        >
          <HelpIcon fontSize="small" />
        </IconButton>
      </Stack>
      <List sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <FormatItemButton format={CampaignFormat.PushNotification} />
        <FormatItemButton format={CampaignFormat.NewsDisplayAd} />
      </List>
    </CardContainer>
  );
}

const FormatItemButton = (props: { format: CampaignFormat }) => {
  const [, meta, helper] = useField<CampaignFormat>("format");

  return (
    <ListItemButton
      selected={meta.value === props.format}
      onClick={() => helper.setValue(props.format)}
      sx={{
        p: 2,
        borderRadius: "16px",
        border: "1px solid #7c91ff",
      }}
    >
      {_.startCase(_.lowerCase(props.format))}
    </ListItemButton>
  );
};
