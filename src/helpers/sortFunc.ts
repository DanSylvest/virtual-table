import { RowData } from 'src/types';

export const sortFunc = (col: string, order: 'asc' | 'desc') => (a: RowData, b: RowData) => {
	const left = a[col];
	const right = b[col];
	if (typeof left === 'string' && typeof right === 'string') {
		return order === 'asc' ? left.localeCompare(right) : right.localeCompare(left);
	}

	if (typeof left === 'number' && typeof right === 'number') {
		return order === 'asc' ? left - right : right - left;
	}

	if (typeof left === 'boolean' && typeof right === 'boolean') {
		const l = left ? 1 : 0;
		const r = right ? 1 : 0;
		return order === 'asc' ? l - r : r - l;
	}

	return 0;
};
