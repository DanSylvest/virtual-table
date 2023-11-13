import React, { useCallback } from 'react';
import Box from '@mui/joy/Box';
import { Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useData } from 'src/components/VirtualDataDrawer/provider';
import { GEN_TYPE } from 'src/constants';

export const RandomGeneratorRow = () => {
	const { state, generate, updateRandomGen } = useData();

	const onChangeMin: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		updateRandomGen('min', parseInt(e.target.value, 10));
	}, [updateRandomGen]);

	const onChangeMax: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		updateRandomGen('max', parseInt(e.target.value, 10));
	}, [updateRandomGen]);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} component="div">
			<Typography>min</Typography>
			<Input type="number" placeholder="min" sx={{ width: 100 }} value={state.min} onChange={onChangeMin} />
			<Typography>max</Typography>
			<Input type="number" placeholder="max" sx={{ width: 100 }} value={state.max} onChange={onChangeMax} />

			<Button variant="outlined" color="primary" onClick={() => generate(GEN_TYPE.random)}>
				Random
			</Button>
		</Box>

	);
};
