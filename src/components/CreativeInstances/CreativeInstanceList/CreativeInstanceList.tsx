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
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CreateCreativeInstances, DeleteCreativeInstances } from "../../../actions";

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

  public handleDelete = (creativeInstance: any) => {
    this.props.deleteCreativeInstance(this.props.auth, creativeInstance);
  }

  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  public openDialog = () => {
    this.setState({
      open: true,
    });
  }

  public handleDialogClose = (action: any, state: any) => {
    this.setState({
      open: false,
    });
    if (action === "submit" && state.creative) {
      const creativeInstance = {
        creativeId: state.creative,
        creativeSetId: this.props.match.params.creativeSetId,
        prices: [{
          amount: state.amount,
          type: state.confirmationType
        }]
      };
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
          <CreativeInstanceItem handleDelete={this.handleDelete} key={item.id} match={match} creativeInstance={item} />
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
                    Creative Name
              </TableCell>
                  <TableCell>
                    Confirmation Type
              </TableCell>
                  <TableCell>
                    Price
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
        <Link className={classes.fab} to={match.url + "/creativeInstance/new"}>
          <Button color="secondary" variant="fab">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  creatives: state.creativeReducer.creatives,
  confirmationTypes: state.confirmationTypeReducer.confirmationTypes,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  createCreativeInstance: (creativeInstance: any, auth: any) =>
    dispatch((CreateCreativeInstances(creativeInstance, auth))),
  deleteCreativeInstance: (auth: any, creativeInstance: any) =>
    dispatch((DeleteCreativeInstances(creativeInstance, auth)))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CreativeInstanceList));
