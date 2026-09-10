// Reexport your entry components here
import DOMPurify from 'dompurify';

export interface Vacancy {
	id: bigint;
	title: string;
	company: string;
	location: string;
	workType: 'Remote' | 'Hybrid' | 'Onsite';
	createdAt: string | number;
	companyInitial?: string;
	descHtml?: string;
	applyUrl?: string;
	visibleStatus?: 'Shown' | 'Hidden';
	isDeleted?: boolean;
	deletedAt?: string | null;
}

export interface Views {
	vacId: bigint;
	createdAt: string | number;
	count: number;
}

export interface TotalViews {
	vacId: bigint;
	count: number;
}

export function plainText(html: string | undefined): string {
	if (!html) return '';

	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function excerpt(text: string | undefined, max: number = 140): string {
	if (!text) return '';
	if (text.length <= max) return text;
	return text.slice(0, max) + '...';
}

export function passedDays(timestamp: number | string): string {
	const pastTime = new Date(Number(timestamp) * 1000);
	const now = new Date();
	const daysPassed = Math.floor((now.getTime() - pastTime.getTime()) / (1000 * 60 * 60 * 24));

	if (daysPassed === 0) {
		return 'Hari ini';
	}

	return `${daysPassed} hari lalu`;
}

export function formatDate(dateString: number | string): string {
	const date = new Date(Number(dateString) * 1000);
	return date.toISOString().split('T')[0];
}

export function processVacancies(
	vacancies: Vacancy[],
	searchQuery: string,
	sortBy: string,
	workTypeFilter: string
): Vacancy[] {
	let filteredVacancies = vacancies.filter((vacancy) => {
		const match = matches(vacancy, searchQuery);
		const workTypeMatch = workTypeFilter === '' || vacancy.workType === workTypeFilter;

		return match && workTypeMatch;
	});

	filteredVacancies.sort((a, b) => {
		const dateA = Number(a.createdAt);
		const dateB = Number(b.createdAt);

		if (sortBy === 'newest') return dateB - dateA;
		if (sortBy === 'oldest') return dateA - dateB;

		return 0;
	});

	return filteredVacancies;
}

export async function sanitizeHtml(html: string | Node | undefined | null): Promise<string> {
	if (!html) return '';

	return DOMPurify.sanitize(html);
}

export function matches(vacancy: any, searchQuery: string): boolean {
	const query = searchQuery.toLowerCase();

	return (
		vacancy.title.toLowerCase().includes(query) ||
		vacancy.company.toLowerCase().includes(query) ||
		vacancy.location.toLowerCase().includes(query)
	);
}

export function getCompanyInitialRegex(v: string): string {
	const matches = v.match(/[A-Z]/g) || [];
	return matches.slice(0, 3).join('');
}
