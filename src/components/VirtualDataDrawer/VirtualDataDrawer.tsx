import Box from '@mui/joy/Box';
import React, { useCallback, useMemo, useState } from 'react';
import './style.scss';

import { VScroll } from 'src/components';
import { RowEditor } from './RowEditor';
import { RowData } from 'src/types';
import { JsonGeneratorForm } from './JsonGeneratorForm';
import Stack from '@mui/joy/Stack';
import { useData } from './provider';
import { UID_PROP } from 'src/constants';
import { prepareData } from './helpers/prepareData';
import { RandomGeneratorRow } from './RandomGeneratorRow';
import { Typography } from '@mui/joy';
import { TableContent } from 'src/components/VirtualDataDrawer/TableContent';
import { ExportImport } from 'src/components/VirtualDataDrawer/ExportImportRow/ExportImport';

const ROW_HEIGHT = 40;

export const VirtualDataDrawer = () => {
	const { state: { data: allData }, updateData } = useData();

	const [editorData, setShowModal] = useState<RowData | undefined>(undefined);

	const onSave = useCallback((val: RowData) => {
		updateData(val[UID_PROP], val);
		setShowModal(undefined);
	}, [updateData]);

	const columns = useMemo(() => Object.keys(allData.length > 0 ? prepareData(allData[0]) : []), [allData]);

	return (
		<Stack sx={{ gap: 1 }}>
			<Stack
				sx={{
					gap: 1, border: '1px solid #f1f1f1', padding: 1, borderRadius: 4,
				}}
			>
				<ExportImport />

				<JsonGeneratorForm />

				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} component="div">
					<Typography>{`Count ${allData.length} rows`}</Typography>
					<RandomGeneratorRow />
				</Box>

			</Stack>
			<Box className="table-wrapper" component="div">
				<VScroll rows={allData.length} rowHeight={ROW_HEIGHT} offset={ROW_HEIGHT}>
					{({ visibleRows, start }) => (
						<TableContent
							start={start}
							visibleRows={visibleRows}
							allData={allData}
							columns={columns}
							onRowClick={data => setShowModal(data)}
						/>
					)}
				</VScroll>
			</Box>

			<RowEditor
				open={!!editorData}
				data={editorData}
				onClose={() => setShowModal(undefined)}
				onSave={onSave}
			/>
		</Stack>
	);
};
