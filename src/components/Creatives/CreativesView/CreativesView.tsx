import { withStyles } from "material-ui";
import * as React from "react";

import { styles } from "./CreativesView.style";

class CreativesView extends React.Component<any, any> {
  public render() {
    const { match } = this.props;
    return (
      <div>
        <h3>view creative</h3>
        <p>{match.params.id}</p>
      </div>
    );
  }
}

export default withStyles(styles)(CreativesView);
