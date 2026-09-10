<script lang="ts">
	import QuillEditor from '$lib/components/QuillEditor.svelte';
	import {
		GraduationCap,
		ChartNoAxesColumnIncreasing,
		LogOut,
		ExternalLink,
		Eye,
		BriefcaseBusiness,
		EyeOff,
		Plus,
		Search,
		MapPin,
		Laptop,
		Calendar,
		Wifi,
		Building2,
		SearchX,
		X,
		Save
	} from '@lucide/svelte';
	import { matches } from '$lib/index.js';
	import * as z from 'zod';
	import { invalidateAll } from '$app/navigation';
	let { data } = $props();
	let searchQuery = $state<string>('');
	let debouncedSearch = debounce<string>('', 500);
	let vacancyDescription: string = $state('');
	let vacancyModal: HTMLDialogElement;

	let filteredVacancies = $derived(
		data.vacancies.filter((vacancy) => matches(vacancy, debouncedSearch.value))
	);

	let type = ['Onsite', 'Hybrid', 'Remote'];
	let errorMessage: String = $state('');

	const vacData = z.object({
		title: z.string().nonempty('Pastikan semua field terisi'),
		company: z.string().nonempty('Pastikan semua field terisi'),
		location: z.string().nonempty('Pastikan semua field terisi'),
		workType: z.enum(type, 'Pastikan memilih pilihan yang valid'),
		url: z
			.string()
			.nonempty('Pastikan semua field terisi')
			.url('Pastikan memasukan url yang valid'),
		descHtml: z.string().nonempty('Pastikan semua field terisi')
	});

	$effect(() => {
		debouncedSearch.value = searchQuery;
	});

	function debounce<T>(val: T, delay: number = 300) {
		let s = $state<T>(val);
		let timeout: ReturnType<typeof setTimeout>;

		return {
			get value(): T {
				return s;
			},
			set value(newValue: T) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					s = newValue;
				}, delay);
			}
		};
	}

	function openVacancyModal() {
		if (vacancyModal) vacancyModal.showModal();
	}

	function closeVacancyModal() {
		if (vacancyModal) {
			vacancyModal.close();
			const form = vacancyModal.querySelector('form');
			if (form) form.reset();
			vacancyDescription = '';
			errorMessage = '';
		}
	}

	// PELAJARI INI
	async function submitVacancy(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('descHtml', vacancyDescription);

		try {
			await vacData.parseAsync({
				title: formData.get('title'),
				company: formData.get('company'),
				location: formData.get('location'),
				workType: formData.get('workType'),
				url: formData.get('url'),
				descHtml: formData.get('descHtml')
			});

			const response = await fetch('/api/vacancies', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				await invalidateAll();
				closeVacancyModal();
			} else {
				throw new Error('Gagal menambahkan vacancy');
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				if (error.issues.length > 0) {
					errorMessage = error.issues[0].message;
				}
			} else {
				console.error('Error:', error);
				alert('Terjadi kesalahan sistem');
			}
		}
	}
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
		<a href="/admin/" class="flex items-center gap-2 font-extrabold"
			><span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"
				><GraduationCap class="h-4 w-4" aria-hidden="true"></GraduationCap></span
			>TechInternship<span class="-ml-2 text-indigo-600">.ID</span><span
				class="text-xs font-semibold text-slate-400">Admin</span
			></a
		>
		<div class="flex items-center gap-1 text-sm font-bold">
			<a
				href="/admin/"
				class="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:text-slate-900"
				><ChartNoAxesColumnIncreasing class="h-4 w-4" aria-hidden="true"
				></ChartNoAxesColumnIncreasing>Analytics</a
			><a
				href="/admin/vacancy"
				// flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700
				class="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
				><BriefcaseBusiness class="h-4 w-4" aria-hidden="true"></BriefcaseBusiness>Vacancy</a
			><a
				href="/"
				class="hidden items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:text-slate-900 sm:flex"
				><ExternalLink class="h-4 w-4" aria-hidden="true"></ExternalLink>Website</a
			><a href="/admin/login" class="flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600"
				><LogOut class="h-4 w-4" aria-hidden="true"></LogOut>Keluar</a
			>
		</div>
	</nav>
