import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "../../Styles/EpisodeContainer.module.css";
export const EpisodeContainer = ({ curEpisode, index }) => {
  const {
    name,
    overview,
    runtime,
    still_path,
    vote_average,
    vote_count,
    episode_number,
  } = curEpisode;
  return (
    <div className={styles.episode_card}>
      <p className={styles.ep_number}>
        EPISDOE <span>{episode_number}</span>
      </p>
      <div className={styles.episode_runtime_vote}>
        <p className={styles.ep_runtime}>
          
          {Math.floor(runtime / 60)}h {runtime % 60}m
        </p>
        <div className={styles.ep_vote}>
          <p className={styles.ep_vote_average}>
            <StarIcon className={styles.star_icon} />
            {vote_average.toFixed(1)}
          </p>
          <p className={styles.ep_vote_count}>
            <ThumbUpIcon className={styles.thumbup_icon} />
            {vote_count}
          </p>
        </div>
      </div>
      <p className={styles.episode_name}>{name.toUpperCase()}</p>
      <div className={styles.episode_description}>
        <div className={styles.episode_image}>
          <img
            src={
              still_path
                ? `https://image.tmdb.org/t/p/w1280/${still_path}`
                : "https://www.toyoindia.in/wp-content/uploads/Image-Contact-1.jpg"
            }
            alt="name"
          />
        </div>
        <p className={styles.episode_overview}>{overview}</p>
      </div>
    </div>
  );
};
