# GitHub Secrets Configuration

This document lists all secrets required for the automation workflows.

## Required Secrets

### BRAVE_SEARCH_API_KEY

**Purpose**: Used by the Python automation script to search for India iGaming news.

**How to get**:
1. Go to [Brave Search API](https://brave.com/search/api/)
2. Sign up for an account
3. Create an API key
4. Copy the key

### CHUTES_API_KEY

**Purpose**: Used by the Python automation script for LLM-based content generation.

**How to get**:
1. Go to [Chutes.ai](https://chutes.ai)
2. Sign up and access the API dashboard
3. Create an API key
4. Copy the key

**Alternative**: If using OpenAI directly, name this `OPENAI_API_KEY` and update the automation code accordingly.

## Setting Secrets in GitHub

1. Go to your repository on GitHub
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Enter the secret name and value
5. Click **Add secret**

## Local Development

For local testing of the automation scripts, create a `.env` file in the `automation/` directory:

```
BRAVE_SEARCH_API_KEY=your_key_here
CHUTES_API_KEY=your_key_here
```

**IMPORTANT**: Never commit `.env` files to the repository!
