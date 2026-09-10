import { views } from '$lib/data/vacancy.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const data = views.filter((v) => v.vacId === +params.id!);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 6);

	let todayViews = 0;
	let views7Days = 0;

	data.forEach((item) => {
		const itemDate = parseData(item.createdAt);

		if (itemDate.getTime() === today.getTime()) {
			todayViews += item.count;
		}

		if (itemDate >= sevenDaysAgo && itemDate <= today) {
			views7Days += item.count;
		}
	});

	return json({
		statusCode: 200,
		data: { todayViews, views7Days },
		message: 'get all views success'
	});
};

function parseData(str: string): Date {
	const [day, month, year] = str.split('-');
	return new Date(Number(year), Number(month) - 1, Number(day));
}
