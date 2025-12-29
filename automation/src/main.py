import os
import sys
import logging
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).parent.parent))

from src.discovery.brave_search import BraveSearchClient, INDIA_IGAMING_KEYWORDS
from src.discovery.filter import get_top_topics
from src.generation.llm_client import ChutesLLMClient
from src.generation.en_generator import generate_english_article
from src.generation.hi_generator import generate_hindi_article
from src.generation.zh_tw_generator import generate_ops_brief
from src.quality.checker import run_quality_checks
from src.publishing.mdx_writer import write_mdx_article, write_ops_brief

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def main():
    load_dotenv()

    logger.info("Starting daily content generation...")

    try:
        brave_client = BraveSearchClient()
        llm_client = ChutesLLMClient()
    except ValueError as e:
        logger.error(f"Failed to initialize clients: {e}")
        sys.exit(1)

    logger.info("Searching for news topics...")
    all_topics = brave_client.search_news(INDIA_IGAMING_KEYWORDS)
    logger.info(f"Found {len(all_topics)} topics")

    top_topics = get_top_topics(all_topics, top_n=3)
    logger.info(f"Selected {len(top_topics)} top topics")

    if not top_topics:
        logger.warning("No topics found. Exiting.")
        return

    generated_files = []

    for i, topic in enumerate(top_topics):
        logger.info(f"Processing topic {i + 1}/{len(top_topics)}: {topic.title}")

        try:
            en_article = generate_english_article(llm_client, topic)
            passed, checks = run_quality_checks(en_article)
            for check in checks:
                logger.info(f"  EN Check: {check}")

            if not passed:
                logger.warning(
                    f"  EN article failed quality checks, marking as noindex"
                )
                en_article.noindex = True

            en_path = write_mdx_article(en_article)
            logger.info(f"  EN article written: {en_path}")
            generated_files.append(en_path)

        except Exception as e:
            logger.error(f"  Failed to generate EN article: {e}")

        try:
            hi_article = generate_hindi_article(llm_client, topic)
            passed, checks = run_quality_checks(hi_article)
            for check in checks:
                logger.info(f"  HI Check: {check}")

            if not passed:
                logger.warning(
                    f"  HI article failed quality checks, marking as noindex"
                )
                hi_article.noindex = True

            hi_path = write_mdx_article(hi_article)
            logger.info(f"  HI article written: {hi_path}")
            generated_files.append(hi_path)

        except Exception as e:
            logger.error(f"  Failed to generate HI article: {e}")

    try:
        logger.info("Generating ops brief...")
        ops_brief = generate_ops_brief(llm_client, top_topics)
        ops_path = write_ops_brief(ops_brief)
        logger.info(f"Ops brief written: {ops_path}")
        generated_files.append(ops_path)
    except Exception as e:
        logger.error(f"Failed to generate ops brief: {e}")

    logger.info(f"Content generation complete. Generated {len(generated_files)} files.")

    for f in generated_files:
        print(f)


if __name__ == "__main__":
    main()
