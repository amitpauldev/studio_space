# StudioSpace Frontend

Next.js 16.4.3 App Router app (single package, `src/` dir). Starter photography-studio booking frontend with better-auth + MongoDB. No tests exist yet — verification is `npm run lint` and `npm run build` (add `npx tsc --noEmit` for type checking; there is no typecheck script).

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`, extends `eslint-config-next`)
- `npm run build` — production build; the real correctness gate

## Environment / gotchas

- Requires a MongoDB instance: `.env` must define `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Auth route handlers hit the DB, but the dev server itself starts without one.
- better-auth is configured server-side in `src/lib/auth.ts` (Mongo adapter, db `studio_space`, email+password only) and client-side in `src/lib/auth-client.ts`. The client's `baseURL` is hardcoded to `http://localhost:3000` — change it if the origin changes.
- Auth API lives at `src/app/api/auth/[...all]/route.ts` (better-auth catch-all; don't add other handlers under `/api/auth`).
- `next.config.ts` explicitly disables `cacheComponents`, `partialPrefetching`, and `reactCompiler` — do not assume those Next 16 features are on.
- Tailwind v4 (no config file): theme lives in `src/app/globals.css`, loaded through a custom `@tailwindcss/turbopack` rule.
- `README.md` is untouched create-next-app boilerplate and references paths that don't exist here (`app/page.tsx`).

## Structure & conventions

- Route groups: `(auth)` for login/register, `(main)` for the public app.
- Components are split by role: `src/components/ui` (shadcn/primitives), `src/components/shared` (header/nav/footer), `src/components/home` (landing sections). shadcn config: `base-nova` style, lucide icons, `@/*` → `src/*` aliases.
- Indent with tabs in source files.
- Toasts use `react-hot-toast`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
