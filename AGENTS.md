# SHH Magazine Repository Instructions

- Before changing code, read `README.md`, `CODEX.md`, `ACTION_ITEMS.md`, `docs/HANDOFF.md`, and the relevant files under `docs/`.
- Preserve the one-app, one-deployment, one-domain architecture. Public routes and protected `/admin` stay in the same Next.js app.
- Treat the public QR-to-reader flow at 375/390px as the primary experience. Verify mobile behavior before desktop refinements.
- Keep public pages free of admin, analytics, tracking-debug, and demo-dashboard UI.
- Use metadata for issue content and semantic routes. Do not hardcode the latest issue.
- Use TDD for behavior changes. Before handoff, run `npm test`, `npm run lint`, and `npm run build`.
- Except for the sanitized `.env.example`, do not commit `.env*`, `.vercel/`, credentials, analytics secrets, or personal/patient data.
- Keep changes small and preserve unrelated work. Do not deploy or make destructive changes unless the user requests them.
- Communicate with the project owner in Traditional Chinese; keep code and code comments in English.
