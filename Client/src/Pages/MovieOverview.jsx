import { useLoaderData, useParams } from "react-router-dom";
import styles from "../Styles/MovieOverview.module.css";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useState } from "react";
import { Recommendations } from "../Components/UI/Recommendations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
export const MovieOverview = () => {
  const params = useParams();
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

  // Function to format runtime in hours and minutes
  const formatRuntime = (time) =>
    time ? `${Math.floor(time / 60)}h ${time % 60}m` : "N/A";

  // Find the trailer from the videos array
  const trailer = videos.results.find((vid) => vid.type === "Trailer");

  // Function to get the full language name from the code
  const languageDisplay = new Intl.DisplayNames(["en"], { type: "language" });
  const regionDisplay = new Intl.DisplayNames(["en"], { type: "region" });

  // Function to get the full language and country names
  const getFullLanguageName = (code) => languageDisplay.of(code) || "Unknown";
  const getFullCountryName = (code) => regionDisplay.of(code) || "Unknown";

  // Find the director and writers from the credits
  const director = credits.crew.find((person) => person.job === "Director");

  // Collect all writers (Screenplay or Writer) from the credits
  const writers = credits.crew
    .filter((person) => person.job === "Screenplay" || person.job === "Writer")
    .map((person) => person.name)
    .join(", ");

  // // Fallback profile image URL
  const fallbackProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmcW4ArHlmZNzIvD5FxdPa-dh36prtR01_Q&s";

  // Function to get the image URL with a fallback
  const getImageUrl = (path, size = "w200") =>
    path ? `https://image.tmdb.org/t/p/${size}/${path}` : "fallback_img_url";

  // State for modal to show backdrops or videos
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const openModal = (type) => {
    if (type === "backdrops") {
      setModalContent(images?.backdrops);
    } else if (type === "videos") {
      setModalContent(videos?.results);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Add to collection logic
  axios.defaults.withCredentials = true;
  
  const { userData, backendUrl } = useContext(AppContent);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    if (!id) return;

    const checkCollection = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/collection/user`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("✅ Collection Response", data); // Debug
        if (data.success) {
          const exists = data.data.some(
            (movie) => movie.movieId === String(id)
          );
          setIsAdded(exists);
        }
      } catch (err) {
        console.error("❌ Error checking collection:", err);
      }
    };

    checkCollection();
  }, [id]);

  const addToCollection = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/collection/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: id,
          title: title,
          poster: poster_path,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Movie added to your collection!");
        setIsAdded(true);
      } else if (response.status === 409) {
        toast.info("Movie already in your collection!");
        setIsAdded(true);
      } else {
        toast.warning(data.message || "Could not add movie");
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
            alt={title}
          />
          <div className={styles.movie_release_year}>
            <span></span>
            <p className={styles.year}>{release_date.split("-")[0]}</p>
            <span></span>
            <button
              className={styles.add_to_collection}
              onClick={isAdded ? undefined : addToCollection}
              disabled={isAdded}
            >
              {isAdded ? "Added" : "Add +"}
            </button>

            <span></span>
          </div>
        </div>
        <div className={styles.movie_poster}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
            alt={title}
          />
        </div>
        <div className={styles.media_box}>
          <div className={styles.backdrops_media_box}>
            <button
              className={styles.movie_backdrops_btn}
              onClick={() => openModal("backdrops")}
              aria-label="View Backdrops"
            >
              BACKDROPS
            </button>
          </div>
          <div className={styles.videos_media_box}>
            <button
              className={styles.movie_videos_btn}
              onClick={() => openModal("videos")}
              aria-label="View Videos"
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
                {modalContent.length > 0 ? (
                  modalContent.map((item, index) => (
                    <div key={index} className={styles.modal_item}>
                      {item.file_path ? (
                        <img
                          src={getImageUrl(item.file_path, "w780")}
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
                  ))
                ) : (
                  <p className={styles.no_content}>No Content Available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      <div className={styles.movie_information}>
        <p className={styles.title}>{title.toUpperCase()}</p>

        <div className={styles.movie_genres_runtime}>
          <div className={styles.movie_genre}>
            {genres.map((genre) => (
              <p className={styles.genres} key={genre.id}>
                {genre.name.toUpperCase()}
              </p>
            ))}
          </div>
          <div className={styles.runtime}>{formatRuntime(runtime)}</div>
        </div>
        <div className={styles.movie_rating_box}>
          <div className={styles.movie_vote_average}>
            <p className={styles.vote_average}>
              <StarIcon className={styles.star_icon} />
              {vote_average.toFixed(1)}
            </p>
          </div>
          <div className={styles.movie_vote_count}>
            <p className={styles.vote_count}>
              <ThumbUpIcon className={styles.thumbup_icon} />
              {vote_count}
            </p>
          </div>{" "}
          <div className={styles.movie_popularity}>
            <p className={styles.popularity}>
              <WhatshotIcon className={styles.whatshot_icon} />
              {popularity}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.middle_container}>
        <div className={styles.movie_trailer_details}>
          <div className={styles.movie_trailer_box}>
            <p className={styles.movie_trailer_title}>OFFICIAL TRAILER</p>
            <div className={styles.movie_trailer}>
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

          <div className={styles.movie_details}>
            <div className={styles.movie_overview}>
              <p className={styles.movie_overview_title}>OVERVIEW</p>
              <p className={styles.overview}>
                {overview || "No Overview Availabel"}
              </p>
            </div>
            <div className={styles.movie_tagline}>
              <p className={styles.movie_tagline_title}>TAGLINE</p>
              <p className={styles.tagline}>
                {tagline || "No Tagline Availabel"}
              </p>
            </div>

            <div className={styles.movie_director}>
              <p className={styles.movie_director_title}>DIRECTOR</p>
              <p className={styles.director_name}>
                {director ? director.name.toUpperCase() : "UNKOWN"}
              </p>
            </div>
            <div className={styles.movie_writer}>
              <p className={styles.movie_writer_title}>WRITER</p>
              <p className={styles.writer_name}>
                {writers ? writers.toUpperCase() : "UNKOWN"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forth_container}>
        <p className={styles.movie_data_title}>PRODUCTION INSIGHTS</p>
        <div className={styles.movie_data}>
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
          <div className={styles.released_date}>
            <p className={styles.released_date_title}>RELEASED DATE</p>
            <p className={styles.releasedDate}>{release_date}</p>
          </div>
          <div className={styles.budget}>
            <p className={styles.budget_title}>BUDGET</p>
            <p className={styles.budget_money}>
              ${budget ? budget.toLocaleString() : "N/A"}
            </p>
          </div>
          <div className={styles.revenue}>
            <p className={styles.revenue_title}>REVENUE</p>
            <p className={styles.revenue_money}>
              ${revenue ? revenue.toLocaleString() : "N/A"}
            </p>
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
        <div className={styles.movie_cast}>
          <p className={styles.movie_cast_title}>CAST</p>
          <div className={styles.movie_cast_list}>
            {credits.cast.slice(0, 20).map((actor, index) => (
              <div
                className={styles.movie_cast_item}
                key={`${actor.id}-${index}`}
              >
                <div className={styles.movie_cast_image}>
                  <p className={styles.cast_index}>{index + 1}/20</p>

                  <img
                    src={
                      actor.profile_path
                        ? getImageUrl(actor.profile_path)
                        : fallbackProfile
                    }
                    alt={actor.name}
                  />
                </div>
                <div className={styles.movie_cast_box}>
                  <p className={styles.movie_cast_name}>
                    {actor.name.toUpperCase()}
                  </p>
                  <p className={styles.movie_cast_role}>
                    {actor.character ? actor.character.toUpperCase() : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.movie_crew}>
          <p className={styles.movie_crew_title}>CREW</p>
          <div className={styles.movie_crew_list}>
            {credits.crew.slice(0, 20).map((actor, index) => (
              <div
                className={styles.movie_crew_item}
                key={`${actor.id}-${index}`}
              >
                <div className={styles.movie_crew_image}>
                  <p className={styles.crew_index}>{index + 1}/20</p>
                  <img
                    src={
                      actor.profile_path
                        ? getImageUrl(actor.profile_path)
                        : fallbackProfile
                    }
                  />
                </div>
                <div className={styles.movie_crew_box}>
                  <p className={styles.movie_crew_name}>
                    {actor.name.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.partion}></div>
      <div className={styles.recommendations_section}>
        <Recommendations id={id} type="movie" />
      </div>
    </>
  );
};
