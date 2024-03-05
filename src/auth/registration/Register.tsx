import { AdvertiserRegistered } from "auth/registration/AdvertiserRegistered";
import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRegister } from "auth/registration/BrowserRegister";

export function Register() {
  // TODO: uncomment search routes when back end is ready
  return (
    <Switch>
      {/*<Route path="/register/search" component={SearchRegister} />*/}
      <Route path="/register/browser" component={BrowserRegister} />
      <Route path="/register/complete" component={AdvertiserRegistered} />
      <Redirect exact={true} to="/register/browser" />
      {/*<Route exact={true} component={AccountChoice} />*/}
    </Switch>
  );
}
