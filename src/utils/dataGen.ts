import { faker } from '@faker-js/faker';

function shuffleArray<T>(array: T[]): T[] {
	// eslint-disable-next-line for-direction
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const variations: {[key: string]: () => unknown} = {
	slug: () => faker.lorem.slug(),
	userId: () => faker.string.uuid(),
	username: () => faker.internet.userName(),
	color: () => faker.internet.color(),
	email: () => faker.internet.email(),
	avatar: () => faker.image.avatar(),
	password: () => faker.internet.password(),
	birthdate: () => faker.date.birthdate().toISOString(),
	registeredAt: () => faker.date.past().toISOString(),
	displayName: () => faker.internet.displayName(),
	domainName: () => faker.internet.domainName(),
	domainWord: () => faker.internet.domainWord(),
	ipv4: () => faker.internet.ipv4(),
	ipv6: () => faker.internet.ipv6(),
	longText1: () => faker.lorem.lines(5),
	longText2: () => faker.lorem.lines(15),
	bio: () => faker.person.bio(),
	bioSecond: () => faker.person.bio(),
	isActive: () => Math.random() > 0.5,
};

export const createRandomDataObj = (fields: string[]) => (_: never, index: number) => {
	return fields.reduce((acc, key) => ({ ...acc, [key]: variations[key]() }), { index });
};

export const randomUsers = (min = 5, max = 100) => {
	const fields = shuffleArray(Object.keys(variations))
		.slice(0, faker.number.int({ min: 5, max: Object.keys(variations).length }));

	const fakeCount = faker.number.int({ min, max });

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return faker.helpers.multiple(createRandomDataObj(fields), {
		count: fakeCount,
	});
};
