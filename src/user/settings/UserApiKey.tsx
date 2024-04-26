import { useState } from "react";
import { CardContainer } from "@/components/Card/CardContainer";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { useGenerateApiKey } from "@/user/hooks/useGenerateApiKey";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function UserApiKey() {
  const { advertiser } = useAdvertiser();
  const { _ } = useLingui();
  const { generate, data, loading } = useGenerateApiKey();
  const [open, setOpen] = useState(false);

  return (
    <CardContainer header={<Trans>Profile API Key</Trans>}>
      <Typography>
        <Trans>
          API keys are used to get data from the reporting endpoints. They are
          unique to you.
        </Trans>
      </Typography>

      <div style={{ margin: "10px" }} />

      <Typography>
        <Trans>
          Documentation can be found{" "}
          <Link
            href="https://github.com/brave/ads-ui/wiki/Brave-Ads-Advertiser-API-Guide"
            underline="none"
          >
            here
          </Link>{" "}
          on how to use the API.
        </Trans>
      </Typography>

      <div style={{ margin: "10px" }} />

      <Button onClick={() => setOpen(true)} variant="contained" size="large">
        <Trans>Generate API Key</Trans>
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>
          {data ? (
            <Trans>New API Key</Trans>
          ) : (
            <Trans>Generate a new API key?</Trans>
          )}
        </DialogTitle>
        <DialogContent>
          {!data && (
            <DialogContentText>
              <Trans>
                Generating a new API key will result in the deactivation of your
                previous key, rendering it unusable for future requests. Make
                sure to update your code with the new key to avoid disruptions
                in your application&rsquo;s functionality.
              </Trans>
            </DialogContentText>
          )}
          {data && (
            <Box>
              <DialogContentText>
                <Trans>
                  This key is unique to you, make sure to safely store it and
                  avoid sharing it with others to prevent unauthorized access.
                </Trans>
              </DialogContentText>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                component={Typography}
                bgcolor="#ededed"
                borderRadius={"16px"}
                mt={1}
                padding={1}
              >
                {data}
                <IconButton
                  onClick={() =>
                    window.navigator.clipboard
                      .writeText(data)
                      .then(() => alert(_(msg`Key copied`)))
                  }
                  sx={{ ml: 1 }}
                >
                  <ContentCopyOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            {data ? <Trans>Close</Trans> : <Trans>Cancel</Trans>}
          </Button>
          {!data && (
            <LoadingButton
              disabled={loading}
              loading={loading}
              onClick={() => generate(advertiser.id)}
            >
              <Trans>Generate</Trans>
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </CardContainer>
  );
}
