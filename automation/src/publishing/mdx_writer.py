import os
import json
from datetime import datetime
from pathlib import Path
import yaml
from ..models.topic import GeneratedArticle


def write_mdx_article(
    article: GeneratedArticle, base_dir: str = "content/posts"
) -> str:
    date_str = datetime.now().strftime("%Y-%m-%d")
    folder_name = f"{date_str}-{article.slug}"
    folder_path = Path(base_dir) / folder_name

    folder_path.mkdir(parents=True, exist_ok=True)

    frontmatter = article.to_frontmatter()
    frontmatter_yaml = yaml.dump(
        frontmatter, allow_unicode=True, default_flow_style=False
    )

    mdx_content = f"""---
{frontmatter_yaml}---

{article.content}
"""

    file_path = folder_path / "index.mdx"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(mdx_content)

    return str(file_path)


def write_ops_brief(brief_data: dict, base_dir: str = "content/ops") -> str:
    Path(base_dir).mkdir(parents=True, exist_ok=True)

    date_str = brief_data.get("date", datetime.now().strftime("%Y-%m-%d"))
    file_path = Path(base_dir) / f"{date_str}.json"

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(brief_data, f, ensure_ascii=False, indent=2)

    return str(file_path)
