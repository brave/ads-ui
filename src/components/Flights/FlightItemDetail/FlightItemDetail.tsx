import {
  Card,
  CardContent,
  Chip,
  withStyles,
} from "material-ui";
import * as moment from "moment";
import * as React from "react";

import { styles } from "./FlightItemDetail.styles";

class FlightItemDetail extends React.Component<any, any> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.flight !== nextProps.flight) {
      return {
        flight: nextProps.flight,
      };
    }
    return null;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      flight: props.flight,
    };
  }

  public render() {
    const { classes } = this.props;
    const { flight } = this.state;
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <div>
              Order: {flight.order}
            </div>
            <div>
              Geo Operator: {flight.geoOperator}
            </div>
            <div>
              Started At: {moment(flight.startedAt).format("DD-MM-YYYY")}
            </div>
            <div>
              End At: {moment(flight.endAt).format("DD-MM-YYYY")}
            </div>
            <div>
              Segments: {this.segmentChips()}
            </div>
            <div>
              Geo Targetings: {this.geoTargetingChips()}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  private segmentChips() {
    return this.state.flight.segments.map((item: any, index: number) => {
      return (
        <Chip key={Math.random()} label={`${item.name} P:${item.priority}`} />
      );
    });
  }

  private geoTargetingChips() {
    return this.state.flight.geoTargetings.map((item: any, index: number) => {
      return (
        <Chip key={Math.random()} label={item.name} />
      );
    });
  }
}

export default withStyles(styles)(FlightItemDetail);
