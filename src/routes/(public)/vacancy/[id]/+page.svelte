<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Laptop,
		MapPin,
		Wifi,
		Building2,
		Clock3,
		Send,
		ShieldCheck,
		ExternalLink,
		ArrowLeft,
		GraduationCap,
		LayoutList
	} from '@lucide/svelte';
	import { passedDays, sanitizeHtml } from '$lib/index.js';
	let { data } = $props();
	let vacancy = $derived(data.vacancy);
	let safeDescription = $state('');

	onMount(async () => {
		safeDescription = await sanitizeHtml(data.vacancy.descHtml);
	});
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
		<a href="/" class="flex items-center gap-2.5 font-extrabold"
			><span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white"
				><GraduationCap class="h-5 w-5" aria-hidden="true"></GraduationCap></span
			><span>TechInternship<span class="text-indigo-600">.ID</span></span></a
		>
		<a
			href="/#vacancies"
			class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
			><LayoutList class="h-4 w-4" aria-hidden="true"></LayoutList> Semua lowongan</a
		>
	</nav>
</header>
<!-- Go template: render satu vacancy publik ke dalam main ini. -->
<!-- TODO(JS): Render data vacancy dari backend dan catat view saat detail lowongan dibuka. -->
<main class="mx-auto w-full max-w-6xl flex-1 px-5 py-9">
	<div class="mx-auto max-w-4xl">
		<div class="mb-7">
			<a
				href="/#vacancies"
				class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
				><ArrowLeft class="h-4 w-4" aria-hidden="true"></ArrowLeft> Semua lowongan</a
			>
		</div>
		<article>
			<section class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
				<div class="flex items-start gap-4">
					<span
						class="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-indigo-50 font-extrabold text-indigo-700 ring-1 ring-indigo-100"
						>{vacancy.companyInitial}</span
					>
					<div>
						<h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">
							{vacancy.title}
						</h1>
						<p class="mt-1 font-semibold text-slate-500">{vacancy.company}</p>
					</div>
				</div>
				<div
					class="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-500"
				>
					<span class="flex items-center gap-2"
						><MapPin class="h-4 w-4 text-indigo-500" aria-hidden="true"
						></MapPin>{vacancy.location}</span
					><span class="flex items-center gap-2">
						{#if vacancy.workType === 'Remote'}
							<Wifi class="h-4 w-4 text-indigo-500" aria-hidden="true" />
						{:else if vacancy.workType === 'Hybrid'}
							<Laptop class="h-4 w-4 text-indigo-500" aria-hidden="true" />
						{:else}
							<Building2 class="h-4 w-4 text-indigo-500" aria-hidden="true" />
						{/if}

						{vacancy.workType}
					</span><span class="flex items-center gap-2"
						><Clock3 class="h-4 w-4 text-indigo-500" aria-hidden="true"></Clock3>{passedDays(
							vacancy.createdAt
						)}</span
					>
				</div>
			</section>
			<section class="rich-content mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
				{@html safeDescription}
			</section>
			<section
				class="mt-5 flex flex-col gap-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-100/40 sm:flex-row sm:items-center sm:justify-between sm:p-8"
			>
				<div class="flex items-start gap-4">
					<span
						class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime-200 text-lime-900"
						><Send class="h-5 w-5" aria-hidden="true"></Send></span
					>
					<div>
						<h2 class="font-extrabold">Tertarik dengan posisi ini?</h2>
						<p class="mt-1.5 text-sm leading-6 text-slate-500">
							Kirim lamaran melalui halaman resmi perusahaan.
						</p>
						<p class="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-400">
							<ShieldCheck class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"
							></ShieldCheck>Perusahaan resmi tidak meminta biaya dalam proses rekrutmen.
						</p>
					</div>
				</div>
				<a
					href={vacancy.applyUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="focus-ring flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-indigo-700 sm:w-auto"
					>Lamar sekarang <ExternalLink class="h-4 w-4" aria-hidden="true"></ExternalLink></a
				>
			</section>
		</article>
	</div>
</main>
