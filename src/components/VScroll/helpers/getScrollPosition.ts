export const getScrollPosition = (
	prevPos: number,
	movementY: number,
	containerHeight: number,
	scrollerSize: number,
	offset: number
) => {
	const next = prevPos + movementY;
	if (next < 0) {
		return 0;
	}

	if (next + scrollerSize > containerHeight - offset) {
		return containerHeight - offset - scrollerSize;
	}

	return next;
};
