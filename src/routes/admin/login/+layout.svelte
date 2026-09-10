<script>
	import { ArrowLeft, GraduationCap } from '@lucide/svelte';

	const { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
			<a href="/" class="flex items-center gap-2.5 font-extrabold"
				><span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white"
					><GraduationCap class="h-5 w-5" aria-hidden="true"></GraduationCap></span
				>TechInternship<span class="-ml-2 text-indigo-600">.ID</span></a
			><a
				href="/"
				class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
				><ArrowLeft class="h-4 w-4" aria-hidden="true"></ArrowLeft>Kembali ke website</a
			>
		</div>
	</header>

	{@render children()}
</div>
