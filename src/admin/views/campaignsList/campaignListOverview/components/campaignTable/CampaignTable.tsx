import React, { Component } from 'react';
import * as S from "./CampaignTable.style";
import { Text } from "../../../../../../components/Text/Text";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { PageInputContainer, CellText, Pagination, Button, ButtonContainer, PageSelect, Container, Table, TableHeader, HeaderRow, HeaderCell, Row, Cell, UpArrow, DownArrow } from "../../../../../../components/Table/Table";

import {
    useTable,
    useSortBy,
    usePagination,
} from 'react-table'

import { connect } from 'react-redux';

import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import './lib/campaignTable.css';

import OutsideAlerter from "../../../../../../components/OutsideAlerter/OutSideAlerter";

// Table Data
import columns from "./lib/columns";
import ReactDOM from 'react-dom';
const tableWidth = 1094;
const columnCount = 8;

const CampaignTable = (props) => {
    let data = props.data;
    const buttonStyle = (enabled) => {
        if (enabled) {
            return { color: "#272727", fontSize: "20px", cursor: "pointer", marginLeft: "10px", marginRight: "10px" }
        }
        else {
            return { color: "#272727", fontSize: "20px", opacity: 0.3, marginLeft: "10px", marginRight: "10px" }
        }
    }

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
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 100 },
        },
        useSortBy,
        usePagination,
    )

    function handleSelect(info) {
        console.log('selected ', info);
        setPageSize(Number(info.key))
        const container = document.getElementById('menu');
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    }

    function renderMenu(container) {
        function destroy() {
            ReactDOM.unmountComponentAtNode(container);
        }

        const leftMenu = (
            <Menu
                onSelect={handleSelect}
                selectedKeys={[pageSize.toString()]}
                mode={"vertical"}
                style={{ width: "75px", marginTop: "-15px", marginLeft: "15px" }}
            >
                <MenuItem key={"10"} style={{ height: "30px" }}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>10</Text></MenuItem>
                <MenuItem key={"50"} style={{ height: "30px" }}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>50</Text></MenuItem>
                <MenuItem key={"100"} style={{ height: "30px" }}><Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>100</Text></MenuItem>
            </Menu>
        );
        ReactDOM.render(<div>
            <div>{leftMenu}</div>
        </div>, container);
    }

    function toggleMenu() {
        const container = document.getElementById('menu');
        if (container) {
            renderMenu(container);
        }
    }

    function closeMenu() {
        const container = document.getElementById('menu');
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    }
    return (
        <React.Fragment>
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
                    <div className="table">
                        {page.map(
                            (row, i) =>

                                prepareRow(row) || (
                                    <Row {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return renderRow(cell)
                                        })}
                                    </Row>
                                )
                        )}
                    </div>
                </Table>
                <Pagination>
                    <PageSelect>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Text style={{ marginBottom: "2px" }} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>Rows per page:</Text>
                            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={toggleMenu}>
                                <Text style={{ marginLeft: "12px" }} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>{pageSize}</Text>
                                <DownArrow style={{ marginTop: "4px", marginLeft: "8px" }}></DownArrow>
                            </div>
                        </div>

                        <OutsideAlerter outsideAlerterId="menu" onOutsideClick={closeMenu} />
                    </PageSelect>
                    <ButtonContainer style={{ marginLeft: "auto", marginRight: "-2px" }}>
                        <div style={{ marginTop: "2px", marginRight: "20px" }}>
                            <Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>  {(pageIndex * pageSize) + 1} - {(pageIndex * pageSize) + page.length} of {data.length}</Text>
                        </div>
                        <Icon onClick={() => gotoPage(0)} style={buttonStyle(canPreviousPage)}>first_page</Icon>
                        <Icon onClick={() => previousPage()} style={buttonStyle(canPreviousPage)}>chevron_left</Icon>
                        <Icon onClick={() => nextPage()} style={buttonStyle(canNextPage)}>chevron_right</Icon>
                        <Icon onClick={() => gotoPage(pageCount - 1)} style={buttonStyle(canNextPage)} >last_page</Icon>
                    </ButtonContainer>
                </Pagination >
            </Container >
        </React.Fragment>
    )
}

function TableWrapper({ columns, data, match }) {



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
                                ? <DownArrow></DownArrow>
                                : <UpArrow></UpArrow>
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
                                ? <DownArrow></DownArrow>
                                : <UpArrow></UpArrow>
                            : ''}
                    </div>
                </div>
            </HeaderCell>
        )
    }
}

function renderRow(cell) {
    switch (cell.column.id) {
        case "advertiser.name":
            return renderName(cell.value)
        case "name":
            return renderCampaignName(cell.value, cell.row.original.advertiser.userAdvertisers[0].userId, cell.row.original.advertiser.id, cell.row.original.id)
        case "advertiser.billingEmail":
            return renderName(cell.value)
        case "state":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`} justifyContent={"center"}>{renderStatus(cell.value)}</Cell>)
        case "budget":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderMonetaryAmount(cell.value, cell.row.original.currency)}
            </CellText></Cell>)
        case "spent":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderMonetaryAmount(cell.value, cell.row.original.currency)}
            </CellText></Cell>)
        case "startAt":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderDate(cell.value)}
            </CellText></Cell>)
        case "endAt":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderDate(cell.value)}
            </CellText></Cell>)
        case "view":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderStat(cell.value)}
            </CellText></Cell>)
        case "pacingIndex":
            return (<Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText>
                {renderPacingIndex(cell.value)}</CellText></Cell>)
    }
}

function renderPacingIndex(value) {

    let index = parseFloat(value);
    if (index >= 1.50) {
        return (<React.Fragment>
            {(index * 100).toFixed(0)}
        </React.Fragment>)
    }
    else if (index >= 0.50 && index <= 1.50) {
        return (<React.Fragment>
            {(index * 100).toFixed(0)}
        </React.Fragment>)
    }
    else if (index > 0.01 && index <= 0.50) {
        return (<React.Fragment>
            {(index * 100).toFixed(0)}
        </React.Fragment>)
    }
    else {
        return (<React.Fragment>
            N/A
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
    return <Cell width={`calc(${tableWidth}px / ${columnCount})`}><CellText title={value}>{value}</CellText></Cell>
}

function renderCampaignName(value, userId, advertiserId, campaignId) {
    return <Cell width={`calc(${tableWidth}px / ${columnCount})`}>
        <Link style={{ textDecoration: "none", color: "rgb(251, 84, 43)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} to={`/admin/main/users/${userId}/advertiser/${advertiserId}/campaign/${campaignId}`}>
            <CellText title={value}>{value}</CellText>
        </Link>
    </Cell>
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