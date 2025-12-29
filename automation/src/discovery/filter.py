from datetime import datetime, timedelta
from ..models.topic import Topic


def filter_by_relevance(topics: list[Topic], min_score: float = 0.5) -> list[Topic]:
    return [t for t in topics if t.relevance_score >= min_score]


def filter_by_date(topics: list[Topic], max_age_hours: int = 48) -> list[Topic]:
    cutoff = datetime.now() - timedelta(hours=max_age_hours)
    return [t for t in topics if t.date >= cutoff]


def deduplicate_topics(topics: list[Topic]) -> list[Topic]:
    seen_urls = set()
    unique = []
    for topic in topics:
        if topic.url not in seen_urls:
            seen_urls.add(topic.url)
            unique.append(topic)
    return unique


def get_top_topics(
    topics: list[Topic],
    top_n: int = 3,
    max_age_hours: int = 48,
    min_relevance: float = 0.5,
) -> list[Topic]:
    filtered = filter_by_date(topics, max_age_hours)
    filtered = filter_by_relevance(filtered, min_relevance)
    filtered = deduplicate_topics(filtered)
    sorted_topics = sorted(filtered, key=lambda t: t.relevance_score, reverse=True)
    return sorted_topics[:top_n]
