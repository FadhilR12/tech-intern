import { vacancies } from '$lib/data/vacancy.js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getCompanyInitialRegex } from '$lib/index.js';

// API UNTUK SEMENTARA KEDEPANNYA PERLU DIBEDAKAN API LANDING PAGE DAN ADMIN

export const GET: RequestHandler = ({ url }) => {
	const statusQuery = url.searchParams.get('status');
	const isDeletedQuery = url.searchParams.get('is_deleted');

	const vacs = vacancies.filter((v) => {
		let statusValid = true;
		let isDeletedValid = true;

		if (statusQuery !== null) {
			if (statusQuery === 'Shown' || statusQuery === 'Hidden') {
				statusValid = v.visibleStatus === statusQuery;
			}
		}

		if (isDeletedQuery !== null) {
			if (isDeletedQuery === 'true') {
				isDeletedValid = v.isDeleted;
			} else {
				isDeletedValid = !v.isDeleted;
			}
		}

		return statusValid && isDeletedValid;
	});

	return json({
		statusCode: 200,
		data: vacs,
		message: 'get all vacancies success'
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const fields = Object.fromEntries(data.entries());

	if (
		fields.title === '' ||
		fields.location === '' ||
		fields.workType === '' ||
		fields.url === '' ||
		fields.descHtml === ''
	) {
		return json({ success: false });
	}

	const Id = vacancies.length > 0 ? Math.max(...vacancies.map((v) => v.id)) + 1 : 1;

	const newVacancy = {
		id: Id,
		title: fields.title as string,
		company: fields.company as string,
		companyInitial: getCompanyInitialRegex(fields.company as string),
		workType: fields.workType as string,
		descHtml: fields.descHtml as string,
		location: fields.location as string,
		createdAt: String(Math.floor(Date.now() / 1000)),
		applyUrl: fields.url as string,
		visibleStatus: fields.visibleStatus as string,
		isDeleted: false,
		deletedAt: null
	};

	vacancies.push(newVacancy);

	return json({ success: true });
};
