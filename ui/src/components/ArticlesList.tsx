import type { Article } from "../types/article";

type Props = {
  articles: Article[];
};

export function ArticleList({articles}: Props) {
  return(
    <>
      {articles.map((article) => (
        <li key={article.id} className="articles-card">
          <h2 className="articles-card-title">{article.title}</h2>
          <p className="articles-card-body">{article.body}</p>
        </li>
      ))}
    </>
  )
}