import { AdvertiserRegistered } from "@/auth/registration/AdvertiserRegistered";
import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRegister } from "@/auth/registration/BrowserRegister";
import { SearchRegister } from "./SearchRegister";

export function Register() {
  return (
    <Switch>
      <Route path="/register/search" component={SearchRegister} />
      <Route path="/register/browser" component={BrowserRegister} />
      <Route path="/register/complete" component={AdvertiserRegistered} />
      <Redirect exact={true} from="" to="/register/browser" />
    </Switch>
  );
}
