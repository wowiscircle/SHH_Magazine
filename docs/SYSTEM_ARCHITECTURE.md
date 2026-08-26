# System Architecture

## One App / One Deployment / One Domain

```text
magazine.shh.tmu.edu.tw
├── /                  Public
├── /issues            Public
├── /read              Public
├── /q                 Public QR Router
└── /admin             Protected Admin
```

Do not create separate Admin deployment/domain.

## Pilot

Same model on external Pilot host:

```text
pilot-host.example
├── /
├── /read/*
├── /q/*
└── /admin
```

## QR Router Flow

```text
GET /q/[qrId]
1. resolve trusted QR mapping
2. generate opaque entry_id
3. capture server/edge qr_entry_at_utc
4. trigger best-effort analytics
5. redirect immediately
```

Analytics write must not delay/stop redirect.

## Entry Attribution

Destination may receive a short-lived anonymous `entry_id` context using a safe query parameter, first-party cookie, or session-storage bootstrap. Choose the simplest approach that preserves attribution without exposing sensitive data.

## Interaction Timing

Reader/client tracks session start, visibility/activity-aware active engagement, 15s heartbeat, and visibility/pagehide flush. Reader must remain functional if analytics fails.

## CMS

Pilot uses local typed JSON. Production direction:

```text
Google Sheet CMS
→ validation/sync
→ last-known-good JSON snapshot
→ web app
```

Google Sheet must not be queried on every public request.

## Analytics / Admin

Pilot can use debug/demo analytics first. Future GA Data API or equivalent server-side analytics must not expose secrets to browser.

## Security

- no open redirect
- outbound registration allowlist
- protected Admin
- no PHI
- raw timestamp stored UTC, displayed Asia/Taipei
