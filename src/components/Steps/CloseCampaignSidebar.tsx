import { graphql } from "@/graphql-client/index";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { useQuery } from "@apollo/client";
import { useField } from "formik";
import { CloseCampaignModal } from "@/components/Campaigns/CloseCampaignModal";

const CampaignTransferStatus = graphql(`
  query CampaignTransferStatus($id: String!) {
    campaign(id: $id) {
      id
      adsManagerCurrentBalance
      hasInProcessOrCompleteTransfer
    }
  }
`);

export function CloseCampaignSidebar() {
  const [, meta] = useField<string | undefined>("id");
  const { advertiser } = useAdvertiser();

  const { data, loading } = useQuery(CampaignTransferStatus, {
    variables: { id: meta.value ?? "" },
    skip:
      !meta.value ||
      (!advertiser.selfServiceManageCampaign && advertiser.selfServiceSetPrice),
    fetchPolicy: "cache-and-network",
  });

  if (!data || !data?.campaign || loading) return null;
  const campaign = data.campaign;

  return (
    <CloseCampaignModal campaign={campaign} type="form" disabled={loading} />
  );
}
