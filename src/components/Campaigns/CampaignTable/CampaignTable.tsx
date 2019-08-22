import React, { Component } from 'react';
import * as S from "./CampaignTable.style";
import { Text } from "../../Text/Text";
import { Link } from "react-router-dom";
import { PageInputContainer } from "../../Table/Table";

import {
  useTable,
  useSortBy,
  useTableState,
  usePagination,
} from 'react-table'
import { connect } from 'react-redux';

// Table Data
import columns from "./data/columns";

class CampaignTable extends Component<any, any> {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Table columns={columns} data={this.props.data} match={this.props.match} />
      </React.Fragment>
    )
  }
}

function Table({ columns, data, match }) {

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
    <React.Fragment>
      <S.Table {...getTableProps()}>
        <S.TableHeader>
          {headerGroups.map(headerGroup => (
            <S.HeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <S.HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>{column.render('Header')}</Text>
                  <div style={{ paddingLeft: "4px", fontSize: "8px", opacity: .85 }}>
                    {column.sorted
                      ? column.sortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </div>
                </S.HeaderCell>
              ))}
            </S.HeaderRow>
          ))}
        </S.TableHeader>
        <div>
          {page.map(
            (row, i) =>

              prepareRow(row) || (
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/admin/main/users/${row.original.userId}/advertiser/${row.original.advertiserId}/campaign/${row.original.id}`}>
                  <S.TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return renderRow(cell)
                    })}
                  </S.TableRow>
                </Link>
              )
          )}
        </div>
      </S.Table>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginLeft: "12px", marginRight: "12px" }}>
        <div style={{ marginTop: '36px' }}>
          <div style={{ display: "flex" }}>
            <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Go to page:</Text>
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

          </div>
        </div>
        <div style={{ marginTop: '36px', display: "flex" }}>
          <button style={{ marginTop: "-5px", backgroundColor: "#fafafa", borderRadius: "6px", marginLeft: "2px", marginRight: "2px" }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button style={{ marginTop: "-5px", backgroundColor: "#fafafa", borderRadius: "6px", marginLeft: "2px", marginRight: "10px" }} onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <span>
            <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>Page {pageIndex + 1} of {pageOptions.length}</Text>
          </span>
          <button style={{ marginTop: "-5px", backgroundColor: "#fafafa", borderRadius: "6px", marginLeft: "10px", marginRight: "2px" }} onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button style={{ marginTop: "-5px", backgroundColor: "#fafafa", borderRadius: "6px", marginLeft: "2px", marginRight: "2px" }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
        </div>
      </div>
    </React.Fragment>
  )
}

function renderRow(cell) {
  switch (cell.column.id) {
    case "brand":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderName(cell.value)}
      </Text></S.RowCell>)
    case "name":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 13]}>
        {renderName(cell.value)}
      </Text></S.RowCell>)
    case "state":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderStatus(cell.value)}
      </Text></S.RowCell>)
    case "budget":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderMonetaryAmount(cell.value, cell.row.original.currency)}
      </Text></S.RowCell>)
    case "spent":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderMonetaryAmount(cell.value, cell.row.original.currency)}
      </Text></S.RowCell>)
    case "startAt":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderDate(cell.value)}
      </Text></S.RowCell>)
    case "endAt":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderDate(cell.value)}
      </Text></S.RowCell>)
    case "view":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderStat(cell.value)}
      </Text></S.RowCell>)
    case "pacingIndex":
      return (<S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {renderPacingIndex(cell.value)}</Text></S.RowCell>)
  }
}

function renderPacingIndex(value) {

  let index = parseFloat(value);
  if (index >= 1.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else if (index >= 0.50 && index <= 1.50) {
    return (<React.Fragment>
      <Text color={"#07C806"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else if (index > 0.01 && index <= 0.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {(index * 100).toFixed(0)}
      </Text>
    </React.Fragment>)
  }
  else {
    return (<React.Fragment>
      <Text color={"#1C1C1C"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        N/A
        </Text>
    </React.Fragment>)
  }
}

function renderStatus(state) {
  switch (state) {
    case 'active':
      return (<div style={{ display: "flex" }}>
        <S.ActiveSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </Text>
      </div>)
    case 'under_review':
      return (<div style={{ display: "flex" }}>
        <S.PendingSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          Review
            </Text>
      </div>)
    default:
      return (<div style={{ display: "flex" }}>
        <S.PendingSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </Text>
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
  if (value.length > 40) {
    return <S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 12, 12, 12]}>{value}</Text></S.RowCell>
  }
  else {
    return <S.RowCell><Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>{value}</Text></S.RowCell>
  }
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

