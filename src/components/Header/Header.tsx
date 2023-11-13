import React, { useCallback } from 'react';
import './style.scss';
import IconButton from '@mui/joy/IconButton';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { SortOrder } from 'src/types';

interface RowProps {
    columns: string[];
    sortCol: string | null;
    order: SortOrder;
    onSort: (col: string | null, order: SortOrder) => void;
}

export const Header = ({
	columns, sortCol, order, onSort,
}: RowProps) => {
	const onClickSort = useCallback((column: string) => {
		if (sortCol !== column) {
			onSort(column, 'asc');
			return;
		}

		if (order === 'asc') {
			onSort(column, 'desc');
			return;
		}

		onSort(null, null);
	}, [onSort, order, sortCol]);

	return (
		<thead>
			<tr className="head-root">
				{columns.map(x => (
					<td key={x} className="head-field">
						<Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography className="text-container" title={x}>{x}</Typography>

							<IconButton variant="plain" size="sm" onClick={() => onClickSort(x)}>
								{sortCol === x && order === 'desc' && <KeyboardArrowUpIcon /> }
								{sortCol === x && order === 'asc' && <KeyboardArrowDownIcon /> }
								{sortCol !== x && <UnfoldMoreIcon /> }
							</IconButton>
						</Box>
					</td>
				))}
			</tr>
		</thead>
	);
};
