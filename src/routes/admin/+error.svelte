<script>
	import {MapPinOff, Home, ArrowRight, GraduationCap, ChartNoAxesColumnIncreasing, BriefcaseBusiness, ExternalLink, LogOut } from '@lucide/svelte';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
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
	<main class="grid flex-1 place-items-center px-5 py-14">
		<section class="w-full max-w-2xl text-center" aria-labelledby="not-found-title">
			<div class="relative mx-auto grid h-24 w-24 place-items-center">
				<span class="absolute inset-0 rotate-6 rounded-3xl bg-lime-200"></span>
				<span
					class="relative grid h-20 w-20 place-items-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200"
					><MapPinOff class="h-9 w-9" aria-hidden="true"></MapPinOff></span
				>
			</div>
			<p class="mt-8 text-sm font-extrabold tracking-[.22em] text-indigo-600 uppercase">
				Error 404
			</p>
			<h1 id="not-found-title" class="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
				Halaman tidak ditemukan
			</h1>
			<p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
				Halaman yang kamu cari mungkin sudah tidak tersedia atau alamatnya tidak valid. Yuk, lanjut
				cari kesempatan internship lainnya.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
				<a
					href="/admin"
					class="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-indigo-200 hover:text-indigo-600"
					><Home class="h-4 w-4" aria-hidden="true"></Home>Kembali ke beranda</a
				>
				<a
					href="/admin/vacancy"
					class="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
					>Lihat lowongan<ArrowRight class="h-4 w-4" aria-hidden="true"></ArrowRight></a
				>
			</div>
		</section>
	</main>
</div>
