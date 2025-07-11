import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import styles from "../Styles/SeriesOverview.module.css";
import SeriesSeasonsData from "../API/SeriesSeasonsData";
import SeasonsData from "../API/SeasonsData";
import { EpisodeContainer } from "../Components/UI/EpisodeContainer";
import { Recommendations } from "../Components/UI/Recommendations";
import { useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const SeriesOverview = () => {
  const params = useParams();
  const SeriesDetails = useLoaderData() || {};
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

  // Get full language name from ISO code
  const getFullLanguageName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "language" }).of(code) || "Unknown"
    );
  };
  // Production status
  const production_status = () => (in_production ? "TRUE" : "FALSE");

  // Get full country name from ISO code
  const getFullCountryName = (code) => {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(code) || "Unknown"
    );
  };

  // Get the trailer from videos
  const trailer = useMemo(
    () => videos?.results?.find((vid) => vid.type === "Trailer"),
    [videos]
  );

  // writers and creator
  const writers =
    credits?.crew && credits.crew.length > 0
      ? credits.crew
          .filter(
            (person) => person.job === "Screenplay" || person.job === "Writer"
          )
          .map((person) => person.name)
          .join(", ") || "UNKNOWN"
      : "UNKNOWN";

  // // Fallback profile image URL
  const fallbackProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmcW4ArHlmZNzIvD5FxdPa-dh36prtR01_Q&s";

  // Function to get the image URL with a fallback
  const getImageUrl = (path, size = "w200") =>
    path ? `https://image.tmdb.org/t/p/${size}/${path}` : "fallback_img_url";

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

  const [isAdded, setIsAdded] = useState(false);

  // Ensure axios sends cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkSeriesInCollection = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/collection/user"
        );
        if (res.data.success) {
          const exists = res.data.data.some(
            (item) => item.movieId === params.id
          );
          setIsAdded(exists);
        }
      } catch (error) {
        console.error("Error checking series:", error.message);
      }
    };

    if (params.id) checkSeriesInCollection();
  }, [params.id]);

  const addToCollection = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/collection/add",
        {
          movieId: params.id,
          title: name,
          poster: poster_path,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Series added to your collection!");
        setIsAdded(true);
      } else if (res.status === 409) {
        toast("Series already exists");
      } else {
        toast.error(res.data.message || "Failed to save");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <>
      <div className={styles.top_container}>
        <div className={styles.banner_container}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
            alt={name}
          />
          <div className={styles.series_first_air_year}>
            <p className={styles.year}>
              {first_air_date ? first_air_date.split("-")[0] : "N/A"}
            </p>
            <button
              className={styles.add_to_collection}
              onClick={addToCollection}
              disabled={isAdded}
            >
              {isAdded ? "Saved" : "Save +"}
            </button>
          </div>
        </div>
        <div className={styles.series_network}>
          {networks.map(({ name, logo_path }, index) => (
            <div key={index} className={styles.network_item}>
              {logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${logo_path}`}
                  alt={name}
                  className={styles.network_logo}
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.series_poster}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
            alt={name}
          />
        </div>
        <div className={styles.media_box}>
          <div className={styles.backdrops_media_box}>
            <button
              className={styles.series_backdrops_btn}
              onClick={() => openModal("backdrops")}
            >
              BACKDROPS
            </button>
          </div>

          <div className={styles.videos_media_box}>
            <button
              className={styles.series_videos_btn}
              onClick={() => openModal("videos")}
            >
              VIDEOS
            </button>
          </div>
        </div>
        {modalOpen && (
          <div className={styles.modal_container} onClick={closeModal}>
            <div
              className={styles.modal_content}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modal_close_btn} onClick={closeModal}>
                ✖
              </button>

              <div className={styles.modal_items}>
                {modalContent.map((item, index) => (
                  <div key={index} className={styles.modal_item}>
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

      <div className={styles.series_information}>
        <p className={styles.name}>{name.toUpperCase()}</p>

        <div className={styles.series_genres_seasons}>
          <div className={styles.series_genre}>
            {genres.map((genre) => (
              <p className={styles.genres} key={genre.id}>
                {genre.name.toUpperCase()}
              </p>
            ))}
          </div>
          <div className={styles.seasons}>SEASONS {number_of_seasons}</div>
        </div>
        <div className={styles.series_rating_box}>
          <div className={styles.series_vote_average}>
            <p className={styles.vote_average}>
              <StarIcon className={styles.star_icon} />
              {vote_average.toFixed(1)}
            </p>
          </div>
          <div className={styles.series_vote_count}>
            <p className={styles.vote_count}>
              <ThumbUpIcon className={styles.thumbup_icon} />
              {vote_count}
            </p>
          </div>{" "}
          <div className={styles.series_popularity}>
            <p className={styles.popularity}>
              <WhatshotIcon className={styles.whatshot_icon} />
              {popularity}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.middle_container}>
        <div className={styles.series_trailer_details}>
          <div className={styles.series_trailer_box}>
            <p className={styles.series_trailer_title}>OFFICIAL TRAILER</p>
            <div className={styles.series_trailer}>
              {trailer ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>No Trailer Available</p>
              )}
            </div>
          </div>
          <div className={styles.series_details}>
            <div className={styles.series_overview}>
              <p className={styles.series_overview_title}>OVERVIEW</p>
              <p className={styles.overview}>{overview}</p>
            </div>
            <div className={styles.series_tagline}>
              <p className={styles.series_tagline_title}>TAGLINE</p>
              <p className={styles.tagline}>{tagline}</p>
            </div>

            <div className={styles.series_director}>
              <p className={styles.series_director_title}>CREATOR</p>
              <p className={styles.director_name}>
                {created_by && created_by.length > 0
                  ? created_by
                      .map((person) => person.name.toUpperCase())
                      .join(", ")
                  : "UNKNOWN"}
              </p>
            </div>
            <div className={styles.series_writer}>
              <p className={styles.series_writer_title}>WRITER</p>
              <p className={styles.writer_name}>
                {writers && writers.trim() !== ""
                  ? writers.toUpperCase()
                  : "UNKNOWN"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.season_container}>
        <div className={styles.select_season}>
          <p className={styles.select_season_title}>SELECT SEASON</p>
          <select
            className={styles.season_dropdown}
            onChange={handleSeasonChange}
            value={selectedSeason}
          >
            {seasons
              .filter((season) => season.season_number !== 0)
              .map((season) => (
                <option
                  className={styles.season_numbers}
                  key={season.id}
                  value={season.season_number}
                >
                  SEASON {season.season_number}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.season_info_container}>
          <div className={styles.season_year_vote_average}>
            <p className={styles.season_number}>
              SEASON {season[selectedSeason]?.season_number}
            </p>
            <p className={styles.air_date}>
              {season[selectedSeason]?.air_date
                ? season[selectedSeason].air_date.split("-")[1]
                : "NONE"}
            </p>

            <p className={styles.season_vote}>
              <StarIcon className={styles.star_icon} />
              {seasons[selectedSeason]?.vote_average?.toFixed(1) || "N/A"}
            </p>
          </div>
          <div className={styles.season_overview}>
            <p className={styles.seasonOverviewTitle}>SEASON OVERVIEW</p>
            <p className={styles.seasonOverview}>
              {season[selectedSeason]?.overview || "No Overview"}
            </p>{" "}
          </div>
        </div>

        <div className={styles.episode_container}>
          <p className={styles.episode_list_title}>EPISODES</p>
          <div className={styles.episode_list}>
            {episodes.map((curEpisode, index) => (
              <div key={curEpisode.id}>
                <EpisodeContainer curEpisode={curEpisode} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.forth_container}>
        <p className={styles.series_data_title}>PRODUCTION INSIGHTS</p>
        <div className={styles.series_data}>
          <div className={styles.original_language}>
            <p className={styles.original_language_title}>ORIGINAL LANGUAGE</p>
            <p className={styles.originalLanguage}>
              {getFullLanguageName(original_language).toUpperCase()}
            </p>
          </div>
          <div className={styles.spoken_languages}>
            <p className={styles.spoken_languages_title}>SPOKEN LANGUAGES</p>
            <p className={styles.spokenLanguages}>
              {spoken_languages && spoken_languages.length > 0
                ? spoken_languages
                    .slice(0, 5)
                    .map((lang) => getFullLanguageName(lang.iso_639_1))
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>
          <div className={styles.in_production}>
            <p className={styles.in_production_title}>IN PRODUCTION</p>
            <p className={styles.inProduction}>{`${
              in_production ? "TRUE" : "FALSE"
            }`}</p>
          </div>

          <div className={styles.origin_country}>
            <p className={styles.origin_country_title}>ORIGIN COUNTRY</p>
            <p className={styles.origin_country_name}>
              {origin_country && origin_country.length > 0
                ? origin_country
                    .map((code) => getFullCountryName(code))
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>
          <div className={styles.production_companies}>
            <p className={styles.production_companies_title}>
              PRODUCTION COMPANIES
            </p>
            <p className={styles.production_companies_name}>
              {production_companies && production_companies.length > 0
                ? production_companies
                    .map((company) => company.name)
                    .join(", ")
                    .toUpperCase()
                : "UNKNOWN"}
            </p>
          </div>

          <div className={styles.production_countries}>
            <p className={styles.production_countries_title}>ORIGIN COUNTRY</p>
            <p className={styles.production_countries_name}>
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

      <div className={styles.third_container}>
        <div className={styles.series_cast}>
          <p className={styles.series_cast_title}>CAST</p>
          <div className={styles.series_cast_list}>
            {credits?.cast && credits.cast.length > 0 ? (
              credits.cast.map((actor, index) => (
                <div
                  className={styles.series_cast_item}
                  key={`${actor.id}-${index}`}
                >
                  <div className={styles.series_cast_image}>
                    <p className={styles.cast_index}>
                      {index + 1}/{credits.cast.length}
                    </p>
                    <img
                      src={
                        actor.profile_path
                          ? getImageUrl(actor.profile_path)
                          : fallbackProfile
                      }
                      alt={actor.name}
                    />
                  </div>
                  <div className={styles.series_cast_box}>
                    <p className={styles.series_cast_name}>
                      {actor.name.toUpperCase()}
                    </p>
                    <p className={styles.series_cast_role}>
                      {actor.character ? actor.character.toUpperCase() : "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.no_data}>NO CAST DATA AVAILABLE</p>
            )}
          </div>
        </div>

        <div className={styles.series_crew}>
          <p className={styles.series_crew_title}>CREW</p>
          <div className={styles.series_crew_list}>
            {credits?.crew && credits.crew.length > 0 ? (
              credits.crew.map((actor, index) => (
                <div
                  className={styles.series_crew_item}
                  key={`${actor.id}-${index}`}
                >
                  <div className={styles.series_crew_image}>
                    <p className={styles.crew_index}>
                      {index + 1}/{credits.crew.length}
                    </p>
                    <img
                      src={
                        actor.profile_path
                          ? getImageUrl(actor.profile_path)
                          : fallbackProfile
                      }
                      alt={actor.name}
                    />
                  </div>
                  <div className={styles.series_crew_box}>
                    <p className={styles.series_crew_name}>
                      {actor.name.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.no_data}>NO CREW DATA AVAILABLE</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.partion}></div>
      <div className={styles.recommendations_section}>
        <Recommendations id={id} type="tv" />
      </div>
    </>
  );
};
