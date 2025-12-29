from datetime import datetime
from ..models.topic import Topic
from .llm_client import ChutesLLMClient


ZH_TW_SYSTEM_PROMPT = """你是 Dogplay 運營團隊的內容分析師。
你的任務是為印度 iGaming 市場的新聞製作繁體中文運營簡報。
簡報應簡潔、重點明確，方便運營人員快速了解市場動態。
不要添加評論或建議，只需客觀總結新聞內容。"""


def generate_ops_brief(
    client: ChutesLLMClient,
    topics: list[Topic],
) -> dict:
    topics_text = "\n\n".join(
        [
            f"標題: {t.title}\n來源: {t.source}\n摘要: {t.snippet}\n連結: {t.url}"
            for t in topics
        ]
    )

    prompt = f"""請根據以下新聞生成運營簡報：

{topics_text}

請用繁體中文回覆，格式如下：
1. 每個話題的重點摘要（2-3句話）
2. 3-5個關鍵洞察
3. 市場趨勢總結

格式：
### 話題摘要
[每個話題的摘要]

### 關鍵洞察
- [洞察1]
- [洞察2]
...

### 市場趨勢
[趨勢總結]
"""

    content = client.generate(
        prompt, system_prompt=ZH_TW_SYSTEM_PROMPT, max_tokens=1500
    )

    key_insights = []
    market_trends = []

    lines = content.split("\n")
    current_section = None
    for line in lines:
        line = line.strip()
        if "關鍵洞察" in line:
            current_section = "insights"
        elif "市場趨勢" in line:
            current_section = "trends"
        elif line.startswith("-") and current_section == "insights":
            key_insights.append(line[1:].strip())
        elif current_section == "trends" and line:
            market_trends.append(line)

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "topics": [
            {
                "title": t.title,
                "summary": t.snippet[:200],
                "sources": [{"title": t.source, "url": t.url}],
            }
            for t in topics
        ],
        "keyInsights": key_insights[:5],
        "marketTrends": market_trends[:3],
        "generatedAt": datetime.now().isoformat(),
    }
