import { Button, Card, CardContent, Icon, Table, TableCell, TableHead, TableRow, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetCampaigns } from "../../../actions";

// import UserItem from "../UserItem/UserItem";

import { styles } from "./UserList.style";

class UserList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetCampaigns(this.props.userReducer);
  }
  public render() {
    const { classes } = this.props;
    // const { campaigns } = this.props.campaignReducer;
    // const listItems = campaigns.map((item: any) => {
    //   return (
    //     <div key={item.id} className={classes.item}>
    //       <UserItem match={match} campaign={item} />
    //     </div>
    //   );
    // });
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
            </Table>
          </CardContent>
        </Card>
        {/* <div className={classes.list}>
          {listItems}
        </div> */}
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
  campaignReducer: state.campaignReducer,
  userReducer: state.userReducer,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (user: any) => dispatch(GetCampaigns(user)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(UserList));
