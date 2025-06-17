import { useLoaderData, useParams } from "react-router-dom";
import "../Styles/MovieOverview.css";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useState } from "react";
import { Recommendations } from "../Components/UI/Recommendations";
export const MovieOverview = () => {
  const params = useParams();
  //   console.log(params);
  const MovieDetails = useLoaderData();
  const {
    backdrop_path,
    budget,
    credits,
    genres,
    homepage,
    id,
    images,
    imdb_id,
    production_companies,
    production_countries,
    origin_country,
    original_language,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    tagline,
    title,
    videos,
    vote_average,
    vote_count,
  } = MovieDetails;

  const trailer = videos.results.find((vid) => vid.type === "Trailer");

  const getFullLanguageName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "language" }).of(code) || "Unknown"
    );
  };

  const getFullCountryName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(code) || "Unknown"
    );
  };

  const director = credits.crew.find((person) => person.job === "Director");
  const writers = credits.crew
    .filter((person) => person.job === "Screenplay" || person.job === "Writer")
    .map((person) => person.name)
    .join(", ");
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  // Handle opening modal
  const openModal = (type) => {
    if (type === "backdrops") {
      setModalContent(images?.backdrops); // Top 10 backdrops
    } else if (type === "videos") {
      setModalContent(videos?.results);
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className="top-container">
        <div className="banner-container">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
            alt={title}
          />
          <div className="movie-release-year">
            <span></span>
            <p className="year">{release_date.split("-")[0]}</p>
            <span></span>
          </div>
        </div>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
            alt={title}
          />
        </div>
        <div className="media-box">
          <div className="backdrops-media-box">
            <button
              className="movie-backdrops-btn"
              onClick={() => openModal("backdrops")}
            >
              BACKDROPS
            </button>
          </div>
          <div className="videos-media-box">
            <button
              className="movie-videos-btn"
              onClick={() => openModal("videos")}
            >
              VIDEOS
            </button>
          </div>
        </div>

        {modalOpen && (
          <div className="modal-container" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeModal}>
                ✖
              </button>

              <div className="modal-items">
                {modalContent.map((item, index) => (
                  <div key={index} className="modal-item">
                    {item.file_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
                        alt="Backdrop"
                      />
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.key}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      <div className="movie-information">
        <p className="title">{title.toUpperCase()}</p>

        <div className="movie-genres-runtime">
          <div className="movie-genre">
            {genres.map((genre) => (
              <p className="genres" key={genre.id}>
                {genre.name.toUpperCase()}
              </p>
            ))}
          </div>
          <div className="runtime">
            {Math.floor(runtime / 60)}h {runtime % 60}m
          </div>
        </div>
        <div className="movie-rating-box">
          <div className="movie-vote-average">
            <p className="vote-average">
              <StarIcon className="star-icon" />
              {vote_average.toFixed(1)}
              {/* /<span>10</span> */}
            </p>
          </div>
          <div className="movie-vote-count">
            <p className="vote-count">
              <ThumbUpIcon className="thumbup-icon" />
              {vote_count}
            </p>
          </div>{" "}
          <div className="movie-popularity">
            <p className="popularity">
              <WhatshotIcon className="whatshot-icon" />
              {popularity}
            </p>
          </div>
        </div>
      </div>
      <div className="middle-container">
        <div className="movie-trailer-details">
          <div className="movie-trailer-box">
            <p className="movie-trailer-title">OFFICIAL TRAILER</p>
            <div className="movie-trailer">
              <iframe
                src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&iv_load_policy=3&loop=1&playlist=${trailer?.key}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="movie-details">
            <div className="movie-overview">
              <p className="movie-overview-title">OVERVIEW</p>
              <p className="overview">{overview}</p>
            </div>
            <div className="movie-tagline">
              <p className="movie-tagline-title">TAGLINE</p>
              <p className="tagline">{tagline}</p>
            </div>

            <div className="movie-director">
              <p className="movie-director-title">DIRECTOR</p>
              <p className="director-name">
                {director ? director.name.toUpperCase() : "UNKOWN"}
              </p>
            </div>
            <div className="movie-writer">
              <p className="movie-writer-title">WRITER</p>
              <p className="writer-name">
                {writers ? writers.toUpperCase() : "UNKOWN"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="third-container">
        <div className="movie-cast">
          <p className="movie-cast-title">CAST</p>
          <div className="movie-cast-list">
            {credits.cast.map((actor, index) => (
              <div className="movie-cast-item" key={`${actor.id}-${index}`}>
                <div className="movie-cast-image">
                  <p className="cast-index">
                    {index + 1}/{credits.cast.length}
                  </p>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmcW4ArHlmZNzIvD5FxdPa-dh36prtR01_Q&s" // Fallback image if no profile found
                    }
                    alt={actor.name}
                  />
                </div>
                <div className="movie-cast-box">
                  <p className="movie-cast-name">{actor.name.toUpperCase()}</p>
                  <p className="movie-cast-role">
                    {actor.character ? actor.character.toUpperCase() : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="movie-crew">
          <p className="movie-crew-title">CREW</p>
          <div className="movie-crew-list">
            {credits.crew.map((actor, index) => (
              <div className="movie-crew-item" key={`${actor.id}-${index}`}>
                <div className="movie-crew-image">
                  <p className="crew-index">
                    {index + 1}/{credits.crew.length}
                  </p>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmcW4ArHlmZNzIvD5FxdPa-dh36prtR01_Q&s" // Fallback image if no profile found
                    }
                    alt={actor.name}
                  />
                </div>
                <div className="movie-crew-box">
                  <p className="movie-crew-name">{actor.name.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="forth-container">
        <p className="movie-data-title">PRODUCTION INSIGHTS</p>
        <div className="movie-data">
          <div className="original-language">
            <p className="original-language-title">ORIGINAL LANGUAGE</p>
            <p className="originalLanguage">
              {getFullLanguageName(original_language).toUpperCase()}
            </p>
          </div>
          <div className="spoken-languages">
            <p className="spoken-languages-title">SPOKEN LANGUAGES</p>
            <p className="spokenLanguages">
              {spoken_languages && spoken_languages.length > 0
                ? spoken_languages
                    .slice(0, 5)
                    .map((lang) => getFullLanguageName(lang.iso_639_1))
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>
          <div className="released-date">
            <p className="released-date-title">RELEASED DATE</p>
            <p className="releasedDate">{release_date}</p>
          </div>
          <div className="budget">
            <p className="budget-title">BUDGET</p>
            <p className="budget-money">
              ${budget ? budget.toLocaleString() : "N/A"}
            </p>
          </div>
          <div className="revenue">
            <p className="revenue-title">REVENUE</p>
            <p className="revenue-money">
              ${revenue ? revenue.toLocaleString() : "N/A"}
            </p>
          </div>
          <div className="origin-country">
            <p className="origin-country-title">ORIGIN COUNTRY</p>
            <p className="origin-country-name">
              {origin_country && origin_country.length > 0
                ? origin_country
                    .map((code) => getFullCountryName(code))
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>
          <div className="production-companies">
            <p className="production-companies-title">PRODUCTION COMPANIES</p>
            <p className="production-companies-name">
              {production_companies && production_companies.length > 0
                ? production_companies
                    .map((company) => company.name)
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>

          <div className="production-countries">
            <p className="production-countries-title">ORIGIN COUNTRY</p>
            <p className="production-countries-name">
              {production_countries && production_countries.length > 0
                ? production_countries
                    .map((country) => getFullCountryName(country.iso_3166_1))
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>
        </div>
      </div>
      <div className="recommendations-section">
        <Recommendations id={id} type="movie" />
      </div>
    </>
  );
};
