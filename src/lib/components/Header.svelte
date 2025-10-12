<script lang="ts">
	import { page } from '$app/stores';
	
	$: currentPath = $page.url.pathname;
</script>

<header class="header">
	<nav class="nav">
		<div class="nav-brand">
			<a href="/" class="brand-link">Valhizen</a>
		</div>
		
		<div class="nav-links">
			<a href="/" class="nav-link" class:active={currentPath === '/'}>Home</a>
			<a href="/blogs" class="nav-link" class:active={currentPath === '/blogs'}>Blogs</a>
			<a href="/projects" class="nav-link" class:active={currentPath === '/projects'}>Projects</a>
		</div>
	</nav>
</header>

<style>
	.header {
		width: 100%;
		background: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.brand-link {
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-text);
		text-decoration: none;
	}
	
	.nav-links {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}
	
	.nav-link {
		color: var(--color-text-secondary);
		text-decoration: none;
		font-weight: 400;
		padding: 0.25rem 0;
		font-size: 0.9rem;
	}
	
	.nav-link:hover {
		color: var(--color-text);
	}
	
	.nav-link.active {
		color: var(--color-text);
		font-weight: 500;
	}
	
	@media (max-width: 768px) {
		.nav {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
		}
		
		.nav-links {
			gap: 1rem;
		}
		
		.nav-link {
			padding: 0.4rem 0.8rem;
			font-size: 0.9rem;
		}
	}
</style>
