import * as React from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const drawerWidth = 240;

interface Props {
  canCreate: boolean;
}

function Sidebar({ canCreate }: Props) {
  const history = useHistory();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar canCreate={canCreate} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ mt: 8 }}>
          <ListItemButton
            selected
            onClick={() => history.push("/user/main/campaigns")}
          >
            <ListItemText disableTypography>
              <Typography variant="h6">Campaigns</Typography>
            </ListItemText>
            <ListItemIcon>
              <CampaignIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
