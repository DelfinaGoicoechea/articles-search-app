import { useEffect, useState } from "react";
import type { Article } from "../types/article";

const API_URL = import.meta.env.VITE_API_URL;

export function useArticles(query: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if(!query.trim()){
        setArticles([]);
        return;
      }
  
      async function fetchArticles() {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_URL}/articles?title=${query}`);
                
          if(!response.ok) {
            throw new Error("Failed to fetch articles.");
          }
          const data = await response.json();
          setArticles(data);
        } catch(error) {
          console.error(error);
          setArticles([]);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchArticles();
    },[query]);

  return {articles, isLoading};
}