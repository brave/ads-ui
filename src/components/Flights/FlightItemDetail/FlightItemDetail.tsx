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
  public render() {
    const { classes, flight } = this.props;
    const segmentChips = flight.segments.map((item: any, index: number) => {
      return(
        <Chip key={item.code} label={item.name} />
      );
    });
    const geoTargetingChips = flight.geoTargetings.map((item: any, index: number) => {
      return(
        <Chip key={item.code} label={item.name} />
      );
    });
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
              Segments: {segmentChips}
            </div>
            <div>
              Geo Targetings: {geoTargetingChips}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(FlightItemDetail);
