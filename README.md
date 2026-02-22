# Bootcamp Jan 13

Monorepo: **UI** (Vite + React) and **backend** (Hono + SQLite with Drizzle).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

One-time: create the SQLite DB and `articles` table:

```bash
npm run db:push -w backend
```

## Run the apps

From the repo root:

| Command | What | URL |
|--------|------|-----|
| `npm run dev:ui` | React app (crypto search) | http://localhost:5173 |
| `npm run dev:backend` | API server | http://localhost:3001 |

Run both in separate terminals to work full-stack.

## Backend API

- **GET /** — health check (`{ "ok": true }`)
- **GET /articles** — list all articles (JSON array). Optional query: `?title=...` to filter by title (case-insensitive, partial match).

Full API reference: **[backend/API.md](backend/API.md)** (response shapes, query params, examples).

## Database (articles)

- **Schema:** `backend/src/db/schema.ts` — table `articles` (id, title, body, createdAt, updatedAt).
- **DB file:** `backend/data/sqlite.db` (created on first run; gitignored).

**Add or edit articles:**

1. **Reset script (clean slate + sample data):**  
   `npm run db:reset -w backend` — deletes all articles, then inserts 15 sample articles with realistic, searchable titles (sourdough, TypeScript, REST API, React, etc.).

2. **Drizzle Studio (easiest for one-off edits):**  
   `npm run db:studio -w backend` → opens a UI in the browser to view/edit rows.

3. **Code:** Use the `db` client in `backend/src/db/index.ts` and add a **POST /articles** route in `backend/src/index.ts` (e.g. with `db.insert(articles).values({ title, body })`).

**Other DB commands (from repo root):**

- `npm run db:push -w backend` — apply schema changes to the DB (no migration files).
- `npm run db:generate -w backend` — generate migration files.
- `npm run db:reset -w backend` — delete all articles and reseed with sample data (see above).

## Project layout

```
├── ui/           # Vite + React app
├── backend/     # Hono API + Drizzle + SQLite
│   ├── scripts/
│   │   └── reset-articles.ts   # reset DB + seed sample articles
│   ├── src/
│   │   ├── db/     # schema + DB client
│   │   └── index.ts
│   └── data/       # sqlite.db (local, gitignored)
├── package.json   # workspaces + root scripts
└── README.md
```

## Build for production

```bash
npm run build:ui
npm run build:backend
```

Run the backend: `npm run start -w backend` (serves from `backend/dist`, same port 3001).
