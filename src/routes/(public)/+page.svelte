<script lang="ts">
	import {
		Sparkles,
		ArrowRight,
		BadgeCheck,
		WalletCards,
		Users,
		MapPin,
		Laptop,
		Rocket,
		Search,
		SearchX,
		RotateCcw,
		Clock3,
		Wifi,
		Building2,
		GraduationCap,
		ArrowDown,
		ArrowUpDown
	} from '@lucide/svelte';
	import { plainText, excerpt, passedDays, processVacancies } from '$lib/index.js';
	import type { Vacancy } from '$lib/index.js';
	let { data }: { data: { vacancies: Vacancy[] } } = $props();
	let searchQuery = $state<string>('');
	let workTypeFilter = $state<string>('');
	let sortBy = $state<'newest' | 'oldest' | string>('newest');

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
	let debouncedSearch = debounce<string>('', 500);

	$effect(() => {
		debouncedSearch.value = searchQuery;
	});

	let filteredVacancies = $derived(
		processVacancies(data.vacancies, debouncedSearch.value, sortBy, workTypeFilter)
	);

	function resetFilter(): void {
		searchQuery = '';
		workTypeFilter = '';
		sortBy = 'newest';
	}
</script>

<header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
	<nav
		class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
		aria-label="Navigasi utama"
	>
		<a href="/" class="flex items-center gap-2.5 font-extrabold"
			><span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm"
				><GraduationCap class="h-5 w-5" aria-hidden="true" /></span
			><span>TechInternship<span class="text-indigo-600">.ID</span></span></a
		><a
			href="#vacancies"
			class="group flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600"
			>Cari internship <ArrowDown
				class="h-4 w-4 transition group-hover:translate-y-0.5"
				aria-hidden="true"
			/></a
		>
	</nav>
</header>

