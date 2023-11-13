import constate from 'constate';
import {
	useCallback, useEffect, useRef, useState,
} from 'react';
import { RowData, SortOrder } from 'src/types';
import {
	GEN_TYPE, MAX_ROWS, MIN_ROWS, TEST_ACCESS_TOKEN, TEST_TEMPLATE_LINK, UID_PROP,
} from 'src/constants';
import { sortFunc } from 'src/helpers/sortFunc';
import { randomUsers } from 'src/utils/dataGen';
import { request } from 'src/utils/request';
import { saveAs } from 'file-saver';

interface StateData {
    templateLink: string;
    templateAPI: string;
    data: RowData[];
    dataTree: Map<number, RowData>;
    sortCol: string | null;
    order: SortOrder;
    min: number;
    max: number;
}

const useProviderData = () => {
	const [, setCallRerender] = useState(0);

	const state = useRef<StateData>({
		templateLink: localStorage.getItem('template') || TEST_TEMPLATE_LINK,
		templateAPI: localStorage.getItem('api') || TEST_ACCESS_TOKEN,
		min: parseInt(localStorage.getItem('min') ?? '', 10) || MIN_ROWS,
		max: parseInt(localStorage.getItem('max') ?? '', 10) || MAX_ROWS,
		data: [],
		dataTree: new Map(),
		sortCol: 'age',
		order: 'asc',
	});

	const updateRandomGen = useCallback((type: 'min' | 'max', val: number) => {
		state.current = { ...state.current, [type]: val };
		localStorage.setItem(type, val.toString());
		setCallRerender(x => x + 1);
	}, []);

	const updateJGSettings = useCallback((link: string, api: string) => {
		state.current = {
			...state.current,
			templateLink: link,
			templateAPI: api,
		};
		localStorage.setItem('template', link);
		localStorage.setItem('api', api);
		setCallRerender(x => x + 1);
	}, []);

	const applySort = useCallback(() => {
		const newArr: RowData[] = [];

		const iter = state.current.dataTree.entries();
		let res = iter.next();
		while (!res.done) {
			const [k, v] = res.value;
			newArr.push({ ...v, [UID_PROP]: k });
			res = iter.next();
		}

		if (state.current.sortCol !== null && state.current.order !== null) {
			newArr.sort(sortFunc(state.current.sortCol, state.current.order));
		}

		state.current.data = newArr;
	}, []);

	const updateSort = useCallback((col: string | null, order: SortOrder) => {
		state.current.sortCol = col;
		state.current.order = order;
		applySort();
		setCallRerender(x => x + 1);
	}, [applySort]);

	const generate = useCallback(async (type: GEN_TYPE, newData?: RowData[]) => {
		let data: RowData[];

		if (type === GEN_TYPE.genApi) {
			const result = await request(state.current.templateLink, state.current.templateAPI);
			data = (result ?? []);
		} else if (type === GEN_TYPE.random) {
			data = randomUsers(state.current.min, state.current.max);
		} else if (type === GEN_TYPE.upload) {
			data = (newData ?? []);
		} else {
			data = [];
		}

		// эти данные мы будем юзать для хранения данных и их обновления
		state.current.dataTree = data.reduce<Map<number, RowData>>((acc, val, i) => {
			acc.set(i, val);
			return acc;
		}, new Map());

		applySort();
		setCallRerender(x => x + 1);
	}, [applySort]);

	const updateData = useCallback((uid: number, data: RowData) => {
		const prop = state.current.dataTree.get(uid);
		if (prop === undefined) {
			return;
		}

		// we need exclude symbol on update data
		const { [UID_PROP]: skipUid, ...prevData } = prop;

		const newData = { ...prevData, ...data };
		state.current.dataTree.set(uid, newData);
		applySort();
		setCallRerender(x => x + 1);
	}, [applySort]);

	const exportData = useCallback(() => {
		const out: RowData[] = [];
		state.current.dataTree.forEach((val) => {
			out.push(val);
		});

		const blob = new Blob([JSON.stringify(out, null, 4)], { type: 'application/json' });
		saveAs(blob, 'data.json');
	}, []);

	useEffect(() => {
		generate(GEN_TYPE.random);
		state.current.sortCol = null;
		state.current.order = null;
	}, [generate]);

	return {
		state: state.current,
		updateJGSettings,
		generate,
		updateData,
		exportData,
		updateSort,
		updateRandomGen,
	};
};

export const [
	DataProvider,
	useData,
] = constate(
	useProviderData,
	x => x
);
