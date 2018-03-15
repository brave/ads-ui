import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import {
  Link,
  Route,
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              ADS UI
          </Typography>
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div>
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default App;
