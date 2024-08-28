import { AdvertiserRegistered } from "@/auth/registration/AdvertiserRegistered";
import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRegister } from "@/auth/registration/BrowserRegister";

export default function Register() {
  return (
    <Switch>
      <Route path="/register/browser" component={BrowserRegister} />
      <Route path="/register/complete" component={AdvertiserRegistered} />
      <Redirect exact from="/register/search" to="/search" />
      <Redirect exact from="" to="/register/browser" />
    </Switch>
  );
}
