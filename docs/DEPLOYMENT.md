# Deployment Guide

## Cloudflare Pages Setup

### 1. Connect to GitHub

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages
2. Click "Create a project" > "Connect to Git"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset**: None (Custom)
   - **Build command**: `npm run cf:build`
   - **Build output directory**: `.open-next`
   - **Root directory**: `/` (default)

### 2. Environment Variables

Add these environment variables in Cloudflare Pages settings:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g., `https://dogplay-agent.pages.dev`) |
| `NODE_VERSION` | `20` |

### 3. GitHub Secrets (for Automation)

Add these secrets in GitHub repository settings (Settings > Secrets > Actions):

| Secret | Description |
|--------|-------------|
| `BRAVE_SEARCH_API_KEY` | Your Brave Search API key |
| `CHUTES_API_KEY` | Your Chutes.ai API key |

### 4. Custom Domain (Optional)

1. In Cloudflare Pages, go to Custom domains
2. Add your domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview Cloudflare Pages locally
npm run cf:preview
```

## GitHub Actions

Two workflows are configured:

1. **build.yml**: Runs on push/PR to main - lints, type-checks, and builds
2. **daily-content.yml**: Runs daily at 2 AM UTC - generates new content

## Monitoring

- Check GitHub Actions for workflow runs
- Monitor Cloudflare Pages dashboard for deployment status
- Set up Google Search Console for SEO monitoring
