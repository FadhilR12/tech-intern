import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('session');
	const isLoginPage = url.pathname === '/admin/login';

	if (!session && !isLoginPage) {
		throw redirect(303, '/admin/login');
	}

	if (session && isLoginPage) {
		throw redirect(303, '/admin');
	}

	return {
		isLoggedIn: !!session
	};
};
