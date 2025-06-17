import { useLoaderData } from "react-router-dom";
import { NewsCard } from "../Components/UI/NewsCard";
import "../Styles/News.css";

export const News = () => {
  const { News } = useLoaderData();
  //   console.log(News);
  return (
    <div className="news-container">
      <p className="news-container-title">LATEST ENTERTAINMENT NEWS</p>
      <ul className="news-box">
        {News &&
          News.slice(1).map((article, index) => {
            return (
              <NewsCard
                key={article.url || index}
                article={article}
                index={index}
              />
            );
          })}
      </ul>
    </div>
  );
};
