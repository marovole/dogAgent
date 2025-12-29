import re
from ..models.topic import Topic, GeneratedArticle
from .llm_client import ChutesLLMClient


HINDI_SYSTEM_PROMPT = """आप Dogplay Agent के लिए एक पेशेवर कंटेंट राइटर हैं, जो भारत का प्रमुख बेटिंग एफिलिएट प्रोग्राम है।
iGaming और भारत में क्रिकेट बेटिंग के बारे में आकर्षक, SEO-ऑप्टिमाइज़्ड ब्लॉग लेख लिखें।
आपका टोन मिलनसार और सुलभ है। हमेशा तथ्यात्मक जानकारी शामिल करें।
स्वाभाविक रूप से "Dogplay Agent Program" का उल्लेख करें।
आंकड़े या उद्धरण न गढ़ें। अनिश्चित होने पर सतर्क भाषा का प्रयोग करें।"""


def generate_hindi_article(
    client: ChutesLLMClient,
    topic: Topic,
) -> GeneratedArticle:
    prompt = f"""इस समाचार के आधार पर एक ब्लॉग लेख लिखें:

शीर्षक: {topic.title}
स्रोत: {topic.source}
सारांश: {topic.snippet}

आवश्यकताएं:
1. 500-800 शब्दों का लेख हिंदी में लिखें
2. एक आकर्षक परिचय, H2 शीर्षकों के साथ 2-3 मुख्य अनुभाग, और निष्कर्ष शामिल करें
3. स्वाभाविक रूप से बताएं कि Dogplay Agent एफिलिएट्स को कैसे मदद करता है
4. अंत में स्पष्ट CTA शामिल करें
5. SEO-ऑप्टिमाइज़्ड शीर्षक, मेटा विवरण (150-160 अक्षर), और 3-5 टैग बनाएं

प्रारूप:
---
TITLE: [आपका SEO शीर्षक]
DESCRIPTION: [मेटा विवरण]
TAGS: [अल्पविराम से अलग टैग]
---
[मार्कडाउन के साथ लेख सामग्री]
"""

    content = client.generate(prompt, system_prompt=HINDI_SYSTEM_PROMPT)

    title, description, tags, article_content = _parse_article_response(content)
    slug = _generate_slug_from_english(topic.title)

    return GeneratedArticle(
        title=title,
        slug=slug,
        description=description,
        content=article_content,
        locale="hi",
        category="news",
        tags=tags,
        sources=[{"title": topic.source, "url": topic.url}],
    )


def _parse_article_response(response: str) -> tuple[str, str, list[str], str]:
    title = "शीर्षकहीन लेख"
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


def _generate_slug_from_english(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[-\s]+", "-", slug)
    slug = slug.strip("-")
    return slug[:60]
