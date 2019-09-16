import React, { Component } from 'react';
import * as S from "./CampaignTable.style";
import { Text } from "../../Text/Text";
import { Link } from "react-router-dom";
import { PageInputContainer, Pagination, Button, ButtonContainer, PageSelect, Container, Table, TableHeader, HeaderRow, HeaderCell, Row, Cell, UpArrow, DownArrow } from "../../../components/Table/Table";

import {
  useTable,
  useSortBy,
  useTableState,
  usePagination,
} from 'react-table'
import { connect } from 'react-redux';

// Table Data
import columns from "./data/columns";
const tableWidth = 1200;
const columnCount = 9;

class CampaignTable extends Component<any, any> {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <TableWrapper columns={columns} data={this.props.data} match={this.props.match} />
      </React.Fragment>
    )
  }
}

function TableWrapper({ columns, data, match }) {
  const tableState = useTableState({ pageIndex: 0, pageSize: 10 })

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: [{ pageIndex, pageSize }],
  } = useTable(
    {
      columns,
      data,
      state: tableState,
    },
    useSortBy,
    usePagination,
  )

  return (
    <Container>
      <Table {...getTableProps()}>
        <React.Fragment>
          {headerGroups.map(headerGroup => (
            <HeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return renderHeader(column)
              })}
            </HeaderRow>
          ))}
        </React.Fragment>
        <div>
          {page.map(
            (row, i) =>

              prepareRow(row) || (
                // <Link style={{ textDecoration: "none", color: "inherit" }} to={`/admin/main/users/${row.original.userId}/advertiser/${row.original.advertiserId}/campaign/${row.original.id}`}>
                <Row {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return renderRow(cell)
                  })}
                </Row>
                // </Link>
              )
          )}
        </div>
      </Table>
      <Pagination>
        <PageSelect>
          <Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>Go to page:</Text>
          <PageInputContainer>
            <input
              type="number"
              min={0}
              defaultValue={pageIndex + 1}
              style={{ height: "100%", width: "100%", border: "none", fontSize: "14px", paddingLeft: "4px", userSelect: "none" }}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            />
          </PageInputContainer>

          <select
            value={pageSize}
            style={{ marginTop: "-5px", backgroundColor: "white" }}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </PageSelect>
        <ButtonContainer style={{ marginLeft: "auto" }}>
          <Button style={{ marginLeft: "2px", marginRight: "2px" }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </Button>{' '}
          <Button style={{ marginLeft: "2px", marginRight: "10px" }} onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>{' '}
          <span style={{ marginTop: "1px" }}>
            <Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>{pageIndex + 1} of {pageOptions.length}</Text>
          </span>
          <Button style={{ marginLeft: "10px", marginRight: "2px" }} onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>{' '}
          <Button style={{ marginLeft: "2px", marginRight: "2px" }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </Button>{' '}
        </ButtonContainer>
      </Pagination>
    </Container>
  )
}

function renderHeader(column) {
  if (column.id === 'state') {
    return (
      <HeaderCell width={`calc(${tableWidth}px / ${columnCount})`} justifyContent={"center"} {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {column.render('Header')}
          <div>
            {column.sorted
              ? column.sortedDesc
                ? <UpArrow></UpArrow>
                : <DownArrow></DownArrow>
              : ''}
          </div>
        </div>
      </HeaderCell>
    )
  }
  else {
    return (
      <HeaderCell width={`calc(${tableWidth}px / ${columnCount})`} {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {column.render('Header')}
          <div>
            {column.sorted
              ? column.sortedDesc
                ? <UpArrow></UpArrow>
                : <DownArrow></DownArrow>
              : ''}
          </div>
        </div>
      </HeaderCell>
    )
  }
}

function renderRow(cell) {
  switch (cell.column.id) {
    case "brand":
      return renderName(cell.value)
    case "name":
      return renderName(cell.value)
    case "state":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`} justifyContent={"center"}>{renderStatus(cell.value)}</Cell>)
    case "budget":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderMonetaryAmount(cell.value, cell.row.original.currency)}
      </Text></Cell>)
    case "spent":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderMonetaryAmount(cell.value, cell.row.original.currency)}
      </Text></Cell>)
    case "startAt":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderDate(cell.value)}
      </Text></Cell>)
    case "endAt":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderDate(cell.value)}
      </Text></Cell>)
    case "view":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderStat(cell.value)}
      </Text></Cell>)
    case "pacingIndex":
      return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {renderPacingIndex(cell.value)}</Text></Cell>)
  }
}

function renderPacingIndex(value) {

  let index = parseFloat(value);
  if (index >= 1.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else if (index >= 0.50 && index <= 1.50) {
    return (<React.Fragment>
      <Text color={"#07C806"} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else if (index > 0.01 && index <= 0.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else {
    return (<React.Fragment>
      <Text color={"#1C1C1C"} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>
        N/A
        </Text>
    </React.Fragment>)
  }
}

function renderStatus(state) {
  switch (state) {
    case 'active':
      return (<div>
        <S.ActiveSymbol title="Active" />
      </div>)
    case 'under_review':
      return (<div>
        <S.PendingSymbol title="Under Review" />
      </div>)
    default:
      return (<div>
        <S.PendingSymbol title={state.charAt(0).toUpperCase() + state.slice(1)} />
      </div>)
  }
}

function renderMonetaryAmount(value, currency) {
  if (currency === "USD") {
    return `$${parseFloat(value).toLocaleString('en')}`
  }
  else {
    return `${parseFloat(value).toLocaleString('en')} BAT`

  }
}

function renderName(value) {
  return <Cell width={`calc(${tableWidth}px / ${columnCount})`}><Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]}>{value}</Text></Cell>
}

function renderDate(value) {
  return new Date(value).toLocaleDateString("en-US")
}

function renderStat(value) {
  return parseInt(value).toLocaleString('en')
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  drawer: state.drawerReducer
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampaignTable);

