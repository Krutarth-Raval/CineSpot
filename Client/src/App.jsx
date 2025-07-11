import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  "../src/App.css";
import AppLayout from "./Components/Layout/AppLayout";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
import TVShow from "./Pages/TVShow";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import {
  AllMovie,
  NowPlayingMovie,
  PopularMovie,
  TopRatedMovie,
  UpcomingMovie,
} from "./API/MovieData";
import {
  AllSeries,
  NowPlayingSeries,
  PopularSeries,
  TopRatedSeries,
  UpcomingSeries,
} from "./API/SeriesData";
import Login from "./Pages/Login";
import { News } from "./Pages/News";
import NewsData  from "./API/NewsData";
import { MovieOverview } from "./Pages/MovieOverview";
import { MovieDetailsData } from "./API/MovieDetailsData";
import { SeriesOverview } from "./Pages/SeriesOverview";
import { SeriesDetailsData } from "./API/SeriesDetailsData";
import EmailVerify from "./Pages/EmailVerify";
import ResetPassword from "./Pages/ResetPassword";
 

// home data------loader------------
const HomeLoader = async () => {
  try {
    const UpcomingMovieData = await UpcomingMovie();
    const PopularMovieData = await PopularMovie();
    const TopRatedMovieData = await TopRatedMovie();
    const NowPlayingMovieData = await NowPlayingMovie();
    const UpcomingSeriesData = await UpcomingSeries();
    const PopularSeriesData = await PopularSeries();
    const TopRatedSeriesData = await TopRatedSeries();
    const NowPlayingSeriesData = await NowPlayingSeries();
    // console.log("UpcomingMovieData", UpcomingMovieData);
    // console.log("UpcomingSeriesData", UpcomingSeriesData);
    return {
      UpcomingMovieData,
      UpcomingSeriesData,
      PopularMovieData,
      TopRatedMovieData,
      NowPlayingMovieData,
      PopularSeriesData,
      TopRatedSeriesData,
      NowPlayingSeriesData,
    };
  } catch (error) {
    console.error(" Error to fetch data", error);
    return {
      UpcomingMovieData: null,
      UpcomingSeriesData: null,
      PopularMovieData: null,
      TopRatedMovieData: null,
      NowPlayingMovieData: null,
      PopularSeriesData: null,
      TopRatedSeriesData: null,
      NowPlayingSeriesData: null,
    };
  }
};
// news data------loader--------------
const NewsDataLoader = async () => {
  try {
    const News = await NewsData();
    // console.log(News);
    return { News };
  } catch (error) {
    console.error(" Error to fetch data", error);
    return { News: null };
  }
};
// Movie data--------loader----------
const MovieDataLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  try {
    const AllMovies = await AllMovie(page);
    // console.log(AllMovies);
    return { AllMovies, currentPage: Number(page) };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { AllMovies: null, currentPage: 1 };
  }
};
const SeriesDataLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  try {
    const AllSeriesData = await AllSeries(page);
    // console.log(AllSeriesData);
    return { AllSeriesData, currentPage: Number(page) };
  } catch (error) {
    console.error("Error fetching series:", error);
    return { AllSeriesData: null, currentPage: 1 };
  }
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <p>404 Not Found</p>,
      children: [
        { path: "/", element: <Home />, loader: HomeLoader },
        { path: "/movie", element: <Movie />, loader: MovieDataLoader },
        {
          path: "/movieoverview/:id",
          element: <MovieOverview />,
          loader: MovieDetailsData,
        },
        { path: "/tvshow", element: <TVShow />, loader: SeriesDataLoader },
        {
          path: "/seriesoverview/:id",
          element: <SeriesOverview />,
          loader: SeriesDetailsData,
        },
        { path: "/news", element: <News />, loader: NewsDataLoader },
        { path: "/collection", element: <Collection /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        { path: "/verify-email", element: <EmailVerify /> },
        { path: "/reset-password", element: <ResetPassword /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
