import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "../../Styles/EpisodeContainer.css";
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
    <div className="episode-card">
      <p className="ep-number">
        EPISDOE <span>{episode_number}</span>
      </p>
      <div className="episode-runtime-vote">
        <p className="ep-runtime">
          {" "}
          {Math.floor(runtime / 60)}h {runtime % 60}m
        </p>
        <div className="ep-vote">
          <p className="ep-vote-average">
            <StarIcon className="star-icon" />
            {vote_average.toFixed(1)}
          </p>
          <p className="ep-vote-count">
            <ThumbUpIcon className="thumbup-icon" />
            {vote_count}
          </p>
        </div>
      </div>
      <p className="episode-name">{name.toUpperCase()}</p>
      <div className="episode-description">
        <div className="episode-image">
          <img
            src={
              still_path
                ? `https://image.tmdb.org/t/p/w1280/${still_path}`
                : "https://www.toyoindia.in/wp-content/uploads/Image-Contact-1.jpg"
            }
            alt="name"
          />
        </div>
        <p className="episode-overview">{overview}</p>
      </div>
    </div>
  );
};
