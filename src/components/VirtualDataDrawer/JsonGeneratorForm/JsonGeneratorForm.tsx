import React, { useCallback, useState } from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import { useData } from 'src/components/VirtualDataDrawer/provider';
import { GEN_TYPE } from 'src/constants';
import { Link } from '@mui/joy';

export const JsonGeneratorForm = () => {
	const [isEditOpen, setIsEditOpen] = useState(false);

	const {
		state,
		updateJGSettings,
		generate,
	} = useData();

	const onChangeLink: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		updateJGSettings(event.target.value, state.templateAPI);
	}, [state, updateJGSettings]);

	const onChangeAPI: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		updateJGSettings(state.templateLink, event.target.value);
	}, [state, updateJGSettings]);

	return (
		<>
			<Box sx={{ gap: 1, display: 'flex', justifyContent: 'flex-end' }} component="div">
				<Button variant="outlined" color="neutral" onClick={() => setIsEditOpen(true)}>
					API JSGen settings
				</Button>
				<Button variant="solid" color="primary" onClick={() => generate(GEN_TYPE.genApi)}>
					Load
				</Button>
			</Box>

			<Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
				<ModalDialog variant="soft" sx={{ width: 600 }}>
					<ModalClose />
					<DialogTitle>JSON Generator</DialogTitle>

					<Box component="div">
						<Link href="https://app.json-generator.com/signin" target="_blank">Visit for gen here</Link>
					</Box>

					<Stack
						spacing={1}
						sx={{
							paddingRight: 6, maxHeight: 500, overflowY: 'auto', overflowX: 'hidden',
						}}
					>
						<FormControl>
							<FormLabel>Link to template</FormLabel>
							<Input value={state.templateLink} onChange={onChangeLink} />
						</FormControl>

						<FormControl>
							<FormLabel>API key</FormLabel>
							<Input value={state.templateAPI} onChange={onChangeAPI} />
						</FormControl>
					</Stack>
				</ModalDialog>
			</Modal>
		</>
	);
};
