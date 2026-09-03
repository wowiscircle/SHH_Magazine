# CODEX Master Instruction — SHH Magazine Pilot

Read `README.md`, `docs/START_HERE.md`, `docs/HANDOFF.md`, and all files under `docs/` before coding.

This is an existing MVP. Continue from `main`; do not scaffold or rebuild it from scratch. Run the existing validation commands before changing behavior.

## Non-negotiable architecture

ONE Next.js app. ONE deployment. ONE domain/origin.

Do NOT create a second Admin application, repository, deployment, subdomain, or port.

```text
/        public
/q/*     public
/read/*  public
/admin   protected
```

## Public

Must contain ZERO visible tracking demo, event log, analytics KPI, or admin link.

## Admin

Protected `/admin` in the same app. Sections:

1. Overview
2. Creative × Placement
3. Placement Performance
4. Creative Performance
5. Time Analysis
6. Issue Performance
7. System Health
8. Tracking Debug (collapsed)

## Time tracking

At `/q/[qrId]`, generate an opaque `entry_id` and capture server/edge `qr_entry_at_utc`. This is QR Router entry time, not the phone camera decode timestamp.

On issue/reader pages track a separate anonymous interaction session:

```text
session_started_at
first_content_view_at
last_engaged_at
active_engagement_seconds
elapsed_session_seconds
```

Suggested MVP behavior:

```text
idle threshold = 30s
heartbeat = 15s
```

Pause active engagement while hidden/idle. Use `visibilitychange` and `pagehide`; best-effort final flush may use `sendBeacon`.

Tracking failure must never block redirect or Reader.

## QR

Support:

- Placement QR
- Creative × Placement QR
- Print Content QR → allowlisted official doctor registration URL

Same creative across different locations keeps the same `creative_id` but uses different `placement_id` and `qr_id`.

## Reader

Use `pdfjs-dist`. Mobile-first, vertical continuous scroll, fit width, lazy rendering, page query routing, branded failure state. No flipbook and no browser-native embedded PDF as the primary reader.

Public Reader acceptance is mobile-first at 375/390px. Preserve each PDF page's real portrait or landscape aspect ratio; do not use a fixed rendered-page height that creates blank space on narrow screens.

## Latest issue

Use metadata, not hardcoded hero copy. Latest = newest `published` issue by `publish_date`.

Brand color: `#009fa8`.

## Admin time analysis

Build `Placement × Hour` heatmap and support views for Weekday × Hour, Daily Trend, Creative × Time, and median active engagement.

## Demo

Use 2026-06, 2026-07, 2026-08 as demo issues and reserve 2026-09 for Pilot. Do not fabricate official issue titles/page numbers; keep unknown values configurable.

## Quality

Run and fix:

```bash
npm run lint
npm run build
```

Test public/admin separation, QR entry timestamp, engagement timer pause behavior, unknown QR, missing PDF, outbound registration, and analytics failure.
