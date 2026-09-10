import type { PageServerLoad } from './$types.js';
import type { TotalViews, Vacancy } from '$lib/index.js';
import { error } from '@sveltejs/kit';

interface ApiResponse {
	statusCode: number;
	data: Vacancy[];
	message?: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	const [resVacancies, resTotalViews] = await Promise.all([
		fetch('/api/vacancies'),
		fetch('/api/totalViews')
	]);

	const respVacancies: ApiResponse = await resVacancies.json();
	if (respVacancies.statusCode !== 200) {
		throw error(respVacancies.statusCode ?? 500, 'Failed to load vacancies');
	}

	const respTotalViews: TotalViews[] = await resTotalViews.json();

	const viewMap = new Map<string, number>();
	respTotalViews.forEach((tv) => {
		viewMap.set(String(tv.vacId), tv.count);
	});
	const vacancies = respVacancies.data.map((vac) => {
		return {
			...vac,
			totalViews: viewMap.get(String(vac.id)) || 0
		};
	});

	return {
		vacancies
	};
};
