<script lang="ts">
	import { enhance } from '$app/forms';
	import { LockKeyhole, LogIn, Mail, ShieldCheck } from '@lucide/svelte';

	let { form } = $props();
	let showPass: boolean = $state(false);

	function togglePasswordVisibility() {
		showPass = !showPass;
	}
</script>

<main class="grid min-h-[calc(100vh-69px)] place-items-center px-5 py-5">
	<div
		class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-8"
	>
		<span class="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
			><ShieldCheck class="h-5 w-5" aria-hidden="true"></ShieldCheck></span
		>
		<p class="mt-5 text-sm font-bold text-indigo-600">Admin</p>
		<h1 class="mt-1 text-2xl font-extrabold">Masuk ke dashboard</h1>
		<p class="mt-2 text-sm text-slate-500">Kelola vacancy dan lihat analytics views.</p>
		<!-- TODO(JS): Kirim kredensial ke handler autentikasi, tampilkan error login, dan aktifkan toggle visibilitas password. -->
		<form
			method="post"
			action="?/login"
			use:enhance
			id="login-form"
			class="mt-6 space-y-4"
			novalidate
		>
			{#if form?.error}
				<span class="flex rounded-[8px] bg-red-300/60 p-3 text-[12px] font-semibold text-red-700"
					>{form.error}</span
				>
			{/if}
			<label class="block"
				><span class="mb-2 block text-sm font-bold">Email</span>
				<span class="relative block"
					><Mail
						class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden="true"
					></Mail><input
						id="email"
						type="email"
						name="email"
						autocomplete="username"
						required
						placeholder="Masukkan email"
						class="focus-ring w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm"
					/></span
				></label
			>
			<div>
				<label for="password" class="mb-2 block text-sm font-bold">Password</label>
				<div class="relative">
					<LockKeyhole
						class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden="true"
					></LockKeyhole><input
						id="password"
						type={showPass ? 'text' : 'password'}
						name="password"
						autocomplete="current-password"
						required
						placeholder="Masukkan password"
						class="focus-ring w-full rounded-xl border border-slate-200 py-3 pr-16 pl-11 text-sm"
					/><button
						id="toggle-password"
						type="button"
						onclick={togglePasswordVisibility}
						class="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-bold text-indigo-600"
						>{showPass ? 'Sembunyikan' : 'Lihat'}</button
					>
				</div>
			</div>
			<p
				id="login-error"
				class="hidden rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700"
				role="alert"
			>
				Email atau password tidak sesuai.
			</p>
			<button
				type="submit"
				class="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
				><LogIn class="h-4 w-4" aria-hidden="true"></LogIn>Masuk</button
			>
		</form>
	</div>
</main>
