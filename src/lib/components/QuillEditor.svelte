<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type Quill from 'quill';

	let {
		content = $bindable(''),
		onchange
	}: {
		content?: string;
		onchange?: (html: string) => void;
	} = $props();
	let editorContainer: HTMLDivElement;
	let quill: Quill;

	onMount(async () => {
		const { default: Quill } = await import('quill');
		quill = new Quill(editorContainer, {
			theme: 'snow',
			placeholder: 'Tulis sesuatu yang luar biasa...',
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['link', 'image', 'code-block'],
					['clean']
				]
			}
		});

		if (content) {
			quill.clipboard.dangerouslyPasteHTML(content);
		}

		quill.on('text-change', (delta, oldDelta, source) => {
			if (source === 'user') {
				content = quill.root.innerHTML;
				if (onchange) {
					onchange(content);
				}
			}
		});
	});

	$effect(() => {
		if (!quill) return;

		const currentHtml = quill.root.innerHTML;
		const targetContent = content || '';

		if (targetContent === '' && currentHtml !== '<p><br></p>' && currentHtml !== '') {
			// Memaksa Quill untuk kosong
			quill.setText('');
			// Sebagai fallback jika setText tidak mereset HTML-nya
			if (quill.root.innerHTML !== '<p><br></p>') {
				quill.root.innerHTML = '<p><br></p>';
			}
			return;
		}

		if (targetContent && targetContent !== currentHtml) {
			quill.clipboard.dangerouslyPasteHTML(targetContent);
		}
	});
</script>

<div bind:this={editorContainer} class="editor-wrapper"></div>

<!-- <style>
	.editor-wrapper {
		min-height: 200px;
		background-color: white;
	}
	/* Memaksa grup tombol di toolbar untuk rata tengah secara vertikal */
	.editor-wrapper :global(.ql-toolbar.ql-snow .ql-formats) {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	/* Menyesuaikan label dropdown agar panah dan teksnya sejajar */
	.editor-wrapper :global(.ql-toolbar.ql-snow .ql-picker-label) {
		display: flex;
		align-items: center;
	}
</style> -->
