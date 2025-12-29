import re
from ..models.topic import Topic, GeneratedArticle
from .llm_client import ChutesLLMClient


ENGLISH_SYSTEM_PROMPT = """You are a professional content writer for Dogplay Agent, India's premier betting affiliate program. 
Write engaging, SEO-optimized blog articles about iGaming and cricket betting in India.
Your tone is professional yet accessible. Always include factual information with proper context.
Naturally mention "Dogplay Agent Program" as a solution for affiliates looking to monetize their traffic.
DO NOT fabricate statistics or quotes. If uncertain, use hedging language.
Include a call-to-action encouraging readers to join the Dogplay Agent program."""


def generate_english_article(
    client: ChutesLLMClient,
    topic: Topic,
) -> GeneratedArticle:
    prompt = f"""Write a blog article based on this news:

Title: {topic.title}
Source: {topic.source}
Summary: {topic.snippet}
URL: {topic.url}

Requirements:
1. Write a 500-800 word article in professional English
2. Include an engaging introduction, 2-3 main sections with H2 headings, and a conclusion
3. Naturally mention how Dogplay Agent helps affiliates capitalize on such trends
4. Include a clear CTA at the end
5. Generate an SEO-optimized title (H1), meta description (150-160 chars), and 3-5 tags

Format your response as:
---
TITLE: [Your SEO title]
DESCRIPTION: [Meta description]
TAGS: [comma-separated tags]
---
[Article content with markdown formatting]
"""

    content = client.generate(prompt, system_prompt=ENGLISH_SYSTEM_PROMPT)

    title, description, tags, article_content = _parse_article_response(content)
    slug = _generate_slug(title)

    return GeneratedArticle(
        title=title,
        slug=slug,
        description=description,
        content=article_content,
        locale="en",
        category="news",
        tags=tags,
        sources=[{"title": str(topic.source), "url": str(topic.url)}],
    )


def _parse_article_response(response: str) -> tuple[str, str, list[str], str]:
    title = "Untitled Article"
    description = ""
    tags = []
    content = response

    title_match = re.search(r"TITLE:\s*(.+?)(?:\n|$)", response)
    if title_match:
        title = title_match.group(1).strip()

    desc_match = re.search(r"DESCRIPTION:\s*(.+?)(?:\n|$)", response)
    if desc_match:
        description = desc_match.group(1).strip()

    tags_match = re.search(r"TAGS:\s*(.+?)(?:\n|$)", response)
    if tags_match:
        tags = [t.strip() for t in tags_match.group(1).split(",")]

    content_match = re.search(r"---\s*\n(.*)", response, re.DOTALL)
    if content_match:
        content = content_match.group(1).strip()
        content = re.sub(r"^---\s*\n", "", content)

    return title, description, tags, content


def _generate_slug(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[-\s]+", "-", slug)
    slug = slug.strip("-")
    return slug[:60]
