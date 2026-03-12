import * as Label from "@radix-ui/react-label";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Loading } from "./Loading";
import { ArticleList } from "./ArticlesList";
import { useArticlesSearch } from "../hooks/useArticlesSearch";

export function Articles() {
  const {
    query,
    setQuery,
    articles,
    isLoading,
    showEmpty,
    showList
  } = useArticlesSearch();

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
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-label="Search articles"
        />
      </div>

      <section className="articles-results" aria-live="polite">
        {isLoading && <Loading />}
        {!isLoading && (
          <ScrollArea.Root className="articles-scroll">
            <ScrollArea.Viewport className="articles-scroll-viewport">
              <ul className="articles-list">
                {showEmpty && (
                  <li className="articles-list-empty">
                    No articles match your search.
                  </li>
                )}
                {showList && <ArticleList articles={articles} />}
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