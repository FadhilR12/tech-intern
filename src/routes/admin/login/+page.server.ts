import { fail, redirect, isRedirect } from '@sveltejs/kit';
import type { Action } from './$types.js';
import * as z from 'zod';

const User = z.object({
	email: z.string().nonempty('Pastikan semua field terisi').email('Format email salah'),
	pass: z.string().nonempty('Pastikan semua field terisi')
});

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	try {
		await User.parseAsync({
			email: email,
			pass: password
		});

		if (email !== 'admin@techinternship.id' || password !== 'admin123') {
			return fail(401, {
				error: 'Email atau password salah'
			});
		}

		cookies.set('session', 'logged-in', {
			path: '/',
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/admin');
	} catch (error) {
		if (isRedirect(error)) {
			throw error;
		}

		if (error instanceof z.ZodError) {
			if (error.issues.length > 0) {
				return fail(400, {
					error: error.issues[0].message
				});
			}
		} else if (error instanceof Error) {
			return fail(401, {
				error: error.message
			});
		}
	}
};

export const actions = { login };
