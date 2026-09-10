<script lang="ts">
	import { LayoutList, MapPinOff, Home, ArrowRight, GraduationCap } from '@lucide/svelte';
</script>

<header class="border-b border-slate-200 bg-white">
	<nav
		class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
		aria-label="Navigasi utama"
	>
		<a href="/" class="flex items-center gap-2.5 font-extrabold">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
				<GraduationCap class="h-5 w-5" aria-hidden="true"></GraduationCap>
			</span>
			<span>TechInternship<span class="text-indigo-600">.ID</span></span>
		</a>
		<a
			href="/#vacancies"
			class="hidden items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 sm:flex"
		>
			<LayoutList class="h-4 w-4" aria-hidden="true"></LayoutList>Semua lowongan</a
		>
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
		<p class="mt-8 text-sm font-extrabold tracking-[.22em] text-indigo-600 uppercase">Error 404</p>
		<h1 id="not-found-title" class="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
			Halaman tidak ditemukan
		</h1>
		<p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
			Halaman yang kamu cari mungkin sudah tidak tersedia atau alamatnya tidak valid. Yuk, lanjut
			cari kesempatan internship lainnya.
		</p>
		<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href="/"
				class="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-indigo-200 hover:text-indigo-600"
				><Home class="h-4 w-4" aria-hidden="true"></Home>Kembali ke beranda</a
			>
			<a
				href="/#vacancies"
				class="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
				>Lihat lowongan<ArrowRight class="h-4 w-4" aria-hidden="true"></ArrowRight></a
			>
		</div>
	</section>
</main>
