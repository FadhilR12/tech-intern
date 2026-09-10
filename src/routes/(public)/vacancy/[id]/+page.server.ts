import type { PageServerLoad } from './$types.js';
import type { Vacancy } from '$lib/index.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id: number = Number(params.id);
	const response = await fetch(`/api/vacancies/${id}`);
	if (!response.ok) error(404);

	const vacancy: Vacancy = await response.json();

	return {
		vacancy
	};
};
