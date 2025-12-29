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

    // Check for locale-specific files first, then generic
    const locales = ['en', 'hi'];
    
    for (const locale of locales) {
      const localeMdxPath = path.join(dirPath, `index.${locale}.mdx`);
      const localeMdPath = path.join(dirPath, `index.${locale}.md`);
      
      const filePath = fs.existsSync(localeMdxPath) 
        ? localeMdxPath 
        : fs.existsSync(localeMdPath) 
          ? localeMdPath 
          : null;

      if (!filePath) continue;

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      const excerpt = content.slice(0, 200).replace(/[#*_`]/g, '').trim() + '...';

      posts.push({
        slug: data.slug || dir.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
        title: data.title,
        description: data.description,
        excerpt,
        date: data.date,
        author: data.author || 'Dogplay Team',
        coverImage: data.image || '/images/blog-default.svg',
        coverImageAlt: data.coverImageAlt || data.title,
        locale: data.locale || locale,
        category: data.category || 'general',
        tags: data.tags || [],
        readingTime: data.readingTime || calculateReadingTime(content),
        noindex: data.noindex || false,
        sources: data.sources || [],
      });
    }
    
    // Also check for generic index.mdx
    const genericMdxPath = path.join(dirPath, 'index.mdx');
    const genericMdPath = path.join(dirPath, 'index.md');
    
    const genericPath = fs.existsSync(genericMdxPath) 
      ? genericMdxPath 
      : fs.existsSync(genericMdPath) 
        ? genericMdPath 
        : null;

    if (genericPath) {
      const fileContent = fs.readFileSync(genericPath, 'utf-8');
      const { data, content } = matter(fileContent);

      const excerpt = content.slice(0, 200).replace(/[#*_`]/g, '').trim() + '...';

      posts.push({
        slug: data.slug || dir.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
        title: data.title,
        description: data.description,
        excerpt,
        date: data.date,
        author: data.author || 'Dogplay Team',
        coverImage: data.image || '/images/blog-default.svg',
        coverImageAlt: data.coverImageAlt || data.title,
        locale: data.locale || 'en',
        category: data.category || 'general',
        tags: data.tags || [],
        readingTime: data.readingTime || calculateReadingTime(content),
        noindex: data.noindex || false,
        sources: data.sources || [],
      });
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByLocale(locale: Locale): Promise<BlogListItem[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.locale === locale);
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
  if (!fs.existsSync(POSTS_DIR)) {
    return null;
  }

  const directories = fs.readdirSync(POSTS_DIR);
  
  for (const dir of directories) {
    const dirPath = path.join(POSTS_DIR, dir);
    const stat = fs.statSync(dirPath);
    
    if (!stat.isDirectory()) continue;
    
    // Check if directory name contains the slug
    if (!dir.includes(slug)) continue;
    
    // Try locale-specific file first
    const localeMdxPath = path.join(dirPath, `index.${locale}.mdx`);
    const localeMdPath = path.join(dirPath, `index.${locale}.md`);
    const genericMdxPath = path.join(dirPath, 'index.mdx');
    const genericMdPath = path.join(dirPath, 'index.md');
    
    const filePath = fs.existsSync(localeMdxPath)
      ? localeMdxPath
      : fs.existsSync(localeMdPath)
        ? localeMdPath
        : fs.existsSync(genericMdxPath)
          ? genericMdxPath
          : fs.existsSync(genericMdPath)
            ? genericMdPath
            : null;

    if (!filePath) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Check if locale matches
    const postLocale = data.locale || 'en';
    if (postLocale !== locale) continue;

    return {
      slug: data.slug || dir.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || 'Dogplay Team',
      coverImage: data.image || '/images/blog-default.svg',
      coverImageAlt: data.coverImageAlt || data.title,
      locale: postLocale,
      category: data.category || 'general',
      tags: data.tags || [],
      readingTime: data.readingTime || calculateReadingTime(content),
      noindex: data.noindex || false,
      sources: data.sources || [],
      content,
    };
  }

  return null;
}
