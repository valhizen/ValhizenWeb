<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<Header />
	<main class="main">
		<div class="container">
			{@render children?.()}
		</div>
	</main>
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		min-height: 100vh;
		font-family: 'Georgia', 'Times New Roman', 'Times', serif;
		background: var(--color-bg);
		color: var(--color-text);
		line-height: 1.6;
		text-align: left; /* ensure global left alignment */
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(:root) {
		/* Minimal dark theme */
		--color-bg: #1a1a1a;
		--color-bg-secondary: #2a2a2a;
		--color-bg-hover: #333333;
		--color-bg-card: #222222;
		--color-primary: #888888;
		--color-primary-light: #aaaaaa;
		--color-primary-bg: rgba(136, 136, 136, 0.1);
		--color-text: #e0e0e0;
		--color-text-secondary: #b0b0b0;
		--color-text-muted: #808080;
		--color-border: #404040;
		--color-border-light: #505050;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main {
		flex: 1;
		display: flex;
		justify-content: center;
		padding: 2rem 1rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		max-width: 800px;
		text-align: left;
	}

	:global(h1) {
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 1.5rem 0;
		color: var(--color-text);
	}

	:global(h2) {
		font-size: 1.5rem;
		font-weight: 500;
		margin: 2rem 0 1rem 0;
		color: var(--color-text);
	}

	:global(h3) {
		font-size: 1.25rem;
		font-weight: 500;
		margin: 1.5rem 0 1rem 0;
		color: var(--color-text);
	}

	:global(p) {
		font-size: 1.1rem;
		margin: 1rem 0;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	:global(a) {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	:global(a:hover) {
		color: var(--color-primary-light);
		text-decoration: underline;
	}

	:global(em) {
		color: var(--color-text-muted);
		font-style: italic;
	}

	@media (max-width: 768px) {
		.main {
			padding: 1rem 0.5rem;
		}
		
		:global(h1) {
			font-size: 1.75rem;
		}
		
		:global(h2) {
			font-size: 1.25rem;
		}
		
		:global(p) {
			font-size: 1rem;
		}
	}
</style>
