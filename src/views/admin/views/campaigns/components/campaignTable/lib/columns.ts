const columns = [
    {
        Header: 'Brand',
        accessor: 'brand',
    },
    {
        Header: 'Campaign',
        accessor: 'name',
    },
    {
        Header: 'Status',
        accessor: 'state',
    },
    {
        Header: 'Budget',
        accessor: 'budget',
        sortDescFirst: true,
    },
    {
        Header: 'Spend',
        accessor: 'spent',
        sortDescFirst: true,
    },
    {
        Header: 'Start Date',
        accessor: 'startAt',
        sortDescFirst: true,
    },
    {
        Header: 'End Date',
        accessor: 'endAt',
        sortDescFirst: true,
    },
    {
        Header: 'Pacing',
        accessor: 'pacingIndex',
        sortDescFirst: true,
    }
];

export default columns;