import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogListItem } from '@/types/blog';
import type { Locale } from '@/i18n/routing';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getAllPosts(): Promise<BlogListItem[]> {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const directories = fs.readdirSync(POSTS_DIR);

  const posts: BlogListItem[] = [];

  for (const dir of directories) {
    const dirPath = path.join(POSTS_DIR, dir);
    const stat = fs.statSync(dirPath);

    if (!stat.isDirectory()) continue;

    const mdxPath = path.join(dirPath, 'index.mdx');
    const mdPath = path.join(dirPath, 'index.md');

    const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

    if (!filePath) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const excerpt = content.slice(0, 200).replace(/[#*_`]/g, '').trim() + '...';

    posts.push({
      slug: data.slug || dir,
      title: data.title,
      description: data.description,
      excerpt,
      date: data.date,
      author: data.author || 'Dogplay Team',
      coverImage: data.coverImage || '/images/blog-default.jpg',
      coverImageAlt: data.coverImageAlt || data.title,
      locale: data.locale || 'en',
      category: data.category || 'general',
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
      noindex: data.noindex || false,
      sources: data.sources || [],
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByLocale(locale: Locale): Promise<BlogListItem[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.locale === locale);
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const postMeta = posts.find((p) => p.slug === slug && p.locale === locale);

  if (!postMeta) return null;

  const dirPath = path.join(POSTS_DIR, `${postMeta.date.split('T')[0]}-${slug}`);
  const mdxPath = path.join(dirPath, 'index.mdx');
  const mdPath = path.join(dirPath, 'index.md');

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(fileContent);

  return {
    ...postMeta,
    content,
  };
}
