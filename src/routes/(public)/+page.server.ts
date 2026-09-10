import type { Vacancy } from '$lib/index.js';
import type { PageServerLoad } from './$types.js';

interface ApiResponse {
	statusCode: number;
	data: Vacancy[];
	message?: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/vacancies?status=Shown');
	let resp: ApiResponse = await response.json();

	if (resp.statusCode !== 200) {
		return { vacancies: [] };
	}

	return {
		vacancies: resp.data
	};
};
