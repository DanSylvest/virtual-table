import React, { useCallback } from 'react';
import { Header, Row } from 'src/components';
import Box from '@mui/joy/Box';
import { prepareData } from 'src/components/VirtualDataDrawer/helpers/prepareData';
import { RowData, SortOrder } from 'src/types';
import './styles.scss';
import { UID_PROP } from 'src/constants';
import { useData } from 'src/components/VirtualDataDrawer/provider';

interface TableContentProps {
    start: number;
    visibleRows: number;
    allData: RowData[];
    columns: string[];
    onRowClick: (data: RowData) => void;
}

export const TableContent = ({
	start,
	visibleRows,
	allData,
	columns,
	onRowClick,
}: TableContentProps) => {
	const { state: { sortCol, order }, updateSort } = useData();
	const onSort = useCallback((col: string | null, order: SortOrder) => updateSort(col, order), [updateSort]);

	return (
		<Box className="content" component="div">
			<table className="table">
				{ allData.length > 0 && <Header columns={columns} sortCol={sortCol} order={order} onSort={onSort} /> }
				<tbody>
					{allData.slice(start, start + visibleRows).map(data => (
						<Row key={data[UID_PROP]} data={prepareData(data)} onClick={() => onRowClick(data)} />
					))}
				</tbody>
			</table>
		</Box>
	);
};
