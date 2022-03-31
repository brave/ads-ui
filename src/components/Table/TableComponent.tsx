import React from "react";
import {
    useTable,
    useSortBy,
    usePagination,
} from 'react-table'

import * as S from "./Table.style";
import { Icon } from "@material-ui/core";

import { Text } from "../../components/Text/Text";
import OutsideAlerter from "../OutsideAlerter/OutSideAlerter";
import ReactDOM from "react-dom";
import Menu, { Item as MenuItem } from 'rc-menu';


const buttonStyle = (enabled) => {
    if (enabled) {
        return { color: "#272727", fontSize: "20px", cursor: "pointer", marginLeft: "10px", marginRight: "10px" }
    }
    else {
        return { color: "#272727", fontSize: "20px", opacity: 0.3, marginLeft: "10px", marginRight: "10px" }
    }
}

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

    function handleSelect(info) {
        console.log('selected ', info);
        setPageSize(Number(info.key))
        const container = document.getElementById('menu');
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    }

    function renderMenu(container) {

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
                            (row) => {
                                prepareRow(row)
                                return (
                                    <S.Row style={{ display: "flex", width: "100%" }} {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <S.Cell width={`calc(${tableWidth}px / ${columnCount})`} {...cell.getCellProps()}><S.CellText>{cell.render('Cell')}</S.CellText></S.Cell>
                                        })}
                                    </S.Row>
                                )
                            })}
                    </div>
                    <S.Pagination>
                        <S.PageSelect>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Text content={'Rows per page:'} style={{ marginBottom: "2px" }} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}></Text>
                                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={toggleMenu}>
                                    <Text style={{ marginLeft: "12px" }} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>{pageSize}</Text>
                                    <S.DownArrow style={{ marginTop: "4px", marginLeft: "8px" }}></S.DownArrow>
                                </div>
                            </div>

                            <OutsideAlerter outsideAlerterId="menu" onOutsideClick={closeMenu} />
                        </S.PageSelect>
                        <S.ButtonContainer style={{ marginLeft: "auto", marginRight: "-2px" }}>
                            <div style={{ marginTop: "2px", marginRight: "20px" }}>
                                <Text fontFamily={"Muli"} sizes={[14, 14, 14, 14, 12]}>  {(pageIndex * pageSize) + 1} - {(pageIndex * pageSize) + page.length} of {props.data.length}</Text>
                            </div>
                            <Icon onClick={() => gotoPage(0)} style={buttonStyle(canPreviousPage)}>first_page</Icon>
                            <Icon onClick={() => previousPage()} style={buttonStyle(canPreviousPage)}>chevron_left</Icon>
                            <Icon onClick={() => nextPage()} style={buttonStyle(canNextPage)}>chevron_right</Icon>
                            <Icon onClick={() => gotoPage(pageCount - 1)} style={buttonStyle(canNextPage)} >last_page</Icon>
                        </S.ButtonContainer>
                    </S.Pagination >
                </S.Table>

            </S.Container>
        </React.Fragment>
    )
}

export default Table;