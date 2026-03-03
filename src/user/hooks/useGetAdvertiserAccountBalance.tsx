import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { graphql } from "@/graphql-client/index";
import { useQuery } from "@apollo/client";

const CurrentAdvertiserBalance = graphql(`
  query CurrentAdvertiserBalance($id: String!) {
    advertiser(id: $id) {
      id
      accountBalance
    }
  }
`);

export function useGetAdvertiserAccountBalance() {
  const { advertiser } = useAdvertiser();

  const { loading, data } = useQuery(CurrentAdvertiserBalance, {
    variables: { id: advertiser.id },
    skip:
      advertiser.selfServiceSetPrice || !advertiser.selfServiceManageCampaign,
    fetchPolicy: "cache-and-network",
  });

  return { loading, data };
}
