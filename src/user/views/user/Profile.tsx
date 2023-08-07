import { Container } from "@mui/material";
import { UserForm } from "user/settings/UserForm";
import { DashboardButton } from "components/Button/DashboardButton";

export function Profile() {
  return (
    <Container>
      <div style={{ marginTop: "10px" }} />
      <DashboardButton />
      <UserForm />
    </Container>
  );
}
