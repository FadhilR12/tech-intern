import { totalViews } from '$lib/data/vacancy.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(totalViews);
};
