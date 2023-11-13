import React, {
	useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import FormLabel from '@mui/joy/FormLabel';
import { AvailableDataValueTypes, RowData } from 'src/types';
import { ValueField } from 'src/components/ValueField';
import { prepareData } from 'src/components/VirtualDataDrawer/helpers/prepareData';

interface RowEditorProps {
    open: boolean;
    onClose: () => void;
    data: RowData | undefined;
    onSave: (val: RowData) => void
}

export const RowEditor = ({
	open,
	onClose,
	data,
	onSave,
}: RowEditorProps) => {
	const tempData = useRef(data);
	const [, setCallRerender] = useState(0);

	useEffect(() => {
		tempData.current = data;
		setCallRerender(x => x + 1);
	}, [data]);

	const onChange = useCallback((id: string, event: AvailableDataValueTypes) => {
		if (tempData.current === undefined) {
			return;
		}

		tempData.current[id] = event;
		setCallRerender(x => x + 1);
	}, []);

	const onClickSave = useCallback(() => {
		if (tempData.current === undefined) {
			return;
		}

		onSave(tempData.current);
	}, [onSave]);

	const availableColumns = useMemo(() => Object.keys(data ? prepareData(data) : {}), [data]);
	const temp = tempData.current;

	if (temp === undefined) {
		return null;
	}

	const availableRender = prepareData(temp);

	return (
		<Modal open={open} onClose={onClose}>
			<ModalDialog variant="soft" sx={{ width: 600 }}>
				<ModalClose />
				<DialogTitle>Row Editor</DialogTitle>

				<Stack
					spacing={2}
					sx={{
						paddingRight: 6,
						maxHeight: 500,
						overflowY: 'auto',
						overflowX: 'hidden',
					}}
				>
					{availableColumns.map(x => (
						<FormControl key={x}>
							<FormLabel>{x}</FormLabel>
							<ValueField id={x} value={availableRender[x]} disabled={x === 'id'} onChange={onChange} />
						</FormControl>
					))}
				</Stack>

				<Box
					sx={{
						mt: 1,
						display: 'flex',
						gap: 1,
						flexDirection: { xs: 'column', sm: 'row-reverse' },
					}}
					component="div"
				>
					<Button variant="solid" color="primary" onClick={onClickSave}>
						Save
					</Button>
					<Button
						variant="outlined"
						color="neutral"
						onClick={onClose}
					>
						Cancel
					</Button>
				</Box>
			</ModalDialog>
		</Modal>
	);
};
