import type { Vacancy } from '$lib/index.js';
import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';

interface ApiResponse {
	statusCode: number;
	data: Vacancy[];
	message?: string;
}

interface ViewsResponse {
	statusCode: number;
	data: {
		todayTotalViews: number;
		sevenDayTotalViews: number;
		perVacancy: Record<string, { todayViews: number; sevenDayViews: number }>;
	};
	message?: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	const [resVacancy, resViews] = await Promise.all([fetch('/api/vacancies'), fetch('/api/views')]);

	const respVacancy: ApiResponse = await resVacancy.json();
	if (respVacancy.statusCode !== 200) {
		throw error(respVacancy.statusCode ?? 500, respVacancy.message);
	}

	const respViews: ViewsResponse = await resViews.json();
	const { todayTotalViews, sevenDayTotalViews, perVacancy } = respViews.data;

	const topVacancies = respVacancy.data
		.filter((vac) => !vac.isDeleted)
		.map((vac) => {
			const stats = perVacancy[String(vac.id)];
			return {
				...vac,
				todayViews: stats?.todayViews ?? 0,
				sevenDayViews: stats?.sevenDayViews ?? 0
			};
		})
		.sort((a, b) => b.sevenDayViews - a.sevenDayViews)
		.slice(0, 7);

	return {
		overview: { todayTotalViews, sevenDayTotalViews },
		topVacancies
	};
};
