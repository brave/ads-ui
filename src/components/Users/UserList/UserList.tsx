import {
  Button,
  Card, CardContent,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetAllUser } from "../../../actions";

import UserItem from "../UserItem/UserItem";

import { styles } from "./UserList.style";

class UserList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetAllUsers(this.props.auth);
  }
  public render() {
    const { classes, users, match } = this.props;
    // const { campaigns } = this.props.campaignReducer;
    const listItems = users.map((item: any) => {
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
          </CardContent>
        </Card>
        <Link className={classes.fab} to="/main/campaigns/new">
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
