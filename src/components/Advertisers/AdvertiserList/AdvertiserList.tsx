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
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetAdvertisers } from "../../../actions";

import AdvertiserItem from "../AdvertiserItem/AdvertiserItem";

import { styles } from "./AdvertiserList.style";

class UserList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.getAdvertiser(this.props.auth, this.props.userId);
  }
  public render() {
    const { classes, match, advertisers } = this.props;
    const listItems = advertisers.map((item: any) => {
      return (
        <AdvertiserItem key={item.id} match={match} advertiser={item} />
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
                    Name
                  </TableCell>
                  <TableCell>
                    Phone
                  </TableCell>
                  <TableCell>
                    Billing Email
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
          </CardContent>
        </Card>
        <Link className={classes.fab} to={match.url + "/advertiser/new"}>
          <Button color="secondary">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  getAdvertiser: (auth: any, userId: string) => dispatch(GetAdvertisers(auth, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(UserList));
