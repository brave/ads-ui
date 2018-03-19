import * as React from "react";

import Body from "./containers/Body";
import Footer from "./containers/Footer";
import Header from "./containers/Header";

import "./App.css";

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>
          <Header></Header>
        </div>
        <div>
          <Body></Body>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
