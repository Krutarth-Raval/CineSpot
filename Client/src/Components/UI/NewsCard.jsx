import "../../Styles/NewsCard.css";

export const NewsCard = ({ article, index }) => {
  const { url, urlToImage, title, publishedAt, source, author, description } =
    article;
  return (
    <li key={index}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-item"
      >
        <div className="news-item-image">
          <img src={urlToImage} alt={title} />
        </div>
        <div className="news-item-details">
          <div className="news-date-source">
            <p className="news-published-date">{publishedAt.split("T")[0]}</p>
            <p className="news-source">{source.name}</p>
          </div>

          <p className="news-title">{title}</p>
          <p className="news-description">{description}</p>
          <p className="news-author">{author}</p>
        </div>
      </a>
    </li>
  );
};
