import React from 'react';
import { Button } from '@mui/joy';
import Box from '@mui/joy/Box';
import { FileUploadOutlined } from '@mui/icons-material';
import { useData } from 'src/components/VirtualDataDrawer/provider';
import { GEN_TYPE } from 'src/constants';

export const DownloadBtn = () => {
	const { generate } = useData();

	const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result ?? '';
				try {
					if (typeof content === 'string') {
						const jsonData = JSON.parse(content);
						Array.isArray(jsonData) && generate(GEN_TYPE.upload, jsonData);
					}
				} catch (error) {
					// do nothing
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<Box component="div">
			<input
				type="file"
				style={{ display: 'none' }}
				id="file-upload"
				onChange={handleFileUpload}
			/>
			<Box htmlFor="file-upload" component="label">
				<Button component="span" variant="soft" startDecorator={<FileUploadOutlined />}>
					Import
				</Button>
			</Box>
		</Box>
	);
};
