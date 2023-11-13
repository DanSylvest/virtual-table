import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DownloadBtn } from 'src/components/VirtualDataDrawer/DownloadBtn';
import { useData } from 'src/components/VirtualDataDrawer/provider';

export const ExportImport = () => {
	const {
		state,
		exportData,
	} = useData();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'center',
				gap: 1,
			}}
			component="div"
		>
			<Button
				component="label"
				variant="soft"
				startDecorator={<FileDownloadOutlinedIcon />}
				disabled={state.data.length === 0}
				onClick={exportData}
			>
				Export
			</Button>

			<DownloadBtn />
		</Box>
	);
};
