import type { BlogListItem } from '@/types/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogListItem[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
