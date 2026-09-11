import { json, type RequestHandler } from '@sveltejs/kit';
import { views } from '$lib/data/vacancy.js';

export const GET: RequestHandler = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 6);

	const viewsPerVac = new Map<string, { todayViews: number; sevenDayViews: number }>();
	let todayTotalViews = 0;
	let sevenDayTotalViews = 0;

	for (const item of views) {
		const key = String(item.vacId);
		const entry = viewsPerVac.get(key) ?? { todayViews: 0, sevenDayViews: 0 };
		const itemDate = parseDate(String(item.createdAt));

		if (itemDate.getTime() === today.getTime()) {
			entry.todayViews += item.count;
			todayTotalViews += item.count;
		}

		if (itemDate >= sevenDaysAgo && itemDate <= today) {
			entry.sevenDayViews += item.count;
			sevenDayTotalViews += item.count;
		}

		viewsPerVac.set(key, entry);
	}

	return json({
		statusCode: 200,
		data: {
			todayTotalViews,
			sevenDayTotalViews,
			perVacancy: Object.fromEntries(viewsPerVac)
		},
		message: 'get all views success'
	});
};

function parseDate(str: string): Date {
	const [day, month, year] = str.split('-');
	return new Date(Number(year), Number(month) - 1, Number(day));
}
