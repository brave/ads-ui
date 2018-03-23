import * as _ from "lodash";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  withStyles,
} from "material-ui";
import * as React from "react";
import { connect } from "react-redux";

import CreativeForm from "../CreativeForm/CreativeForm";

import { styles } from "./CreativesView.style";

class CreativesView extends React.Component<any, any> {
  public getActionButtons() {
    return (
      <div>
        <IconButton color="primary">
          <Icon>pause</Icon>
        </IconButton>
        <IconButton color="primary">
          <Icon>play_arrow</Icon>
        </IconButton>
      </div>
    );
  }

  public render() {
    const { classes, match, creatives } = this.props;
    const id = match.params.id;
    const creative = _.find(creatives, (item) => {
      return item.id === id;
    });
    const tableBodyRows = creative.campaigns.map((item: any) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {item.name}
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            {this.getActionButtons()}
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">{creative.caption}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Detail" />
          <CardContent>
            <CreativeForm creative={creative} />
          </CardContent>
        </Card>
        <Card className={classes.campaignCard}>
          <CardHeader title="Campaigns" action={this.getActionButtons()} />
          <CardContent>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Campaigns
                  </TableCell>
                    <TableCell>
                      Impressions
                  </TableCell>
                    <TableCell>
                      Interactions
                  </TableCell>
                    <TableCell>
                      Performance
                  </TableCell>
                    <TableCell>
                      Controlls
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      test
                    </TableCell>
                    <TableCell>
                      1000
                    </TableCell>
                    <TableCell>
                      1000
                    </TableCell>
                    <TableCell>
                      1000
                    </TableCell>
                    <TableCell>
                      {this.getActionButtons()}
                    </TableCell>
                  </TableRow>
                  {tableBodyRows}
                </TableBody>
              </Table>
            </Paper>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creatives: state.creativeReducer.creatives,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesView));
