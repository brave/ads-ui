import {
  Button,
  Card, CardContent,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { CreateCreativeInstances } from "../../../actions";

import CreativeSetAddCreative from "../../CreativeSets/CreativeSetAddCreative/CreativeSetAddCreative";

import CreativeInstanceItem from "../CreativeInstanceItem/CreativeInstanceItem";

import { styles } from "./CreativeInstanceList.style";

class CreativeInstanceList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      page: 0,
      rowsPerPage: 10,
    };
  }

  public handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  }

  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  public openDialog = () => {
    this.setState({
      open: true,
    });
  }

  public handleDialogClose = (action: any, creative: any) => {
    this.setState({
      open: false,
    });
    if (action === "submit") {
      const creativeInstance = {
        creativeId: creative,
        creativeSetId: this.props.match.params.creativeSetId,
      };
      // tslint:disable-next-line:no-console
      console.log(creativeInstance);
      this.props.createCreativeInstance(creativeInstance, this.props.auth);
    }
  }

  public render() {
    const { classes, match } = this.props;
    let { creativeInstances } = this.props;
    const { rowsPerPage, page } = this.state;
    if (!creativeInstances) {
      creativeInstances = [];
    }
    const listItems = creativeInstances
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <CreativeInstanceItem key={item.id} match={match} creativeInstance={item} />
        );
      });
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Creative Type
              </TableCell>
                  <TableCell>
                    Creative Platform
              </TableCell>
                  <TableCell>
                    Actions
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={creativeInstances.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
        <Button className={classes.fab} color="secondary" variant="fab" onClick={this.openDialog}>
          <Icon>add</Icon>
        </Button>
        <CreativeSetAddCreative open={this.state.open} creatives={this.props.creatives}
          handleClose={this.handleDialogClose} />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  creatives: state.creativeReducer.creatives,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  createCreativeInstance: (creativeInstance: any, auth: any) =>
    dispatch((CreateCreativeInstances(creativeInstance, auth))),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CreativeInstanceList));
