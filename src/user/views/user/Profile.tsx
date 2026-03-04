import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { UserApiKey } from "@/user/settings/UserApiKey";
import { UserForm } from "@/user/settings/UserForm";
import { Container } from "@mui/material";

export function Profile() {
  useTrackMatomoPageView({ documentTitle: "Advertiser Profile" });
  return (
    <MiniSideBar>
      <Container>
        <div style={{ marginTop: "10px" }} />
        <UserForm />
        <div style={{ marginBottom: "40px" }} />
        <UserApiKey />
      </Container>
    </MiniSideBar>
  );
}
