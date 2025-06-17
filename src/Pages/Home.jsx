import { NavLink, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../Components/UI/Card";
import "../Styles/Home.css";
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

  const [movieIndex, setMovieIndex] = useState(0);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [contentType, setContentType] = useState('movies');

  // Movie Slider Functions
  const nextMovieSlide = () => {
    setMovieIndex((prev) =>
      prev === UpcomingMovieData.results.length - 1 ? 0 : prev + 1
    );
  };

  const prevMovieSlide = () => {
    setMovieIndex((prev) =>
      prev === 0 ? UpcomingMovieData.results.length - 1 : prev - 1
    );
  };

  // Series Slider Functions
  const nextSeriesSlide = () => {
    setSeriesIndex((prev) =>
      prev === UpcomingSeriesData.results.length - 1 ? 0 : prev + 1
    );
  };

  const prevSeriesSlide = () => {
    setSeriesIndex((prev) =>
      prev === 0 ? UpcomingSeriesData.results.length - 1 : prev - 1
    );
  };

  // Auto-slide effect for movies
  useEffect(() => {
    const movieInterval = setInterval(nextMovieSlide, 3000);
    return () => clearInterval(movieInterval);
  }, [movieIndex]);

  // Auto-slide effect for series
  useEffect(() => {
    const seriesInterval = setInterval(nextSeriesSlide, 3000);
    return () => clearInterval(seriesInterval);
  }, [seriesIndex]);

  const toggleContent = (type) => {
    setContentType(type);
    setMovieIndex(0);
    setSeriesIndex(0);
  };

  const getContentData = (type) => {
    if (type === 'movies') {
      return {
        upcoming: UpcomingMovieData,
        nowPlaying: NowPlayingMovieData,
        popular: PopularMovieData,
        topRated: TopRatedMovieData
      };
    } else {
      return {
        upcoming: UpcomingSeriesData,
        nowPlaying: NowPlayingSeriesData,
        popular: PopularSeriesData,
        topRated: TopRatedSeriesData
      };
    }
  };

  const contentData = getContentData(contentType);
  const currentIndex = contentType === 'movies' ? movieIndex : seriesIndex;
  const nextSlide = contentType === 'movies' ? nextMovieSlide : nextSeriesSlide;
  const prevSlide = contentType === 'movies' ? prevMovieSlide : prevSeriesSlide;

  return (
    <div className="main-container">
      <div className="hero-container">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-main">WELCOME TO</span>
            <span className="hero-title-accent">CINESPOT</span>
          </h1>
          <p className="hero-subtitle">Your Ultimate Destination for Movies & TV Shows</p>
          <div className="hero-cta">
            <NavLink to={"/movie"} className="hero-button">Explore Movies</NavLink>
            <NavLink to={"/tvshow"} className="hero-button">Explore Series</NavLink>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">Featured Content</h2>
          <div className="section-nav">
            <button 
              className={`section-nav-btn ${contentType === 'movies' ? 'active' : ''}`}
              onClick={() => toggleContent('movies')}
            >
              Movies
            </button>
            <button 
              className={`section-nav-btn ${contentType === 'series' ? 'active' : ''}`}
              onClick={() => toggleContent('series')}
            >
              TV Shows
            </button>
          </div>
        </div>

        <div className="content-grid">
          {/* UPCOMING */}
          <div className="content-block">
            <div className="block-header">
              <h3 className="block-title">Upcoming</h3>
              <div className="block-nav">
                <button className="nav-btn" onClick={prevSlide}>❮</button>
                <button className="nav-btn" onClick={nextSlide}>❯</button>
              </div>
            </div>
            <div className="slider-container">
              <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {contentData.upcoming.results.map((curData, index) => (
                  <div key={curData.id} className="slide">
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NOW PLAYING */}
          <div className="content-block">
            <div className="block-header">
              <h3 className="block-title">Now Playing</h3>
              <div className="block-nav">
                <button className="nav-btn" onClick={prevSlide}>❮</button>
                <button className="nav-btn" onClick={nextSlide}>❯</button>
              </div>
            </div>
            <div className="slider-container">
              <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {contentData.nowPlaying.results.map((curData, index) => (
                  <div key={curData.id} className="slide">
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POPULAR */}
          <div className="content-block">
            <div className="block-header">
              <h3 className="block-title">Popular</h3>
              <div className="block-nav">
                <button className="nav-btn" onClick={prevSlide}>❮</button>
                <button className="nav-btn" onClick={nextSlide}>❯</button>
              </div>
            </div>
            <div className="slider-container">
              <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {contentData.popular.results.map((curData, index) => (
                  <div key={curData.id} className="slide">
                    <Card curData={curData} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TOP RATED */}
          <div className="content-block">
            <div className="block-header">
              <h3 className="block-title">Top Rated</h3>
              <div className="block-nav">
                <button className="nav-btn" onClick={prevSlide}>❮</button>
                <button className="nav-btn" onClick={nextSlide}>❯</button>
              </div>
            </div>
            <div className="slider-container">
              <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {contentData.topRated.results.map((curData, index) => (
                  <div key={curData.id} className="slide">
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
