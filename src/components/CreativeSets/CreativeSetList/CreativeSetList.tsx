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

import CreativeSetItem from "../CreativeSetItem/CreativeSetItem";

import { styles } from "./CreativeSetList.style";

class CreativeSetList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
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

  public render() {
    const { classes, match } = this.props;
    let { creativeSets } = this.props;
    if (!creativeSets) {
      creativeSets = [];
    }
    const { rowsPerPage, page } = this.state;
    const listItems = creativeSets
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <CreativeSetItem key={item.id} match={match} creativeSet={item} />
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
                    Execution
              </TableCell>
                  <TableCell>
                    Per Day
              </TableCell>
                  <TableCell>
                    Total Max
              </TableCell>
                  <TableCell>
                    State
              </TableCell>
                  <TableCell>
                    Action
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={creativeSets.length}
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
        <Link className={classes.fab} to={match.url + "/new"}>
          <Button color="secondary" variant="fab">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creatives: state.creativeReducer.creatives,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CreativeSetList));
