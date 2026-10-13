# HO–HINDI TRANSLATOR

This project is a functional starter for a Ho–Hindi language portal and dictionary lookup interface. It includes a local public dataset adapter, dictionary API endpoints, a contribution review queue, and a polished responsive UI. The data in the default fixture is intentionally labeled as synthetic test data and should not be presented as a verified dictionary.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Scripts

- `npm run dev` — run local development server
- `npm run build` — production build
- `npm run start` — run built app
- `npm run lint` — lint project
- `npm run typecheck` — TypeScript check
- `npm run test` — run Vitest suite

## Dataset and source of truth

- Public approved entries live in `data/public/entries.jsonl`.
- Pending contributions live in `data/private/contributions.jsonl`.
- The app by default uses the local JSONL adapter when no Supabase configuration is present.
- Supabase can be added later with a documented migration and RLS policy.

## Current state

This project is functional as a dictionary lookup prototype and website shell, but it still requires a permission-cleared, reviewed Ho–Hindi dataset before it can claim real dictionary coverage.

## Deployment

- Vercel is a suitable deployment target.
- Add environment variables in `.env.local` or your hosting dashboard before production deployment.
