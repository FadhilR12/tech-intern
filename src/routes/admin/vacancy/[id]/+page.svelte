<script lang="ts">
	import { onMount } from 'svelte';
	import {
		GraduationCap,
		ChartNoAxesColumnIncreasing,
		BriefcaseBusiness,
		LogOut,
		ArrowLeft,
		ExternalLink,
		Pencil,
		Trash2,
		FileText,
		MapPin,
		Laptop,
		Calendar,
		Link,
		Eye,
		CalendarDays,
		BarChart3,
		EyeOff,
		Archive,
		X,
		Save
	} from '@lucide/svelte';
	import QuillEditor from '$lib/components/QuillEditor.svelte';
	import { sanitizeHtml } from '$lib/index.js';
	import { goto } from '$app/navigation';
	import * as z from 'zod';

	let { data } = $props();
	let vacancy = $derived(data.vacancy);
	let safeDescription: string = $state('');
	let editModal: HTMLDialogElement;
	let deleteModal: HTMLDialogElement;
	let type = ['Onsite', 'Hybrid', 'Remote'];
	let errorMessage: string = $state('');
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

	function openEditModal() {
		if (editModal) editModal.showModal();
	}

	function closeEditModal() {
		if (editModal) {
			editModal.close();
			errorMessage = '';
		}
	}

	function openDeleteModal() {
		if (deleteModal) deleteModal.showModal();
	}

	function closeDeleteModal() {
		if (deleteModal) deleteModal.close();
	}

	onMount(async () => {
		safeDescription = await sanitizeHtml(vacancy.descHtml);
	});

	async function updateVacancy(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('descHtml', safeDescription);

		try {
			await vacData.parseAsync({
				title: formData.get('title'),
				company: formData.get('company'),
				location: formData.get('location'),
				workType: formData.get('workType'),
				url: formData.get('applyUrl'),
				descHtml: formData.get('descHtml')
			});

			const response = await fetch(`/api/vacancies/${vacancy.id}`, {
				method: 'PUT',
				body: formData
			});

			if (response.ok) {
				const resp = await fetch(`/api/vacancies/${vacancy.id}`);
				vacancy = await resp.json();
				console.log(vacancy);
				closeEditModal();
			} else {
				alert('Gagal menyimpan vacancy');
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

	async function deleteVacancy(event: SubmitEvent) {
		event.preventDefault();

		const response = await fetch(`/api/vacancies/${vacancy.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			goto('/admin/vacancy');
		} else {
			console.error('Error:', Error);
			alert('Gagal menghapus vacancy');
		}
	}
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
		<a href="/admin" class="flex items-center gap-2 font-extrabold"
			><span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"
				><GraduationCap class="h-4 w-4" aria-hidden="true"></GraduationCap></span
			>TechInternship<span class="-ml-2 text-indigo-600">.ID</span><span
				class="text-xs font-semibold text-slate-400">Admin</span
			></a
		>
		<div class="flex items-center gap-1 text-sm font-bold">
			<a href="/admin" class="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500"
				><ChartNoAxesColumnIncreasing class="h-4 w-4" aria-hidden="true"
				></ChartNoAxesColumnIncreasing>Analytics</a
			><a
				href="/admin/vacancy"
				class="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
				><BriefcaseBusiness class="h-4 w-4" aria-hidden="true"></BriefcaseBusiness>Vacancy</a
			><a href="/admin/login" class="flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600"
				><LogOut class="h-4 w-4" aria-hidden="true"></LogOut>Keluar</a
			>
		</div>
	</nav>
</header>
<!-- Go template: render detail, status, action, dan analytics vacancy di dalam main ini. -->
<!-- TODO(JS): Muat data vacancy dan metrics, implementasikan edit, rich-text editor, simpan, konfirmasi hapus/arsip, serta pembaruan status. -->
<main class="mx-auto max-w-6xl px-5 py-9">
	<div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
		<div>
			<a
				href="/admin/vacancy"
				class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
				><ArrowLeft class="h-4 w-4" aria-hidden="true"></ArrowLeft>Semua vacancy</a
			>
			<div class="mt-4 flex flex-wrap items-center gap-3">
				<h1 class="text-3xl font-extrabold">{vacancy.title}</h1>
				{#if vacancy.visibleStatus == 'Shown'}
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
						><Eye class="h-3 w-3" aria-hidden="true"></Eye>{vacancy.visibleStatus}</span
					>
				{:else}
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
						><EyeOff class="h-3 w-3" aria-hidden="true"></EyeOff>{vacancy.visibleStatus}</span
					>
				{/if}
			</div>
			<p class="mt-2 text-sm font-semibold text-slate-500">{vacancy.company}</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="/vacancy/{vacancy.id}"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold"
				><ExternalLink class="h-4 w-4" aria-hidden="true"></ExternalLink>Lihat publik</a
			><button
				type="button"
				onclick={openEditModal}
				class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white"
				><Pencil class="h-4 w-4" aria-hidden="true"></Pencil>Edit</button
			><button
				type="button"
				onclick={openDeleteModal}
				class="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600"
				><Trash2 class="h-4 w-4" aria-hidden="true"></Trash2>Hapus</button
			>
		</div>
	</div>
	<section class="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
		<div class="flex items-center gap-3">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
				><FileText class="h-4 w-4" aria-hidden="true"></FileText></span
			>
			<h2 class="font-extrabold">Detail vacancy</h2>
		</div>
		<dl class="mt-5 grid gap-5 border-b border-slate-100 pb-6 sm:grid-cols-3">
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<MapPin class="h-3.5 w-3.5" aria-hidden="true"></MapPin>Location
				</dt>
				<dd class="mt-1 text-sm font-bold">{vacancy.location}</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<Laptop class="h-3.5 w-3.5" aria-hidden="true"></Laptop>WorkType
				</dt>
				<dd class="mt-1 text-sm font-bold">{vacancy.workType}</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<Calendar class="h-3.5 w-3.5" aria-hidden="true"></Calendar>Dibuat
				</dt>
				<dd class="mt-1 text-sm font-bold">11 Agu 2026</dd>
			</div>
		</dl>
		<div class="rich-content mt-6">
			{@html safeDescription}
		</div>
		<div class="mt-6 border-t border-slate-100 pt-5">
			<p
				class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
			>
				<Link class="h-3.5 w-3.5" aria-hidden="true"></Link>URL Lamaran
			</p>
			<a
				href={vacancy.applyUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-2 inline-flex items-center gap-2 text-sm font-bold break-all text-indigo-600 hover:underline"
				>{vacancy.applyUrl}
				<ExternalLink class="h-4 w-4 shrink-0" aria-hidden="true"></ExternalLink></a
			>
		</div>
	</section>
	<section class="mt-7">
		<h2 class="text-2xl font-extrabold">Analytics views</h2>
		<p class="mt-1 text-sm text-slate-500">Jumlah pembukaan halaman detail vacancy ini.</p>
		<div
			class="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:gap-4 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent"
		>
			<div
				class="flex min-w-0 flex-col items-center border-r border-slate-200 p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9"
					><Eye class="h-4 w-4" aria-hidden="true"></Eye></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					Hari ini
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.todayViews}
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center border-r border-slate-200 p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-lime-100 text-lime-800 sm:h-9 sm:w-9"
					><CalendarDays class="h-4 w-4" aria-hidden="true"></CalendarDays></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">7 hari</span><span class="hidden sm:inline">7 hari terakhir</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.sevenDayViews}
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-600 sm:h-9 sm:w-9"
					><BarChart3 class="h-4 w-4" aria-hidden="true"></BarChart3></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">Total</span><span class="hidden sm:inline">Total views</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.totalViews}
				</p>
			</div>
		</div>
	</section>
</main>

<!-- TODO(JS): Pertahankan kedua dialog berikut; hubungkan tombol aksi ke showModal(), close(), dan operasi backend. -->
<dialog
	id="delete-dialog"
	bind:this={deleteModal}
	class="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 backdrop:bg-slate-950/50"
>
	<form class="p-6" onsubmit={deleteVacancy}>
		<span class="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600"
			><Archive class="h-5 w-5" aria-hidden="true"></Archive></span
		>
		<h2 class="mt-4 text-lg font-extrabold">Hapus vacancy?</h2>
		<p class="mt-2 text-sm leading-6 text-slate-500">
			Vacancy akan dipindahkan ke arsip. Informasi dan seluruh data views tetap tersimpan, tetapi
			tidak dapat diubah lagi.
		</p>
		<div class="mt-6 flex justify-end gap-2">
			<button
				type="button"
				onclick={closeDeleteModal}
				class="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold"
				>Batal</button
			><button
				type="submit"
				value="confirm"
				class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white"
				><Archive class="h-4 w-4" aria-hidden="true"></Archive>Hapus</button
			>
		</div>
	</form>
</dialog>

<dialog
	id="vacancy-modal"
	bind:this={editModal}
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
					<p class="text-xs font-bold text-indigo-600">Edit vacancy</p>
					<h2 class="mt-0.5 text-xl font-extrabold">Perbarui vacancy</h2>
				</div>
			</div>
			<button
				type="button"
				onclick={closeEditModal}
				aria-label="Tutup modal"
				class="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
				><X class="h-5 w-5" aria-hidden="true"></X></button
			>
		</div>
		<form class="bg-white p-6" novalidate onsubmit={updateVacancy}>
			{#if errorMessage !== ''}
				<span
					class="mb-5 flex rounded-[8px] bg-red-300/60 p-3 text-[12px] font-semibold text-red-700"
					>{errorMessage}</span
				>
			{/if}
			<div class="grid gap-5 sm:grid-cols-2">
				<label class="sm:col-span-2"
					><span class="mb-2 block text-sm font-bold">Title *</span><input
						required
						name="title"
						value={vacancy.title}
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Company *</span><input
						required
						name="company"
						value={vacancy.company}
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Location *</span><input
						required
						name="location"
						value={vacancy.location}
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">WorkType *</span><span class="relative block"
						><select
							name="workType"
							class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
							><option>Onsite</option><option selected>Hybrid</option><option>Remote</option
							></select
						></span
					></label
				>
				<label
					><span class="mb-2 block text-sm font-bold">Status *</span><span class="relative block"
						><select
							name="visibleStatus"
							class="custom-select focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
							><option>Hidden</option><option selected>Shown</option></select
						></span
					></label
				>
				<label class="sm:col-span-2"
					><span class="mb-2 block text-sm font-bold">URL Lamaran *</span><input
						type="url"
						name="applyUrl"
						required
						value={vacancy.applyUrl}
						class="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
					/></label
				>
				<div class="sm:col-span-2">
					<label class="mb-2 block text-sm font-bold">Description *</label>
					<QuillEditor bind:content={safeDescription} />
				</div>
			</div>
			<div class="mt-7 border-t border-slate-100 pt-5">
				<div class="flex flex-col-reverse justify-end gap-2 sm:flex-row">
					<button
						type="button"
						onclick={closeEditModal}
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