<main class="flex-1">
	<section class="hero-grid overflow-hidden border-b border-slate-200 px-5 py-14 sm:py-20">
		<div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
			<div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm"
				>
					<Sparkles class="h-3.5 w-3.5 text-lime-600" aria-hidden="true" /> Dibuat khusus untuk mahasiswa
					IT
				</div>
				<h1
					class="mt-6 max-w-3xl text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
				>
					Mulai karier tech-mu dari <span class="text-indigo-600"
						>internship yang <span class="hero-highlight">tepat</span>.</span
					>
				</h1>
				<p class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
					Cari kesempatan yang relevan, pahami ekspektasinya, lalu ambil langkah pertamamu ke
					industri teknologi lokal dan global!
				</p>
				<a
					href="#vacancies"
					class="focus-ring group mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
					>Jelajahi lowongan <ArrowRight
						class="h-4 w-4 transition group-hover:translate-x-0.5"
						aria-hidden="true"
					/></a
				>
				<div class="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
					<span class="flex items-center gap-2"
						><BadgeCheck class="h-4 w-4 text-indigo-600" aria-hidden="true" /> Lowongan terkurasi</span
					><span class="flex items-center gap-2"
						><WalletCards class="h-4 w-4 text-indigo-600" aria-hidden="true" /> Gratis untuk mahasiswa</span
					><span class="flex items-center gap-2"
						><Users class="h-4 w-4 text-indigo-600" aria-hidden="true" /> Untuk talenta IT</span
					>
				</div>
			</div>
			<div class="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
				<div class="absolute -inset-8 rounded-[2.5rem] bg-indigo-100/60 blur-2xl"></div>
				<div
					class="relative rounded-[2rem] border border-indigo-100 bg-white/80 p-5 shadow-2xl shadow-indigo-200/50 backdrop-blur"
				>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2 text-xs font-bold text-slate-500">
							<span class="h-2.5 w-2.5 rounded-full bg-lime-400"></span> Kesempatan minggu ini
						</div>
						<span
							class="rounded-full bg-lime-200 px-2.5 py-1 text-[10px] font-extrabold text-lime-900"
							>OPEN</span
						>
					</div>
					<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<div class="flex gap-4">
							<span
								class="grid h-12 w-12 place-items-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white"
								>AC</span
							>
							<div>
								<p class="font-extrabold">Frontend Engineer Intern</p>
								<p class="mt-1 text-xs font-semibold text-slate-500">Arunika Commerce</p>
							</div>
						</div>
						<div class="mt-5 flex gap-2">
							<span
								class="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600"
								><MapPin class="h-3 w-3" aria-hidden="true" /> Jakarta</span
							><span
								class="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-[11px] font-bold text-indigo-700"
								><Laptop class="h-3 w-3" aria-hidden="true" /> Hybrid</span
							>
						</div>
					</div>
					<div class="-mx-1 mt-3 grid grid-cols-2 gap-3">
						<div class="rounded-xl border border-slate-200 bg-white p-3">
							<div class="h-2 w-16 rounded bg-slate-200"></div>
							<div class="mt-2 h-2 w-24 rounded bg-slate-100"></div>
						</div>
						<div class="rounded-xl border border-slate-200 bg-white p-3">
							<div class="h-2 w-12 rounded bg-slate-200"></div>
							<div class="mt-2 h-2 w-20 rounded bg-slate-100"></div>
						</div>
					</div>
				</div>
				<div
					class="absolute -top-6 -right-5 grid h-14 w-14 rotate-6 place-items-center rounded-2xl bg-lime-300 text-lime-950 shadow-lg"
				>
					<Rocket class="h-6 w-6" aria-hidden="true" />
				</div>
			</div>
		</div>
	</section>
	<!-- TODO(JS): Terapkan pencarian, filter work type, sorting, reset filter, pembaruan jumlah hasil, dan empty state berdasarkan data vacancy dari backend. -->
	<section id="vacancies" class="px-5 py-14 sm:py-16">
		<div class="mx-auto max-w-6xl">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
				<div>
					<p class="text-xs font-extrabold tracking-[.18em] text-indigo-600 uppercase">
						Kesempatan terbaru
					</p>
					<h2 class="mt-2 text-2xl font-extrabold sm:text-3xl">Temukan role yang cocok buatmu</h2>
					<p class="mt-2 text-sm text-slate-500">
						Cari berdasarkan minat, cara kerja, atau skill yang ingin kamu pelajari.
					</p>
				</div>
				<p id="result-count" class="text-sm font-bold text-slate-500" aria-live="polite">
					Menampilkan {filteredVacancies.length} hasil
				</p>
			</div>
			<div
				class="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm md:grid-cols-[1fr_180px_190px]"
			>
				<label class="relative"
					><span class="sr-only">Cari lowongan</span><Search
						class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden="true"
					/><input
						id="search"
						bind:value={searchQuery}
						type="search"
						placeholder="Cari posisi, skill, atau perusahaan..."
						class="focus-ring w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm"
					/></label
				><label class="relative"
					><span class="sr-only">Work type</span><Laptop
						class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden="true"
					/><select
						id="work-type"
						bind:value={workTypeFilter}
						class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 text-sm"
					>
						<option value="">Semua tipe</option>
						<option value="Onsite">Onsite</option>
						<option value="Hybrid">Hybrid</option>
						<option value="Remote">Remote</option>
					</select>
				</label><label class="relative"
					><span class="sr-only">Urutkan</span><ArrowUpDown
						class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden="true"
					></ArrowUpDown><select
						id="sort"
						bind:value={sortBy}
						class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 text-sm"
					>
						<option value="newest">Terbaru</option>
						<option value="oldest">Terlama</option>
					</select></label
				>
			</div>
			<!-- Go template: range vacancy publik di dalam container ini. -->
			<div id="vacancy-list" class="mt-5 grid gap-4 lg:grid-cols-2">
				{#each filteredVacancies as vacancy}
					<a
						href="/vacancy/{vacancy.id}"
						class="vacancy-card focus-ring group block rounded-2xl border border-slate-200 bg-white p-5 text-inherit no-underline sm:p-6"
					>
						<div class="flex items-start gap-4">
							<span
								class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xs font-extrabold text-indigo-700 ring-1 ring-indigo-100"
								>{vacancy.companyInitial}</span
							>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-start justify-between gap-2">
									<div>
										<h3 class="text-lg font-extrabold transition group-hover:text-indigo-600">
											{vacancy.title}
										</h3>
										<p class="mt-1 text-sm font-semibold text-slate-500">{vacancy.company}</p>
									</div>
									<span
										class="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-2.5 py-1 text-[11px] font-extrabold text-lime-800"
										>{#if vacancy.workType === 'Remote'}
											<Wifi class="h-3 w-3" aria-hidden="true" />
										{:else if vacancy.workType === 'Hybrid'}
											<Laptop class="h-3 w-3" aria-hidden="true" />
										{:else}
											<Building2 class="h-3 w-3" aria-hidden="true" />
										{/if}
										{vacancy.workType}</span
									>
								</div>
							</div>
						</div>
						<p class="mt-4 text-sm leading-6 text-slate-600">
							{excerpt(plainText(vacancy.descHtml), 140)}
						</p>
						<div
							class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"
						>
							<div class="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
								<span class="flex items-center gap-1.5"
									><MapPin
										class="h-3.5 w-3.5 text-slate-400"
										aria-hidden="true"
									/>{vacancy.location}</span
								><span class="flex items-center gap-1.5"
									><Clock3 class="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />{passedDays(
										vacancy.createdAt
									)}</span
								>
							</div>
							<span class="flex items-center gap-1.5 text-sm font-extrabold text-indigo-600"
								>Lihat detail <ArrowRight
									class="h-4 w-4 transition group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</span>
						</div>
					</a>
				{:else}
					<!-- Empty State (Sudah ditambah col-span-full dan onclick) -->
					<div
						id="empty-state"
						class="col-span-full mt-5 rounded-2xl border border-dashed border-slate-300 py-14 text-center"
					>
						<span
							class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"
							><SearchX class="h-6 w-6" aria-hidden="true"></SearchX></span
						>
						<h3 class="mt-4 font-extrabold">Lowongan tidak ditemukan</h3>
						<p class="mt-2 text-sm text-slate-500">Coba kata kunci atau work type lain.</p>
						<button
							id="reset-filter"
							onclick={resetFilter}
							class="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
							><RotateCcw class="h-4 w-4" aria-hidden="true"></RotateCcw> Reset filter</button
						>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
