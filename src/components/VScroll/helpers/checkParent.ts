export const checkParent = (source: HTMLElement, target: HTMLElement) => {
	let tempParent: HTMLElement | null = target;
	while (tempParent != null) {
		if (tempParent === source) {
			return true;
		}

		tempParent = tempParent.parentElement;
	}

	return false;
};
