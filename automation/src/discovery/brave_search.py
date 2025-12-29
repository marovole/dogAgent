import os
from datetime import datetime, timedelta
from typing import Optional
from brave import Brave
from ..models.topic import Topic


class BraveSearchClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("BRAVE_SEARCH_API_KEY")
        if not self.api_key:
            raise ValueError("BRAVE_SEARCH_API_KEY not found")
        self.client = Brave(api_key=self.api_key)

    def search_news(
        self,
        keywords: list[str],
        max_results: int = 10,
        freshness: str = "pd",
    ) -> list[Topic]:
        all_topics = []

        for keyword in keywords:
            try:
                results = self.client.search(
                    q=keyword,
                    count=max_results,
                    freshness=freshness,
                )

                if hasattr(results, "news") and results.news:
                    for item in results.news.results:
                        topic = Topic(
                            title=item.title,
                            url=item.url,
                            snippet=getattr(item, "description", ""),
                            date=self._parse_date(getattr(item, "age", "")),
                            relevance_score=0.8,
                            source=getattr(item, "source", "Unknown"),
                        )
                        all_topics.append(topic)

                if hasattr(results, "web") and results.web:
                    for item in results.web.results[:5]:
                        topic = Topic(
                            title=item.title,
                            url=item.url,
                            snippet=getattr(item, "description", ""),
                            date=datetime.now(),
                            relevance_score=0.6,
                            source=getattr(item, "profile", {}).get("name", "Web"),
                        )
                        all_topics.append(topic)

            except Exception as e:
                print(f"Error searching for '{keyword}': {e}")

        return all_topics

    def _parse_date(self, age_str: str) -> datetime:
        now = datetime.now()
        if not age_str:
            return now

        age_lower = age_str.lower()
        if "hour" in age_lower:
            hours = int("".join(filter(str.isdigit, age_str)) or 1)
            return now - timedelta(hours=hours)
        elif "day" in age_lower:
            days = int("".join(filter(str.isdigit, age_str)) or 1)
            return now - timedelta(days=days)
        elif "week" in age_lower:
            weeks = int("".join(filter(str.isdigit, age_str)) or 1)
            return now - timedelta(weeks=weeks)

        return now


INDIA_IGAMING_KEYWORDS = [
    "India iGaming news",
    "Cricket betting updates India",
    "Online casino regulation India",
    "IPL betting news",
    "India gambling law",
    "Sports betting India 2025",
]
