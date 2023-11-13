export const request = async (link: string, api: string) => {
	const res = await fetch(`${link}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${api}`,
		},
	});

	if (res.status !== 200) {
		return null;
	}

	const data = await res.json();
	return data;
};
