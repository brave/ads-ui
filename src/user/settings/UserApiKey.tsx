import React, { useState } from "react";
import { CardContainer } from "components/Card/CardContainer";
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
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useGenerateApiKey } from "user/hooks/useGenerateApiKey";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export function UserApiKey() {
  const { advertiser } = useAdvertiser();
  const { generate, data, loading } = useGenerateApiKey();
  const [open, setOpen] = useState(false);

  return (
    <CardContainer header="Profile API Key">
      <Typography>
        API keys are used to get data from the reporting endpoints. They are
        unique to you.
      </Typography>

      <div style={{ margin: "10px" }} />

      <Typography>
        Documentation can be found{" "}
        <Link
          href="https://github.com/brave/ads-ui/wiki/Brave-Ads-Advertiser-API-Guide"
          underline="none"
        >
          here
        </Link>{" "}
        on how to use the API.
      </Typography>

      <div style={{ margin: "10px" }} />

      <Button onClick={() => setOpen(true)} variant="contained" size="large">
        Generate API Key
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>
          {data ? "New API Key" : "Generate a new API key?"}
        </DialogTitle>
        <DialogContent>
          {!data && (
            <DialogContentText>
              Generating a new API key will result in the deactivation of your
              previous key, rendering it unusable for future requests. Make sure
              to update your code with the new key to avoid disruptions in your
              application's functionality.
            </DialogContentText>
          )}
          {data && (
            <Box>
              <DialogContentText>
                This key is unique to you, make sure to safely store it and
                avoid sharing it with others to prevent unauthorized access.
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
                      .then(() => alert("Key copied"))
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
            {data ? "Close" : "Cancel"}
          </Button>
          {!data && (
            <LoadingButton
              disabled={loading}
              loading={loading}
              onClick={() => generate(advertiser.id)}
            >
              Generate
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </CardContainer>
  );
}
