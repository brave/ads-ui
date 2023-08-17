import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import { useAdvertiserCreativesQuery } from "graphql/creative.generated";
import { uiTextForCreativeTypeCode } from "user/library";
import { CardContainer } from "components/Card/CardContainer";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "components/Error/ErrorDetail";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { Skeleton } from "@mui/material";

export function CreativeList() {
  const { advertiser } = useAdvertiser();
  const { data, error, loading } = useAdvertiserCreativesQuery({
    variables: {
      advertiserId: advertiser.id,
    },
    pollInterval: 60_000,
  });

  if (error)
    return (
      <ErrorDetail error={error} additionalDetails="Unable to get creatives" />
    );

  if (loading) {
    return (
      <MiniSideBar>
        <CardContainer
          header="Creatives"
          sx={{
            flexGrow: 1,
            mr: 2,
          }}
        >
          <Skeleton variant="rounded" height={500} />
        </CardContainer>
      </MiniSideBar>
    );
  }

  return (
    <MiniSideBar>
      <CardContainer
        header="Creatives"
        sx={{
          flexGrow: 1,
          mr: 2,
        }}
      >
        <EnhancedTable
          rows={data?.advertiser?.creatives ?? []}
          initialSortColumn={0}
          initialSortDirection="desc"
          initialRowsPerPage={25}
          columns={[
            {
              title: "Created",
              value: (c) => c.modifiedAt,
              renderer: StandardRenderers.date,
            },
            {
              title: "Name",
              value: (c) => c.name,
            },
            {
              title: "Type",
              value: (c) => uiTextForCreativeTypeCode(c.type),
            },
            {
              title: "Title",
              value: (c) =>
                c.payloadInlineContent?.title ??
                c.payloadNotification?.title ??
                c.payloadSearch?.title ??
                c.payloadSearchHomepage?.title,
            },
            {
              title: "Body",
              value: (c) =>
                c.payloadInlineContent?.ctaText ??
                c.payloadNotification?.body ??
                c.payloadSearch?.body ??
                c.payloadSearchHomepage?.body,
            },
          ]}
        />
      </CardContainer>
    </MiniSideBar>
  );
}
