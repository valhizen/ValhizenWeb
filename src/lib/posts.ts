export type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string; // ISO string
  tags?: string[];
  readingTime?: string; // e.g. "4 min read"
  coverImage?: string; // URL or /static path
};

export type PostModule = {
  default: unknown; // a Svelte component for the post content
  metadata?: Omit<PostMeta, 'slug'>;
};

// Eagerly import all posts in routes/blogs/_posts as Svelte components
const modules = import.meta.glob<PostModule>('/src/routes/blogs/_posts/*.svelte', { eager: true });

function formatTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const posts = Object.entries(modules).map(([path, mod]) => {
  const slug = path
    .split('/_posts/')[1]
    .replace(/\.svelte$/, '');

  const metaFromFile = (mod as PostModule).metadata ?? {};
  const title = metaFromFile.title ?? formatTitleFromSlug(slug);

  const post: PostMeta & { component: unknown } = {
    slug,
    title,
    description: metaFromFile.description,
    date: metaFromFile.date,
    tags: metaFromFile.tags,
    readingTime: metaFromFile.readingTime,
    coverImage: metaFromFile.coverImage,
    component: (mod as PostModule).default
  };
  return post;
}).sort((a, b) => {
  // newest first if both have dates
  const da = a.date ? Date.parse(a.date) : 0;
  const db = b.date ? Date.parse(b.date) : 0;
  return db - da;
});

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

