# HO–HINDI TRANSLATOR

A dictionary-first Ho–Hindi project focused on public lookups, community contributions, and reviewable data.

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. Add your project values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Run the SQL migration in `supabase/migrations/001_dictionary_schema.sql`.
4. Keep private submissions in the pending-review table, and public reads limited to approved entries.

## Local JSONL fallback

If Supabase is not configured, the app reads from `data/public/entries.jsonl` and stores pending contributions in `data/private/contributions.jsonl`.

## Scripts

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Notes

- This project intentionally avoids claiming sentence translation until a verified model or engine is implemented.
- Public entries remain empty or synthetic until a reviewed, permission-cleared dataset is supplied.
