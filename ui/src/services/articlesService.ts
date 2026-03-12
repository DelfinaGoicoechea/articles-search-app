const API_URL = import.meta.env.VITE_API_URL;

export async function fetchArticles(query: string) {
  const response = await fetch(`${API_URL}/articles?title=${query}`);

  if(!response.ok) {
    throw new Error("Failed to fetch articles.");
  }

  return response.json();
}