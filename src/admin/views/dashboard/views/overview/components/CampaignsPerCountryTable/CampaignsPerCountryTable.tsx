import React, { Component } from 'react';
import { PageInputContainer, Pagination, Button, ButtonContainer, PageSelect, Container, Table, TableHeader, HeaderRow, HeaderCell, Row, Cell, UpArrow, DownArrow } from "../../../../../../../components/Table/Table";
import { Text } from "../../../../../../../components/Text/Text";

import columns from "./lib/Columns";

import {
    useTable,
    useSortBy,
    usePagination,
} from 'react-table'

class CampaignsPerCountryTable extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data);
        return (
            <React.Fragment>
                <TableWrapper columns={columns} data={this.props.data} />
            </React.Fragment>
        )
    }
}

function TableWrapper({ columns, data }) {

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
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination,
    )

    return (
        <Container>
            <Table {...getTableProps()}>
                {/* 
                ////////////
                Table Header 
                ////////////
                */}
                <React.Fragment>
                    {headerGroups.map(headerGroup => (
                        <HeaderRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return renderHeader(column)
                            })}
                        </HeaderRow>
                    ))}
                </React.Fragment>
                {/* 
                ////////////
                Table Rows
                ////////////
                */}
                <React.Fragment>
                    {page.map(
                        (row, i) =>
                            prepareRow(row) || (
                                <Row {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return renderRow(cell)
                                    })}
                                </Row>
                            )
                    )}
                </React.Fragment>
            </Table>

            {/* 
            ////////////
            Pagination
            ////////////
            */}
            <Pagination>
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
    return (
        <HeaderCell width={"50%"} {...column.getHeaderProps(column.getSortByToggleProps())}>
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

function renderRow(cell) {
    return <Cell width={"50%"} title={cell.value}>{cell.value}</Cell>
}

export default CampaignsPerCountryTable;