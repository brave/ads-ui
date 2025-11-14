import { useState } from "react";

import { useParams, Link as RouterLink } from "react-router-dom";
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { useValidatePaymentSession } from "@/checkout/hooks/useValidatePaymentSession";
import { useTrackWithMatomo } from "@/hooks/useTrackWithMatomo";

interface Params {
  mode: "edit" | "new";
}

export function CompletionForm() {
  const params = useParams<Params>();
  const [clickedSurvey, setClickedSurvey] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const { trackMatomoEvent } = useTrackWithMatomo({
    documentTitle: `Campaign ${params.mode === "edit" ? "Update" : "Creation"} Complete`,
  });

  const session = searchParams.get("sessionId");
  const campaign = searchParams.get("referenceId");

  const { loading } = useValidatePaymentSession({
    sessionId: session,
    campaignId: campaign,
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 5, ml: "auto" }}>
      <Card
        sx={{
          p: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Congratulations! 🎉
        </Typography>

        {params.mode === "edit" && (
          <>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              Your campaign has been updated! <br />
              If you added new ads, we&rsquo;ll be in contact as soon as they
              are approved and activated. <br />
              Thank you for using Brave Ads!
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, flexGrow: 0 }}
              disabled={loading}
              loading={loading}
              component={RouterLink}
              to="/user/main/campaigns"
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
              We&rsquo;ll be in contact as soon as your campaign is approved and
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
                loading={loading}
                clicked={clickedSurvey}
                onClick={() => {
                  trackMatomoEvent("survey", "click");
                  setClickedSurvey(true);
                }}
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
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      sx={{ mt: 2 }}
      spacing={2}
    >
      {!props.clicked && (
        <Button
          variant="contained"
          onClick={() => props.onClick()}
          href="https://www.surveymonkey.com/r/WSFWF5Y"
          target="_blank"
          loading={props.loading}
          disabled={props.loading}
        >
          Take our survey!
        </Button>
      )}

      <Button
        variant={props.clicked ? "contained" : "outlined"}
        component={RouterLink}
        to="/user/main/campaign"
        loading={props.loading}
        disabled={props.loading}
      >
        {props.clicked ? "Continue" : "Skip survey and continue"}
      </Button>
    </Stack>
  );
}
