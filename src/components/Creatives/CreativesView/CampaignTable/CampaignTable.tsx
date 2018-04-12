import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "material-ui";
import * as React from "react";

class CampaignTable extends React.Component<any, any> {
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
    const { campaigns } = this.props;
    const tableBodyRows = campaigns.map((item: any) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {item.campaign.name}
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
      <div>
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
              {tableBodyRows}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default CampaignTable;
