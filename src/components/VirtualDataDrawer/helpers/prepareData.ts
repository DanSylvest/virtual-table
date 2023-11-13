import { ProcessedRowData, RowData } from 'src/types';
import { UID_PROP } from 'src/constants';

export const prepareData = (data: RowData): ProcessedRowData => {
	const keys = Object.keys(data);

	return keys.reduce<ProcessedRowData>((acc, x) => {
		const val = data[x];
		if (typeof val === 'string') {
			acc[x] = val;
		} else if (typeof val === 'number') {
			acc[x] = val;
		} else if (typeof val === 'boolean') {
			acc[x] = val;
		}

		return acc;
	}, { [UID_PROP]: data[UID_PROP] });
};
