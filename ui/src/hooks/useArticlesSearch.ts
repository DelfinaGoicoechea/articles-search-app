import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useArticles } from "./useArticles";

export function useArticlesSearch() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);
  const {articles, isLoading} = useArticles(debouncedQuery);

  const hasSearched = debouncedQuery.trim().length > 0;
  const showEmpty = hasSearched && !isLoading && articles.length === 0;
  const showList = hasSearched && articles.length > 0;

  return {
    query,
    setQuery,
    articles,
    isLoading,
    showEmpty,
    showList
  };
}