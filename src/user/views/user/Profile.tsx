import { Container } from "@mui/material";
import { UserForm } from "user/settings/UserForm";
import { UserApiKey } from "user/settings/UserApiKey";
import MiniSideBar from "components/Drawer/MiniSideBar";

export function Profile() {
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
