import {
  CreativeFragment,
  useAdvertiserCreativesQuery,
} from "graphql/creative.generated";
import { uiTextForCreativeTypeCode } from "user/library";
import { CardContainer } from "components/Card/CardContainer";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "components/Error/ErrorDetail";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { Box, Link, List, Typography } from "@mui/material";
import { Status } from "components/Campaigns/Status";
import { Link as RouterLink } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { CreativeStatusSwitch } from "components/Creatives/CreativeStatusSwitch";

const ALLOWED_TYPES = ["notification_all_v1", "inline_content_all_v1"];
export function CreativeList() {
  const { advertiser } = useAdvertiser();
  const { data, error, loading } = useAdvertiserCreativesQuery({
    variables: {
      advertiserId: advertiser.id,
    },
    pollInterval: 60_000,
  });

  const columns: GridColDef<CreativeFragment>[] = [
    {
      field: "switch",
      type: "actions",
      headerName: "On / Off",
      renderCell: ({ row }) => <CreativeStatusSwitch creative={row} />,
      filterable: false,
      sortable: false,
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
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
      headerName: "Type",
      valueGetter: ({ row }) => uiTextForCreativeTypeCode(row.type),
      align: "left",
      width: 200,
    },
    {
      field: "content",
      headerName: "Content",
      renderCell: ({ row }) => <CreativePayloadList creative={row} />,
      flex: 1,
      sortable: false,
    },
    {
      field: "state",
      headerName: "State",
      renderCell: ({ row }) => <Status state={row.state} />,
      width: 200,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <Box flex={1} />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  const creatives = [...(data?.advertiser?.creatives ?? [])].filter((c) =>
    ALLOWED_TYPES.includes(c.type.code),
  );
  return (
    <MiniSideBar>
      {error && (
        <ErrorDetail
          error={error}
          additionalDetails="Unable to retrieve images"
        />
      )}
      <CardContainer
        header="Creatives"
        sx={{
          flexGrow: 1,
          mr: 2,
          width: "100%",
        }}
      >
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
          slotProps={{
            toolbar: { showQuickFilter: true },
          }}
          sx={{ borderStyle: "none" }}
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
            { primary: "Title", secondary: c.payloadNotification?.title },
            { primary: "Body", secondary: c.payloadNotification?.body },
          ]}
        />
      );
      break;
    case "inline_content_all_v1":
      listItems = (
        <ListItems
          items={[
            { primary: "Title", secondary: c.payloadInlineContent?.title },
            {
              primary: "Call To Action",
              secondary: c.payloadInlineContent?.ctaText,
            },
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
  items: { primary: string; secondary?: string }[];
}) => {
  return props.items.map((i, idx) => (
    <Box key={idx}>
      <Typography
        variant="caption"
        component="span"
        paddingRight={1}
        fontWeight={600}
      >
        {i.primary}
      </Typography>
      <Typography variant="body1" component="span">
        {i.secondary}
      </Typography>
    </Box>
  ));
};
