import React, { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import present from "../../../../../../../../present.png";

interface Params {
  mode: "edit" | "new";
}

export function CompletionForm() {
  const history = useHistory();
  const params = useParams<Params>();
  const [clickedSurvey, setClickedSurvey] = useState(false);

  return (
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
            Your campaign has been updated and any new creatives will be
            reviewed by our ads team. <br />
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
            Your campaign has been created and is now being reviewed by our ads
            team. <br />
            We'll be in contact as soon as your campaign is approved and
            activated.
          </Typography>

          {!clickedSurvey && (
            <Typography sx={{ textAlign: "center", mt: 3 }} variant="h6">
              We value your feedback and would love to hear your thoughts on
              your recent experience. <br />
              Your input will help us improve the Brave Ads platform to better
              meet your needs. <br />
              It only takes a few minutes and your participation will be greatly
              appreciated! <br />
            </Typography>
          )}

          <Stack
            direction="row"
            justifyContent="space-evenly"
            sx={{ mt: 2 }}
            spacing={2}
          >
            {!clickedSurvey && (
              <Button
                variant="contained"
                onClick={() => setClickedSurvey(true)}
                href="https://www.surveymonkey.com/r/WSFWF5Y"
                target="_blank"
              >
                Take our survey!
              </Button>
            )}

            <Button
              variant={clickedSurvey ? "contained" : "outlined"}
              onClick={() => history.push("/user/main/campaigns")}
            >
              {clickedSurvey ? "Continue" : "Skip survey and continue"}
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
}
