import { uiTextForCreativeTypeCode } from "@/user/library";
import { CardContainer } from "@/components/Card/CardContainer";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { Box, Link, List, Typography } from "@mui/material";
import { Status } from "@/components/Campaigns/Status";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreativeStatusSwitch } from "@/components/Creatives/CreativeStatusSwitch";
import { CustomToolbar } from "@/components/Datagrid/CustomToolbar";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { useLingui, Trans as ReactTrans } from "@lingui/react";
import { Trans, msg } from "@lingui/macro";

import { MessageDescriptor } from "@lingui/core";
import { useQuery } from "@apollo/client";
import {
  AdvertiserCreativesDocument,
  CreativeFragment,
} from "@/graphql-client/graphql";
const ALLOWED_TYPES = ["notification_all_v1"];

export function CreativeList() {
  useTrackMatomoPageView({ documentTitle: "Advertiser Creatives" });
  const { advertiser } = useAdvertiser();
  const { _ } = useLingui();
  const { data, error, loading } = useQuery(AdvertiserCreativesDocument, {
    variables: {
      advertiserId: advertiser.id,
    },
    pollInterval: 60_000,
  });

  const columns: GridColDef<CreativeFragment>[] = [
    {
      field: "switch",
      type: "actions",
      headerName: _(msg`On / Off`),
      renderCell: ({ row }) => <CreativeStatusSwitch creative={row} />,
      filterable: false,
      sortable: false,
    },
    {
      field: "name",
      type: "string",
      headerName: _(msg`Name`),
      renderCell: ({ row }) => (
        <Link
          underline="none"
          variant="body1"
          component={RouterLink}
          to={`/user/main/creative/${row.id}`}
          replace
        >
          {row.name}
        </Link>
      ),
      flex: 1,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      field: "type",
      headerName: _(msg`Ad Format`),
      valueGetter: (_value, row) => uiTextForCreativeTypeCode(row.type),
      align: "left",
      width: 200,
    },
    {
      field: "content",
      headerName: _(msg`Content`),
      valueGetter: (_value, row) => creativeValuesGetter(row),
      renderCell: ({ row }) => <CreativePayloadList creative={row} />,
      flex: 1,
      display: "flex",
      sortable: false,
    },
    {
      field: "state",
      headerName: _(msg`State`),
      renderCell: ({ row }) => <Status state={row.state} />,
      width: 200,
    },
  ];

  const creatives = [...(data?.advertiser?.creatives ?? [])].filter((c) =>
    ALLOWED_TYPES.includes(c.type.code),
  );
  return (
    <MiniSideBar>
      {error && (
        <ErrorDetail
          error={error}
          additionalDetails={msg`Unable to retrieve images`}
        />
      )}
      <CardContainer
        header={<Trans>Ads</Trans>}
        sx={{
          flexGrow: 1,
          overflowX: "auto",
        }}
      >
        <Box>
          <DataGrid
            loading={loading}
            rows={creatives}
            columns={columns}
            density="standard"
            autoHeight
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            rowHeight={60}
            slots={{ toolbar: CustomToolbar }}
            showToolbar
            sx={{ borderStyle: "none" }}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </Box>
      </CardContainer>
    </MiniSideBar>
  );
}

function CreativePayloadList(props: { creative: CreativeFragment }) {
  const c = props.creative;
  let listItems;
  switch (c.type.code) {
    case "notification_all_v1":
      listItems = (
        <ListItems
          items={[
            { primary: msg`Title`, secondary: c.payloadNotification?.title },
            { primary: msg`Body`, secondary: c.payloadNotification?.body },
          ]}
        />
      );
      break;
    default:
      listItems = null;
  }

  if (!listItems) {
    return null;
  }

  return <List>{listItems}</List>;
}

const ListItems = (props: {
  items: { primary: MessageDescriptor; secondary?: string }[];
}) => {
  return props.items.map((i, idx) => (
    <Box key={idx}>
      <Typography
        variant="caption"
        component="span"
        paddingRight={1}
        fontWeight={600}
      >
        <ReactTrans id={i.primary.id} />
      </Typography>
      <Typography variant="body1" component="span">
        {i.secondary}
      </Typography>
    </Box>
  ));
};

const creativeValuesGetter = (c: CreativeFragment) => {
  const title = c.payloadNotification?.title ?? c.payloadInlineContent?.title;
  const body = c.payloadNotification?.title ?? c.payloadInlineContent?.ctaText;
  return `${title} ${body}`;
};
