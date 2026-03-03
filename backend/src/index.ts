import { like } from 'drizzle-orm'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { db } from './db/index.js'
import { articles } from './db/schema.js'

const app = new Hono()

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
  })
);

app.get('/', (c) => c.json({ ok: true }, 200))

app.get('/articles', async (c) => {
  const raw = c.req.query('title')?.trim()
  const title = raw?.replace(/%/g, '\\%').replace(/_/g, '\\_')
  const rows = title
    ? await db.select().from(articles).where(like(articles.title, `%${title}%`))
    : await db.select().from(articles)
  return c.json(rows, 200)
})

const PORT = 3001
serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
