import { NavLink, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../Components/UI/Card";
import styles from "../Styles/Home.module.css";
import { Loading } from "./Loading";

const Home = () => {
  const {
    UpcomingMovieData,
    PopularMovieData,
    TopRatedMovieData,
    NowPlayingMovieData,
  } = useLoaderData();
  const {
    UpcomingSeriesData,
    PopularSeriesData,
    TopRatedSeriesData,
    NowPlayingSeriesData,
  } = useLoaderData();

  if (
    !UpcomingMovieData ||
    !PopularMovieData ||
    !TopRatedMovieData ||
    !NowPlayingMovieData
  ) {
    return <Loading />;
  }

  const [movieIndex, setMovieIndex] = useState({
    upcoming: 0,
    nowPlaying: 0,
    popular: 0,
    topRated: 0,
  });
  const [seriesIndex, setSeriesIndex] = useState({
    upcoming: 0,
    nowPlaying: 0,
    popular: 0,
    topRated: 0,
  });
  const [contentType, setContentType] = useState("movies");

  // Movie Slider Functions
  const nextMovieSlide = (section) => {
    setMovieIndex((prev) => ({
      ...prev,
      [section]:
        prev[section] === contentData[section].results.length - 1
          ? 0
          : prev[section] + 1,
    }));
  };

  const prevMovieSlide = (section) => {
    setMovieIndex((prev) => ({
      ...prev,
      [section]:
        prev[section] === 0
          ? contentData[section].results.length - 1
          : prev[section] - 1,
    }));
  };

  // Series Slider Functions
  const nextSeriesSlide = (section) => {
    setSeriesIndex((prev) => ({
      ...prev,
      [section]:
        prev[section] === contentData[section].results.length - 1
          ? 0
          : prev[section] + 1,
    }));
  };

  const prevSeriesSlide = (section) => {
    setSeriesIndex((prev) => ({
      ...prev,
      [section]:
        prev[section] === 0
          ? contentData[section].results.length - 1
          : prev[section] - 1,
    }));
  };

  // Automatically change slides every 3 seconds
 useEffect(() => {
  const sections = ["upcoming", "nowPlaying", "popular", "topRated"];
  const movieTimers = [];
  const seriesTimers = [];

  sections.forEach((section) => {
    movieTimers.push(setInterval(() => {
      setMovieIndex((prev) => ({
        ...prev,
        [section]: (prev[section] + 1) % contentData[section].results.length
      }));
    }, 3000));

    seriesTimers.push(setInterval(() => {
      setSeriesIndex((prev) => ({
        ...prev,
        [section]: (prev[section] + 1) % contentData[section].results.length
      }));
    }, 3000));
  });

  return () => {
    movieTimers.forEach(clearInterval);
    seriesTimers.forEach(clearInterval);
  };
}, []);


  //toggle content type between movies and series
  const toggleContent = (type) => {
    setContentType(type);
    setMovieIndex({
      upcoming: 0,
      nowPlaying: 0,
      popular: 0,
      topRated: 0,
    });
    setSeriesIndex({
      upcoming: 0,
      nowPlaying: 0,
      popular: 0,
      topRated: 0,
    });
  };

  const getContentData = (type) => {
    if (type === "movies") {
      return {
        upcoming: UpcomingMovieData,
        nowPlaying: NowPlayingMovieData,
        popular: PopularMovieData,
        topRated: TopRatedMovieData,
      };
    } else {
      return {
        upcoming: UpcomingSeriesData,
        nowPlaying: NowPlayingSeriesData,
        popular: PopularSeriesData,
        topRated: TopRatedSeriesData,
      };
    }
  };

  const contentData = getContentData(contentType);
  const currentIndex = contentType === "movies" ? movieIndex : seriesIndex;
  const nextSlide = contentType === "movies" ? nextMovieSlide : nextSeriesSlide;
  const prevSlide = contentType === "movies" ? prevMovieSlide : prevSeriesSlide;

  return (
    <div className={styles.main_container}>
      <div className={styles.hero_container}>
        <div className={styles.hero_overlay}></div>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>
            <span className={styles.hero_title_main}>WELCOME TO</span>
            <span className={styles.hero_title_accent}>CINESPOT</span>
          </h1>
          <p className={styles.hero_subtitle}>
            Your Ultimate Destination for Movies & TV Shows
          </p>
          <div className={styles.hero_cta}>
            <NavLink to={"/movie"} className={styles.hero_button}>
              Explore Movies
            </NavLink>
            <NavLink to={"/tvshow"} className={styles.hero_button}>
              Explore Series
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles.content_section}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Featured Content</h2>
          <div className={styles.section_nav}>
            <button
              className={`${styles.section_nav_btn} ${
                contentType === "movies" ? styles.active : ""
              }`}
              onClick={() => toggleContent("movies")}
            >
              Movies
            </button>
            <button
              className={`${styles.section_nav_btn} ${
                contentType === "series" ? styles.active : ""
              }`}
              onClick={() => toggleContent("series")}
            >
              TV Shows
            </button>
          </div>
        </div>

        <div className={styles.content_grid}>
          {/* UPCOMING */}
          <div className={styles.content_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_title}>Upcoming</h3>
              <div className={styles.block_nav}>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? prevMovieSlide("upcoming")
                      : prevSeriesSlide("upcoming")
                  }
                >
                  ❮
                </button>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? nextMovieSlide("upcoming")
                      : nextSeriesSlide("upcoming")
                  }
                >
                  ❯
                </button>
              </div>
            </div>
            <div className={styles.slider_container}>
              <div
                className={styles.slider}
                style={{
                  transform: `translateX(-${
                    (contentType === "movies"
                      ? movieIndex["upcoming"]
                      : seriesIndex["upcoming"]) * 100
                  }%)`,
                }}
              >
                {contentData.upcoming.results.map((curData, index) => (
                  <div key={curData.id} className={styles.slide}>
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NOW PLAYING */}
          <div className={styles.content_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_title}>Now Playing</h3>
              <div className={styles.block_nav}>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? prevMovieSlide("nowPlaying")
                      : prevSeriesSlide("nowPlaying")
                  }
                >
                  ❮
                </button>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? nextMovieSlide("nowPlaying")
                      : nextSeriesSlide("nowPlaying")
                  }
                >
                  ❯
                </button>
              </div>
            </div>
            <div className={styles.slider_container}>
              <div
                className={styles.slider}
                style={{
                  transform: `translateX(-${
                    (contentType === "movies"
                      ? movieIndex["nowPlaying"]
                      : seriesIndex["nowPlaying"]) * 100
                  }%)`,
                }}
              >
                {contentData.nowPlaying.results.map((curData, index) => (
                  <div key={curData.id} className={styles.slide}>
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POPULAR */}
          <div className={styles.content_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_title}>Popular</h3>
              <div className={styles.block_nav}>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? prevMovieSlide("popular")
                      : prevSeriesSlide("popular")
                  }
                >
                  ❮
                </button>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? nextMovieSlide("popular")
                      : nextSeriesSlide("popular")
                  }
                >
                  ❯
                </button>
              </div>
            </div>
            <div className={styles.slider_container}>
              <div
                className={styles.slider}
                style={{
                  transform: `translateX(-${
                    (contentType === "movies"
                      ? movieIndex["popular"]
                      : seriesIndex["popular"]) * 100
                  }%)`,
                }}
              >
                {contentData.popular.results.map((curData, index) => (
                  <div key={curData.id} className={styles.slide}>
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TOP RATED */}
          <div className={styles.content_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_title}>Top Rated</h3>
              <div className={styles.block_nav}>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? prevMovieSlide("topRated")
                      : prevSeriesSlide("topRated")
                  }
                >
                  ❮
                </button>
                <button
                  className={styles.nav_btn}
                  onClick={() =>
                    contentType === "movies"
                      ? nextMovieSlide("topRated")
                      : nextSeriesSlide("topRated")
                  }
                >
                  ❯
                </button>
              </div>
            </div>
            <div className={styles.slider_container}>
              <div
                className={styles.slider}
                style={{
                  transform: `translateX(-${
                    (contentType === "movies"
                      ? movieIndex["topRated"]
                      : seriesIndex["topRated"]) * 100
                  }%)`,
                }}
              >
                {contentData.topRated.results.map((curData, index) => (
                  <div key={curData.id} className={styles.slide}>
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
