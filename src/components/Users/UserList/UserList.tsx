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

import { GetAllUser } from "../../../actions";

import UserItem from "../UserItem/UserItem";

import { styles } from "./UserList.style";

class UserList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }
  public componentDidMount() {
    this.props.GetAllUsers(this.props.auth);
  }

  public handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  }

  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  public render() {
    const { classes, match, users } = this.props;
    const { rowsPerPage, page } = this.state;
    const listItems = users
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <UserItem key={item.id} match={match} user={item} />
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
                    Email
              </TableCell>
                  <TableCell>
                    Full Name
              </TableCell>
                  <TableCell>
                    Verified
              </TableCell>
                  <TableCell>
                    Role
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
              count={users.length}
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
  auth: state.authReducer,
  users: state.userReducer.users,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetAllUsers: (user: any) => dispatch(GetAllUser(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(UserList));
