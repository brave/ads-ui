import * as React from "react";

import CreativeItem from "./CreativeItem/CreativeItem";

class Creatives extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div>
          Creatives
        </div>
        <div>
          <CreativeItem/>
          </div>
      </div>
    );
  }
}

export default Creatives;
