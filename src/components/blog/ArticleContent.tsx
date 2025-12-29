interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div
      className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
