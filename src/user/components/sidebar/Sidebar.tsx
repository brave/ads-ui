import * as React from "react";
import CampaignIcon from '@mui/icons-material/Campaign';
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useHistory} from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const history = useHistory();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ mt: 8 }}>
        <ListItemButton selected onClick={() => history.push("/user/main/campaigns")}>
          <ListItemText primary="Campaigns"/>
          <ListItemIcon>
            <CampaignIcon/>
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
