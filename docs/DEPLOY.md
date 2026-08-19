# Deploying Naija2050

## Prerequisites

- A Vercel account (Hobby or Pro)
- A GitHub repository connected to Vercel

## Environment variables

Set the following in your Vercel project settings under **Settings > Environment Variables**.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL without trailing slash (e.g. `https://naija2050.org`) |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis REST token |
| `POLLS_EXPORT_SECRET` | Recommended | Secret used to hash respondent IDs in CSV exports |
| `POLLS_WEBHOOK_URL` | Optional | Webhook URL called on each new ballot (Slack, Zapier, etc.) |
| `CORRECTIONS_WEBHOOK_URL` | Optional | Webhook for correction form submissions |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Domain for Plausible analytics (loads after consent) |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID (loads after consent) |

## Analytics setup (Plausible + GA4)

Both providers are optional and consent-gated. Scripts load only after a visitor taps **Allow analytics** in the cookie banner.

### Plausible

1. Create a site at [plausible.io](https://plausible.io).
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to your production domain (e.g. `naija2050.org`).

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).
3. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in Vercel for the **Production** environment.
4. In GA4, register these custom events (or let them appear automatically after traffic):
   - `cross_pillar_nav`, `morph_slider_use`, `milestone_select`, `g7_sector_filter`
   - `ask_archive_query`, `ask_archive_blocked`, `ask_suggested_click`
   - `quiz_complete`, `your_2050_complete`, `correction_submit`
   - `map_region_select`, `project_vote`, `project_submit`
   - `pulse_spin`, `pulse_answer`
   - `search_open`, `search_select`, `consent_choice`, `consent_preferences_open`
   - `data_saver_toggle`, `theme_toggle`
   - `page_view` (sent with `page_path`)

GA4 uses Google Consent Mode with `analytics_storage` denied until opt-in. Ad storage stays denied.

### Verify analytics

1. Open the site in a private window.
2. Accept analytics in the cookie banner.
3. Navigate a few pages and use search or Street Pulse.
4. Confirm events in Plausible and GA4 Realtime (may take a few minutes for custom events).

## Upstash Redis setup (Street Pulse polls)

Street Pulse stores ballots in Upstash Redis so they persist across deploys and cold starts.

1. Sign up at [console.upstash.com](https://console.upstash.com) (free, no card required).
2. Create a new Redis database. Pick the region closest to your Vercel deployment (e.g. `us-east-1` for `iad1`).
3. On the database detail page, copy the **REST URL** and **REST Token**.
4. Add them to Vercel as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for the **Production** environment.

In local development, leave these variables unset. The app falls back to a JSON file at `data/polls-runtime.json` so you can test polls without external services.

## Deploying

Push to your main branch. Vercel builds and deploys automatically.

```bash
git push origin main
```

## Verifying the deployment

1. Visit `/pulse` and confirm polls load.
2. Answer one question and verify the tally persists after a page refresh.
3. Redeploy (or wait for another push) and confirm existing results are still visible.

## Geo-restriction

Street Pulse restricts voting to requests originating from Nigeria. On Vercel, this is determined by the `x-vercel-ip-country` header (set automatically at the edge). No configuration is needed; it works out of the box on Vercel.

## Custom domain

Add your domain in Vercel under **Settings > Domains** and update `NEXT_PUBLIC_SITE_URL` to match.
