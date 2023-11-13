import React, {
	MouseEventHandler, useCallback, useEffect, useRef, useState,
} from 'react';
import './style.scss';
import Box from '@mui/joy/Box';
import { checkParent, getScrollPosition } from './helpers';
import { ChildrenFunc, ComponentChildren } from './types';
import { MIN_SCROLLER_SIZE } from './constants';

interface VScrollProps {
    rows: number;
    rowHeight: number;
    offset: number;
    children: ComponentChildren | ChildrenFunc;
}

export const VScroll = ({
	rows = 100, rowHeight = 40, children, offset,
}: VScrollProps) => {
	const [dragging, setDragging] = useState(false);
	const [visibleHeight, setVisibleHeight] = useState(0);
	const [y, setY] = useState(0);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const handlerRef = useRef<HTMLDivElement | null>(null);

	const totalHeight = rowHeight * rows;
	const preparedScrollerSize = (visibleHeight / totalHeight) * visibleHeight;
	const scrollerSize = preparedScrollerSize < MIN_SCROLLER_SIZE ? MIN_SCROLLER_SIZE : preparedScrollerSize;
	const bottomOffset = preparedScrollerSize < MIN_SCROLLER_SIZE ? Math.ceil(MIN_SCROLLER_SIZE - preparedScrollerSize) : 0;

	const refData = { dragging, scrollerSize, totalHeight };
	const ref = useRef(refData);
	ref.current = refData;

	useEffect(() => {
		if (!rootRef.current) {
			return;
		}

		const { height } = rootRef.current.getBoundingClientRect();
		const containerHeight = height - offset;
		const scrollerSize = (containerHeight / totalHeight) * containerHeight;

		setY(y => getScrollPosition(y, 0, containerHeight, scrollerSize, offset));
	}, [offset, totalHeight]);

	const refRootCallback = useCallback((el: HTMLDivElement) => {
		rootRef.current = el;
		setVisibleHeight(el.getBoundingClientRect().height - offset);
	}, [offset]);

	const onMouseMove = useCallback((e: MouseEvent) => {
		if (!rootRef.current) {
			return;
		}

		if (ref.current.dragging) {
			const rootBounding = rootRef.current.getBoundingClientRect();
			setY(y => getScrollPosition(y, e.movementY, rootBounding.height, ref.current.scrollerSize, offset));
		}
	}, [offset]);

	const onScroll = useCallback((e: WheelEvent) => {
		if (!rootRef.current || e.shiftKey) {
			return;
		}

		if ((e.target instanceof HTMLElement) && !checkParent(rootRef.current, e.target)) {
			return;
		}

		const rootBounding = rootRef.current.getBoundingClientRect();
		const sign = e.deltaY > 0 ? 1 : -1;

		let off = ref.current.totalHeight * 0.01;
		if (off < rowHeight) {
			off = rowHeight;
		}

		const nextStep = off * (visibleHeight / ref.current.totalHeight) * sign;

		setY(y => getScrollPosition(y, nextStep, rootBounding.height, ref.current.scrollerSize, offset));
	}, [offset, visibleHeight, rowHeight]);

	const onMouseUp = useCallback(() => {
		setDragging(false);

		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}, [onMouseMove]);

	const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(() => {
		setDragging(true);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}, [onMouseMove, onMouseUp]);

	useEffect(() => {
		window.addEventListener('wheel', onScroll);
		return () => window.removeEventListener('wheel', onScroll);
	}, [onScroll]);

	const visibleRows = Math.min(rows, Math.ceil((visibleHeight - bottomOffset) / rowHeight));
	let start = Math.floor((y / (visibleHeight - bottomOffset)) * (rows * rowHeight) / rowHeight);

	if (start < 0) {
		start = 0;
	}

	if (start + visibleRows > rows) {
		start = rows - visibleRows;
	}

	return (
		<Box className="scroll-root" ref={refRootCallback} component="div">
			{typeof children === 'function' ? children({ visibleRows, start }) : children}

			{preparedScrollerSize < visibleHeight && (
				<Box
					ref={handlerRef}
					className="handler"
					component="div"
					style={{ height: `${scrollerSize}px`, top: `${y + offset}px` }}
					onMouseDown={handleMouseDown}
				/>
			)}
		</Box>
	);
};
