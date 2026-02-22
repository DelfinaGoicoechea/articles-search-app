import { useMemo, useState } from "react";
import * as Label from "@radix-ui/react-label";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Loading } from "./components/Loading";
import { MOCK_ARTICLES } from "./mock-articles";
import "./App.css";

function filterArticles(query: string, articles: typeof MOCK_ARTICLES) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q),
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading] = useState(false);

  const filtered = useMemo(() => filterArticles(query, MOCK_ARTICLES), [query]);

  const showResults = query.trim().length > 0;
  const showLoading = isLoading && showResults;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <main className="articles-app">
      <header className="articles-header">
        <h1 className="articles-title">Articles</h1>
        <p className="articles-tagline">Search the articles</p>
      </header>

      <div className="articles-search-wrap">
        <Label.Root htmlFor="articles-search" className="articles-search-label">
          Search articles
        </Label.Root>
        <input
          id="articles-search"
          type="search"
          className="articles-search-input"
          placeholder="Type to search..."
          value={query}
          onChange={handleChange}
          autoComplete="off"
          aria-label="Search articles"
        />
      </div>

      <section className="articles-results" aria-live="polite">
        {showLoading ? (
          <Loading />
        ) : (
          <ScrollArea.Root className="articles-scroll">
            <ScrollArea.Viewport className="articles-scroll-viewport">
              <ul className="articles-list">
                {!showResults ? null : filtered.length === 0 ? (
                  <li className="articles-list-empty">
                    No articles match your search.
                  </li>
                ) : (
                  filtered.map((article) => (
                    <li key={article.id} className="articles-card">
                      <h2 className="articles-card-title">{article.title}</h2>
                      <p className="articles-card-body">{article.body}</p>
                    </li>
                  ))
                )}
              </ul>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="articles-scrollbar"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="articles-scrollbar-thumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </section>
    </main>
  );
}
