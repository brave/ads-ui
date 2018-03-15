import Button from "material-ui/Button";
import * as React from "react";

import "./Dashboard.css";

class Dashboard extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <h1>Dashboard Component</h1>
        <div>
          {(() => {
            if (this.props.user.loggedIn) {
              return (<Button variant="raised" color="primary" onClick={() => this.logOut()}>Log Out</Button>);
            } else {
              return (<Button variant="raised" color="secondary" onClick={() => this.logIn()}>Log In</Button>);
            }
          })()}
        </div>
      </div>
    );
  }

  private logIn() {
    this.props.logIn({});
  }

  private logOut() {
    this.props.logOut({});
  }
}

export default Dashboard;
