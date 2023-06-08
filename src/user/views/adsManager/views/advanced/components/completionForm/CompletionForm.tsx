import React, { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import present from "../../../../../../../../present.png";
import { LoadingButton } from "@mui/lab";
import { useValidatePaymentSession } from "checkout/hooks/useValidatePaymentSession";

interface Params {
  mode: "edit" | "new";
}

export function CompletionForm() {
  const history = useHistory();
  const params = useParams<Params>();
  const [clickedSurvey, setClickedSurvey] = useState(false);

  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <img src={present} width="600px" style={{ marginRight: 50 }} />
        </Box>

        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Congratulations!
        </Typography>

        {params.mode === "edit" && (
          <>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              Your campaign has been updated! <br />
              If you added new Ads, we'll be in contact as soon as they are
              approved and activated. <br />
              Thank you for using Brave Ads!
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, flexGrow: 0 }}
              onClick={() => history.push("/user/main/campaigns")}
            >
              Continue
            </Button>
          </>
        )}

        {params.mode === "new" && (
          <>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              Your campaign has been created and is now being reviewed by our
              ads team. <br />
              We'll be in contact as soon as your campaign is approved and
              activated.
            </Typography>

            {!clickedSurvey && (
              <Typography sx={{ textAlign: "center", mt: 3 }} variant="h6">
                We value your feedback and would love to hear your thoughts on
                your recent experience. <br />
                Your input will help us improve the Brave Ads platform to better
                meet your needs. <br />
                It only takes a few minutes and your participation will be
                greatly appreciated! <br />
                Thank you for using Brave Ads! <br />
              </Typography>
            )}

            <Stack
              direction="row"
              justifyContent="space-evenly"
              sx={{ mt: 2 }}
              spacing={2}
            >
              <ValidateCampaignButton
                clicked={clickedSurvey}
                onClick={() => setClickedSurvey(true)}
              />
            </Stack>
          </>
        )}
      </Card>
    </Container>
  );
}

function ValidateCampaignButton(props: {
  clicked: boolean;
  onClick: () => void;
}) {
  const history = useHistory();
  const searchParams = new URLSearchParams(window.location.search);
  const session = searchParams.get("sessionId");
  const campaign = searchParams.get("referenceId");

  const { loading } = useValidatePaymentSession({
    sessionId: session,
    campaignId: campaign,
  });

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      sx={{ mt: 2 }}
      spacing={2}
    >
      {!props.clicked && (
        <LoadingButton
          variant="contained"
          onClick={() => props.onClick()}
          href="https://www.surveymonkey.com/r/WSFWF5Y"
          target="_blank"
          loading={loading}
          disabled={loading}
        >
          Take our survey!
        </LoadingButton>
      )}

      <LoadingButton
        variant={props.clicked ? "contained" : "outlined"}
        onClick={async () => {
          history.push("/user/main");
        }}
        loading={loading}
        disabled={loading}
      >
        {props.clicked ? "Continue" : "Skip survey and continue"}
      </LoadingButton>
    </Stack>
  );
}
