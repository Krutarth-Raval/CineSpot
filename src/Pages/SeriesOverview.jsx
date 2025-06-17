import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "../Styles/SeriesOverview.css";
import SeriesSeasonsData from "../API/SeriesSeasonsData";
import SeasonsData from "../API/SeasonsData";
import { EpisodeContainer } from "../Components/UI/EpisodeContainer";
import { Recommendations } from "../Components/UI/Recommendations";

export const SeriesOverview = () => {
  const params = useParams();
  const SeriesDetails = useLoaderData();
  const {
    backdrop_path,
    created_by,
    credits,
    first_air_date,
    genres,
    id,
    images,
    in_production,
    name,
    networks,
    number_of_seasons,
    origin_country, // ✅
    original_language, // ✅
    overview,
    popularity,
    poster_path,
    production_companies, // ✅
    production_countries, // ✅
    seasons,
    spoken_languages, // ✅
    tagline,
    videos,
    vote_average,
    vote_count,
  } = SeriesDetails;
  const getFullLanguageName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "language" }).of(code) || "Unknown"
    );
  };
  const production_status = () => (in_production ? "TRUE" : "FALSE");

  const getFullCountryName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(code) || "Unknown"
    );
  };
  const trailer = videos.results.find((vid) => vid.type === "Trailer");
  // writers and creator ------
  const writers =
    credits?.crew && credits.crew.length > 0
      ? credits.crew
          .filter(
            (person) => person.job === "Screenplay" || person.job === "Writer"
          )
          .map((person) => person.name)
          .join(", ") || "UNKNOWN"
      : "UNKNOWN";

  //   media content ------
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

  // State to track selected season and its episodes
  const [season, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(
    seasons?.[0]?.season_number || 1
  );
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const allSeasons = await SeasonsData(id);
      setSeasons(allSeasons);
    };
    fetchSeasons();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodesData = await SeriesSeasonsData(id, selectedSeason);
      setEpisodes(episodesData);
    };
    fetchEpisodes();
  }, [id, selectedSeason]);

  const handleSeasonChange = async (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <>
      <div className="top-container">
        <div className="banner-container">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
            alt={name}
          />
          <div className="series-first-air-year">
            <p className="year">{first_air_date.split("-")[0]}</p>
          </div>
        </div>
        <div className="series-network">
          {networks.map(({ name, logo_path }, index) => (
            <div key={index} className="network-item">
              {/* <p className="network-name">{name}</p> */}
              {logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${logo_path}`}
                  alt={name}
                  className="network-logo"
                />
              )}
            </div>
          ))}
        </div>

        <div className="series-poster">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
            alt={name}
          />
        </div>
        <div className="media-box">
          <div className="backdrops-media-box">
            <button
              className="series-backdrops-btn"
              onClick={() => openModal("backdrops")}
            >
              BACKDROPS
            </button>
          </div>

          <div className="videos-media-box">
            <button
              className="series-videos-btn"
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
      </div>
      <div className="series-information">
        <p className="name">{name.toUpperCase()}</p>

        <div className="series-genres-seasons">
          <div className="series-genre">
            {genres.map((genre) => (
              <p className="genres" key={genre.id}>
                {genre.name.toUpperCase()}
              </p>
            ))}
          </div>
          <div className="seasons">SEASONS {number_of_seasons}</div>
        </div>
        <div className="series-rating-box">
          <div className="series-vote-average">
            <p className="vote-average">
              <StarIcon className="star-icon" />
              {vote_average.toFixed(1)}
              {/* /<span>10</span> */}
            </p>
          </div>
          <div className="series-vote-count">
            <p className="vote-count">
              <ThumbUpIcon className="thumbup-icon" />
              {vote_count}
            </p>
          </div>{" "}
          <div className="series-popularity">
            <p className="popularity">
              <WhatshotIcon className="whatshot-icon" />
              {popularity}
            </p>
          </div>
        </div>
      </div>
      <div className="middle-container">
        <div className="series-trailer-details">
          <div className="series-trailer-box">
            <p className="series-trailer-title">OFFICIAL TRAILER</p>
            <div className="series-trailer">
              <iframe
                src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&iv_load_policy=3&loop=1&playlist=${trailer?.key}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="series-details">
            <div className="series-overview">
              <p className="series-overview-title">OVERVIEW</p>
              <p className="overview">{overview}</p>
            </div>
            <div className="series-tagline">
              <p className="series-tagline-title">TAGLINE</p>
              <p className="tagline">{tagline}</p>
            </div>

            <div className="series-director">
              <p className="series-director-title">CREATOR</p>
              <p className="director-name">
                {created_by && created_by.length > 0
                  ? created_by
                      .map((person) => person.name.toUpperCase())
                      .join(", ")
                  : "UNKNOWN"}
              </p>
            </div>
            <div className="series-writer">
              <p className="series-writer-title">WRITER</p>
              <p className="writer-name">
                {writers && writers.trim() !== ""
                  ? writers.toUpperCase()
                  : "UNKNOWN"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="season-container">
        {/* Season Dropdown */}
        <div className="select-season">
          <p className="select-season-title">SELECT SEASON</p>
          <select
            className="season-dropdown"
            onChange={handleSeasonChange}
            value={selectedSeason}
          >
            {seasons
              .filter((season) => season.season_number !== 0) // Skip season 0
              .map((season) => (
                <option
                  className="season-numbers"
                  key={season.id}
                  value={season.season_number}
                >
                  SEASON {season.season_number}
                </option>
              ))}
          </select>
        </div>

        {/* 🆕 New Season Info Container */}
        <div className="season-info-container">
          <div className="season-year-vote-average">
            {" "}
            <p className="season-number">
              SEASON {season[selectedSeason]?.season_number}
            </p>
            <p className="air-date">
              {season[selectedSeason]?.air_date.split("-", 1) || "NONE"}
            </p>
            <p className="season-vote">
              <StarIcon className="star-icon" />
              {seasons[selectedSeason]?.vote_average?.toFixed(1) || "N/A"}
            </p>
          </div>
          <div className="season-overview">
            <p className="seasonOverviewTitle">SEASON OVERVIEW</p>
            <p className="seasonOverview">
              {season[selectedSeason]?.overview || "No Overview"}
            </p>{" "}
          </div>
        </div>

        {/* Episode List */}
        <div className="episode-container">
          <p className="episode-list-title">EPISODES</p>
          <div className="episode-list">
            {episodes.map((curEpisode, index) => (
              <div key={curEpisode.id}>
                <EpisodeContainer curEpisode={curEpisode} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="third-container">
        <div className="series-cast">
          <p className="series-cast-title">CAST</p>
          <div className="series-cast-list">
            {credits.cast.map((actor, index) => (
              <div className="series-cast-item" key={`${actor.id}-${index}`}>
                <div className="series-cast-image">
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
                <div className="series-cast-box">
                  <p className="series-cast-name">{actor.name.toUpperCase()}</p>
                  <p className="series-cast-role">
                    {actor.character ? actor.character.toUpperCase() : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="series-crew">
          <p className="series-crew-title">CREW</p>
          <div className="series-crew-list">
            {credits.crew.map((actor, index) => (
              <div className="series-crew-item" key={`${actor.id}-${index}`}>
                <div className="series-crew-image">
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
                <div className="series-crew-box">
                  <p className="series-crew-name">{actor.name.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="forth-container">
        <p className="series-data-title">PRODUCTION INSIGHTS</p>
        <div className="series-data">
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
          <div className="in-production">
            <p className="in-production-title">RELEASED DATE</p>
            <p className="inProduction">{`${
              in_production ? "TRUE" : "FALSE"
            }`}</p>
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
        <Recommendations id={id} type="tv" />
      </div>
    </>
  );
};
