import {
  Button, Card,
  CardContent,
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
import { Link } from "react-router-dom";

import CreativeTableItem from "../CreativeTableItem/CreativeTableItem";

import { styles } from "./CreativeTableList.style";

class CreativeList extends React.Component<any, any> {
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
    let { creatives } = this.props;
    if (!creatives) {
      creatives = [];
    }
    const { rowsPerPage, page } = this.state;
    const listItems = creatives
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <CreativeTableItem key={item.id} match={match} creative={item} />
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
                    Type
              </TableCell>
                  <TableCell>
                    Title
              </TableCell>
                  <TableCell>
                    Body
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
              count={creatives.length}
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
        <Link className={classes.fab} to={match.url + "/creative/new"}>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CreativeList));
