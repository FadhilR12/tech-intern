import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async () => {
	error(404, 'Halaman tidak ditemukan');
};
