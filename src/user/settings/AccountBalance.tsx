import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { Skeleton, Typography } from "@mui/material";
import { CardContainer } from "@/components/Card/CardContainer";
import { useGetAdvertiserAccountBalance } from "@/user/hooks/useGetAdvertiserAccountBalance";
import { renderMonetaryAmount } from "@/components/Datagrid/renderers";

export function AccountBalance() {
  const { advertiser } = useAdvertiser();
  const { loading, data } = useGetAdvertiserAccountBalance();

  if (!advertiser.selfServiceManageCampaign || advertiser.selfServiceSetPrice) {
    return null;
  }

  return (
    <CardContainer header="Account Balance">
      <Typography>Your current account balance</Typography>
      {loading && <Skeleton height="40px" sx={{ mt: 1 }} />}
      {!loading && data && data.advertiser && (
        <Typography mt={2} fontSize="18px" fontWeight={500}>
          {renderMonetaryAmount(data.advertiser.accountBalance, "USD")}
        </Typography>
      )}
    </CardContainer>
  );
}
