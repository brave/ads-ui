import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Trans as TransWithId } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";

interface Params {
  routes: { label: MessageDescriptor; value: string }[];
}

export function RouteSelectionButton({ routes }: Params) {
  const history = useHistory();

  return (
    <BottomNavigation
      showLabels
      value={history.location.pathname}
      sx={{
        backgroundColor: "inherit",
        height: "50px",
        justifyContent: "left",
      }}
    >
      {routes.map((r) => (
        <BottomNavigationAction
          key={`navigation_tab_${r.value}`}
          label={<TransWithId id={r.label.id} />}
          sx={{
            textAlign: "left",
            p: 0,
            minWidth: "60px",
            maxWidth: "60px",
          }}
          value={`/user/main/${r.value}`}
          component={RouterLink}
          to={`/user/main/${r.value}`}
        />
      ))}
    </BottomNavigation>
  );
}
