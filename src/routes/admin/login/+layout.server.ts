import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ parent }) => {
	const parentData = await parent();
	return { ...parentData };
};
