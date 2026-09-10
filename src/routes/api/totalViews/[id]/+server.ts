import { totalViews } from '$lib/data/vacancy.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const data = totalViews.find((v) => v.vacId === +params.id!);

	return json(data || null);
};
