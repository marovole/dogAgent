import re
from typing import Optional
from ..models.topic import GeneratedArticle


def check_sources(article: GeneratedArticle) -> tuple[bool, str]:
    if not article.sources or len(article.sources) == 0:
        return False, "Article has no sources"
    for source in article.sources:
        if not source.get("url") or not source.get("title"):
            return False, "Source missing URL or title"
    return True, "Sources valid"


def check_content_density(content: str, min_words: int = 300) -> tuple[bool, str]:
    words = len(content.split())
    if words < min_words:
        return False, f"Content too short: {words} words (minimum: {min_words})"
    return True, f"Content has {words} words"


def check_for_fabrication(content: str) -> tuple[bool, str]:
    fabrication_patterns = [
        r"according to (fake|fictional|made-up)",
        r"a source (who|that) (wished|preferred) to remain anonymous",
        r"\d{2,}%\s+of\s+(?!the)",
    ]
    for pattern in fabrication_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            return False, f"Potential fabrication detected: {pattern}"
    return True, "No obvious fabrication detected"


def check_duplicate_content(
    content: str, existing_contents: list[str], threshold: float = 0.7
) -> tuple[bool, str]:
    content_words = set(content.lower().split())
    for existing in existing_contents:
        existing_words = set(existing.lower().split())
        if not content_words or not existing_words:
            continue
        intersection = len(content_words & existing_words)
        union = len(content_words | existing_words)
        similarity = intersection / union if union > 0 else 0
        if similarity > threshold:
            return False, f"High similarity ({similarity:.2%}) with existing content"
    return True, "Content is unique"


def run_quality_checks(
    article: GeneratedArticle,
    existing_contents: Optional[list[str]] = None,
) -> tuple[bool, list[str]]:
    checks = []
    all_passed = True

    source_ok, source_msg = check_sources(article)
    checks.append(f"Sources: {'PASS' if source_ok else 'FAIL'} - {source_msg}")
    all_passed = all_passed and source_ok

    density_ok, density_msg = check_content_density(article.content)
    checks.append(f"Density: {'PASS' if density_ok else 'FAIL'} - {density_msg}")
    all_passed = all_passed and density_ok

    fabrication_ok, fabrication_msg = check_for_fabrication(article.content)
    checks.append(
        f"Fabrication: {'PASS' if fabrication_ok else 'FAIL'} - {fabrication_msg}"
    )
    all_passed = all_passed and fabrication_ok

    if existing_contents:
        dup_ok, dup_msg = check_duplicate_content(article.content, existing_contents)
        checks.append(f"Uniqueness: {'PASS' if dup_ok else 'FAIL'} - {dup_msg}")
        all_passed = all_passed and dup_ok

    return all_passed, checks
