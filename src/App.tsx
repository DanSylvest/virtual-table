import React from 'react';
import './App.scss';
import { VirtualDataDrawer } from './components/VirtualDataDrawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataProvider } from './components/VirtualDataDrawer/provider';

function App() {
	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DataProvider>
					<VirtualDataDrawer />
				</DataProvider>
			</LocalizationProvider>
		</div>
	);
}

export default App;
