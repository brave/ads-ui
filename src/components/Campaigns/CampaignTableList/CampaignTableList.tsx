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
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as _ from "lodash";

import CampaignTableItem from "../CampaignTableItem/CampaignTableItem";

import { styles } from "./CampaignTableList.style";

class CampaignList extends React.Component<any, any> {
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
    let { campaigns } = this.props;
    if (!campaigns) {
      campaigns = [];
    }
    if (match.params.advertiserId) {
      campaigns = _.filter(campaigns, (obj) => {
        return obj.advertiserId === match.params.advertiserId;
      });
    }
    const { rowsPerPage, page } = this.state;
    const listItems = campaigns
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <CampaignTableItem key={item.id} match={match} campaign={item} />
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
                    Budget
              </TableCell>
                  <TableCell>
                    Daily Budget
              </TableCell>
                  <TableCell>
                    Campaign Daily Frequency Cap
              </TableCell>
                  <TableCell>
                    Start At
              </TableCell>
                  <TableCell>
                    End At
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
              count={campaigns.length}
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
        <Link className={classes.fab} to={match.url + "/campaign/new"}>
          <Button color="secondary" variant="fab">
            <Icon>add</Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  campaigns: state.campaignReducer.campaigns,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CampaignList));
