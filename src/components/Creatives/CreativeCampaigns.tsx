import { CampaignsForCreativeQuery } from "graphql/creative.generated";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CardContainer } from "components/Card/CardContainer";
import _ from "lodash";
import { Status } from "components/Campaigns/Status";
import { ApolloError } from "@apollo/client";

interface Props {
  data?: CampaignsForCreativeQuery;
  error?: ApolloError;
  loading: boolean;
}

export default function CreativeCampaigns({ data, error, loading }: Props) {
  if (loading || !data || !data.creativeCampaigns) {
    return null;
  }

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to get campaign information for Ad"
      />
    );
  }

  const campaigns = _.uniqBy(data.creativeCampaigns, "id");
  return (
    <CardContainer header="Campaigns">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/user/main/campaign/${c.id}`}
                  underline="none"
                  color="secondary"
                >
                  {c.name}
                </Link>
              </TableCell>
              <TableCell>
                <Status state={c.state} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContainer>
  );
}
