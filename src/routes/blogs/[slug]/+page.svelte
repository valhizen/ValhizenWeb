<script lang="ts">
  import { page } from '$app/stores';
  import { getPostBySlug, posts } from '$lib/posts';
  import { author } from '$lib/author';

  $: slug = $page.url.pathname.split('/').pop() ?? '';
  $: post = getPostBySlug(slug);

  $: index = posts.findIndex((p) => p.slug === slug);
  $: prev = index > 0 ? posts[index - 1] : null;
  $: next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
</script>

{#if post}
  <article class="post">
    {#if post.coverImage}
      <img class="post-cover" src={post.coverImage} alt={post.title} />
    {/if}
    <header class="post-header">
      <h1 class="post-title">{post.title}</h1>
      {#if post.date}
        <div class="post-meta">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
      {/if}
      {#if post.tags && post.tags.length}
        <div class="post-tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    <svelte:component this={post.component as any} />

    <div class="post-author-bottom">{author.name}</div>

    <nav class="post-nav">
      <a class="back" href="/blogs">← Back to Blogs</a>
      <div class="spacer"></div>
      {#if prev}
        <a class="prev" href={`/blogs/${prev.slug}`}>← {prev.title}</a>
      {/if}
      {#if next}
        <a class="next" href={`/blogs/${next.slug}`}>{next.title} →</a>
      {/if}
    </nav>
  </article>
{:else}
  <p>Post not found.</p>
{/if}

<style>
  .post { max-width: 720px; margin: 0 auto; }
  .post-cover { width: 100%; max-height: 320px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border); margin-bottom: 1rem; }
  .post-header { margin-bottom: 1.25rem; }
  .post-title {
    margin: 0;
    font-size: 1.9rem;
    font-weight: 650;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .post-meta { color: var(--color-text-muted); font-size: 0.95rem; text-align: center; }
  .post-tags { display: flex; gap: 0.35rem; justify-content: center; margin-top: 0.5rem; }
  .tag { font-size: 0.75rem; color: var(--color-text-muted); border: 1px solid var(--color-border); padding: 0.1rem 0.4rem; border-radius: 999px; }
  .post-author-bottom { color: var(--color-text-muted); margin-top: 2rem; font-size: 0.95rem; text-align: center; }

  .post-nav {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
    margin-top: 2rem;
  }

  .spacer { flex: 1; }

  .prev, .next, .back {
    color: var(--color-primary);
    text-decoration: none;
  }
  .prev:hover, .next:hover, .back:hover { text-decoration: underline; }
</style>

