import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";
import { Route, Switch } from "react-router-dom";
import { AccountChoice } from "auth/registration/AccountChoice";
import { BrowserRegister } from "auth/registration/BrowserRegister";

export function Register() {
  return (
    <Switch>
      {/*<Route path="/register/search" component={AccountChoice} />*/}
      <Route path="/register/browser" component={BrowserRegister} />
      <Route path="/register/complete" component={AdvertiserRegistered} />
      <Route path="" exact={true} component={AccountChoice} />
    </Switch>
  );
}
