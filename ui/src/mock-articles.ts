export type Article = {
  id: number
  title: string
  body: string
}

export const MOCK_ARTICLES: Article[] = [
  { id: 1, title: 'How to bake sourdough bread at home', body: 'A beginner-friendly guide to making your first loaf.' },
  { id: 2, title: 'Introduction to TypeScript for JavaScript developers', body: 'TypeScript adds static types to JavaScript.' },
  { id: 3, title: 'Best practices for REST API design', body: 'Use nouns for resources, HTTP verbs for actions.' },
  { id: 4, title: 'Getting started with SQLite and Drizzle ORM', body: 'SQLite is a file-based database perfect for local dev.' },
  { id: 5, title: 'Why you should use a monorepo for full-stack projects', body: 'One repo for UI and backend keeps things in sync.' },
  { id: 6, title: 'React hooks: useState and useEffect explained', body: 'useState holds component state; useEffect runs side effects.' },
  { id: 7, title: 'Setting up a local development environment on macOS', body: 'Install Node via nvm, use a modern terminal and editor.' },
  { id: 8, title: 'How to debug API requests with curl and browser DevTools', body: 'Use curl -v to see headers and status.' },
  { id: 9, title: 'Understanding environment variables and .env files', body: 'Never commit secrets. Use .env for local config.' },
  { id: 10, title: 'Quick guide to semantic HTML and accessibility', body: 'Use the right elements: nav, main, article, button.' },
]
