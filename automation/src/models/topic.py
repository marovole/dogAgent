from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Topic:
    title: str
    url: str
    snippet: str
    date: datetime
    relevance_score: float
    source: str

    def to_dict(self) -> dict:
        return {
            "title": self.title,
            "url": self.url,
            "snippet": self.snippet,
            "date": self.date.isoformat(),
            "relevance_score": self.relevance_score,
            "source": self.source,
        }


@dataclass
class GeneratedArticle:
    title: str
    slug: str
    description: str
    content: str
    locale: str
    category: str
    tags: list[str]
    sources: list[dict]
    cover_image_path: Optional[str] = None
    cover_image_alt: Optional[str] = None
    noindex: bool = False

    def to_frontmatter(self) -> dict:
        return {
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "date": datetime.now().isoformat(),
            "author": "Dogplay Team",
            "coverImage": self.cover_image_path or "/images/blog-default.jpg",
            "coverImageAlt": self.cover_image_alt or self.title,
            "locale": self.locale,
            "category": self.category,
            "tags": self.tags,
            "noindex": self.noindex,
            "sources": self.sources,
        }
