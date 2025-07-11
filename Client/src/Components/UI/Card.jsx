import styles from "../../Styles/Card.module.css";

import { NavLink } from "react-router-dom";
export const Card = ({ curData, index }) => {
  const { backdrop_path, id, title, name, media_type } = curData;

  // Fallback if media_type is not present
  const type = media_type || (title ? "movie" : name ? "tv" : "unknown");

  return (
    <li className={styles.card}>
      <p className={styles.card_index}>{index + 1}</p>
      <NavLink
        to={`/${type === "movie" ? "movieoverview" : "seriesoverview"}/${id}`}
      >
        <div className={styles.card_image}>
          <img
           loading="lazy"
            src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
            alt={title || name || "Poster"}
          />
        </div>
        <div className={styles.card_title}>
          <p className={styles.title}>
            {title?.toUpperCase() || name?.toUpperCase() || "UNTITLED"}
          </p>
        </div>
      </NavLink>
    </li>
  );
};
