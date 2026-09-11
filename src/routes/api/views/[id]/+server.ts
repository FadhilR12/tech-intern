import { views, totalViews } from '$lib/data/vacancy.js';
import type { Views } from '$lib/index.js';
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
		const itemDate = parseData(String(item.createdAt));

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

export const POST: RequestHandler = async ({ params }) => {
	const vacId = Number(params.id);

	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	const todayStr = `${dd}-${mm}-${yyyy}`;

	const existing = views.find((v) => v.vacId === vacId && v.createdAt === todayStr);

	if (existing) {
		existing.count += 1;
	} else {
		const newEntry: Views = { vacId, createdAt: todayStr, count: 1 };
		views.push(newEntry);
	}

	const existingTotal = totalViews.find((tv) => tv.vacId === vacId);

	if (existingTotal) {
		existingTotal.count += 1;
	} else {
		totalViews.push({ vacId, count: 1 });
	}

	return json({ statusCode: 200, message: 'view recorded' });
};