</header>

<!-- TODO(JS): Implementasikan pencarian tabel, jumlah hasil, empty state, navigasi detail, modal buat vacancy, validasi, simpan, serta notifikasi sukses/gagal. -->
<main class="mx-auto max-w-6xl px-5 py-9">
	<div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
		<div>
			<p class="text-xs font-extrabold tracking-[.18em] text-indigo-600 uppercase">
				Content management
			</p>
			<h1 class="mt-2 text-3xl font-extrabold">Vacancy</h1>
			<p class="mt-2 text-sm text-slate-500">
				Kelola lowongan aktif dan atur visibilitas publiknya.
			</p>
		</div>
		<!-- TODO(JS): Hubungkan pemicu ini ke dialog #vacancy-modal. -->
		<button
			type="button"
			onclick={openVacancyModal}
			class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
			><Plus class="h-4 w-4" aria-hidden="true"></Plus>Buat vacancy</button
		>
	</div>
	<div class="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">
		<div
			class="flex flex-col justify-between gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center"
		>
			<label class="relative w-full max-w-md"
				><span class="sr-only">Cari vacancy</span><Search
					class="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
					aria-hidden="true"
				></Search><input
					id="admin-search"
					bind:value={searchQuery}
					type="search"
					placeholder="Cari title, company, lokasi, atau status..."
					class="focus-ring w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-10 text-sm"
				/></label
			>
			<p id="admin-count" class="text-xs font-semibold text-slate-400">
				{filteredVacancies.length} vacancy
			</p>
		</div>
		<div class="overflow-x-auto">
			{#if filteredVacancies.length > 0}
				<table class="w-full min-w-[760px] text-left">
					<thead
						><tr class="border-b border-slate-100 text-xs tracking-wide text-slate-400 uppercase"
							><th class="px-5 py-4">Vacancy</th><th class="px-4 py-4">Status</th><th
								class="px-4 py-4">WorkType</th
							><th class="px-4 py-4">Dibuat</th><th class="px-5 py-4 text-right">Views</th></tr
						></thead
					>
					<!-- Go template: range vacancy aktif di tbody ini. -->
					<!-- Tautan detail memakai HTML biasa agar list tetap dapat dinavigasi tanpa JavaScript. -->
					<tbody id="vacancy-table">
						{#each filteredVacancies as vacancy}
							<tr
								class="focus-visible:outline-inset cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50 focus-visible:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
								><td class="px-5 py-4"
									><a
										href="/admin/vacancy/{vacancy.id}"
										class="row-link"
										aria-label="Buka detail vacancy"
										><div class="flex items-center gap-3">
											<span
												class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-xs font-extrabold text-indigo-700"
												>{vacancy.companyInitial}</span
											>
											<div>
												<p class="text-sm font-extrabold">{vacancy.title}</p>
												<p class="mt-1 flex items-center gap-1 text-xs text-slate-400">
													{vacancy.company} · <MapPin class="h-3 w-3" aria-hidden="true"
													></MapPin>{vacancy.location}
												</p>
											</div>
										</div></a
									></td
								><td class="px-4 py-4">
									{#if vacancy.visibleStatus === 'Shown'}
										<span
											class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
											><Eye class="h-3 w-3" aria-hidden="true"></Eye>{vacancy.visibleStatus}</span
										>
									{:else}
										<span
											class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
											><EyeOff class="h-3 w-3" aria-hidden="true"
											></EyeOff>{vacancy.visibleStatus}</span
										>
									{/if}
								</td><td class="px-4 py-4"
									><span
										class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"
									>
										{#if vacancy.workType === 'Remote'}
											<Wifi class="h-3 w-3" aria-hidden="true" />
										{:else if vacancy.workType === 'Hybrid'}
											<Laptop class="h-3 w-3" aria-hidden="true" />
										{:else}
											<Building2 class="h-3 w-3" aria-hidden="true" />
										{/if}
										{vacancy.workType}</span
									></td
								><td class="px-4 py-4 text-xs font-semibold text-slate-500"
									><span class="inline-flex items-center gap-1.5"
										><Calendar class="h-3.5 w-3.5 text-slate-400" aria-hidden="true"></Calendar>11
										Agu 2026</span
									></td
								><td class="px-5 py-4 text-right text-sm font-extrabold"
									><span class="inline-flex items-center gap-1.5"
										><Eye class="h-3.5 w-3.5 text-slate-400" aria-hidden="true"
										></Eye>{vacancy.totalViews}</span
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div id="admin-empty" class="py-14 text-center">
					<span
						class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"
						><SearchX class="h-6 w-6" aria-hidden="true"></SearchX></span
					>
					<p class="mt-4 font-extrabold">Vacancy tidak ditemukan</p>
				</div>
			{/if}
		</div>
	</div>
</main>
<!-- TODO(JS): Pertahankan dialog ini; implementasikan showModal(), close(), submit, validasi, dan feedback penyimpanan. -->
<dialog
	id="vacancy-modal"
	bind:this={vacancyModal}
	class="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl p-0 backdrop:bg-slate-950/50"
>
	<div class="max-h-[90vh] overflow-y-auto">
		<div
			class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4"
		>
			<div class="flex items-center gap-3">
				<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
					><BriefcaseBusiness class="h-4 w-4" aria-hidden="true"></BriefcaseBusiness></span
				>
				<div>
					<p class="text-xs font-bold text-indigo-600">Vacancy baru</p>
					<h2 class="mt-0.5 text-xl font-extrabold">Buat vacancy</h2>
				</div>
			</div>
			<button
				type="button"
				onclick={closeVacancyModal}
				aria-label="Tutup modal"
				class="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
				><X class="h-5 w-5" aria-hidden="true"></X></button
			>
		</div>
		<form class="bg-white p-6" novalidate onsubmit={submitVacancy}>
			{#if errorMessage !== ''}
				<span
					class="mb-5 flex rounded-[8px] bg-red-300/60 p-3 text-[12px] font-semibold text-red-700"
					>{errorMessage}</span
				>
			{/if}
			<div class="grid gap-5 sm:grid-cols-2">
				<label class="sm:col-span-2"
					><span class="mb-2 block text-sm font-bold">Title *</span><input
						type="text"
						name="title"
						required
						placeholder="Contoh: Frontend Engineer Intern"
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Company *</span><input
						type="text"
						name="company"
						required
						placeholder="Nama perusahaan"
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Location *</span><input
						type="text"
						name="location"
						required
						placeholder="Kota atau wilayah"
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">WorkType *</span><span class="relative block"
						><select
							name="workType"
							required
							class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
							><option value="">Pilih work type</option><option>Onsite</option><option
								>Hybrid</option
							><option>Remote</option></select
						></span
					></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Status *</span><span class="relative block"
						><select
							name="visibleStatus"
							required
							class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
							><option>Hidden</option><option>Shown</option></select
						></span
					></label
				>
				<label class="sm:col-span-2"
					><span class="mb-2 block text-sm font-bold">URL Lamaran *</span><input
						type="url"
						name="url"
						required
						placeholder="https://..."
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<div class="sm:col-span-2">
					<label class="mb-2 block text-sm font-bold">Description *</label>
					<QuillEditor bind:content={vacancyDescription} />
				</div>
			</div>
			<div class="mt-7 border-t border-slate-100 pt-5">
				<div class="flex flex-col-reverse justify-end gap-2 sm:flex-row">
					<button
						type="button"
						onclick={closeVacancyModal}
						class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold"
						><X class="h-4 w-4" aria-hidden="true"></X>Batal</button
					><button
						type="submit"
						class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white"
						><Save class="h-4 w-4" aria-hidden="true"></Save>Simpan vacancy</button
					>
				</div>
			</div>
		</form>
	</div>
</dialog>
