import os
from typing import Optional
from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential


# Chutes.ai configuration
CHUTES_BASE_URL = "https://llm.chutes.ai/v1/"
CHUTES_DEFAULT_MODEL = "deepseek-ai/DeepSeek-V3.2-TEE"


class ChutesLLMClient:
    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,
        model: Optional[str] = None,
    ):
        self.api_key = api_key or os.getenv("CHUTES_API_KEY")
        self.base_url = base_url or os.getenv("CHUTES_BASE_URL") or CHUTES_BASE_URL
        self.model = model or os.getenv("CHUTES_MODEL") or CHUTES_DEFAULT_MODEL

        if not self.api_key:
            raise ValueError("CHUTES_API_KEY not found")

        self.client = OpenAI(
            api_key=self.api_key,
            base_url=self.base_url,
        )

    @retry(
        stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        max_tokens: int = 2000,
        temperature: float = 0.7,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
        )

        return response.choices[0].message.content or ""
