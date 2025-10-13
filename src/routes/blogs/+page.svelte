
<script lang="ts">
  import { posts } from '$lib/posts';
  const allPosts = posts;
</script>

<div class="page">
  <h1 class="page-title">Blogs</h1>

  <div class="cards">
    {#each allPosts as post}
      <a class="card" href={`/blogs/${post.slug}`}>
        {#if post.coverImage}
          <img class="card-cover" src={post.coverImage} alt={post.title} loading="lazy" />
        {/if}
        <div class="card-header">
          <h3 class="card-title">{post.title}</h3>
          {#if post.date}
            <div class="card-meta">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          {/if}
        </div>
        {#if post.description}
          <p class="card-desc">{post.description}</p>
        {/if}
      </a>
    {/each}
  </div>
  
</div>

<style>
  .page { max-width: 860px; margin: 0 auto; }
  .page-title { text-align: center; margin-top: 0; }
  .cards { display: grid; grid-template-columns: 1fr; gap: 1rem; width: 100%; }
  @media (min-width: 720px) { .cards { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }

  .card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 0.85rem;
    color: var(--color-text);
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    overflow: hidden;
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }

  .card:hover {
    background: var(--color-bg-hover);
    border-color: var(--color-border-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.18);
  }

  .card-cover {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
  }

  .card-title {
    margin: 0;
    font-size: 1.05rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-meta { color: var(--color-text-muted); font-size: 0.85rem; display: flex; gap: 0.35rem; }

  .card-desc {
    margin: 0;
    color: var(--color-text-secondary);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* tag styles intentionally removed to keep UI minimal when unused */

  
  
  @media (max-width: 768px) {
    .cards { gap: 1rem; }
  }
  @media (max-width: 768px) { .page { padding: 0 0.5rem; } }
</style>
