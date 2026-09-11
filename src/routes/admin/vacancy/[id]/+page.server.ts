import type { PageServerLoad, Actions } from './$types.js';
import type { TotalViews, Vacancy } from '$lib/index.js';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id: number = Number(params.id);
	const [resVacancies, resViews, resTotalViews] = await Promise.all([
		fetch(`/api/vacancies/${id}`),
		fetch(`/api/views/${id}`),
		fetch(`/api/totalViews/${id}`)
	]);
	if (!resVacancies.ok) error(404);
	const viewResp = await resViews.json();

	const vacancy: Vacancy = await resVacancies.json();
	const view = viewResp.data || {};
	const totalViews: TotalViews = await resTotalViews.json();

	return {
		vacancy: vacancy,
		totalViews: totalViews.count,
		todayViews: view.todayViews || 0,
		sevenDayViews: view.views7Days || 0
	};
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		throw redirect(303, '/admin/login');
	}
};
