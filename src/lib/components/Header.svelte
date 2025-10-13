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
			<a href="/contact" class="nav-link" class:active={currentPath === '/contact'}>Contact</a>

			<a
				href="https://github.com/valhizen"
				target="_blank"
				rel="noopener noreferrer"
				class="icon-link"
				title="GitHub: valhizen"
				aria-label="GitHub profile"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
					<path fill="currentColor" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.423 2.865 8.174 6.839 9.504.5.092.682-.217.682-.482 0-.238-.01-1.026-.014-1.862-2.782.605-3.369-1.193-3.369-1.193-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.071 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.706.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.486 17.523 2 12 2z"/>
				</svg>
			</a>
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

	.icon-link {
		display: inline-flex;
		align-items: center;
		color: var(--color-text-secondary);
	}

	.icon-link:hover {
		color: var(--color-text);
	}

	.icon {
		width: 20px;
		height: 20px;
		display: block;
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
