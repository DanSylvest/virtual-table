import React from 'react';
import './style.scss';
import { ProcessedRowData } from 'src/types';

interface RowProps {
    data: ProcessedRowData;
    onClick: () => void;
}

export const Row = ({ data, onClick }: RowProps) => {
	return (
		<tr className="row-root">
			{Object.keys(data).map(x => (
				<td key={x} className="row-field" onClick={onClick}>
					{data[x].toString()}
				</td>
			))}
		</tr>
	);
};
