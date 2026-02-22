import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { articles } from '../src/db/schema.js'

const backendDir = dirname(dirname(fileURLToPath(import.meta.url)))
const dbPath = join(backendDir, 'data', 'sqlite.db')

const ARTICLES: { title: string; body: string }[] = [
  { title: 'How to bake sourdough bread at home', body: 'A beginner-friendly guide to making your first loaf. You need a starter, flour, water, salt, and time. Bulk fermentation and shaping matter more than fancy equipment.' },
  { title: 'Introduction to TypeScript for JavaScript developers', body: 'TypeScript adds static types to JavaScript. Learn basic types, interfaces, and how to enable strict mode. Your future self will thank you for the better autocomplete and fewer runtime errors.' },
  { title: 'Best practices for REST API design', body: 'Use nouns for resources, HTTP verbs for actions. Return consistent status codes and JSON. Version your API and document it with OpenAPI or similar.' },
  { title: 'Getting started with SQLite and Drizzle ORM', body: 'SQLite is a file-based database perfect for local dev and small apps. Drizzle gives you type-safe queries and a simple schema. Run db:push to sync your schema.' },
  { title: 'Why you should use a monorepo for full-stack projects', body: 'One repo for UI and backend keeps things in sync. npm workspaces or pnpm make it easy. Share types and run everything with a single install.' },
  { title: 'React hooks: useState and useEffect explained', body: 'useState holds component state; useEffect runs side effects after render. Avoid stale closures and dependency array mistakes. Prefer small, focused effects.' },
  { title: 'Setting up a local development environment on macOS', body: 'Install Node via nvm, use a modern terminal and editor. Docker is optional but useful for databases. Keep your PATH and dotfiles tidy.' },
  { title: 'How to debug API requests with curl and browser DevTools', body: 'Use curl -v to see headers and status. In the browser, check the Network tab for request/response. Log the request body when your backend receives it.' },
  { title: 'Understanding environment variables and .env files', body: 'Never commit secrets. Use .env for local config and load with dotenv or your framework. In production, use the platform\'s env or secrets manager.' },
  { title: 'Quick guide to semantic HTML and accessibility', body: 'Use the right elements: nav, main, article, button. Add alt text to images and labels to form fields. Screen readers and SEO both benefit.' },
  { title: 'What is CORS and how to fix common errors', body: 'Browsers block cross-origin requests unless the server sends the right headers. For APIs, allow your frontend origin and the methods you use. Preflight requests need 2xx.' },
  { title: 'Tips for writing clear commit messages', body: 'Use the imperative: "Add login form" not "Added". Keep the first line under 50 chars. Explain why in the body when the change is non-obvious.' },
  { title: 'How to search and filter data in a React app', body: 'Keep the list and query in state. Derive filtered results with useMemo. For server data, send the query as params and let the API do the filtering.' },
  { title: 'Using async/await and error handling in Node.js', body: 'Prefer async/await over raw promises. Wrap in try/catch or use .catch(). For APIs, return proper status codes and error payloads.' },
  { title: 'Building a simple CLI tool with Node.js', body: 'Read args from process.argv or use a library like yargs. Use console for output and process.exit for status. Make it executable and add a bin in package.json.' },
]

async function reset() {
  mkdirSync(join(backendDir, 'data'), { recursive: true })
  const sqlite = new Database(dbPath)
  const db = drizzle(sqlite)

  await db.delete(articles)
  await db.insert(articles).values(ARTICLES)
  console.log(`Reset articles: deleted all, seeded ${ARTICLES.length} articles.`)
  sqlite.close()
}

reset().catch((err) => {
  console.error(err)
  process.exit(1)
})
