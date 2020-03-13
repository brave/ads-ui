import React, { useContext, useEffect, useState } from "react";
import {
    useTable,
    useSortBy,
    usePagination,
} from 'react-table'

import * as S from "./Table.style";

const Table = props => {

    const tableWidth = props.tableWidth;
    const columnCount = props.columnCount;

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
            columns: props.columns,
            data: props.data,
            initialState: { pageIndex: 0, pageSize: 100 },
        },
        useSortBy,
        usePagination,
    )

    return (
        <React.Fragment>
            <S.Container>
                <S.Table {...getTableProps()}>
                    <React.Fragment>
                        {headerGroups.map(headerGroup => (
                            <S.HeaderRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => {
                                    return (
                                        <S.HeaderCell width={`calc(${tableWidth}px / ${columnCount})`} justifyContent={"center"} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {column.render('Header')}
                                                <div>
                                                    {column.sorted
                                                        ? column.sortedDesc
                                                            ? <S.DownArrow></S.DownArrow>
                                                            : <S.UpArrow></S.UpArrow>
                                                        : ''}
                                                </div>
                                            </div>
                                        </S.HeaderCell>
                                    )
                                })}
                            </S.HeaderRow>
                        ))}
                    </React.Fragment>
                    <div className="table">
                        {page.map(
                            (row, i) => {
                                prepareRow(row)
                                return (
                                    <S.Row style={{ display: "flex", width: "100%" }} {...row.getRowProps()}>
                                        {row.cells.map((cell, i) => {
                                            return <S.Cell width={`calc(${tableWidth}px / ${columnCount})`} {...cell.getCellProps()}><S.CellText>{cell.render('Cell')}</S.CellText></S.Cell>
                                        })}
                                    </S.Row>
                                )
                            })}
                    </div>
                </S.Table>
            </S.Container>
        </React.Fragment>
    )
}

export default Table;