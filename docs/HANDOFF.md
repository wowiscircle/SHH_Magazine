# SHH Magazine MVP Handoff

Last verified: 2026-09-03 (Asia/Taipei)

First-time Codex users should begin with `docs/COLLEAGUE_QUICKSTART.md`.

## Repository and deployment

- GitHub: <https://github.com/wowiscircle/SHH_Magazine>
- Primary branch: `main`
- Public URL: <https://shh-magazine.vercel.app>
- Vercel scope/project: `shh10/shh-magazine`
- Architecture: one Next.js app, one deployment, one origin

The public homepage, archive, issue pages, PDF reader, outpatient route, and shuttle route return successfully. The active `/admin` route currently returns `503` because valid Basic Auth credentials are not available to that deployment. Environment variable names exist in Vercel, but their values must be checked and the site redeployed before Admin QA.

## Implemented MVP

- Metadata-driven homepage and archive.
- Published demo issues for 2026-06, 2026-07, and 2026-08.
- Local PDF and cover assets for all three issues.
- PDF.js reader with vertical lazy rendering, per-page aspect ratios, page query routing, desktop button zoom, mobile fit-width, and branded failure UI.
- Semantic `/latest/outpatient` and `/latest/shuttle` redirects. Current verified PDF page indices are 10 and 17.
- Placement, Creative x Placement, and Print Content QR route shapes.
- Opaque `entry_id`, server-side QR entry timestamp, reader progress, visibility/idle-aware engagement heartbeat, and best-effort event delivery.
- Protected Admin route and demo-only analytics dashboard layout.
- Public Vercel deployment with deployment-level SSO disabled.

## Known gaps and blockers

1. `data/creatives.demo.json` and several `data/qr-routes.demo.json` records still target `2026-09`, but no published `2026-09` issue exists. Those routes currently lead to a missing issue and must not be used as real QR codes yet.
2. Placement records are examples only. Replace them with the confirmed 7-8 Pilot locations and the final Creative x Placement matrix.
3. The Print Content destination is only the official hospital homepage placeholder. Replace it with the approved doctor registration URL.
4. `ANALYTICS_ENDPOINT` is only an adapter seam. Without a working endpoint, events are accepted but not durably stored.
5. `/admin` displays hardcoded demo metrics; it is not connected to real analytics data.
6. Issue summaries are placeholders and `features` arrays are empty.
7. Automated tests cover important source and data contracts, but full browser end-to-end coverage is still limited.

## Local setup

```bash
git clone https://github.com/wowiscircle/SHH_Magazine.git
cd SHH_Magazine
npm ci
cp .env.example .env.local
npm test
npm run lint
npm run build
npm run dev
```

Default local URL: <http://localhost:3000>

Never commit `.env.local`. Set a long random Admin password and keep all real secrets outside Git.

## Adding the next issue

1. Add the PDF to `public/demo/issues/YYYY-MM.pdf` or replace the storage strategy with an approved public asset host.
2. Add the cover to `public/demo/covers/YYYY-MM.jpg`.
3. Add a `published` record to `data/issues.demo.json` with verified title, summary, publish date, and PDF page indices for outpatient and shuttle information.
4. Update creative, placement, and QR route data only after final IDs and destinations are approved.
5. Test at 375px and 390px. Confirm cover ratio, mixed PDF page ratios, zoom, horizontal scrolling, and `?page=N` positioning.
6. Run the full validation commands below.

## Required validation

```bash
npm test
npm run lint
npm run build
git status --short --branch
```

Public smoke checks:

```text
/
/issues
/issues/2026-08
/read/2026-08
/read/2026-08?page=10
/latest/outpatient
/latest/shuttle
/q/p-story
/admin
```

## Deployment configuration

Required Vercel environment variable names are documented in `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_ANALYTICS_DEBUG`
- `ANALYTICS_ENDPOINT`

Do not put values in documentation or commits. After changing Vercel environment variables, create a new deployment before testing them.

## Recommended next milestone

Prepare the real 2026-09 Pilot dataset and assets first. Then connect a durable analytics destination and replace the Admin demo metrics with queries against that data. Keep the existing public MVP usable throughout the work.
