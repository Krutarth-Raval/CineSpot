import { NavLink } from "react-router-dom";
import styles from "../../Styles/ListCard.module.css";
export const ListCard = ({ curData }) => {
  const { title, id, poster_path, release_date, name, media_type } = curData;
  const type = media_type || (title ? "movie" : name ? "tv" : "unknown");
  return (
    <div className={styles.list_card}>
      <NavLink
        to={`/${type === "movie" ? "movieoverview" : "seriesoverview"}/${id}`}
      >
        <div className={styles.list_card_image}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
            alt={id}
          />
        </div>
        <div className={styles.list_card_title}>
          <p className={styles.title}>
            {title?.toUpperCase() || name?.toUpperCase() || "Untitled"}
          </p>
        </div>
        <div className={styles.list_card_release_year}>
          <p className={styles.year}>
            {curData.first_air_date
              ? curData.first_air_date.split("-")[0]
              : release_date
              ? release_date.split("-")[0]
              : "N/A"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};
