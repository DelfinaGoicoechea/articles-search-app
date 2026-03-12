import { useEffect, useState } from "react";
import type { Article } from "../types/article";
import { fetchArticles } from "../services/articlesService";

export function useArticles(query: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!query.trim()){
      setArticles([]);
      return;
    }

    async function loadArticles() {
      try {
        setIsLoading(true);
        
        const data = await fetchArticles(query);
        setArticles(data);
      } catch(error) {
        console.error(error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  },[query]);

  return {articles, isLoading};
}