import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import { useAdvertiserCreativesQuery } from "graphql/creative.generated";
import { uiTextForCreativeTypeCode } from "user/library";
import { CardContainer } from "components/Card/CardContainer";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "components/Error/ErrorDetail";
import MiniSideBar from "components/Drawer/MiniSideBar";

export function CreativeList() {
  const { advertiser } = useAdvertiser();
  const { data, error } = useAdvertiserCreativesQuery({
    variables: {
      advertiserId: advertiser.id,
    },
  });

  if (error)
    return (
      <ErrorDetail error={error} additionalDetails="Unable to get creatives" />
    );

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
