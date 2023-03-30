import React from "react";

import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";

interface Params {
  mode: "edit" | "new";
}

export function CompletionForm() {
  const history = useHistory();
  const params = useParams<Params>();

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
        <img src="/present.png" width="600px" style={{ marginRight: 50 }} />
      </Box>

      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Congratulations!
      </Typography>

      {params.mode === "edit" && (
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Your campaign has been updated and new creatives will be reviewed by
          our ads team. <br /> We'll send you an e-mail as soon as your
          creatives are approved and activated. Thank you for using Brave Ads!
        </Typography>
      )}

      {params.mode === "new" && (
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Your campaign has been created and is now being reviewed by our ads
          team. <br />
          We'll send you an e-mail as soon as your campaign is approved and
          activated. Thank you for using Brave Ads!
        </Typography>
      )}

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, flexGrow: 0 }}
        onClick={() => history.push("/user/main/campaigns")}
      >
        Done
      </Button>
    </Card>
  );
}
